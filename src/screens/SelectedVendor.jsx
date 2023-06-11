// import React from "react";
// import { Await } from "react-router-dom";
// import { useAsyncValue } from "react-router-dom";
// import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

// import Card from "../components/Card";
// import AsyncSelect from "react-select/async";

// import { useParams } from "react-router-dom";
// import { CLASS_NAMES, createStates, DATETIME_FORMAT, PromiseTimeout } from "../utils/common";
// import AppLoading from "./AppLoading";
// import EditToolbox from "../components/EditToolbox";
// import { useState } from "react";
// import { getDatabase, updateDatabase } from "../utils/temporary";
// import Button from "../components/Button";
// import Table from "../components/Table";
// import Select from "react-select";
// import DatePicker from "react-datepicker";
// import { deliveryFrequencies, getVendor } from "../config/httpRequests";

// /** START OF CARDS */

// const InsightCard = ({ spent, order_count }) => {
//   const average = spent / order_count;
//   const onChange = () => { };
//   return (
//     <Card>
//       <div className="flex gap-2 items-center">
//         <div className="flex flex-col w-full gap-4 flex-1">
//           <h4 className="font-bold text-strong-contrast">Montant dépensé</h4>
//           <div className="flex gap-2 items-center">
//             <h2 className="font-inter font-medium text-xl text-weak-contrast">MAD</h2>
//             <h4 className="font-inter font-medium text-base text-highlight">{spent.toFixed(2)}</h4>
//           </div>
//         </div>
//         <div className="flex flex-col w-full gap-4 flex-1">
//           <h4 className="font-bold text-strong-contrast text-center">Commandes</h4>
//           <div className="flex gap-2 items-center justify-center">
//             <h4 className="font-inter font-semibold text-xl text-highlight">{order_count.toFixed(0)}</h4>
//           </div>
//         </div>
//         <div className="flex flex-col w-full gap-4 flex-1">
//           <h4 className="font-bold text-strong-contrast text-right">Moyenne des commandes</h4>
//           <div className="flex gap-2 items-center justify-end">
//             <h4 className="font-inter font-medium text-base text-highlight">{average.toFixed(2)}</h4>
//             <h2 className="font-inter font-medium text-xl text-weak-contrast">MAD</h2>
//           </div>
//         </div>
//       </div>
//     </Card>
//   )
// }

// const GeneralCard = ({ id, first_name, last_name, category }) => {
//   const states = createStates(["first_name", first_name], ["last_name", last_name]);
//   const [modeEdit, setModeEdit] = useState(false);
//   const toggleModeEdit = () => setModeEdit((prev) => !prev);
//   const saveChanges = async () => {
//     const database = getDatabase();

//     const index = database["vendors"].findIndex((vendor) => vendor.id === id);
//     if (index === -1) {
//       toggleModeEdit();
//       return;
//     }

//     for (const [key] of states.entries()) {
//       if (key === "__reset") continue;

//       const value = states.get(key).exporter();
//       database["vendors"][index][key] = value;
//     }

//     updateDatabase(database);
//     await PromiseTimeout(300);

//     toggleModeEdit();
//   };
//   const cancelChanges = async () => {
//     states.get("__reset")();
//     toggleModeEdit();
//   };
//   return (
//     <Card>
//       <div className="flex items-center justify-between">
//         <h1 className="font-bold text-strong-contrast">Generale</h1>
//         <EditToolbox save={saveChanges} cancel={cancelChanges} toggle={toggleModeEdit} modeEdit={modeEdit} />
//       </div>
//       <div className="flex gap-2 items-center">
//         <div className="flex flex-col w-full gap-2">
//           <label htmlFor="first_name" className="text-strong-contrast">Prénom</label>
//           <input id="first_name" type="text" className={CLASS_NAMES.input} readOnly={!modeEdit} value={states.get("first_name").getter} onChange={states.get("first_name").setter} />
//         </div>
//         <div className="flex flex-col w-full gap-2">
//           <label htmlFor="last_name" className="text-strong-contrast">Nom</label>
//           <input id="last_name" type="text" className={CLASS_NAMES.input} readOnly={!modeEdit} value={states.get("last_name").getter} onChange={states.get("last_name").setter} />
//         </div>
//       </div>
//     </Card>
//   );
// }

