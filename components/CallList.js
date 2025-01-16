"use client";
import useGetCalls from "@/hooks/useGetCalls";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import MeetingCard from "./MeetingCard";
import { useRouter } from "next/navigation";

const CallList = ({ type }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState([]);
  const [recordingsLoading, setRecordingsLoading] = useState(false); // New state
  const router = useRouter();

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      setRecordingsLoading(true); // Set loading to true before fetching
      const callData = await Promise.all(
        callRecordings?.map((meeting) => meeting?.queryRecordings()) ?? []
      );
      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
      setRecordingsLoading(false); // Set loading to false after fetching
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No Upcoming Calls";
      case "recordings":
        return "No Recordings";
      default:
        return "";
    }
  };

  const calls = getCalls();
  const noCallMessage = getNoCallsMessage();
  const icon = () => {
    return type === "recordings"
      ? "/icons/recordings.svg"
      : type === "upcoming"
      ? "/icons/upcoming.svg"
      : "/icons/previous.svg";
  };

  const link = (meeting) => {
    return type === "upcoming"
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting?.id}`
      : meeting?.url;
  };

  if (isLoading || (type === "recordings" && recordingsLoading)) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        <>
          {calls.map((meeting) => {
            return (
              <MeetingCard
                key={meeting?.id}
                icon={icon()}
                title={
                  meeting?.state?.custom?.description ||
                  meeting?.filename?.substring(0, 20) ||
                  "No description"
                }
                date={
                  meeting?.state?.startsAt?.toLocaleString() ||
                  meeting?.start_time?.toLocaleString()
                }
                isPreviousMeeting={type === "ended"}
                invitationLink={link(meeting)}
                buttonIcon={
                  type === "recordings" ? "/icons/recordings.svg" : ""
                }
                buttonText={type === "recordings" ? "Play" : "Start"}
                handleMeetingStart={
                  type === "recordings"
                    ? () => router.push(`${meeting?.url}`)
                    : () => router.push(`/meeting/${meeting?.id}`)
                }
              />
            );
          })}
        </>
      ) : (
        <>
          {type !== "recordings" || !recordingsLoading ? (
            <h1 className="text-2xl font-bold text-white">{noCallMessage}</h1>
          ) : null}
        </>
      )}
    </div>
  );
};

export default CallList;
