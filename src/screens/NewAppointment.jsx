import { useNavigate } from "react-router-dom";
import { useState, useReducer, forwardRef } from "react";

import { APPOINTMENT_SHARED, DATETIME_FORMAT } from "../utils/common";
import { createAppointment, fetchSearchedCustomers } from "../config/httpRequests";

import Card from "../components/Card";
import Button from "../components/Button";
import DatePicker from "react-datepicker";
import AsyncSelect from "react-select/async";
import CreatableSelect from "react-select/creatable";
import { AiFillEdit, AiFillSave, AiFillCloseCircle, AiOutlineCalendar } from "react-icons/ai";

const ClientCard = ({ id, firstName, lastName, phone, address, type, saveRemote, loading }) => {
  if (loading) return <Card>
    <div className="flex items-center justify-between">
      <h1 className="font-bold text-strong-contrast">Details de client</h1>
    </div>
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <label className="flex-1" htmlFor="first_name">Prénom</label>
        <div className="flex-[3_3_0%] rounded-xl w-full h-8 inline-block bg-weakest-contrast"></div>
      </div>
      <div className="flex gap-4 items-center">
        <label className="flex-1" htmlFor="last_name">Nom</label>
        <div className="flex-[3_3_0%] rounded-xl w-full h-8 inline-block bg-weakest-contrast"></div>
      </div>
      <div className="flex gap-4 items-center">
        <label className="flex-1" htmlFor="phone">Tél.</label>
        <div className="flex-[3_3_0%] rounded-xl w-full h-8 inline-block bg-weakest-contrast"></div>
      </div>
      <div className="flex gap-4 items-center">
        <label className="flex-1" htmlFor="address">Addresse</label>
        <div className="flex-[3_3_0%] rounded-xl w-full h-8 inline-block bg-weakest-contrast"></div>
      </div>
      <div className="flex gap-4 items-center">
        <label className="flex-1" htmlFor="type">Entreprise</label>
        <div className="flex-[3_3_0%] rounded-xl w-full h-8 inline-block bg-weakest-contrast"></div>
      </div>
    </div>
  </Card>

  const initialCustomerID = { value: id, label: [firstName, lastName].join(" ") };
  const [_firstName, setFirstName] = useState(firstName);
  const [_lastName, setLastName] = useState(lastName);
  const [_phone, setPhone] = useState(phone);
  const [_address, setAddress] = useState(address);
  const [_customerID, setCustomerID] = useState(initialCustomerID);

  const onChanges = new Map();
  onChanges.set("firstName", (event) => setFirstName(() => event.target.value));
  onChanges.set("lastName", (event) => setLastName(() => event.target.value));
  onChanges.set("phone", (event) => setPhone(() => event.target.value));
  onChanges.set("address", (event) => setAddress(() => event.target.value));
  onChanges.set("id", (newValue, actionMeta) => {
    setFirstName(() => newValue.data.firstName);
    setLastName(() => newValue.data.lastName);
    setPhone(() => newValue.data.phone);
    setAddress(() => newValue.data.address);
    setCustomerID(newValue);
  });

  const [modeEdit, setModeEdit] = useState(false);
  const toggleModeEdit = () => setModeEdit((prev) => !prev);
  const cancelChanges = () => {
    setModeEdit(() => false);
    setFirstName(() => firstName);
    setLastName(() => lastName);
    setPhone(() => phone);
    setAddress(() => address);
    setCustomerID(() => initialCustomerID);
  };
  const saveChanges = () => {
    setModeEdit(() => false);
    saveRemote({
      firstName: _firstName,
      lastName: _lastName,
      phone: _phone,
      address: _address,
      customerID: (customerID !== _customerID.value) ? _customerID.value : undefined,
    });
  };

  const customerOptions = async (searchTerm) => {
    const customers = await fetchSearchedCustomers(searchTerm);
    return customers.map((customer) => {
      return { value: customer.id, label: [customer.firstName, customer.lastName].join(" "), data: { ...customer } };
    });
  };

  return (
    <Card clasName="gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-strong-contrast">Details de client</h1>
        <div className="flex gap-2 items-center">
          {
            modeEdit &&
            <button onClick={cancelChanges} className="bg-secondary text-red-700/75 rounded-full text-xl hover:text-red-700 transition-colors duration-150"><AiFillCloseCircle /></button>
          }
          <button onClick={modeEdit ? saveChanges : toggleModeEdit} className="bg-secondary text-highlight/75 rounded-full text-xl hover:text-highlight transition-colors duration-150">
            {modeEdit ? <AiFillSave /> : <AiFillEdit />}
          </button>
        </div>
      </div>
      <AsyncSelect defaultOptions={true} value={_customerID} isDisabled={!modeEdit} loadOptions={customerOptions} onChange={onChanges.get("id")} />
      {
        _customerID &&
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <label className="w-1/4" htmlFor="first_name">Prénom</label>
            <input id="first_name" type="text" value={_firstName} onChange={onChanges.get("firstName")} readOnly={!modeEdit} className="w-3/4 p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
          </div>
          <div className="flex gap-4 items-center">
            <label className="w-1/4" htmlFor="last_name">Nom</label>
            <input id="last_name" type="text" value={_lastName} onChange={onChanges.get("lastName")} readOnly={!modeEdit} className="w-3/4 p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
          </div>
          <div className="flex gap-4 items-center">
            <label className="w-1/4" htmlFor="phone">Tél.</label>
            <input id="phone" type="text" value={_phone} onChange={onChanges.get("phone")} readOnly={!modeEdit} className="w-3/4 p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
          </div>
          <div className="flex gap-4 items-center">
            <label className="w-1/4" htmlFor="address">Addresse</label>
            <input id="address" type="text" value={_address} onChange={onChanges.get("address")} readOnly={!modeEdit} className="w-3/4 p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
          </div>
          <div className="flex gap-4 items-center">
            <label className="w-1/4" htmlFor="company">Entreprise</label>
            <input id="company" type="text" value={type} readOnly={!modeEdit} className="w-3/4 p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
          </div>
        </div>
      }
    </Card>
  )
}