// const PaymentHistoryCard = ({ history }) => {
//   if (!history) history = [];
//   const table_rows = history.map(({ id, date, price, status, method }) => [
//     { contentType: "link", contentValue: { href: `/payments/${id}`, text: id } },
//     { contentType: "text", contentValue: DATETIME_FORMAT.default.format(new Date(date)) },
//     { contentType: "text", contentValue: status },
//     { contentType: "text", contentValue: method },
//     { contentType: "text", contentValue: [price.toFixed(2), "MAD"].join(" ") },
//   ]);
//   const table_head = [
//     { contentType: "head", contentValue: "REF." },
//     { contentType: "head", contentValue: "DATE" },
//     { contentType: "head", contentValue: "STATUT" },
//     { contentType: "head", contentValue: "METHODE" },
//     { contentType: "head", contentValue: "TOTALE" },
//   ];
//   return (
//     <Card>
//       <h1 className="font-bold text-strong-contrast">Historique des paiements</h1>
//       <hr className="border-weakest-contrast" />
//       <Table head={table_head} rows={table_rows} />
//       <hr className="border-weakest-contrast" />
//       <div className="flex justify-end gap-2">
//         <Button type="soft" textContent="Afficher tout" />
//       </div>
//     </Card>
//   );
// }

// const ProductsCard = ({ products }) => {
//   if (!products) products = [];
//   const table_rows = products.map(({ id, title, price, unit }) => [
//     { contentType: "text", contentValue: id },
//     { contentType: "text", contentValue: title },
//     { contentType: "text", contentValue: price },
//     { contentType: "text", contentValue: unit },
//   ]);
//   const table_head = [
//     { contentType: "head", contentValue: "REF." },
//     { contentType: "head", contentValue: "TITRE" },
//     { contentType: "head", contentValue: "PRIX" },
//     { contentType: "head", contentValue: "UNITÉ" },
//   ];
//   return (
//     <Card>
//       <h1 className="font-bold text-strong-contrast">Produits</h1>
//       <hr className="border-weakest-contrast" />
//       <Table head={table_head} rows={table_rows} />
//       <hr className="border-weakest-contrast" />
//       <div className="flex justify-end gap-2">
//         <Button type="soft" textContent="Afficher tout" />
//       </div>
//     </Card>
//   );
// }

// const ContactCard = ({ phone, email, address, honorific, dispatch }) => {
//   const states = createStates(["phone", phone], ["email", email], ["address", address], ["honorific", honorific])

//   const [modeEdit, setModeEdit] = useState(false);
//   const toggleModeEdit = () => setModeEdit((prev) => !prev);

//   async function saveChanges() {
//     const action = {};

//     const keys = Array.from(states.keys()).filter((e) => e !== "__reset");
//     for (const key of keys) action[key] = states.get(key).exporter();

//     dispatch(action);
//     toggleModeEdit();
//   };
//   const cancelChanges = async () => {
//     states.get("__reset")();
//     toggleModeEdit();
//   };
//   return (
//     <Card>
//       <div className="flex items-center justify-between">
//         <h1 className="font-bold text-strong-contrast">Informations de contact</h1>
//         <EditToolbox save={saveChanges} cancel={cancelChanges} toggle={toggleModeEdit} modeEdit={modeEdit} />
//       </div>
//       <div className="flex flex-col gap-2">
//         <div className="flex gap-4 items-center">
//           <label className="flex-1" htmlFor="honorific">Honorific</label>
//           <input readOnly={!modeEdit} id="honorific" type="honorific" value={states.get("honorific").getter} onChange={states.get("honorific").setter} placeholder="Saisissez une honorifique/entreprise..." className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//         <div className="flex gap-4 items-center">
//           <label className="flex-1" htmlFor="phone">Tél.</label>
//           <input readOnly={!modeEdit} id="phone" type="text" value={states.get("phone").getter} onChange={states.get("phone").setter} placeholder="Saisissez un numéro de telephone..." className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//         <div className="flex gap-4 items-center">
//           <label className="flex-1" htmlFor="email">Email</label>
//           <input readOnly={!modeEdit} id="email" type="email" value={states.get("email").getter} onChange={states.get("email").setter} placeholder="Saisissez un e-mail..." className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//         <div className="flex gap-4 items-center">
//           <label className="flex-1" htmlFor="address">Addresse</label>
//           <input readOnly={!modeEdit} id="address" type="text" value={states.get("address").getter} onChange={states.get("address").setter} placeholder="Saisissez une addresse..." className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//       </div>
//     </Card>
//   )
// };

