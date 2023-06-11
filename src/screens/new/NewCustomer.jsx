// import Card from "../../components/Card";
// import Table from "../../components/Table";
// import Button from "../../components/Button";
// import EditToolbox from "../../components/EditToolbox";

// import DatePicker from "react-datepicker";
// import AsyncSelect from "react-select/async";
// import { AiOutlineCloseCircle, AiOutlineFileAdd, AiOutlineCalendar, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// import { createStates, CLASS_NAMES } from "../../utils/common";
// import { useState, useReducer } from "react";
// import { createCustomer } from "../../config/httpRequests";
// import { useNavigate } from "react-router-dom";

// const GeneralCard = ({ first_name, last_name, dispatch }) => {
//   const states = createStates(["first_name", first_name], ["last_name", last_name]);
//   const [modeEdit, setModeEdit] = useState(false);
//   const toggleModeEdit = () => setModeEdit((prev) => !prev);

//   async function saveChanges() {
//     const action = {};

//     const keys = Array.from(states.keys()).filter((e) => e !== "__reset");
//     for (const key of keys) action[key] = states.get(key).exporter();

//     dispatch(action);
//     toggleModeEdit();
//   }
//   async function cancelChanges() { }
//   return <Card>
//     <div className="flex items-center justify-between">
//       <h1 className="font-bold text-strong-contrast">Generale</h1>
//       <EditToolbox modeEdit={modeEdit} save={saveChanges} cancel={cancelChanges} toggle={toggleModeEdit} />
//     </div>
//     <div className="flex items-center gap-2">
//       <div className="flex-1 flex flex-col w-full gap-2">
//         <label htmlFor="last_name" className="text-strong-contrast">Nom</label>
//         <input readOnly={!modeEdit} id="last_name" type="text" className={CLASS_NAMES.input} placeholder="Saisissez un prénom..." value={states.get("last_name").getter} onChange={states.get("last_name").setter} />
//       </div>
//       <div className="flex-1 flex flex-col w-full gap-2">
//         <label htmlFor="first_name" className="text-strong-contrast">Prénom</label>
//         <input readOnly={!modeEdit} id="first_name" type="text" className={CLASS_NAMES.input} placeholder="Saisissez un nom de famille..." value={states.get("first_name").getter} onChange={states.get("first_name").setter} />
//       </div>

//     </div>
//   </Card>
// };

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
//           <input readOnly={!modeEdit} id="honorific" type="honorific" value={states.get("honorific").getter} onChange={states.get("honorific").setter} className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//         <div className="flex gap-4 items-center">
//           <label className="flex-1" htmlFor="phone">Tél.</label>
//           <input readOnly={!modeEdit} id="phone" type="text" value={states.get("phone").getter} onChange={states.get("phone").setter} className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//         <div className="flex gap-4 items-center">
//           <label className="flex-1" htmlFor="email">Email</label>
//           <input readOnly={!modeEdit} id="email" type="email" value={states.get("email").getter} onChange={states.get("email").setter} className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//         <div className="flex gap-4 items-center">
//           <label className="flex-1" htmlFor="address">Addresse</label>
//           <input readOnly={!modeEdit} id="address" type="text" value={states.get("address").getter} onChange={states.get("address").setter} className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//       </div>
//     </Card>
//   )
// };

// const PaymentDetailsCard = ({ name, number, rib, swift, ice, dispatch }) => {
//   const states = createStates(
//     ["name", name],
//     ["number", number],
//     ["rib", rib],
//     ["swift", swift],
//     ["ice", ice]
//   );

//   const [modeEdit, setModeEdit] = useState(false);
//   const toggleModeEdit = () => setModeEdit((prev) => !prev);

