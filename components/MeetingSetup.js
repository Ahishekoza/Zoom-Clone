import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({setIsSetupComplete}) => {
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );
  }

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex justify-center items-center gap-2 font-medium">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            className="cursor-pointer"
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings/>
      </div>
      <Button className="rounded-md bg-green-500 px-4 py-2.5" onClick={()=>{
        call.join()
        setIsSetupComplete(true)
      }}>
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