// const AgentCard = () => {
//   return (
//     <Card>
//       <div className="flex items-center justify-between">
//         <h1 className="font-bold text-strong-contrast">Détails de l'agent</h1>
//         <button className="bg-transparent text-highlight text-inter rounded-lg text-sm font-asap font-semibold">MODIFIER</button>
//       </div>
//       <div className="flex flex-col gap-2">
//         <div className="flex gap-4 items-center">
//           <label className="flex-1" htmlFor="title">Titre</label>
//           <input id="title" type="text" value="Mr" readOnly={true} className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//         <div className="flex gap-4 items-center">
//           <label className="flex-1" htmlFor="name">Nom</label>
//           <input id="name" type="text" value="Nâaour Ali" readOnly={true} className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//       </div>
//     </Card>
//   )
// }

// const DeliveryCard = ({ hours_start, hours_end, delivery_charge, delivery_frequency, dispatch }) => {

//   const states = createStates(
//     ["hours_end", hours_end, "time"],
//     ["hours_start", hours_start, "time"],
//     ["delivery_charge", delivery_charge],
//     ["delivery_frequency", delivery_frequency, "select"],
//   );


//   const [modeEdit, setModeEdit] = useState(false);
//   const toggleModeEdit = () => setModeEdit((prev) => !prev);
//   const saveChanges = async () => {
//     const action = {};

//     const keys = Array.from(states.keys()).filter((e) => e !== "__reset");
//     for (const key of keys) {
//       action[key] = states.get(key).exporter();
//       console.log(key, action[key]);
//     }

//     dispatch(action);
//     toggleModeEdit();
//   };
//   const cancelChanges = async () => {
//     states.get("__reset")();
//     toggleModeEdit();
//   };

//   async function filterFrequencies(searchTerm) {
//     const { frequencies } = await deliveryFrequencies.getFiltered(searchTerm);
//     return frequencies.map(({ id, title }) => {
//       return { value: id, label: title };
//     });
//   }

//   return <Card>
//     <div className="flex items-center justify-between">
//       <h1 className="font-bold text-strong-contrast">Livraison</h1>
//       <EditToolbox save={saveChanges} cancel={cancelChanges} toggle={toggleModeEdit} modeEdit={modeEdit} />
//     </div>
//     <div className="flex flex-col gap-4 mt-2">
//       <div className="w-full h-fit flex gap-2 items-center">
//         <label htmlFor="" className="flex-1">Fréquence</label>
//         <div className="flex flex-[2_2_0%]">
//           <AsyncSelect isDisabled={!modeEdit} className="w-full" value={states.get("delivery_frequency").getter} onChange={states.get("delivery_frequency").setter} loadOptions={filterFrequencies} />
//         </div>
//       </div>
//       <div className="w-full h-fit flex gap-2 items-center">
//         <label htmlFor="" className="flex-1">Heures</label>
//         <div className="flex flex-[2_2_0%] justify-between items-center gap-2">
//           <DatePicker disabled={!modeEdit} className={[CLASS_NAMES.input, "w-full text-center cursor-pointer hover:font-bold"].join(" ")} selected={states.get("hours_start").getter} onChange={states.get("hours_start").setter} timeIntervals={30} dateFormat="hh:mm aa" showTimeSelect showTimeSelectOnly />
//           <span>-</span>
//           <DatePicker disabled={!modeEdit} className={[CLASS_NAMES.input, "w-full text-center cursor-pointer hover:font-bold"].join(" ")} selected={states.get("hours_end").getter} onChange={states.get("hours_end").setter} timeIntervals={30} dateFormat="hh:mm aa" showTimeSelect showTimeSelectOnly />
//         </div>
//       </div>
//       <div className="w-full h-fit flex gap-2 items-center">
//         <label htmlFor="" className="flex-1">Charge</label>
//         <div className="flex flex-[2_2_0%] relative">
//           <input type="number" className={[CLASS_NAMES.input, "w-full pr-16 text-center"].join(" ")} placeholder="Coût..." value={states.get("delivery_charge").getter} onChange={states.get("delivery_charge").setter} />
//           <span className="absolute top-1/2 -translate-y-1/2 right-4 text-sm font-bold text-highlight">MAD</span>
//         </div>
//       </div>
//     </div>
//   </Card>
// };
// // const DeliveryCard = ({ id, hoursStart, hoursEnd, deliveryCharge, frequencyId }) => {
// //   const frequencies = [
// //     { value: 1, label: "Quotidien" },
// //     { value: 2, label: "Bi-Hebdomadaire (15 jours)" },
// //     { value: 3, label: "Mensuel" },
// //   ];
// //   const initialFrequency = frequencies.find((e) => e.value === frequencyId);
// //   const states = createStates(["hoursStart", hoursStart, "time"], ["hoursEnd", hoursEnd, "time"], ["deliveryCharge", deliveryCharge], ["frequency", initialFrequency, "select"]);

