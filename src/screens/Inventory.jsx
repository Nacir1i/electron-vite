import { Link } from 'react-router-dom';
import { useState, useReducer } from 'react';
import { AiOutlineSearch, AiOutlineFilter, AiOutlineClose } from 'react-icons/ai';

import Icon_Devis from '../assets/icon_devis.png';
import Icon_Order from '../assets/icon_bon_de_commande.png'
import Icon_Invoice from '../assets/icon_bon_de_livraison.png';
import Icon_Table_Empty from '../assets/table_empty.png';

import GlobalModal from '../components/GlobalModal';
import Button from '../components/Button';

const InventoryRows = ({ rows }) => {
  return rows.map(({ id, product, category, quantity, sub_category }, index) => {
    return (
      <tr key={index} className="border-none text-gray-600">
        <td>{id}</td>
        <td>{product}</td>
        <td>{category}</td>
        <td className="font-semibold">{quantity.toFixed(0)}</td>
        <td>{sub_category}</td>
        <td>
          <Link className="text-highlight underline underline-offset-2 decoration-highlight">Modifier</Link>
        </td>
      </tr>
    )
  });
}

const EmptyInventory = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-secondary">
      <img src={Icon_Table_Empty} className="w-72 h-72" />
      <h1 className="text-center text-lg font-asap font-bold text-strong-contrast">VOS BONS DE COMMANDE S'AFFICHENT ICI</h1>
      <h2 className="text-center text-gray-700 font-semibold font-open-sans">Cette espace vous permet de gerer vos salariés, trouvez leur detailles...</h2>
    </div>
  );
}

const Inventory = () => {
  const [inventoryProducts, setInventoryProducts] = useState([
    {
      id: "ALT3054",
      product: "Sirio Color Nero",
      category: "Carte Visite",
      quantity: 49,
      sub_category: "Papier Special",
    },
    {
      id: "IDM9050",
      product: "Sirio Color Nero",
      category: "Carte Visite",
      quantity: 49,
      sub_category: "Papier Special",
    },
    {
      id: "XKL0340",
      product: "Sirio Color Nero",
      category: "Carte Visite",
      quantity: 49,
      sub_category: "Papier Special",
    },
    {
      id: "ALA0004",
      product: "Sirio Color Nero",
      category: "Carte Visite",
      quantity: 49,
      sub_category: "Papier Special",
    },
  ]);
  const [inventoryView, setInventoryView] = useState(structuredClone(inventoryProducts));

  const searchInitialTerm = "";
  const searchDebounceDuration = 400;
  const searchSubmit = async (search) => {
    const products = search ? inventoryProducts.filter(({ id, product, category }) => {
      return id.includes(search) || category.includes(search) || product.includes(search);
    }) : structuredClone(inventoryProducts);
    setInventoryView(() => structuredClone(products));
  }
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchTerm, setSearchTerm] = useReducer((_, new_searchTerm) => {
    if (!searchTimeout) searchSubmit(new_searchTerm);
    clearTimeout(searchTimeout);
    const timeout = setTimeout(() => setSearchTimeout(null), searchDebounceDuration);
    setSearchTimeout(timeout);
    return new_searchTerm;
  }, searchInitialTerm);
  const searchTerm_onChange = (event) => setSearchTerm(event.target.value);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(() => true);
  const closeModal = () => setModalIsOpen(() => false);

  return (
    <div className="w-full h-full flex flex-col gap-4 bg-primary">
      <GlobalModal show={modalIsOpen}>
        <div className="flex flex-col gap-4 w-fit h-fit min-w-[428px]">
          <div className="flex justify-between items-center text-red-800 gap-8">
            <h1 className="text-gray-700 font-asap font-bold text-lg">Créer une nouvelle facture</h1>
            <AiOutlineClose className="text-xl cursor-pointer" onClick={closeModal} />
          </div>
          <div className="flex flex-col gap-2">
            <Link to="/inventory/package" onClick={closeModal} className="px-2 py-1 border border-weakest-contrast rounded-xl flex gap-2 hover:bg-gray-200 cursor-pointer">
              <img src={Icon_Devis} className="w-50 h-50" />
              <div className="h-50 flex-1 flex flex-col justify-center">
                <h1 className="text-highlight font-semibold font-asap">Créer un nouveau package</h1>
                <h4 className="text-xs text-strong-contrast font-open-sans font-semibold">Créez un nouveau package, et envoyez-le au client par E-mail ou par impression.</h4>
              </div>
            </Link>
            <Link to="/inventory/product" onClick={closeModal} className="px-2 py-1 border border-weakest-contrast rounded-xl flex gap-2 hover:bg-gray-200 cursor-pointer">
              <img src={Icon_Order} className="w-50 h-50" />
              <div className="h-50 flex-1 flex flex-col justify-center">
                <h1 className="text-highlight font-semibold font-asap">Créer un nouveau product</h1>
                <h4 className="text-xs text-strong-contrast font-open-sans font-semibold">Créez un nouveau product, à imprimer ou à envoyer par courriel au client.</h4>
              </div>
            </Link>
            <Link to="/inventory/service" onClick={closeModal} className="px-2 py-1 border border-weakest-contrast rounded-xl flex gap-2 hover:bg-gray-200 cursor-pointer">
              <img src={Icon_Invoice} className="w-50 h-50" />
              <div className="h-50 flex-1 flex flex-col justify-center">
                <h1 className="text-highlight font-semibold font-asap">Créez un nouveau service</h1>
                <h4 className="text-xs text-strong-contrast font-open-sans font-semibold">Créez un nouveau service, à imprimer ou à envoyer par courriel au client.</h4>
              </div>
            </Link>
          </div>
        </div>
      </GlobalModal>
      <div className="flex gap-4 items-center p-4 text-weak-contrast">
        <h1 className="text-gray-800 font-asap font-semibold">Inventory</h1>
        <div className="relative ml-auto" id="search">
          <input value={searchTerm} onChange={searchTerm_onChange} type="search" placeholder="Search list..." className="py-2 px-2 bg-transparent text-strong-contrast border border-weakest-contrast rounded-md font-open-sans pl-8 text-sm" />
          <AiOutlineSearch className="text-xl absolute top-1/2 left-2 -translate-y-1/2" />
        </div>
        <AiOutlineFilter className="text-xl cursor-pointer" />
        <Button onClick={openModal} textContent="Ajouter" />
      </div>
      {
        inventoryView.length ?
          (
            <table className="w-full text-left border-separate border-spacing-4">
              <thead className="bg-gray-100">
                <tr className=" text-sm text-weak-contrast">
                  <th>ID</th>
                  <th>PRODUIT</th>
                  <th>CATEGORIE</th>
                  <th>STOCK</th>
                  <th>SOUS-CATEGORIE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                <InventoryRows rows={inventoryView} />
              </tbody>
            </table>
        )
        :
        (<EmptyInventory />)
      }
    </div>
  )
};

export default Inventory;