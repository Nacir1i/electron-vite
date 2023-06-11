import Button from "../components/Button";
import TemplateList from "../components/templates/TemplateList";
import { TableAsync } from "../components/Table";
import { getAllVendors } from "../config/httpRequests";
import { DATETIME_FORMAT } from "../utils/common";

async function loadItems() {
  try {
    const { vendors } = await getAllVendors({ contact: true, orders: true });
    return vendors.map(({ id, first_name, last_name, orders, contact: { honorific } }) => {
      const href = `/vendors/${id}`;
      const orders_last = DATETIME_FORMAT.extended.format(new Date((orders ?? []).at(-1)?.created_at ?? 0));
      const orders_total = (orders ?? []).reduce((prev, x) => prev + x.amount_paid, 0);
      return [
        { contentType: "link", contentValue: { href, text: honorific } },
        { contentType: "text", contentValue: `${first_name} ${last_name}` },
        { contentType: "text", contentValue: orders_last },
        { contentType: "text", contentValue: `${orders?.length ?? 0} commandes` },
        { contentType: "text", contentValue: `${orders_total.toFixed(2)} MAD` },
      ];
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

const Customers = () => {
  const table_head = ["FOURNISSEUR", "NOM DE L'AGENT", "DERNIÈRE COMMANDE", "TOTAL DES COMMANDES", "MONTANT DÉPENSÉ"].map((label) => {
    return { contentType: "head", contentValue: label };
  });
  const components = {
    Table: () => <div className="w-full h-fit font-asap"><TableAsync head={table_head} rowsPromise={loadItems()} /></div>,
    Informations: () => <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <h1 className="font-asap font-semibold text-lg text-weak-contrast">Fournisseurs</h1>
          <p className="text-weak-contrast font-roboto text-sm">Gérer vos fournisseurs et modifiez leur informations.</p>
        </div>
        <Button to="/vendors/new" textContent="Ajouter un fournisseur" />
      </div>
      <h4 className="text-weak-contrast text-sm font-roboto font-semibold">10 <span className="text-highlight font-inter">Fournisseurs</span></h4>
    </div>
  };
  return <TemplateList components={components} />
}

export default Customers;