// //   const [modeEdit, setModeEdit] = useState(false);
// //   const toggleModeEdit = () => setModeEdit((prev) => !prev);
// //   const saveChanges = async () => {
// //     const database = getDatabase();

// //     const index = database["vendors"].findIndex((vendor) => vendor.id === id);
// //     if (index === -1) {
// //       toggleModeEdit();
// //       return;
// //     }

// //     for (const [key] of states.entries()) {
// //       if (key === "__reset") continue;

// //       const value = states.get(key).exporter();
// //       database["vendors"][index][key === "frequency" ? "frequencyId" : key] = value;
// //     }

// //     updateDatabase(database);
// //     await PromiseTimeout(300);

// //     toggleModeEdit();
// //   };
// //   const cancelChanges = async () => {
// //     states.get("__reset")();
// //     toggleModeEdit();
// //   };

// //   return (
// //     <Card>
// //       <div className="flex items-center justify-between">
// //         <h1 className="font-bold text-strong-contrast">Livraison</h1>
// //         <EditToolbox save={saveChanges} cancel={cancelChanges} toggle={toggleModeEdit} modeEdit={modeEdit} />
// //       </div>
// //       <div className="flex flex-col gap-4">
// //         <div className="flex gap-2 items-center">
// //           <label className="w-1/3" htmlFor="frequency">Fréquence</label>
// //           <Select isDisabled={!modeEdit} className="w-full" value={states.get("frequency").getter} onChange={states.get("frequency").setter} options={frequencies} />
// //         </div>
// //         <div className="flex gap-2 items-center">
// //           <label className="w-1/3" htmlFor="hours">Heures</label>
// //           <div className="flex w-full items-center justify-between gap-4 px-4">
// //             <DatePicker disabled={!modeEdit} className="w-full" selected={states.get("hoursStart").getter} onChange={states.get("hoursStart").setter} timeIntervals={30} dateFormat="hh:mm aa" showTimeSelect showTimeSelectOnly />
// //             <span>-</span>
// //             <DatePicker disabled={!modeEdit} className="w-full" selected={states.get("hoursEnd").getter} onChange={states.get("hoursEnd").setter} timeIntervals={30} dateFormat="hh:mm aa" showTimeSelect showTimeSelectOnly />
// //           </div>
// //         </div>
// //         <div className="flex gap-2 items-center w-full">
// //           <label className="w-1/3" htmlFor="charge">Charge</label>
// //           <div className="flex w-full items-center justify-between px-4 relative">
// //             <input readOnly={!modeEdit} id="charge" type="number" value={states.get("deliveryCharge").getter} onChange={states.get("deliveryCharge").setter} className={CLASS_NAMES.input} />
// //             <span className="font-bold font-inter text-highlight absolute top-1/2 -translate-y-1/2 right-8">MAD</span>
// //           </div>
// //         </div>
// //       </div>
// //     </Card>
// //   )
// // }

// const PaymentDetailsCard = ({ id, name, number, rib, ice }) => {
//   const states = createStates(["name", name], ["number", number], ["rib", rib], ["ice", ice]);

//   const [modeEdit, setModeEdit] = useState(false);
//   const toggleModeEdit = () => setModeEdit((prev) => !prev);
//   const saveChanges = async () => {
//     const database = getDatabase();

//     const index = database["vendors"].findIndex((vendor) => vendor.id === id);
//     if (index === -1) {
//       toggleModeEdit();
//       return;
//     }

//     for (const [key] of states.entries()) {
//       if (key === "__reset") continue;

//       const value = states.get(key).exporter();
//       database["vendors"][index][key] = value;
//     }

//     updateDatabase(database);
//     await PromiseTimeout(300);

