import Button from "../../components/Button";
import TemplateList from "../../components/templates/TemplateList";
import { TableAsync } from "../../components/Table";

import { getAllDeliveryInvoices } from "../../config/httpRequests";


async function loadItems() {
  try {
    const { deliveryInvoices } = await getAllDeliveryInvoices();
    return deliveryInvoices.map(({ id, title, createdAt, customer_id, vendor_id }) => {
      const type_path = (!!customer_id) ? "customers" : "vendors";
      const type_label = (!!customer_id) ? "Client" : "Fournisseur";
      const href = `/invoices/${type_path}/${id}`;

      const createdAt_formatted = new Intl.DateTimeFormat('fr-FR').format(new Date(createdAt));
      return [
        { contentType: "link", contentValue: { href, text: id } },
        { contentType: "text", contentValue: title },
        { contentType: "text", contentValue: createdAt_formatted },
        { contentType: "text", contentValue: type_label },
        { contentType: "text", contentValue: title },
        { contentType: "text", contentValue: title },
      ];
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

const ReceiptsInvoices = () => {
  const table_head = ["ID", "DATE", "CLIENT", "TYPE D'ÉVÉNEMENT", "LIEU", "STATUT", ""].map((label) => { return { contentType: "head", contentValue: label } });
  const components = {
    Table: () => <div className="w-full h-fit font-asap"><TableAsync head={table_head} rowsPromise={loadItems()} /></div>,
    Informations: () => <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <h1 className="font-asap font-semibold text-lg text-weak-contrast">BONS DE LIVRAISON</h1>
          <p className="text-weak-contrast font-roboto text-sm">Créez un bon de livraison, et envoyez-le au client par E-mail ou par impression.</p>
        </div>
      </div>
      <h4 className="text-weak-contrast text-sm font-roboto font-semibold">Prochaines <span className="text-highlight font-inter">Bons de livraison</span></h4>
    </div>
  }
  return <TemplateList components={components} />;
};

export default ReceiptsInvoices;
