import Button from "../components/Button";
import TemplateList from "../components/templates/TemplateList";
import { TableAsync } from "../components/Table";

import { getAllEmployees } from "../config/httpRequests";
import { DATETIME_FORMAT } from "../utils/common";

async function loadEmployeesForTable() {
  try {
    const { employees } = await getAllEmployees({ contact: true, role: true });
    return employees.map(({ id, first_name, last_name, joined_at, role }) => {
      const href = `/employees/${id}`;
      const joined_at_formatted = DATETIME_FORMAT.long.format(new Date(joined_at));
      return [
        { contentType: "link", contentValue: { href, text: first_name } },
        { contentType: "text", contentValue: last_name },
        { contentType: "text", contentValue: joined_at_formatted },
        { contentType: "text", contentValue: role.title },
        { contentType: "text", contentValue: "Active" },
      ];
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

const Employees = () => {
  const table_head = ["PRÉNOM", "NOM DE FAMILLE", "DATE D'INSCRIPTION", "RÔLE", "STATUT"].map((label) => {
    return { contentType: "head", contentValue: label };
  });
  const components = {
    Table: () => <div className="w-full h-fit font-asap"><TableAsync head={table_head} rowsPromise={loadEmployeesForTable()} /></div>,
    Informations: () => <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <h1 className="font-asap font-semibold text-lg text-weak-contrast">Employés</h1>
          <p className="text-weak-contrast font-roboto text-sm">Gérer vos employés et modifiez leur informations.</p>
        </div>
        <Button to="/employees/new" textContent="Ajouter un employé" />
      </div>
      <h4 className="text-weak-contrast text-sm font-roboto font-semibold">10 <span className="text-highlight font-inter">Employés</span></h4>
    </div>
  };
  return <TemplateList components={components} />
};

export default Employees;