const GeneralCard = ({ id, type, status, title, createdAt, saveRemote, loading }) => {
  if (loading) return <Card>
    <div className="flex flex-col w-full gap-2">
      <h1>RÈF.</h1>
      <div className="w-full h-8 bg-weakest-contrast"></div>
    </div>
    <div className="flex gap-4 w-full pt-2">
      <div className="flex flex-col gap-2 flex-1">
        <label className="text-strong-contrast text-sm">STATUT</label>
        <div className="w-full h-8 bg-weakest-contrast"></div>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <label className="text-strong-contrast text-sm">TYPE D'ÉVÉNEMENT</label>
        <div className="w-full h-8 bg-weakest-contrast"></div>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <label className="text-strong-contrast text-sm">DATE DE CREATION</label>
        <div className="w-full h-8 bg-weakest-contrast"></div>
      </div>
    </div>
  </Card>
  const [_createdAt, setCreatedAt] = useState(new Date(createdAt));
  const EVENT_LIST = APPOINTMENT_SHARED["event"];
  const STATUS_LIST = APPOINTMENT_SHARED["status"];
  const initialType = EVENT_LIST.filter((combo) => combo.value === type).at(0) ?? APPOINTMENT_SHARED["unknown"];
  const initialStatus = STATUS_LIST.filter((combo) => combo.value === status).at(0) ?? APPOINTMENT_SHARED["unknown"];

  const [modeEdit, setModeEdit] = useState(false);
  const toggleModeEdit = () => setModeEdit((prev) => !prev);

  const [_type, setType] = useState(initialType);
  const [_title, setTitle] = useState(title);
  const [_status, setStatus] = useState(initialStatus);

  const cancelChanges = () => {
    toggleModeEdit();
    setCreatedAt(() => new Date(createdAt));
    setTitle(() => title);
    setType(() => initialType);
    setStatus(() => initialStatus);
  };
  const saveChanges = () => {
    toggleModeEdit();
    saveRemote({
      title: _title ?? "Unnamed",
      createdAt: _createdAt.toISOString(), // PERF: This ISOString is the only match I've found for Prisma's DateTime with SQLite. | XENOBAS
      type: _type.value ?? NaN,
      status: _status.value ?? NaN,
    });
  };

  const onChanges = new Map();
  onChanges.set("type", (newValue, _actionMeta) => setType(newValue));
  onChanges.set("title", (event) => setTitle(() => event.target.value));
  onChanges.set("status", (newValue, _actionMeta) => setStatus(newValue));
  onChanges.set("createdAt", (date) => setCreatedAt(() => date));

  const CustomDatePickerInput = forwardRef(({ value, onClick }, ref) => (
    <div onClick={onClick} ref={ref} className="w-full h-fit relative">
      <button className="w-full h-full bg-weakest-contrast text-strong-contrast rounded-xl m-auto p-2 text-left">{value}</button>
      <AiOutlineCalendar className="absolute top-1/2 -translate-y-1/2 right-2 text-xl text-highlight" />
    </div>
  ));

  return (
    <Card>
      <div className="flex flex-col w-full gap-2">
        <div className="w-full flex justify-between">
          <h1 className="font-bold text-strong-contrast">Titre</h1>
          <div className="flex gap-2 items-center">
            {
              modeEdit &&
              <button onClick={cancelChanges} className="bg-secondary text-red-700/75 rounded-full text-xl hover:text-red-700 transition-colors duration-150"><AiFillCloseCircle /></button>
            }
            <button onClick={modeEdit ? saveChanges : toggleModeEdit} className="bg-secondary text-highlight/75 rounded-full text-xl hover:text-highlight transition-colors duration-150">
              {modeEdit ? <AiFillSave /> : <AiFillEdit />}
            </button>
          </div>
        </div>
        <input id="title" type="text" value={_title} onChange={onChanges.get("title")} readOnly={!modeEdit} className="p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
      </div>
      <div className="flex gap-4 w-full pt-2">
        <div className="flex flex-col gap-2 flex-1">
          <label className="text-strong-contrast text-sm">STATUT</label>
          <CreatableSelect
            value={_status}
            options={STATUS_LIST}
            className="text-sm text-strong-contrast font-open-sans"
            isDisabled={!modeEdit}
            classNames={{
              indicatorsContainer: () => "hidden invisible cursor-text",
              placeholder: () => "cursor-text",
              input: () => "cursor-text",
            }}
            onChange={onChanges.get("status")}
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label className="text-strong-contrast text-sm">TYPE D'ÉVÉNEMENT</label>
          <CreatableSelect
            value={_type}
            options={EVENT_LIST}
            className="text-sm text-strong-contrast font-open-sans"
            isDisabled={!modeEdit}
            classNames={{
              indicatorsContainer: () => "hidden invisible cursor-text",
              placeholder: () => "cursor-text",
              input: () => "cursor-text",
            }}
            onChange={onChanges.get("type")}
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label className="text-strong-contrast text-sm">DATE DE CREATION</label>
          <DatePicker showIcon selected={_createdAt} onChange={onChanges.get("createdAt")} readOnly={!modeEdit} customInput={<CustomDatePickerInput />} />
        </div>
      </div>
    </Card>
  );
}

