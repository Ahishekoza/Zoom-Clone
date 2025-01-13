"use client"

import { useUser } from "@clerk/nextjs";
import {
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useEffect,useState } from "react";
import { tokenProvider } from "./actions/stream.actions";
import Loader from "./components/Loader";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const StreamVideoProvider = ({ children }) => {
  const { user, isLoaded } = useUser();
  const [videoClient, setVideoClient] = useState();
  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!API_KEY) throw new Error("Stream Api key is missing");

    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.id,
        name: user?.username,
        image: user?.imageUrl,
      },
      tokenProvider: tokenProvider,
    });
    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

