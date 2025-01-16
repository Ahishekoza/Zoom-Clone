"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState(null);
  const [callDetail, setCallDetail] = useState(null);
  const [values, setValues] = useState(initialValues);
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();

  const handleCreateMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date and time" });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created",
      });
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to create Meeting" });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Cards */}
      <HomeCard
        cardColor={"bg-orange-1"}
        img={"/icons/add-meeting.svg"}
        handleClick={() => setMeetingState("isInstantMeeting")}
        title={"New Meeting"}
        description={"Start an Instant meeting"}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        cardColor="bg-blue-1"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        cardColor="bg-purple-1"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        cardColor="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />

      {/* Scheduling meeting */}
      {!callDetail ? (
        <MeetingModal
          title="Create Meeting"
          className=""
          buttonText={"Schedule Meeting"}
          onOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(null)}
          handleClick={handleCreateMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a Description
            </label>
            <Textarea
              className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2.5 w-full">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-2 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          title="Meeting Created"
          onOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(null)}
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
          image={"/icons/checked.svg"}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}
      {/* Creating an instant meeting */}
      {meetingState === "isInstantMeeting" && (
        <MeetingModal
          title="Start an Instant Meeting"
          className=""
          onOpen={true}
          onClose={() => setMeetingState(null)}
          buttonText="Start Meeting"
          image=""
          buttonIcon=""
          handleClick={handleCreateMeeting}
        />
      )}

      {/* --- Joining Invitation */}
      <MeetingModal
        onOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        handleClick={() => router.push(values.link)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
      >
        <Input
          placeholder="Meeting Link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>
    </div>
  );
};

export default MeetingTypeList;
