import Button from "../../components/Button";
import TemplateList from "../../components/templates/TemplateList";
import { TableAsync } from "../../components/Table";

import { getAllPackages } from "../../config/httpRequests";
import { DATETIME_FORMAT } from "../../utils/common";

async function loadPackagesForTable() {
  try {
    const { packages } = await getAllPackages();
    return (packages ?? []).map(({ id, title, category, price, created_at }) => {
      const href = `/packages/${id}`;
      const created_at_formatted = DATETIME_FORMAT.long.format(new Date(created_at));
      return [
        { contentType: "link", contentValue: { href, text: id } },
        { contentType: "text", contentValue: title },
        { contentType: "text", contentValue: category?.title ?? "No category"},
        { contentType: "text", contentValue: created_at_formatted},
      ];
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

const ListPackages = () => {
  const table_head = ["REF.", "TITRE", "CATEGORIE", "DATE DE CREATION", ""].map((label) => { return { contentType: "head", contentValue: label } });
  const components = {
    Table: () => <div className="w-full h-fit font-asap"><TableAsync head={table_head} rowsPromise={loadPackagesForTable()} /></div>,
    Informations: () => <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <h1 className="font-asap font-semibold text-lg text-weak-contrast">Inventaire des Packages</h1>
          <p className="text-weak-contrast font-roboto text-sm">Créez un package, et envoyez-le au client par E-mail ou par impression.</p>
        </div>
        <Button to="/packages/new" textContent="Ajouter un pack" />
      </div>
      <h4 className="text-weak-contrast text-sm font-roboto font-semibold">Prochaines <span className="text-highlight font-inter">Packages</span></h4>
    </div>
  }
  return <TemplateList components={components} />
}

export default ListPackages;