import Button from "../../components/Button";
import TemplateList from "../../components/templates/TemplateList";
import { TableAsync } from "../../components/Table";

import { getAllServices } from "../../config/httpRequests";
import { DATETIME_FORMAT } from "../../utils/common";

async function loadServicesForTable() {
  try {
    // const { services } = getDatabase();
    const { services } = await getAllServices();
    return services.map(({ id, cost, price, title, created_at, category }) => {
      const href = `/services/${id}`;

      const price_formatter = (p) => [p.toFixed(2), "MAD"].join(" ");
      const created_at_formatted = DATETIME_FORMAT.default.format(new Date(created_at));
      return [
        { contentType: "link", contentValue: { href, text: id } },
        { contentType: "text", contentValue: title },
        { contentType: "text", contentValue: category?.title ?? "No Category" },
        { contentType: "text", contentValue: created_at_formatted },
        { contentType: "text", contentValue: "" },
      ];
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

const ListServices = () => {
  const table_head = ["REF.", "TITRE", "CATEGORIE", "DATE DE CREATION", ""].map((label) => { return { contentType: "head", contentValue: label } });
  const components = {
    Table: () => <div className="w-full h-fit font-asap"><TableAsync head={table_head} rowsPromise={loadServicesForTable()} /></div>,
    Informations: () => <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <h1 className="font-asap font-semibold text-lg text-weak-contrast">Inventaire des Services</h1>
          <p className="text-weak-contrast font-roboto text-sm">Créez un service, et envoyez-le au client par E-mail ou par impression.</p>
        </div>
        <Button to="/services/new" textContent="Ajouter une service" />
      </div>
      <h4 className="text-weak-contrast text-sm font-roboto font-semibold">Prochaines <span className="text-highlight font-inter">Services</span></h4>
    </div>
  }
  return <TemplateList components={components} />
}

export default ListServices;