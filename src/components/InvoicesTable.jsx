import { Link } from "react-router-dom";
import { AiOutlineMore } from "react-icons/ai";
import InvoiceStatus from "./InvoiceStatus";

const InvoicesTable = ({ rows = [], to }) => {
  const generate_rows = rows.map(
    ({ client, id, date, paid, address, event_type }, index) => (
      <tr key={index}>
        <td className="py-5 px-4 font-asap text-sm text-strong-contrast">
          <Link
            to={to}
            className="text-highlight underline underline-offset-2"
          >
            {id}
          </Link>
        </td>
        <td className="font-asap text-sm text-strong-contrast">{date}</td>
        <td className="font-asap text-sm text-strong-contrast">{client}</td>
        <td className="font-asap text-sm text-strong-contrast">{event_type}</td>
        <td className="font-asap text-sm text-strong-contrast">{address}</td>
        <td className="font-asap text-sm text-strong-contrast">
          <InvoiceStatus paid={paid} />
        </td>
        <td className="text-strong-contrast text-xl cursor-pointer">
          <AiOutlineMore />
        </td>
      </tr>
    )
  );
  return (
    <table className="w-full border-spacing-4 border-collapse bg-secondary">
      <thead>
        <tr className="text-left">
          <th className="py-2 px-4 font-asap font-semibold text-sm text-strong-contrast/75">
            ID
          </th>
          <th className="font-asap font-semibold text-sm text-strong-contrast/75">
            DATE
          </th>
          <th className="font-asap font-semibold text-sm text-strong-contrast/75">
            CLIENT
          </th>
          <th className="font-asap font-semibold text-sm text-strong-contrast/75">
            EVENT TYPE
          </th>
          <th className="w-96 font-asap font-semibold text-sm text-strong-contrast/75">
            LOCATION
          </th>
          <th className="font-asap font-semibold text-sm text-strong-contrast/75">
            PAYMENT
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>{generate_rows}</tbody>
    </table>
  );
};

export default InvoicesTable;
