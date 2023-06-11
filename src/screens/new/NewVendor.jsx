import Card from "../../components/Card";
import Button from "../../components/Button";
import TemplateEdit from "../../components/templates/TemplateEdit";

import { createCustomer, createEmployee, createVendor, deliveryFrequencies, getFilteredVendorCategory, createVendorCategory, getFilteredRoles } from "../../config/httpRequests";
import { createStatesNew, CLASS_NAMES, APPOINTMENT_SHARED } from "../../utils/common";

import Select from "react-select";
import DatePicker from "react-datepicker";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from 'react-select/async-creatable';

import { useReducer, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";

const StatisticsCard = () => {
  return <Card>
    <h1 className={CLASS_NAMES.label}>Statistiques</h1>
    <h2 className="text-center font-regular font-inter text-highlight">Veuillez créer le fournisseur avant d'essayer de mesurer ces statistiques.</h2>
  </Card>
}

const LastOrdersCard = () => {
  return <Card>
    <h1 className={CLASS_NAMES.label}>Dernières factures</h1>
    <h2 className="text-center font-regular font-inter text-highlight">Veuillez créer le fournisseur avant d'essayer de modifier l'historique.</h2>
  </Card>
}

const VendorSalesCard = () => {
  return <Card>
    <h1 className={CLASS_NAMES.label}>Offres</h1>
    <h2 className="text-center font-regular font-inter text-highlight">Veuillez créer le fournisseur avant d'essayer de voir les offres.</h2>
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
    hours_start,
    hours_end,
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

const VendorDetailsCard = ({ vendor_category, contactInformation: { honorific = "" }, dispatch }) => {
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
      <input type="text" name="ref_id" id="ref_id" placeholder="Ce champs ce remplis aprés la creation de fournisseur..." className={CLASS_NAMES.input} disabled />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="category" className={CLASS_NAMES.label}>Catégorie</label>
      <AsyncCreatableSelect onCreateOption={createCategory} defaultOptions={true} loadOptions={queryCategory} unstyled classNames={CLASS_NAMES.select} value={states.get("vendor_category").value} onChange={states.get("vendor_category").onChange} />
    </div>
  </Card>
}

const VendorInformationsCard = ({ contactInformation: { phone = "", email = "", address = "" }, dispatch }) => {
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

const BankCard = ({ bankInformation: { ice = "", name = "", number = "", rib = "" }, dispatch }) => {
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
  // if (!!action["payment_method"]) action["payment_method"] = action["payment_method"]?.value ?? action["payment_method"];
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

const NewVendor = () => {
  const navigate = useNavigate();
  const [draft, dispatch] = useReducer(baseReducer, starter_draft);
  const actions = {
    async onPublish() {
      const snapshot = structuredClone(draft);
      snapshot["delivery_charge"] = parseInt(snapshot["delivery_charge"] ?? 0);
      snapshot["delivery_frequency_id"] = snapshot.delivery_frequency?.id;
      snapshot["vendor_category_id"] = snapshot.vendor_category?.id;
      delete snapshot["delivery_frequency"];
      delete snapshot["vendor_category"];
      const { vendor } = await createVendor(snapshot);
      navigate(`/vendors/${vendor.id}`);

    },
    onCancel() {
      navigate("/");
    }
  }
  return <TemplateEdit title="NOUVEL FOURNISSEUR">
    <VendorDetailsCard column="primary" {...draft} dispatch={dispatch} />
    <StatisticsCard column="primary" {...draft} dispatch={dispatch} />
    <LastOrdersCard column="primary" {...draft} dispatch={dispatch} />
    <VendorSalesCard column="primary" {...draft} dispatch={dispatch} />

    <VendorInformationsCard column="auxilary" {...draft} dispatch={dispatch} />
    <VendorAgentCard column="auxilary" {...draft} dispatch={dispatch} />
    <VendorDeliveryCard column="auxilary" {...draft} dispatch={dispatch} />
    <BankCard column="auxilary" {...draft} dispatch={dispatch} />
    <ActionCard column="auxilary" {...actions} dispatch={dispatch} />
  </TemplateEdit>
}

export default NewVendor;