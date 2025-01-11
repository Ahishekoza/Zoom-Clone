"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";

const MeetingTypeList = () => {
  const router = useRouter();
  const [messagingState, setMessagingState] = useState()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <HomeCard
        cardColor={"bg-orange-1"}
        img={"/icons/add-meeting.svg"}
        handleClick={() => setMessagingState("isInstantMeeting")}
        title={"New Meeting"}
        description={"Start an Instant meeting"}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        cardColor="bg-blue-1"
        handleClick={() => setMessagingState("isJoiningMeeting")}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        cardColor="bg-purple-1"
        handleClick={() => setMessagingState("isScheduleMeeting")}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        cardColor="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />
    </div>
  );
};

export default MeetingTypeList;