//   const saveChanges = async () => {
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
//         <h1 className="font-bold text-strong-contrast">Détails du paiement</h1>
//         <EditToolbox save={saveChanges} cancel={cancelChanges} toggle={toggleModeEdit} modeEdit={modeEdit} />
//       </div>
//       <div className="flex flex-col gap-2">
//         <div className="flex flex-col">
//           <label className="font-inter font-medium text-highlight text-sm" htmlFor="bank">Banc</label>
//           <input id="bank" type="text" value={states.get("name").getter} onChange={states.get("name").setter} readOnly={!modeEdit} className="w-full p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//         <div className="flex flex-col">
//           <label className="font-inter font-medium text-highlight text-sm" htmlFor="account_number">Numero de Compte</label>
//           <input id="account_number" type="text" value={states.get("number").getter} onChange={states.get("number").setter} readOnly={!modeEdit} className="w-full p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//         <div className="flex flex-col">
//           <label className="font-inter font-medium text-highlight text-sm" htmlFor="rib">RIB</label>
//           <input id="rib" type="text" value={states.get("rib").getter} onChange={states.get("rib").setter} readOnly={!modeEdit} className="w-full p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//         <div className="flex flex-col">
//           <label className="font-inter font-medium text-highlight text-sm" htmlFor="swift">SWIFT</label>
//           <input id="swift" type="text" value={states.get("swift").getter} onChange={states.get("swift").setter} readOnly={!modeEdit} className="w-full p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//         <div className="flex flex-col">
//           <label className="font-inter font-medium text-highlight text-sm" htmlFor="ice">ICE</label>
//           <input id="ice" type="text" value={states.get("ice").getter} onChange={states.get("ice").setter} readOnly={!modeEdit} className="w-full p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
//         </div>
//       </div>
//     </Card>
//   )
// };


// const empty_customer = {
//   first_name: "",
//   last_name: "",
// };

// const empty_contact = {
//   email: "",
//   phone: "",
//   address: "",
//   honorific: "",
//   emergency: false,
// };

// const empty_bank_information = {
//   rib: "",
//   ice: "",
//   name: "",
//   swift: "",
//   number: "",
// };

// function reducer(state, action) {
//   const new_state = structuredClone(state);
//   for (const field in action) new_state[field] = action[field];
//   return new_state;
// }

// function cancelDraft() { }

// async function publishDraft(navigate, originalPayload) {
//   const payload = structuredClone(originalPayload);
//   const { customer } = await createCustomer(payload);
//   const customerID = customer?.id;
//   if (!customerID) throw new Error("Missing id field on customer from creation operation.");
//   navigate(`/customers/${customerID}`, { replace: true });
// }

// const NewCustomer = () => {
//   const [draft_customer, dispatchCustomer] = useReducer(reducer, empty_customer);
//   const [draft_contact, dispatchContact] = useReducer(reducer, empty_contact);
//   const [draft_bank_information, dispatchBankInformation] = useReducer(reducer, empty_bank_information);

//   const navigate = useNavigate();
//   return <div className="w-full h-full flex flex-col gap-4 p-4 bg-primary">
//     <div className="flex items-center gap-4">
//       <h1 className="text-lg font-bold text-weak-contrast font-asap">NOUVEAU CLIENT</h1>
//     </div>
//     <div className="w-full h-full flex gap-4">
//       <div className="w-2/3 h-full flex flex-col gap-4">
//         <GeneralCard {...draft_customer} dispatch={dispatchCustomer} />
//       </div>
//       <div className="w-1/3 h-full flex flex-col gap-4">
//         <ContactCard {...draft_contact} dispatch={dispatchContact} />
//         <PaymentDetailsCard {...draft_bank_information} dispatch={dispatchBankInformation} />
//         <div className="mt-auto flex items-center justify-end gap-4">
//           <Button onClick={cancelDraft} textContent="Annuler" Icon={<AiOutlineCloseCircle />} type="soft" className="text-red-900" />
//           <Button onClick={() => publishDraft(navigate, { contactInformation: draft_contact, bankInformation: draft_bank_information, ...draft_customer })} textContent="Publier" Icon={<AiOutlineFileAdd />} />
//         </div>
//       </div>
//     </div>
//   </div>
// };

// export default NewCustomer;

import Card from "../../components/Card";
import Button from "../../components/Button";
import TemplateEdit from "../../components/templates/TemplateEdit";

import { createCustomer, createEmployee, getFilteredRoles } from "../../config/httpRequests";
import { createStatesNew, CLASS_NAMES, APPOINTMENT_SHARED } from "../../utils/common";

