import { useEffect } from "react";

const TimelineItem = ({ data }) => {
  const timestamp = new Date(data.createdAt);
  const time = `${timestamp.getMinutes() % 12}:${timestamp.getHours()} ${
    timestamp.getHours() >= 12 ? "pm" : "am"
  }`;

  return (
    <li className="mb-7 ml-10 w-11/12 text-strong-contrast">
      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-strong-contrast dark:bg-highlight"></div>
      <div className="w-full flex justify-between mb-6">
        <p>{data.comment}</p>
        <p>{time}</p>
      </div>
    </li>
  );
};

export default TimelineItem;