//     toggleModeEdit();
//   };
//   const cancelChanges = async () => {
//     states.get("__reset")();
//     toggleModeEdit();
//   };
//   return (
//     <Card>
//       <div className="flex items-center justify-between">
//         <h1 className="font-bold text-strong-contrast">Détails du paiement</h1>
//         <EditToolbox save={saveChanges} cancel={cancelChanges} toggle={toggleModeEdit} modeEdit={modeEdit} />
//       </div>
//       <div className="flex flex-col gap-0">
//         <div className="flex flex-col">
//           <label className="font-inter font-medium text-highlight text-sm" htmlFor="bank">Banc</label>
//           <input id="bank" type="text" value={states.get("name").getter} onChange={states.get("name").setter} readOnly={!modeEdit} className="w-full p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//         <div className="flex flex-col">
//           <label className="font-inter font-medium text-highlight text-sm" htmlFor="rib">RIB</label>
//           <input id="rib" type="text" value={states.get("rib").getter} onChange={states.get("rib").setter} readOnly={!modeEdit} className="w-full p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//         <div className="flex flex-col">
//           <label className="font-inter font-medium text-highlight text-sm" htmlFor="account_number">Numero de Compte</label>
//           <input id="account_number" type="text" value={states.get("number").getter} onChange={states.get("number").setter} readOnly={!modeEdit} className="w-full p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//         <div className="flex flex-col">
//           <label className="font-inter font-medium text-highlight text-sm" htmlFor="ice">I.C.E</label>
//           <input id="ice" type="text" value={states.get("ice").getter} onChange={states.get("ice").setter} readOnly={!modeEdit} className="w-full p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//       </div>
//     </Card>
//   )
// }

// /** END OF CARDS */

// const SelectedVendor = () => {
//   const vendor = useAsyncValue();
//   return (
//     <div className="w-full h-full bg-primary flex flex-col gap-4 p-4">
//       <div className="flex items-center gap-2">
//         <h1 className="text-lg font-bold text-weak-contrast font-asap">DÉTAILS DU FOURNISSEUR</h1>
//         <button className="bg-transparent font-inter text-sm text-strong-contrast ml-auto">Dupliquer</button>
//         <button className="bg-transparent border-2 border-strong-contrast text-strong-contrast p-1 rounded-lg flex items-center justify-center">
//           <FaLongArrowAltLeft className="text-lg" />
//         </button>
//         <button className="bg-transparent border-2 border-strong-contrast text-strong-contrast p-1 rounded-lg flex items-center justify-center">
//           <FaLongArrowAltRight className="text-lg" />
//         </button>
//       </div>
//       <div className="w-full flex gap-4">
//         <div className="w-2/3 flex flex-col gap-4">
//           <GeneralCard {...vendor} />
//           <InsightCard spent={37275.99} order_count={7} />
//           <PaymentHistoryCard />
//           <ProductsCard />
//         </div>
//         <div className="w-1/3 flex flex-col gap-4">
//           <ContactCard {...vendor.contact} />
//           <AgentCard />
//           <DeliveryCard {...vendor} />
//           <PaymentDetailsCard {...vendor.bank_information} />
//         </div>
//       </div>
//     </div>
//   );
// };

import Card from "../components/Card";
import Button from "../components/Button";
import AppLoading from "./AppLoading";
import TemplateEdit from "../components/templates/TemplateEdit";

import { createStatesNew, CLASS_NAMES, APPOINTMENT_SHARED } from "../utils/common";
import { getVendor, deliveryFrequencies, getFilteredVendorCategory, createVendorCategory, getFilteredRoles, updateVendor } from "../config/httpRequests";

import Select from "react-select";
import DatePicker from "react-datepicker";
import AsyncCreatableSelect from 'react-select/async-creatable';

import { AiOutlineCalendar } from "react-icons/ai";
import { useNavigate, useParams, useAsyncValue, Await } from "react-router-dom";
import { Suspense, useReducer, forwardRef } from "react";

const StatisticsCard = () => {
  return <Card>
    <h1 className={CLASS_NAMES.label}>Statistiques</h1>
    <h2 className="text-center font-regular font-inter text-highlight">Veuillez créer le fournisseur avant d'essayer de mesurer ces statistiques.</h2>
  </Card>
}