import Select from "react-select";
import DatePicker from "react-datepicker";
import AsyncSelect from "react-select/async";

import { useReducer, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";

const DatePickerWrapper = forwardRef(({ value, onClick }, ref) => (
  <div onClick={onClick} ref={ref}>
    <input type="text" onClick={onClick} value={value} className={CLASS_NAMES.input + " w-full"} />
    <AiOutlineCalendar className="absolute top-1/2 -translate-y-1/2 right-2 text-xl text-highlight" />
  </div>
));

const GeneralCard = ({ role = null, dispatch }) => {
  const states = createStatesNew({ role: { value: role?.id, label: role?.title } }, { role: "select" }, dispatch);
  const roleQuery = async (searchTerm) => {
    const { roles } = await getFilteredRoles(searchTerm);
    const mapper = ({ id, title }) => ({ value: id, label: title });
    return roles?.map(mapper) ?? [];
  }
  return <Card className="grid grid-cols-5 gap-4" isRaw={true}>
    <div className="flex flex-col gap-2 col-span-3">
      <label htmlFor="ref_id" className={CLASS_NAMES.label}>Rôle</label>
      <AsyncSelect unstyled classNames={CLASS_NAMES.select} loadOptions={roleQuery} defaultOptions={true} value={states.get("role").value} onChange={states.get("role").onChange} />
    </div>
  </Card>
}

const StatisticsCard = () => {
  return <Card>
    <h1 className={CLASS_NAMES.label}>Statistiques</h1>
    <h2 className="text-center font-regular font-inter text-highlight">Veuillez créer le client avant d'essayer de mesurer ces statistiques.</h2>
  </Card>
}

const PurchaseHistoryCard = () => {
  return <Card>
    <h1 className={CLASS_NAMES.label}>Historique des achats</h1>
    <h2 className="text-center font-regular font-inter text-highlight">Veuillez créer le client avant d'essayer de modifier l'historique.</h2>
  </Card>
}

const CustomerDetailsCard = ({ first_name = "", last_name = "", contactInformation: { honorific = "" }, dispatch }) => {
  const contact_states = createStatesNew({ honorific }, {}, dispatch, { contactInformation: {} });
  const states = createStatesNew({ first_name, last_name }, {}, dispatch);

  return <Card className=" grid grid-cols-2 gap-4 items-center" isRaw={true}>
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Détails de client</h1>
    <div className="flex flex-col gap-2">
      <label htmlFor="ref_id" className={CLASS_NAMES.label}>Réf.</label>
      <input type="text" name="ref_id" id="ref_id" placeholder="Ce champs ce remplis aprés la creation de client..." className={CLASS_NAMES.input} disabled />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="honorific" className={CLASS_NAMES.label}>Honorifique</label>
      <input type="text" name="honorific" id="honorific" placeholder="Saisissez une honorifique pour ce client..." className={CLASS_NAMES.input} onChange={contact_states.get("honorific").onChange} value={contact_states.get("honorific").value} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="first_name" className={CLASS_NAMES.label}>Prénom</label>
      <input type="text" name="first_name" id="first_name" placeholder="Saisissez un prénom pour ce client..." className={CLASS_NAMES.input} onChange={states.get("first_name").onChange} value={states.get("first_name").value} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="last_name" className={CLASS_NAMES.label}>Nom</label>
      <input type="text" name="last_name" id="last_name" placeholder="Saisissez un nom de famille pour ce client..." className={CLASS_NAMES.input} onChange={states.get("last_name").onChange} value={states.get("last_name").value} />
    </div>
  </Card>
}

const CustomerInformationsCard = ({ contactInformation: { phone = "", email = "", address = "" }, dispatch }) => {
  const states = createStatesNew({ phone, email, address }, {}, dispatch, { contactInformation: {} });
  return <Card className=" grid grid-cols-[auto_1fr] gap-4 items-center" isRaw={true}>
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Informations de contact</h1>
    <label htmlFor="phone" className={CLASS_NAMES.label + " col-start-1"}>Tél</label>
    <input type="text" name="phone" id="phone" placeholder="Saisissez une numéro de teléphone pour ce client..." className={CLASS_NAMES.input} onChange={states.get("phone").onChange} value={states.get("phone").value} />
    <label htmlFor="email" className={CLASS_NAMES.label}>Email</label>
    <input type="text" name="email" id="email" placeholder="Saisissez un email pour ce client..." className={CLASS_NAMES.input} onChange={states.get("email").onChange} value={states.get("email").value} />
    <label htmlFor="address" className={CLASS_NAMES.label}>Addresse</label>
    <input type="text" name="address" id="address" placeholder="Saisissez une addrese pour ce client..." className={CLASS_NAMES.input} onChange={states.get("address").onChange} value={states.get("address").value} />
  </Card>
}

const BankCard = ({ bankInformation: { ice = "", name = "", number = "", rib = "" }, dispatch }) => {
  const states = createStatesNew({ name, number, rib, ice }, {}, dispatch, { bankInformation: {} });
  return <Card className="gap-4">
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Informations privées</h1>
    <div className="flex flex-col gap-2 pl-2">
      <label htmlFor="bank_name" className={CLASS_NAMES.label}>Nom de la banque</label>
      <input type="text" name="bank_name" id="bank_name" placeholder="Saisissez un nom de banque pour ce client..." className={CLASS_NAMES.input} onChange={states.get("name").onChange} value={states.get("name").value} />
    </div>
    <div className="flex flex-col gap-2 pl-2">
      <label htmlFor="bank_rib" className={CLASS_NAMES.label}>RIB</label>
      <input type="text" name="bank_rib" id="bank_rib" placeholder="Saisissez un rib banqueaire pour ce client..." className={CLASS_NAMES.input} onChange={states.get("rib").onChange} value={states.get("rib").value} />
    </div>
    <div className="flex flex-col gap-2 pl-2">
      <label htmlFor="bank_number" className={CLASS_NAMES.label}>Numéro de Compte</label>
      <input type="text" name="bank_number" id="bank_number" placeholder="Saisissez un numéro de compte titre pour ce client..." className={CLASS_NAMES.input} onChange={states.get("number").onChange} value={states.get("number").value} />
    </div>
    <div className="flex flex-col gap-2 pl-2">
      <label htmlFor="bank_ice" className={CLASS_NAMES.label}>I.C.E</label>
      <input type="text" name="bank_ice" id="bank_ice" placeholder="Saisissez une ice banqueaire pour ce client..." className={CLASS_NAMES.input} onChange={states.get("ice").onChange} value={states.get("ice").value} />
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
  if (!!action["role"]) action["role"] = { id: action["role"]?.value || action["role"]?.id, title: action["role"]?.label || action["role"]?.title };
  if (!!action["payment_method"]) action["payment_method"] = action["payment_method"]?.value ?? action["payment_method"];
  for (const field in action) {
    switch (typeof (action[field])) {
      case "object": {
        new_state[field] = { ...new_state[field], ...action[field] };
      } break;
      default:
        new_state[field] = action[field];
    }
  }
  return new_state;
}

const starter_draft = {
  first_name: "",
  last_name: "",
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

const NewCustomer = () => {
  const navigate = useNavigate();
  const [draft, dispatch] = useReducer(baseReducer, starter_draft);
  const actions = {
    async onPublish() {
      const snapshot = structuredClone(draft);
      const { customer } = await createCustomer(snapshot);
      navigate(`/customers/${customer.id}`);
    },
    onCancel() {
      navigate("/");
    }
  }
  return <TemplateEdit title="NOUVEL EMPLOYÉ">
    <CustomerDetailsCard column="primary" {...draft} dispatch={dispatch} />
    <StatisticsCard column="primary" {...draft} dispatch={dispatch} />
    <PurchaseHistoryCard column="primary" {...draft} dispatch={dispatch} />

    <CustomerInformationsCard column="auxilary" {...draft} dispatch={dispatch} />
    <BankCard column="auxilary" {...draft} dispatch={dispatch} />
    <ActionCard column="auxilary" {...actions} dispatch={dispatch} />
  </TemplateEdit>
}

export default NewCustomer;