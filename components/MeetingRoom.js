"use client";
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { useEffect, useState } from "react";
import { LayoutList, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import EndButton from "./EndButton";
import Loader from "./Loader";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonal = !!searchParams.get("Personal");
  const [layout, setLayout] = useState("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState   } = useCallStateHooks();
  const callingState = useCallCallingState();


  if (callingState !== CallingState.JOINED) {
    return <Loader />;
  }

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className=" flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className=" fixed bottom-0 flex w-full flex-wrap items-center justify-center gap-5">
        <CallControls />
        <DropdownMenu>
          <div>
            <DropdownMenuTrigger className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => {
              return (
                <>
                  <DropdownMenuItem
                    key={index}
                    className="cursor-pointer"
                    onClick={() => setLayout(item.toLowerCase())}
                  >
                    {item}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="border-dark-1" />
                </>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button
          className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] "
          onClick={() => setShowParticipants((prev) => !prev)}
        >
          <Users size={20} className="text-white" />
        </button>
        {!isPersonal && <EndButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
