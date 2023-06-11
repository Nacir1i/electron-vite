import { BiCalendar } from "react-icons/bi";
import { useState } from "react";

const EventContainer = ({ data }) => {
  const [color] = useState(() => {
    if (data.type === "appointment") return "bg-green-300";
    if (data.type === "event") return "bg-blue-300";
    if (data.type === "custom") return "bg-red-300";
    return "bg-weak-contrast";
  });
  const [textColor] = useState(() => {
    if (data.type === "appointment") return "text-green-700";
    if (data.type === "event") return "text-blue-700";
    if (data.type === "custom") return "text-red-700";
    return "bg-weak-contrast";
  });
  return (
    <div className="w-full flex flex-col gap-4 bg-gray-100 border border-weakest-contrast p-3 px-5 rounded">
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-2">
          <BiCalendar className="text-blue-400 text-lg" />
          <p>{data.date}</p>
        </div>
        <div className={`p-1 rounded ${color}`}>
          <h1 className={`text-xs ${textColor}`}>
            {data.startTime} to {data.endTime}
          </h1>
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-md text-strong-contrast font-semibold">{data.title}</h1>
        <p className="text-sm">{data.address}</p>
        <p className="text-sm">{data.address2}</p>
      </div>
    </div>
  );
};

export default EventContainer;
