import Button from "../../components/Button";
import TemplateList from "../../components/templates/TemplateList";
import { TableAsync } from "../../components/Table";

import { getAllOrders } from "../../config/httpRequests";
import { DATETIME_FORMAT } from "../../utils/common";


async function loadItems() {
  try {
    const { orders } = await getAllOrders({ customer: true });
    return orders.map(({ id, delivery_address, amount_paid, price, title, due_date, customer }) => {
      const href = `/orders/customers/${id}`;

      const due_date_formatted = DATETIME_FORMAT.long.format(new Date(due_date));
      return [
        { contentType: "link", contentValue: { href, text: id } },
        { contentType: "text", contentValue: due_date_formatted },
        { contentType: "text", contentValue: [customer?.last_name, customer?.first_name].join(" ") },
        { contentType: "text", contentValue: delivery_address },
        { contentType: "text", contentValue: title },
        { contentType: "text", contentValue: amount_paid >= price ? "Payé" : "Impayé" },
      ];
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

const ReceiptsOrders = () => {
  const table_head = ["ID", "DATE", "CLIENT", "TYPE D'ÉVÉNEMENT", "LIEU", "STATUT DE PAIEMENT"].map((label) => { return { contentType: "head", contentValue: label } });
  const components = {
    Table: () => <div className="w-full h-fit font-asap"><TableAsync head={table_head} rowsPromise={loadItems()} /></div>,
    Informations: () => <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <h1 className="font-asap font-semibold text-lg text-weak-contrast">BONS DE COMMANDE</h1>
          <p className="text-weak-contrast font-roboto text-sm">Créez un bon de commande, et envoyez-le au client par E-mail ou par impression.</p>
        </div>
      </div>
      <h4 className="text-weak-contrast text-sm font-roboto font-semibold">Prochaines <span className="text-highlight font-inter">Bons de commande</span></h4>
    </div>
  }
  return <TemplateList components={components} />;
};

export default ReceiptsOrders;
