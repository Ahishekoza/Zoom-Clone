import CallList from "@/components/CallList";
import React from "react";

const Previous = () => {
  return (
    <section className="flex flex-col gap-10 w-full text-white">
      <h1 className="text-3xl font-bold">Previous</h1>

      <CallList type={"ended"}/>
    </section>
  );
};

export default Previous;
