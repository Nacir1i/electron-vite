import { AiOutlineCheckCircle, AiOutlineClockCircle } from "react-icons/ai";

const InvoiceStatus = ({ paid }) => {
  return paid ? (
    <div className="flex gap-2 items-center text-green-600">
      <AiOutlineCheckCircle className="text-lg" />
      <h3 className="font-asap">Paid</h3>
    </div>
  ) : (
    <div className="flex gap-2 items-center text-orange-700">
      <AiOutlineClockCircle className="text-lg" />
      <h3 className="font-asap text-strong-contrast">Unpaid</h3>
    </div>
  );
};

export default InvoiceStatus;
