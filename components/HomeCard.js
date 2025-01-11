
import Image from "next/image";

const HomeCard = ({ img, title, description, handleClick, cardColor }) => {
  return (
    <div
      onClick={handleClick}
      className={`w-full min-h-[260px] xl:max-w-[270px] rounded-[14px] ${cardColor} px-4 py-6 flex flex-col justify-between cursor-pointer`}
    >
      <div className="bg-slate-400/50 rounded-md flex justify-center items-center size-12">
        <Image src={img} width={27} height={27} alt="meeting" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal ">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
