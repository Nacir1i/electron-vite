import { AiOutlinePlus } from "react-icons/ai";

const InvoiceHeader = ({ title, desc, event }) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold text-highlight">{title}</h1>
        <p className="text-sm text-weak-contrast">{desc}</p>
      </div>
      <div className="flex items-center gap-4">
        <p>Jun 24, 2022</p>
        <button
          onClick={event}
          className="p-2 px-3 bg-highlight text-white rounded-md font-asap text-2xl flex gap-2 items-center"
        >
          <AiOutlinePlus />
          <span className="text-lg font-medium">Header</span>
        </button>
      </div>
    </div>
  );
};

export default InvoiceHeader;
