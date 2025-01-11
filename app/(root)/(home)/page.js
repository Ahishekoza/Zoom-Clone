import MeetingTypeList from "@/components/MeetingTypeList";
import React from "react";

const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString("en-Us", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString("en-Us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="flex flex-col gap-10 w-full text-white">
      {/* --Banner Image */}
      <div className="w-full h-[300px] object-cover bg-cover bg-hero rounded-md">
        <div className=" h-full w-full flex flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="bg-slate-500 max-w-[273px] py-2 px-2 rounded-md">
            Upcoming Events at 12:55 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl lg:text-7xl font-extrabold">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList/>
    </section>
  );
};

export default Home;
