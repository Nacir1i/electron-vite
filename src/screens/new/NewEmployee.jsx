import Card from "../../components/Card";
import Button from "../../components/Button";
import TemplateEdit from "../../components/templates/TemplateEdit";

import { createEmployee, createRole, getFilteredRoles } from "../../config/httpRequests";
import { createStatesNew, CLASS_NAMES, APPOINTMENT_SHARED } from "../../utils/common";

import Select from "react-select";
import DatePicker from "react-datepicker";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from 'react-select/async-creatable';

import { useReducer, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";

const DatePickerWrapper = forwardRef(({ value, onClick }, ref) => (
  <div onClick={onClick} ref={ref}>
    <input type="text" onClick={onClick} value={value} className={CLASS_NAMES.input + " w-full"} />
    <AiOutlineCalendar className="absolute top-1/2 -translate-y-1/2 right-2 text-xl text-highlight" />
  </div>
));

const GeneralCard = ({ username = "", password = "", role = null, status_id, dispatch }) => {
  const status = APPOINTMENT_SHARED.getEmployeeStatus(status_id);
  const status_options = APPOINTMENT_SHARED.employee_status;
  const states = createStatesNew({ username, password, status, role: { value: role?.id, label: role?.title } }, { status: "select", role: "select" }, dispatch);
  const roleQuery = async (searchTerm) => {
    const { roles } = await getFilteredRoles(searchTerm);
    const mapper = ({ id, title }) => ({ value: id, label: title });
    return roles?.map(mapper) ?? [];
  }
  const roleCreate = async (title) => {
    const { role } = await createRole(title);
    states.get("role").set({
      value: role?.id,
      label: role?.title,
    });
  }
  return <Card className="grid grid-cols-3 gap-4" isRaw={true}>
    <div className="flex flex-col gap-2 col-span-2">
      <label htmlFor="username" className={CLASS_NAMES.label}>Nom d'utilisateur</label>
      <input type="text" name="username" id="username" placeholder="Ce champs ce remplit aprés la creation..." className={CLASS_NAMES.input} onChange={states.get("username").onChange} value={states.get("username").value} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="password" className={CLASS_NAMES.label}>Mot de passe</label>
      <input type="password" name="password" id="password" placeholder="Ce champs ce remplit aprés la creation..." className={CLASS_NAMES.input} onChange={states.get("password").onChange} value={states.get("password").value} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="ref_id" className={CLASS_NAMES.label}>Employé Nº</label>
      <input type="text" name="ref_id" id="ref_id" placeholder="Ce champs ce remplit aprés la creation..." className={CLASS_NAMES.input} disabled />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="ref_id" className={CLASS_NAMES.label}>Rôle</label>
      <AsyncCreatableSelect unstyled classNames={CLASS_NAMES.select} onCreateOption={roleCreate} loadOptions={roleQuery} defaultOptions={true} value={states.get("role").value} onChange={states.get("role").onChange} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="ref_id" className={CLASS_NAMES.label}>Statut</label>
      <Select unstyled classNames={CLASS_NAMES.select} options={status_options} value={states.get("status").value} onChange={states.get("status").onChange} />
    </div>
  </Card>
}

const InformationsCard = ({ joined_at, birth_at, payment_method, salary, dispatch }) => {
  const _payment_method = APPOINTMENT_SHARED.getPaymentMethod(payment_method);
  const states = createStatesNew({
    joined_at: new Date(joined_at || Date.now()),
    birth_at: new Date(birth_at || Date.now()),
    payment_method: _payment_method,
    salary,
  }, { joined_at: "datepicker", birth_at: "datepicker", payment_method: "select" }, dispatch);
  return <Card className="grid grid-cols-2 gap-4" isRaw={true}>
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Informations privées</h1>
    <div className="flex flex-col gap-2">
      <label htmlFor="joined_at" className={CLASS_NAMES.label}>Date d'embauche</label>
      <DatePicker placeholderText="Ce champs..." id="joined_at" peekNextMonth showMonthDropdown showYearDropdown selected={states.get("joined_at").value} onChange={states.get("joined_at").onChange} customInput={<DatePickerWrapper />} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="birth_at" className={CLASS_NAMES.label}>Date de naissance</label>
      <DatePicker placeholderText="Ce champs..." id="birth_at" peekNextMonth showMonthDropdown showYearDropdown selected={states.get("birth_at").value} onChange={states.get("birth_at").onChange} customInput={<DatePickerWrapper />} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="salary" className={CLASS_NAMES.label}>Salaire total</label>
      <input type="number" name="salary" id="salary" selected={states.get("salary").value} onChange={states.get("salary").onChange} placeholder="Ce champs ce remplit aprés la creation..." className={CLASS_NAMES.input} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="ref_id" className={CLASS_NAMES.label}>Mode de paiement</label>
      <Select unstyled classNames={CLASS_NAMES.select} value={states.get("payment_method").value} onChange={states.get("payment_method").onChange} options={APPOINTMENT_SHARED.payment_methods} />
    </div>
  </Card>
}

const PaymentsHistoryCard = () => {
  return <Card>
    <h1 className={CLASS_NAMES.label}>Historique des paiements</h1>
    <h2 className="text-center font-regular font-inter text-highlight">Veuillez créer l'employé avant d'essayer de modifier l'historique.</h2>
  </Card>
}

const CustomerDetailsCard = ({ first_name = "", last_name = "", contact: { honorific = "" }, dispatch }) => {
  const contact_states = createStatesNew({ honorific }, {}, dispatch, { contact: {} });
  const states = createStatesNew({ first_name, last_name }, {}, dispatch);

  return <Card className=" grid grid-cols-[auto_1fr] gap-4 items-center" isRaw={true}>
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Détails de l'employé</h1>
    <label htmlFor="honorific" className={CLASS_NAMES.label + " col-start-1"}>Honorifique</label>
    <input type="text" name="honorific" id="honorific" placeholder="Saisissez une honorifique pour cet employé..." className={CLASS_NAMES.input} onChange={contact_states.get("honorific").onChange} value={contact_states.get("honorific").value} />
    <label htmlFor="first_name" className={CLASS_NAMES.label}>Prénom</label>
    <input type="text" name="first_name" id="first_name" placeholder="Saisissez un prénom pour cet employé..." className={CLASS_NAMES.input} onChange={states.get("first_name").onChange} value={states.get("first_name").value} />
    <label htmlFor="last_name" className={CLASS_NAMES.label}>Nom</label>
    <input type="text" name="last_name" id="last_name" placeholder="Saisissez un nom de famille pour cet employé..." className={CLASS_NAMES.input} onChange={states.get("last_name").onChange} value={states.get("last_name").value} />
  </Card>
}

const CustomerInformationsCard = ({ contact: { phone = "", email = "", address = "" }, dispatch }) => {
  const states = createStatesNew({ phone, email, address }, {}, dispatch, { contact: {} });
  return <Card className=" grid grid-cols-[auto_1fr] gap-4 items-center" isRaw={true}>
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Informations de contact</h1>
    <label htmlFor="phone" className={CLASS_NAMES.label + " col-start-1"}>Tél</label>
    <input type="text" name="phone" id="phone" placeholder="Saisissez une numéro de teléphone pour cet employé..." className={CLASS_NAMES.input} onChange={states.get("phone").onChange} value={states.get("phone").value} />
    <label htmlFor="email" className={CLASS_NAMES.label}>Email</label>
    <input type="text" name="email" id="email" placeholder="Saisissez une numéro de teléphone pour cet employé..." className={CLASS_NAMES.input} onChange={states.get("email").onChange} value={states.get("email").value} />
    <label htmlFor="address" className={CLASS_NAMES.label}>Addresse</label>
    <input type="text" name="address" id="address" placeholder="Saisissez une numéro de teléphone pour cet employé..." className={CLASS_NAMES.input} onChange={states.get("address").onChange} value={states.get("address").value} />
  </Card>
}

const BankCard = ({ bank_information: { name = "", number = "", rib = "" }, dispatch }) => {
  const states = createStatesNew({ name, number, rib }, {}, dispatch, { bank_information: {} });
  return <Card className="gap-4">
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Informations privées</h1>
    <div className="flex flex-col gap-2 pl-2">
      <label htmlFor="bank_name" className={CLASS_NAMES.label}>Nom de la banque</label>
      <input type="text" name="bank_name" id="bank_name" placeholder="Saisissez une titre pour ce bon..." className={CLASS_NAMES.input} onChange={states.get("name").onChange} value={states.get("name").value} />
    </div>
    <div className="flex flex-col gap-2 pl-2">
      <label htmlFor="bank_rib" className={CLASS_NAMES.label}>RIB</label>
      <input type="text" name="bank_rib" id="bank_rib" placeholder="Saisissez une titre pour ce bon..." className={CLASS_NAMES.input} onChange={states.get("rib").onChange} value={states.get("rib").value} />
    </div>
    <div className="flex flex-col gap-2 pl-2">
      <label htmlFor="bank_number" className={CLASS_NAMES.label}>Numéro de Compte</label>
      <input type="text" name="bank_number" id="bank_number" placeholder="Saisissez une titre pour ce bon..." className={CLASS_NAMES.input} onChange={states.get("number").onChange} value={states.get("number").value} />
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
  if (!!action["status"]) action["status"] = { id: action["status"]?.value || action["status"]?.id, title: action["status"]?.label || action["status"]?.title };
  if (!!action["payment_method"]) action["payment_method"] = action["payment_method"]?.value ?? action["payment_method"];
  delete action["status"];
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
  username: "",
  password: "",
  last_name: "",
  first_name: "",
  image_url: "",
  birth_at: "",
  joined_at: "",
  salary: 3000,
  contact: {
    email: "",
    phone: "",
    address: "",
    honorific: "",
    emergency: false,
  },
  role: {
    id: null,
    title: null,
  },
  bank_information: {
    name: "",
    number: "",
    rib: "",
    swift: "",
    ice: "",
  }
};

const NewEmployee = () => {
  const navigate = useNavigate();
  const [draft, dispatch] = useReducer(baseReducer, starter_draft);
  const actions = {
    async onPublish() {
      const snapshot = structuredClone(draft);
      snapshot["contactInformation"] = {...snapshot["contact"]};
      snapshot["bankInformation"] = {...snapshot["bank_information"]};
      snapshot["role_id"] = snapshot["role"].id;
      snapshot["status_id"] = snapshot["status"]?.value ?? 1;
      snapshot["salary"] = parseInt(snapshot["salary"]);
      delete snapshot["role"];
      delete snapshot["status"];
      delete snapshot["contact"];
      delete snapshot["bank_information"];
      delete snapshot["payment_method"];
      const { user } = await createEmployee(snapshot);
      navigate(`/employees/${user.id}`);
    },
    onCancel() {
      navigate("/");
    }
  }
  return <TemplateEdit title="NOUVEL EMPLOYÉ">
    <GeneralCard column="primary" {...draft} dispatch={dispatch} />
    <InformationsCard column="primary" {...draft} dispatch={dispatch} />
    <PaymentsHistoryCard column="primary" {...draft} dispatch={dispatch} />

    <CustomerDetailsCard column="auxilary" {...draft} dispatch={dispatch} />
    <CustomerInformationsCard column="auxilary" {...draft} dispatch={dispatch} />
    <BankCard column="auxilary" {...draft} dispatch={dispatch} />
    <ActionCard column="auxilary" {...actions} dispatch={dispatch} />
  </TemplateEdit>
}

export default NewEmployee;