const InfoContainer = ({ children, title }) => {
  return (
    <div className="w-full flex flex-col gap-4 justify-around p-5 border border-highlight shadow-lg text-strong-contrast bg-gray-100">
      <h1 className="font-semibold">{title}</h1>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
};

export default InfoContainer;
