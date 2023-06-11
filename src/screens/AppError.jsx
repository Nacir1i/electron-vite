import { useEffect } from "react";
import { useAsyncError } from "react-router-dom";

const AppError = () => {
  const error = useAsyncError();
  useEffect(() => console.error(error), [error]);
  return <div className="w-full h-full bg-secondary text-strong-contrast p-4 flex flex-col justify-center items-center">
    <h2 className="text-2xl text-red-700 font-asap font-bold">An error has occurred</h2>
    <h5 className="text-lg text-red-900 font-asap">Check the console logs...</h5>
  </div>
};

export default AppError;