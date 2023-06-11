import Button from "../components/Button";
import TemplateList from "../components/templates/TemplateList";
import AppointmentStatus from "../components/AppointmentStatus";

import { Link } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineSync, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

import { TableAsync } from "../components/Table";
import { getAllAppointments } from "../config/httpRequests";
import { APPOINTMENT_SHARED, DATETIME_FORMAT } from "../utils/common"

async function loadItems() {
  try {
    const { appointments } = await getAllAppointments("table");
    return appointments.map(function ({ id, title, due_date, createdAt, event_type: { title: event_title } }) {
      const href = `/appointments/${id}`;
      const due_date_formatted = DATETIME_FORMAT.default.format(new Date(due_date));
      const created_at_formatted = DATETIME_FORMAT.default.format(new Date(createdAt));
      return [
        { contentType: "link", contentValue: { href, text: id } },
        { contentType: "text", contentValue: title },
        { contentType: "text", contentValue: event_title },
        { contentType: "text", contentValue: due_date_formatted },
        { contentType: "text", contentValue: created_at_formatted },
        {
          className: "group relative pr-2",
          contentType: "wrapped",
          contentValue: [
            <SlOptionsVertical key={[id, "options"].join("-")} className="text-weak-contrast text-xl cursor-pointer" />,
            <div key={[id, "div"].join("-")} className="flex px-8 transition-all invisible opacity-0 bg-gray-100 absolute top-1/2 -translate-y-1/2 right-0 group-hover:visible group-hover:gap-2 group-hover:opacity-100 group-hover:right-[100%] ">
              <AiOutlineSync className="text-2xl cursor-pointer text-weak-contrast disabled:text-weak-contrast disabled" disabled />
              <Link to={href}>
                <AiOutlineEdit className="text-2xl cursor-pointer text-weak-contrast disabled:text-weak-contrast disabled" disabled />
              </Link>
              <AiOutlineDelete className="text-2xl cursor-pointer text-weak-contrast hover:text-red-600 disabled:text-weak-contrast" />
            </div>
          ]
        }
      ]
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

// TODO: Fix unique `key` prop coming from the table about the TableCell.
const Appointments = () => {
  const table_head = ["REF.", "TITRE", "TYPE D'ÉVÉNEMENT", "DATE DUE", "DATE DE CREATION", ""].map((label) => {
    return {
      contentType: "head",
      contentValue: label,
    }
  });
  const components = {
    Table: () => <div className="w-full h-fit font-asap"><TableAsync head={table_head} rowsPromise={loadItems()} /></div>,
    Informations: () => <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <h1 className="font-asap font-semibold text-lg text-weak-contrast">NOMINATIONS</h1>
          <p className="text-weak-contrast font-roboto text-sm">Créez une nomination, et envoyez-le au client par E-mail ou par impression.</p>
        </div>
        <Button to="/appointments/new" textContent="Ajoutez une nomination" />
      </div>
      <h4 className="text-weak-contrast text-sm font-roboto font-semibold">Prochaines <span className="text-highlight font-inter">Nominations</span></h4>
    </div>
  };
  return <TemplateList components={components} />
};

export default Appointments;