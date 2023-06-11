import { AiOutlineLoading } from "react-icons/ai";

const AppLoading = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full text-highlight">
      <AiOutlineLoading className="animate-spin text-4xl" />
    </div>
  )
}

export default AppLoading;