const LastOrdersCard = ({ orders = [] }) => {
  const is_empty = orders.length === 0;
  return <Card>
    <h1 className={CLASS_NAMES.label}>Dernières factures</h1>
    {
      is_empty
        ? (<h2 className="text-center font-regular font-inter text-highlight">Ce fournisseur n'a pas de factures liées...</h2>)
        :
        (<div className="contents">
          <hr className="border-weakest-contrast" />
        </div>)
    }
  </Card>
}

const VendorSalesCard = ({ orders = [] }) => {
  const is_empty = orders.length === 0;
  return <Card>
    <h1 className={CLASS_NAMES.label}>Offres</h1>
    {
      is_empty
        ? (<h2 className="text-center font-regular font-inter text-highlight">Ce fournisseur est encore récent, liez quelques factures pour voir ses offres.</h2>)
        : (<div className="contents">
          <hr className="border-weakest-contrast" />
        </div>)
    }
  </Card>
}

const VendorAgentCard = ({ first_name = "", last_name = "", dispatch }) => {
  const states = createStatesNew({ first_name, last_name }, {}, dispatch);

  return <Card className="gap-4">
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Informations sur l'agent</h1>
    <div className="flex flex-col gap-2">
      <label htmlFor="first_name" className={CLASS_NAMES.label}>Prénom</label>
      <input type="text" name="first_name" id="first_name" placeholder="Saisissez un prénom pour ce fournisseur..." className={CLASS_NAMES.input} onChange={states.get("first_name").onChange} value={states.get("first_name").value} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="last_name" className={CLASS_NAMES.label}>Nom</label>
      <input type="text" name="last_name" id="last_name" placeholder="Saisissez un nom de famille pour ce fournisseur..." className={CLASS_NAMES.input} onChange={states.get("last_name").onChange} value={states.get("last_name").value} />
    </div>
  </Card>
}

const VendorDeliveryCard = ({ delivery_charge = 0, delivery_frequency = null, hours_start = null, hours_end = null, dispatch }) => {
  const states = createStatesNew({
    delivery_charge,
    hours_start: new Date(hours_start),
    hours_end: new Date(hours_end),
    delivery_frequency: {
      value: delivery_frequency?.id,
      label: delivery_frequency?.title,
    }
  }, { hours_start: "datepicker", hours_end: "datepicker", delivery_frequency: "select" }, dispatch);

  async function queryFrequencies(searchTerm) {
    const { frequencies } = await deliveryFrequencies.getFiltered(searchTerm);
    return frequencies.map(({ id, title }) => ({ value: id, label: title }));
  }
  const createFrequency = async (title) => {
    const { deliveryFrequencies: delivery_frequency } = await deliveryFrequencies.create(title);
    states.get("delivery_frequency").set({
      value: delivery_frequency?.id,
      label: delivery_frequency?.title,
    });
  }
  return <Card>
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Options de livraison</h1>
    <div className="flex flex-col gap-2">
      <label htmlFor="frequency" className={CLASS_NAMES.label}>Fréquence</label>
      <AsyncCreatableSelect onCreateOption={createFrequency} defaultOptions={true} loadOptions={queryFrequencies} unstyled classNames={CLASS_NAMES.select} value={states.get("delivery_frequency").value} onChange={states.get("delivery_frequency").onChange} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="hours" className={CLASS_NAMES.label}>Heures</label>
      <div className="w-full h-fit flex gap-2 items-center">
        <div className="flex justify-between items-center gap-2">
          <DatePicker className={[CLASS_NAMES.input, "w-full text-center cursor-pointer hover:font-bold"].join(" ")} selected={states.get("hours_start").value} onChange={states.get("hours_start").onChange} timeIntervals={30} dateFormat="hh:mm aa" showTimeSelect showTimeSelectOnly />
          <span>-</span>
          <DatePicker className={[CLASS_NAMES.input, "w-full text-center cursor-pointer hover:font-bold"].join(" ")} selected={states.get("hours_end").value} onChange={states.get("hours_end").onChange} timeIntervals={30} dateFormat="hh:mm aa" showTimeSelect showTimeSelectOnly />
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="charge" className={CLASS_NAMES.label}>Frais</label>
      <div className="flex relative">
        <input type="number" className={[CLASS_NAMES.input, "w-full pl-16"].join(" ")} placeholder="Coût..." value={states.get("delivery_charge").value} onChange={states.get("delivery_charge").onChange} />
        <span className="absolute top-1/2 -translate-y-1/2 left-4 text-sm font-bold text-highlight">MAD</span>
      </div>
    </div>
  </Card>
}

const VendorDetailsCard = ({ id, vendor_category, contact: { honorific = "" }, dispatch }) => {
  const states = createStatesNew({
    vendor_category: {
      value: vendor_category?.id,
      label: vendor_category?.title,
    }
  }, { vendor_category: "select" }, dispatch);
  const contact_states = createStatesNew({ honorific }, {}, dispatch, { contactInformation: {} });

  async function queryCategory(searchTerm) {
    const queryResult = await getFilteredVendorCategory(searchTerm);
    const { vendorCategories } = queryResult;
    return vendorCategories.map(({ id, title }) => ({ value: id, label: title }));
  }
  const createCategory = async (title) => {
    const { vendor_category: category } = await createVendorCategory(title);
    states.get("vendor_category").set({
      value: category?.id,
      label: category?.title,
    });
  }
  return <Card className=" grid grid-cols-2 gap-4 items-center" isRaw={true}>
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Détails de fournisseur</h1>
    <div className="flex flex-col gap-2 col-span-2">
      <label htmlFor="entreprise" className={CLASS_NAMES.label}>Entreprise</label>
      <input type="text" name="entreprise" id="entreprise" placeholder="Saisissez une entreprise pour ce fournisseur..." className={CLASS_NAMES.input} onChange={contact_states.get("honorific").onChange} value={contact_states.get("honorific").value} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="ref_id" className={CLASS_NAMES.label}>Réf.</label>
      <input type="text" name="ref_id" id="ref_id" placeholder="Ce champs ce remplis aprés la creation de fournisseur..." className={CLASS_NAMES.input} value={id} readOnly disabled />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="category" className={CLASS_NAMES.label}>Catégorie</label>
      <AsyncCreatableSelect onCreateOption={createCategory} defaultOptions={true} loadOptions={queryCategory} unstyled classNames={CLASS_NAMES.select} value={states.get("vendor_category").value} onChange={states.get("vendor_category").onChange} />
    </div>
  </Card>
}

const VendorInformationsCard = ({ contact: { phone = "", email = "", address = "" }, dispatch }) => {
  const states = createStatesNew({ phone, email, address }, {}, dispatch, { contactInformation: {} });
  return <Card className=" grid grid-cols-[auto_1fr] gap-4 items-center" isRaw={true}>
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Informations de contact</h1>
    <label htmlFor="phone" className={CLASS_NAMES.label + " col-start-1"}>Tél</label>
    <input type="text" name="phone" id="phone" placeholder="Saisissez une numéro de teléphone pour ce fournisseur..." className={CLASS_NAMES.input} onChange={states.get("phone").onChange} value={states.get("phone").value} />
    <label htmlFor="email" className={CLASS_NAMES.label}>Email</label>
    <input type="text" name="email" id="email" placeholder="Saisissez un email pour ce fournisseur..." className={CLASS_NAMES.input} onChange={states.get("email").onChange} value={states.get("email").value} />
    <label htmlFor="address" className={CLASS_NAMES.label}>Addresse</label>
    <input type="text" name="address" id="address" placeholder="Saisissez une addrese pour ce fournisseur..." className={CLASS_NAMES.input} onChange={states.get("address").onChange} value={states.get("address").value} />
  </Card>
}

const BankCard = ({ bank_information: { ice = "", name = "", number = "", rib = "" }, dispatch }) => {
  const states = createStatesNew({ name, number, rib, ice }, {}, dispatch, { bankInformation: {} });
  return <Card className="gap-4">
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Informations privées</h1>
    <div className="flex flex-col gap-2 pl-2">
      <label htmlFor="bank_name" className={CLASS_NAMES.label}>Nom de la banque</label>
      <input type="text" name="bank_name" id="bank_name" placeholder="Saisissez un nom de banque pour ce fournisseur..." className={CLASS_NAMES.input} onChange={states.get("name").onChange} value={states.get("name").value} />
    </div>
    <div className="flex flex-col gap-2 pl-2">
      <label htmlFor="bank_rib" className={CLASS_NAMES.label}>RIB</label>
      <input type="text" name="bank_rib" id="bank_rib" placeholder="Saisissez un rib banqueaire pour ce fournisseur..." className={CLASS_NAMES.input} onChange={states.get("rib").onChange} value={states.get("rib").value} />
    </div>
    <div className="flex flex-col gap-2 pl-2">
      <label htmlFor="bank_number" className={CLASS_NAMES.label}>Numéro de Compte</label>
      <input type="text" name="bank_number" id="bank_number" placeholder="Saisissez un numéro de compte titre pour ce fournisseur..." className={CLASS_NAMES.input} onChange={states.get("number").onChange} value={states.get("number").value} />
    </div>
    <div className="flex flex-col gap-2 pl-2">
      <label htmlFor="bank_ice" className={CLASS_NAMES.label}>I.C.E</label>
      <input type="text" name="bank_ice" id="bank_ice" placeholder="Saisissez une ice banqueaire pour ce fournisseur..." className={CLASS_NAMES.input} onChange={states.get("ice").onChange} value={states.get("ice").value} />
    </div>
  </Card>
}

const ActionCard = ({ onPublish, onCancel }) => {
  return <Card isRaw={true} className="flex justify-end items-center gap-4 mt-auto">
    <Button onClick={onCancel} type="soft" textContent="Annuler" />
    <Button onClick={onPublish} textContent="Publier" />
  </Card>
}

function baseReducer(state, action) {
  const new_state = structuredClone(state);
  if (!!action["delivery_frequency"]) action["delivery_frequency"] = { id: action["delivery_frequency"]?.value || action["delivery_frequency"]?.id, title: action["delivery_frequency"]?.label || action["delivery_frequency"]?.title };
  if (!!action["vendor_category"]) action["vendor_category"] = { id: action["vendor_category"]?.value || action["vendor_category"]?.id, title: action["vendor_category"]?.label || action["vendor_category"]?.title };
  for (const field in action) {
    new_state[field] = action[field];
    new_state["changes"][field] = action[field];
  }
  return new_state;
}


const starter_draft = {
  first_name: "",
  last_name: "",
  hours_start: null,
  hours_end: null,
  delivery_charge: 0,
  vendor_category: {
    id: null,
    title: null,
  },
  delivery_frequency: {
    id: null,
    title: null,
  },
  contactInformation: {
    email: "",
    phone: "",
    address: "",
    honorific: "",
    emergency: false,
  },
  bankInformation: {
    name: "",
    number: "",
    rib: "",
    swift: "",
    ice: "",
  }
};

const SelectedVendor = () => {
  const navigate = useNavigate();
  const loaded_draft = {
    ...useAsyncValue(),
    changes: {},
  };
  const [draft, dispatch] = useReducer(baseReducer, loaded_draft);
  const actions = {
    async onPublish() {
      const changes = structuredClone(draft["changes"]);
      if (!!changes["vendor_category"]) changes["vendor_category_id"] = changes.vendor_category?.id;
      if (!!changes["delivery_charge"]) changes["delivery_charge"] = parseInt(changes["delivery_charge"] ?? 0);
      if (!!changes["delivery_frequency"]) changes["delivery_frequency_id"] = changes.delivery_frequency?.id;
      delete changes["delivery_frequency"];
      delete changes["vendor_category"];

      const { updatedVendor } = await updateVendor(loaded_draft.id, changes);
      navigate(`/vendors/${updatedVendor.id}`);
    },
    onCancel() {
      navigate("/");
    }
  }
  return <TemplateEdit title={loaded_draft.contact?.honorific}>
    <VendorDetailsCard column="primary" {...draft} dispatch={dispatch} />
    <LastOrdersCard column="primary" {...draft} dispatch={dispatch} />
    <VendorSalesCard column="primary" {...draft} dispatch={dispatch} />
    <StatisticsCard column="primary" {...draft} dispatch={dispatch} />

    <VendorInformationsCard column="auxilary" {...draft} dispatch={dispatch} />
    <VendorAgentCard column="auxilary" {...draft} dispatch={dispatch} />
    <VendorDeliveryCard column="auxilary" {...draft} dispatch={dispatch} />
    <BankCard column="auxilary" {...draft} dispatch={dispatch} />
    <ActionCard column="auxilary" {...actions} dispatch={dispatch} />
  </TemplateEdit>
}

async function loadItem() {
  const { vendorID } = useParams();

  const id = parseInt(vendorID);
  if (isNaN(id)) throw new Error("IDs must be numbers.");

  const { vendor } = await getVendor(id);
  if (!vendor) throw new Error("Vendor#${id} does not exist.");

  return vendor;
}

const ComponentLoader = () => {
  return <Suspense fallback={<AppLoading />}>
    <Await resolve={loadItem()}>
      <SelectedVendor />
    </Await>
  </Suspense>
}

export default ComponentLoader;
