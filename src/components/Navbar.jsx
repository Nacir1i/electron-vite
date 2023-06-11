import { useEffect, useState } from "react";
import { AiOutlineInbox, AiOutlineClose, AiOutlineBell, AiOutlineCloseCircle, AiOutlineFileAdd } from "react-icons/ai";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "./Button";
import GlobalModal from "./GlobalModal";
import Toggle from "./Toggle";

const dictionary = {
  "/": "Dashboard",
  "/help": "Centre d'Assistance",
  "/archive": "Archive",
  "/appointments": "Nominations",
  "/packages": "Inventaire - Packages",
  "/services": "Inventaire - Services",
  "/products": "Inventaire - Produits",
  "/devis": "Factures - Devis",
  "/orders": "Factures - Bons de Commande",
  "/invoices": "Factures - Bons de Livraison",
  "/vendors": "Documents - Fournisseurs",
  "/employees": "Documents - Employés",
  "/customers": "Documents - Clients",
  "/test": "Testing Grounds",
};

const NewReceiptModal = ({ show, setShow }) => {
  const closeModal = () => setShow(() => false);
  const ModalChoice = ({ href, onClick, text, description }) => {
    return <Link to={href} onClick={onClick} className="flex items-center gap-4 transition-colors duration-300 ease-in hover:bg-highlight/10 cursor-pointer rounded-lg border border-weakest-contrast p-4">
      <div className="w-16 h-16 flex justify-center items-center bg-weak-contrast rounded-full">
        <FaFileInvoiceDollar className="text-white text-4xl" />
      </div>
      <div>
        <h1 className="text-highlight text-xl cursor-pointer">{text}</h1>
        <p className="text-sm text-strong-contrast">{description}</p>
      </div>
    </Link>
  }
  const [toggle, setToggle] = useState(true);
  // TODO: Fix the description mentions of devis instead of respective type, and make the subject target dynamic (client vs vendor).
  return <GlobalModal className="flex flex-col gap-4 min-w-[33vw] max-w-[50vw]" show={show}>
    <div className="flex justify-between items-center">
      <h1>Nouvelle Facture</h1>
      <AiOutlineClose onClick={closeModal} className="text-xl cursor-pointer text-red-700" />
    </div>
    <div className="flex justify-end items-center gap-4">
      <label htmlFor="ReceiptMode" className="font-roboto font-medium text-highlight">Fournisseur</label>
      <Toggle id="ReceiptMode" state={toggle} onChange={(event) => setToggle(() => event.target.checked)} />
      <label htmlFor="ReceiptMode" className="font-roboto font-medium text-highlight">Client</label>
    </div>
    <div className="flex flex-col gap-2">
      {
        toggle &&
        <ModalChoice href={`/devis/new`} onClick={closeModal} text="Nouveau devis" description="Créez un nouveau devis, et envoyez-le au client par E-mail ou par impression." />
      }
      <ModalChoice href={`/orders/${toggle ? "customers" : "vendors"}/new`} onClick={closeModal} text="Nouveau bon de commande" description="Créez un nouveau devis, et envoyez-le au client par E-mail ou par impression." />
      <ModalChoice href={`/invoices/${toggle ? "customers" : "vendors"}/new`} onClick={closeModal} text="Nouveau bon de livraison" description="Créez un nouveau devis, et envoyez-le au client par E-mail ou par impression." />
    </div>
  </GlobalModal>
}

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState(dictionary[location.pathname])
  useEffect(() => {
    const pathname = location.pathname;
    if (!dictionary[pathname]) {
      let _pageTitle = "UNKNOWN";
      const parts = pathname.split("/");
      const id = parts.at(-1) ?? "Inconnue";
      const label = id === "new" ? "Brouillon" : id;
      if (parts.includes("appointments")) _pageTitle = `Nomination / ${label}`;
      else if (parts.includes("packages")) _pageTitle = `Inventaire - Package / ${label}`;
      else if (parts.includes("services")) _pageTitle = `Inventaire - Service / ${label}`;
      else if (parts.includes("products")) _pageTitle = `Inventaire - Produit / ${label}`;
      else if (parts.includes("devis")) _pageTitle = `Factures - Devis / ${label}`;
      else if (parts.includes("orders")) _pageTitle = `Factures - Bon de Commande / ${label}`;
      else if (parts.includes("invoices")) _pageTitle = `Factures - Bon de Livraison / ${label}`;
      else if (parts.includes("vendors")) _pageTitle = `Documents - Fournisseur / ${label}`;
      else if (parts.includes("employees")) _pageTitle = `Documents - Employé / ${label}`;
      else if (parts.includes("customers")) _pageTitle = `Documents - Client / ${label}`;
      setPageTitle(() => _pageTitle);
    } else setPageTitle(() => dictionary[pathname]);
  }, [location]);

  return (
    <div className="flex items-center w-full h-16 px-4 bg-secondary">
      <NewReceiptModal show={showModal} setShow={setShowModal} />
      <div className="flex-1">
        <h1 className="normal-case text-lg text-strong-contrast font-inter font-semibold">{pageTitle}</h1>
      </div>
      <div className="flex-none flex items-center gap-4 text-sm cursor-pointer">
        <Button to="/help" type="soft" textContent="Centre d'Assistance" />
        <div className="relative w-fit h-fit">
          <Button onClick={() => { setShowInbox((prev) => !prev) }} textContent="Boîte de réception" Icon={<AiOutlineInbox className="text-lg" />} type="soft" />
          {showInbox && (
            <div className="absolute top-full translate-y-4 right-0 w-96 h-fit z-50 bg-secondary shadow-xl border border-weakest-contrast cursor-default rounded-xl">
              <div className="w-full h-fit p-2 flex items-center justify-between ">
                <Button type="soft" textContent="Notifications" />
                <Button type="soft" />
              </div>
              <hr className="border-weakest-contrast" />
              <div className="w-full h-fit flex flex-col gap-2">
                <div className="w-full h-fit grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] gap-4 p-4">
                  <div className="w-10 h-full">
                    <img src="https://api.lorem.space/image/face?w=72&h=72" className="w-10 h-10 rounded-full" />
                  </div>
                  <h1 className="w-full h-full text-strong-contrast font-inter"><b>Taoufik Wahbi</b> créé un nouveau rendez-vous <b>Meeting w\ Mr Alae and Laila #5547</b></h1>
                  <p className="row-start-2 col-start-2 text-weak-contrast font-inter font-medium text-sm">Aujourd'hui à 9:42 AM</p>
                </div>
                <hr className="border-weakest-contrast" />
                <div className="w-full h-fit grid grid-cols-[auto_1fr] grid-rows-[1fr_auto_auto] gap-4 p-4 font-inter">
                  <div className="w-10 h-full">
                    <img src="https://api.lorem.space/image/face?w=72&h=72" className="w-10 h-10 rounded-full" />
                  </div>
                  <h1 className="w-full h-full text-strong-contrast"><b>Taoufik Wahbi</b> créé un nouveau rendez-vous <b>Meeting w\ Mr Alae and Laila #5547</b></h1>
                  <p className="pl-4 text-strong-contrast border-l-2 border-l-weak-contrast row-start-2 col-start-2">ils ont demandé à changer le design de la table, ils voulaient le style de table de la panthère noire</p>
                  <p className="row-start-3 col-start-2 text-weak-contrast font-medium text-sm">Aujourd'hui à 9:42 AM</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <Button onClick={() => setShowModal(true)} textContent="Nouvelle facture" Icon={<AiOutlineFileAdd />} />
        <button className="w-10 h-10 outline outline-transparent outline-offset-0 hover:outline-offset-2 hover:outline-highlight rounded-full transition-[outline_outline-offset] duration-300" onClick={() => { }}>
          <img className="w-10 h-10 rounded-full" src="https://api.lorem.space/image/face?w=72&h=72" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
