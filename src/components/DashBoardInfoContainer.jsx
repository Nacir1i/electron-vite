const DashboardInfoContainer = ({ title, date, information }) => {
  return (
    <div className="w-56 h-36 flex flex-col justify-between gap-3 p-3 px-5 font-asap bg-gray-100 border border-highlight shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className="">
        <h1 className="text-xl font-bold text-highlight">{title}</h1>
        <p className="text-xs text-weak-contrast">{date}</p>
      </div>
      <h1 className="text-2xl text-gray-600 font-bold font-open-sans">{information}</h1>
    </div>
  );
};

export default DashboardInfoContainer;
