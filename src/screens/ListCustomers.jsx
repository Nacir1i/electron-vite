import { TableAsync } from "../components/Table";
import Button from "../components/Button";
import TemplateList from "../components/templates/TemplateList";

import { getAllCustomers } from "../config/httpRequests";
import { DATETIME_FORMAT } from "../utils/common";

async function loadCustomersForTable() {
  try {
    const { customers } = await getAllCustomers({ orders: true, contact: true });
    return customers.map(({ id, first_name, last_name, orders, contact: { honorific } }) => {
      const href = `/customers/${id}`;
      const orders_last = DATETIME_FORMAT.extended(new Date((orders ?? []).at(-1).created_at));
      const orders_total = (orders ?? []).reduce((prev, x) => prev + x.amount_paid, 0);
      return [
        { contentType: "link", contentValue: { href, text: `${first_name} ${last_name}` } },
        { contentType: "text", contentValue: honorific },
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
  const table_head = ["NOM COMPLET", "ENTREPRISE", "DERNIÈRE COMMANDE", "TOTAL DES COMMANDES", "MONTANT DÉPENSÉ"].map((label) => {
    return { contentType: "head", contentValue: label };
  });
  const components = {
    Table: () => <div className="w-full h-fit font-asap"><TableAsync head={table_head} rowsPromise={loadCustomersForTable()} /></div>,
    Informations: () => <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <h1 className="font-asap font-semibold text-lg text-weak-contrast">Clients</h1>
          <p className="text-weak-contrast font-roboto text-sm">Gérer vos clients et modifiez leur informations.</p>
        </div>
        <Button to="/customers/new" textContent="Ajouter un client" />
      </div>
      <h4 className="text-weak-contrast text-sm font-roboto font-semibold">10 <span className="text-highlight font-inter">Clients</span></h4>
    </div>
  };
  return <TemplateList components={components} />
}

export default Customers;