const NewAppointment = () => {
  const navigate = useNavigate();
  const appointment = structuredClone(APPOINTMENT_SHARED.defaults.appointment);
  const customer = structuredClone(APPOINTMENT_SHARED.defaults.customer);

  const [draftClient, dispatchClient] = useReducer((s, a) => reducerGeneralized(s, a, "Client"), { loading: false, ...customer, });
  const [draftGeneral, dispatchGeneral] = useReducer((s, a) => reducerGeneralized(s, a, "General"), { ...appointment, createdAt: DATETIME_FORMAT["default"].format(new Date()) });

  const submitCreate = async () => {
    const { title, type: _type, status: _status, scheduledDate: _scheduledDate, orderId } = draftGeneral;
    const { id } = await createAppointment({
      title: title ?? "Sans titre",
      type: (_type ?? NaN).toFixed(0),
      status: (_status ?? NaN).toFixed(0),
      scheduledDate: (_scheduledDate ?? new Date()).toISOString(),
    });
    navigate(`/appointments/${id.toString()}`);
  }

  const saveRemote = new Map();
  saveRemote.set("Client", async (fields) => {
    // TODO: Fill up
    const { loading, ...edits } = fields;
    dispatchClient({ edits });
  });
  saveRemote.set("General", async (fields) => {
    // TODO: Fill up
    dispatchGeneral({ edits: fields })
  });
  return <div className="w-full h-full bg-primary flex flex-col gap-4 p-4">
    <div className="flex items-center gap-2"></div>
    <div className="flex items-center justify-between">
      <h1 className="textlg font-bold text-weak-context font-asap">CRÉATION DE LA NOMINATION</h1>
      <Button textContent="CRÉER" onClick={submitCreate} />
    </div>
    <div className="w-full flex gap-4">
      <div className="w-2/3 flex flex-col gap-4">
        <GeneralCard {...draftGeneral} saveRemote={saveRemote.get("General")} />
      </div>
      <div className="w-1/3 flex flex-col gap-4">
        <ClientCard {...draftClient} saveRemote={saveRemote.get("Client")} />
      </div>
    </div>
  </div>
}

export default NewAppointment;