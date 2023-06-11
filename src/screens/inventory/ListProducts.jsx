import Button from "../../components/Button";
import TemplateList from "../../components/templates/TemplateList";
import { TableAsync } from "../../components/Table";

import { getAllProducts } from "../../config/httpRequests";

async function loadItems() {
  try {
    // const { stocks: products } = await getProducts();
    const { products } = await getAllProducts({ category: true });
    return products.map(({ id, cost, price, title, barcode, quantity, category: { title: category_title } }) => {
      const href = `/products/${id}`;
      return [
        { contentType: "link", contentValue: { href, text: id } },
        { contentType: "text", contentValue: title },
        { contentType: "text", contentValue: quantity },
        { contentType: "text", contentValue: category_title },
        { contentType: "text", contentValue: barcode },
        { contentType: "text", contentValue: "" },
      ];
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

const ListProducts = () => {
  const table_head = ["REF.", "TITRE", "QUANTITÉ", "CATEGORIE", "SOUS-CATEGORIE", ""].map((label) => { return { contentType: "head", contentValue: label } });
  const components = {
    Table: () => <div className="w-full h-fit font-asap"><TableAsync head={table_head} rowsPromise={loadItems()} /></div>,
    Informations: () => <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <h1 className="font-asap font-semibold text-lg text-weak-contrast">Inventaire des Produits</h1>
          <p className="text-weak-contrast font-roboto text-sm">Créez un produit, et envoyez-le au client par E-mail ou par impression.</p>
        </div>
        <Button to="/products/new" textContent="Ajouter un produit" />
      </div>
      <h4 className="text-weak-contrast text-sm font-roboto font-semibold">Prochaines <span className="text-highlight font-inter">Produits</span></h4>
    </div>
  }
  return <TemplateList components={components} />
}

export default ListProducts;