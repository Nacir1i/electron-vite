import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineHome, AiOutlineSolution, AiOutlineCalendar, AiOutlineReconciliation, AiOutlinePieChart, AiOutlineHistory, AiOutlineLogout, AiOutlineTool, AiOutlineQuestion, AiOutlineFile, AiOutlineLock } from "react-icons/ai";

import logo from "../assets/trmLogoDark.png";
import IconSelect from "./IconSelect";

const MainNavbar = () => {
  const Search = () => {
    // TODO: Full styling.
    return (
      <div className="px-2">
        <IconSelect
          unstyled={true}
          isDisabled={true}
          placeholder="Search..."
          className="w-full text-sm font-open-sans text-strong-contrast cursor-text bg-gray-200/75 rounded-xl"
          classNames={{
            indicatorsContainer: () => "invisible cursor-text",
            placeholder: () => "cursor-text",
            input: () => "cursor-text",
          }}
          iconClassName="text-lg mx-2"
        />
      </div>
    )
  }
  const Info = () => {
    return (
      <div className="w-full h-min flex">
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="font-bold text-sm text-strong-contrast">Triomphant</h3>
          <h5 className="text-sm">Management System</h5>
        </div>
        <div className="w-[56px]">
          <img src={logo} alt="Orthographic rendition of the letter T" />
        </div>
      </div>
    );
  };

  const Links = () => {
    const [documentsAreOpen, setDocumentsAreOpen] = useState(false);
    const [facturesAreOpen, setFacturesAreOpen] = useState(false);
    const [inventoryAreOpen, setInventoryAreOpen] = useState(false);
    const [appointmentsAreOpen, setAppointmentsAreOpen] = useState(false);
    return (
      <div className="w-full flex flex-col gap-8 px-4">
        {
         // Testing Grounds
        /* <Link to="/test" className="flex items-center rounded-md gap-4">
          <AiOutlineLock className="text-xl" />
          <h3 className="text-base">Testing Arena</h3>
        </Link> */}
        <Link to="/" className="flex items-center rounded-md gap-4">
          <AiOutlineHome className="text-xl text-highlight" />
          <h3 className="text-base">Tableau de bord</h3>
        </Link>
        <div className="flex flex-col gap-4">
          <div className="flex items-center rounded-md gap-4 cursor-pointer" onClick={() => setAppointmentsAreOpen((prev) => !prev)}>
            <AiOutlineCalendar className="text-xl text-highlight" />
            <h3 className="text-base">Nominations</h3>
          </div>
          {
            appointmentsAreOpen && (
              <div className="contents">
                <Link to="/appointments?mode=table" className="rounded-md pl-4">
                  <h3 className="text-sm">Table</h3>
                </Link>
                <Link to="/calendar" className="rounded-md pl-4">
                  <h3 className="text-sm">Calendrier</h3>
                </Link>
              </div>
            )
          }
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center rounded-md gap-4 cursor-pointer" onClick={() => setInventoryAreOpen((prev) => !prev)}>
            <AiOutlineReconciliation className="text-xl text-highlight" />
            <h3 className="text-base">Inventaire</h3>
          </div>
          {
            inventoryAreOpen && (
              <div className="contents">
                <Link to="/products" className="rounded-md pl-4">
                  <h3 className="text-sm">Produits</h3>
                </Link>
                <Link to="/packages" className="rounded-md pl-4">
                  <h3 className="text-sm">Packages</h3>
                </Link>
                <Link to="/services" className="rounded-md pl-4">
                  <h3 className="text-sm">Services</h3>
                </Link>
              </div>
            )
          }
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center rounded-md gap-4 cursor-pointer" onClick={() => setFacturesAreOpen((prev) => !prev)}>
            <AiOutlineFile className="text-xl text-highlight" />
            <h3 className="text-base">Factures</h3>
          </div>
          {
            facturesAreOpen && (
              <div className="contents">
                <Link to="/devis" className="rounded-md pl-4">
                  <h3 className="text-sm">Devis</h3>
                </Link>
                <Link to="/orders" className="rounded-md pl-4">
                  <h3 className="text-sm">Bons de Commande</h3>
                </Link>
                <Link to="/invoices" className="rounded-md pl-4">
                  <h3 className="text-sm">Bons de Livraison</h3>
                </Link>
              </div>
            )
          }
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center rounded-md gap-4 cursor-pointer" onClick={() => setDocumentsAreOpen((prev) => !prev)}>
            <AiOutlineSolution className="text-xl text-highlight" />
            <h3 className="text-base">Documents</h3>
          </div>
          {
            documentsAreOpen && (
              <div className="contents">
                <Link to="/employees" className="rounded-md pl-4">
                  <h3 className="text-sm">Employés</h3>
                </Link>
                <Link to="/customers" className="rounded-md pl-4">
                  <h3 className="text-sm">Clients</h3>
                </Link>
                <Link to="/vendors" className="rounded-md pl-4">
                  <h3 className="text-sm">Fournisseurs</h3>
                </Link>
              </div>
            )
          }
        </div>
        { 
        // TODO: Archives page 
        /* <Link to="/archive" className="flex items-center rounded-md gap-4">
          <AiOutlineHistory className="text-xl" />
          <h3 className="text-base">Archives</h3>
        </Link> */}
      </div>
    );
  };
  const LogoutAndContact = () => {
    /** @type {{token: string | null, loggedIn: boolean, lastLogin: EpochTimeStamp}} */
    const dispatch = useDispatch();
    const logout = function () {
      localStorage.setItem("sessionToken", "");
      dispatch(resetAuth());
    }
    return (
      <div className="w-full mt-auto mb-6 flex flex-col gap-8 px-4">
        <Link onClick={logout} to="/login" className="flex items-center rounded-md gap-4">
          <AiOutlineLogout className="text-xl text-red-900" />
          <h3 className="text-base">Logout</h3>
        </Link>
        { 
        // TODO: Support page 
        /* <Link to="/support" className="flex items-center rounded-md gap-4">
          <AiOutlineTool className="text-xl" />
          <h3 className="text-base">Support</h3>
        </Link> */}
      </div>
    );
  }
  return (
    <div className="sticky top-0 left-0 h-screen w-64 p-2 bg-secondary text-strong-contrast flex flex-col gap-16 font-open-sans border-r border-r-weakest-contrast">
      <Info />
      <Search />
      <Links />
      <LogoutAndContact />
    </div>
  )
}

export default MainNavbar;
