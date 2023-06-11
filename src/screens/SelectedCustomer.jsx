import Card from "../components/Card";
import Button from "../components/Button";
import AppLoading from "./AppLoading";
import TemplateEdit from "../components/templates/TemplateEdit";

import { createStatesNew, CLASS_NAMES, APPOINTMENT_SHARED } from "../utils/common";
import { getFilteredRoles, getCustomer } from "../config/httpRequests";

import Select from "react-select";
import DatePicker from "react-datepicker";
import AsyncCreatableSelect from 'react-select/async-creatable';

import { AiOutlineCalendar } from "react-icons/ai";
import { Suspense, useReducer, forwardRef } from "react";
import { Await, useNavigate, useParams, useAsyncValue } from "react-router-dom";

async function loadItem() {
  const { customerID } = useParams();

  const id = parseInt(customerID);
  if (isNaN(id)) throw new Error("IDs must be numbers.");

  const { customer } = await getCustomer(id);
  if (!customer) throw new Error(`Customer#${id} does not exist.`);

  return customer;
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

const CustomerDetailsCard = ({ id, first_name = "", last_name = "", contact: { honorific = "" }, dispatch }) => {
  const contact_states = createStatesNew({ honorific }, {}, dispatch, { contact: {} });
  const states = createStatesNew({ first_name, last_name }, {}, dispatch);

  return <Card className=" grid grid-cols-2 gap-4 items-center" isRaw={true}>
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Détails de client</h1>
    <div className="flex flex-col gap-2">
      <label htmlFor="ref_id" className={CLASS_NAMES.label}>Réf.</label>
      <input type="text" name="ref_id" id="ref_id" placeholder="Ce champs ce remplis aprés la creation de client..." className={CLASS_NAMES.input} value={id} readOnly disabled />
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

const CustomerInformationsCard = ({ contact: { phone = "", email = "", address = "" }, dispatch }) => {
  const states = createStatesNew({ phone, email, address }, {}, dispatch, { contact: {} });
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

const BankCard = ({ bank_information: { ice = "", name = "", number = "", rib = "" }, dispatch }) => {
  const states = createStatesNew({ name, number, rib, ice }, {}, dispatch, { bank_information: {} });
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
    new_state[field] = action[field];
    new_state["changes"][field] = action[field];
  }
  return new_state;
}

const SelectedCustomer = () => {
  const loaded_draft = {
    ...useAsyncValue(),
    changes: {},
  };
  const navigate = useNavigate();
  const [draft, dispatch] = useReducer(baseReducer, loaded_draft);
  const actions = {
    async onPublish() {
      const snapshot = structuredClone(draft);
      console.log(snapshot["changes"]);
    },
    onCancel() {
      navigate("/");
    }
  }
  return <TemplateEdit title={[loaded_draft?.first_name, loaded_draft?.last_name].join(" ")}>
    <CustomerDetailsCard column="primary" {...draft} dispatch={dispatch} />
    <StatisticsCard column="primary" {...draft} dispatch={dispatch} />
    <PurchaseHistoryCard column="primary" {...draft} dispatch={dispatch} />

    <CustomerInformationsCard column="auxilary" {...draft} dispatch={dispatch} />
    <BankCard column="auxilary" {...draft} dispatch={dispatch} />
    <ActionCard column="auxilary" {...actions} dispatch={dispatch} />
  </TemplateEdit>
}

const ComponentLoader = () => {
  const { employeeID } = useParams();
  const query_promise = loadItem(employeeID);
  return (
    <Suspense fallback={<AppLoading />}>
      <Await resolve={query_promise}>
        <SelectedCustomer />
      </Await>
    </Suspense>
  );
};

export default ComponentLoader;