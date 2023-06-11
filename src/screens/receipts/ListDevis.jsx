import TemplateList from "../../components/templates/TemplateList";
import { TableAsync } from "../../components/Table";

import { getAllQuotes } from "../../config/httpRequests";
import { DATETIME_FORMAT } from "../../utils/common";

async function loadItems() {
  const { quotes } = await getAllQuotes({ customer: true, event_type: true });
  const quotes_rows = quotes.map(({ id, title, event_type, created_at, customer }) => {
    const createdFormat = DATETIME_FORMAT.long.format(new Date(created_at));
    return [
      { contentType: "link", contentValue: { href: `/devis/${id}`, text: id } },
      { contentType: "text", contentValue: title },
      { contentType: "text", contentValue: createdFormat },
      { contentType: "text", contentValue: [customer?.first_name ?? "No Name", customer?.last_name].join(" ") },
      { contentType: "text", contentValue: event_type?.title ?? "Inconnue" },
      { contentType: "text", contentValue: "Impayé" },
      { contentType: "text", contentValue: "" },
    ];
  });
  return quotes_rows;
}

const ListDevis = () => {
  const table_head = ["ID", "TITRE", "DATE", "CLIENT", "TYPE D'ÉVÉNEMENT", "STATUT DE PAIEMENT", ""].map((label) => { return { contentType: "head", contentValue: label } });
  const components = {
    Table: () => <div className="w-full h-fit font-asap"><TableAsync head={table_head} rowsPromise={loadItems()} /></div>,
    Informations: () => <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <h1 className="font-asap font-semibold text-lg text-weak-contrast">DEVIS</h1>
          <p className="text-weak-contrast font-roboto text-sm">Créez un devis, et envoyez-le au client par E-mail ou par impression.</p>
        </div>
      </div>
      <h4 className="text-weak-contrast text-sm font-roboto font-semibold">Prochaines <span className="text-highlight font-inter">Devis</span></h4>
    </div>
  }
  return <TemplateList components={components} />
};

export default ListDevis;
