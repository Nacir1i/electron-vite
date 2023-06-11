import Card from "../components/Card";
import Button from "../components/Button";
import DatePicker from "react-datepicker";

import Select from "react-select";
import AsyncSelect from "react-select/async";
import CreatableSelect from "react-select/creatable";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { AiFillCloseCircle, AiFillEdit, AiFillSave, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineCalendar, AiOutlineClose } from "react-icons/ai"
import React from "react";
import { Await } from "react-router-dom";
import { useReducer } from "react";
import { useParams } from "react-router-dom";
import { createAppointment, fetchSearchedCustomers, getAppointment, updateAppointment, updateCustomer, updateDevis } from "../config/httpRequests";
import { forwardRef } from "react";

import { APPOINTMENT_SHARED, DATETIME_FORMAT } from "../utils/common";
import { useNavigate } from "react-router-dom";

const data = {
  firstName: "John",
  lastName: "Doe",
  address: "Rue Tamada, Hay Adrar",
  address1: "Agadir, Souss Massa. MA",
  status: "waiting",
  created: "05/08/2023",
  type: "Mariage",
  phone: "0123456789",
  location: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN, Agadir",
  category: "Mariage",
  dueDate: "01/28/2023",
  note: "Client want jasmine flower  theme and buffet number 5 + coffe maker + pop corn machine + 2 waiters ",
  orders: [
    {
      ref: "TRM00283",
      designation: "MYT Table S",
      quantity: 5,
      price: 690,
    },
    {
      ref: "TRM00284",
      designation: "Waiters",
      quantity: 5,
      price: 690,
    },
    {
      ref: "TRM00285",
      designation: "MYT Table S",
      quantity: 5,
      price: 690,
    },
    {
      ref: "TRM00286",
      designation: "MYT TRADITIONAL MENU",
      quantity: 5,
      price: 690,
    },
  ],
};

const renderTable = data.orders.map((order) => (
  <tr key={order.ref}>
    <td>{order.ref}</td>
    <td>{order.designation}</td>
    <td>{order.quantity}</td>
    <td className="text-right">{order.price.toFixed(2)} MAD</td>
  </tr>
));

const NoteCard = ({ note }) => {
  return (
    <Card>
      <div className="flex-1 flex">
        <h1 className="font-bold text-strong-contrast">Note</h1>
        <button className="ml-auto text-sm text-highlight">MODIFIER</button>
      </div>
      <p>{note}</p>
    </Card>
  );
}

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
      <AsyncSelect value={_customerID} isDisabled={!modeEdit} loadOptions={customerOptions} onChange={onChanges.get("id")} />
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

const PaymentCard = () => {
  // TODO: Take these variables from the `data` object hence in the arguments.
  const [modeEdit, setModeEdit] = useState(false);
  const toggleModeEdit = () => setModeEdit((prev) => !prev);
  const cancelChanges = () => {
    toggleModeEdit();
  };
  const paid = 599.25;
  const rest = 100.25;
  const method = "Espece";
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-strong-contrast">Details de payment</h1>
        <div className="flex gap-2 items-center">
          {
            modeEdit &&
            <button onClick={cancelChanges} className="bg-secondary text-red-700/75 rounded-full text-xl hover:text-red-700 transition-colors duration-150"><AiFillCloseCircle /></button>
          }
          <button onClick={toggleModeEdit} className="bg-secondary text-highlight/75 rounded-full text-xl hover:text-highlight transition-colors duration-150">
            {modeEdit ? <AiFillSave /> : <AiFillEdit />}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 items-center w-full">
          <label className="flex-1" htmlFor="payment_method">Methode</label>
          <input id="payment_method" type="text" value={method} readOnly={!modeEdit} className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
        </div>
        <div className="flex gap-4 items-center w-full">
          <label className="flex-1" htmlFor="payment_paid">Payé</label>
          <input id="payment_paid" type="number" value={paid} readOnly={!modeEdit} className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
          <label className="flex-1" htmlFor="payment_paid">MAD</label>
        </div>
        <div className="flex gap-4 items-center w-full">
          <label className="flex-1" htmlFor="payment_rest">Reste</label>
          <input id="payment_rest" type="number" value={rest} readOnly={!modeEdit} className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter" />
          <label className="flex-1" htmlFor="payment_rest">MAD</label>
        </div>
      </div>
    </Card>
  );
}

const EmployeesCard = () => {
  const selectionOptions = ["xenobas", "mawrk", "n0chill"];
  const formatted_selectionOptions = selectionOptions.map((opt) => {
    return {
      value: opt,
      label: opt.toUpperCase(),
    };
  });
  const AssignmentSystem = ({ employees }) => {
    const selectOnChange = (newValue, actionMeta) => {
      // TODO: submit change.
    };
    return (
      <Select options={employees} isMulti closeMenuOnSelect={false} onChange={selectOnChange} placeholder="Assign Employees" className="w-full flex-1 text-sm" />
    )
  };
  return (
    <Card>
      <div className="flex-1 flex">
        <h1 className="font-bold text-strong-contrast">Salariés</h1>
      </div>
      <div className="flex w-full">
        <AssignmentSystem employees={formatted_selectionOptions} />
      </div>
    </Card>
  );
}

const DeliveryCard = ({ address }) => {
  const onChange = () => { };
  return (
    <Card>
      <h1 className="font-bold text-strong-contrast">Delivery Addresse</h1>
      <div className="flex-1 flex items-center gap-4">
        <FaHome className="text-xl" />
        <input type="text" className="p-2 bg-transparent flex-1 text-sm text-strong-contrast font-open-sans rounded" value={address} onChange={onChange} />
      </div>
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

const OrderDetails = () => {
  return (
    <Card>
      <h1 className="text-strong-contrast font-semibold">Detailles de Commande</h1>
      <hr className="border-weakest-contrast" />
      <table className="w-full text-strong-contrast border-separate border-spacing-y-2">
        <thead>
          <tr className="w-full text-left">
            <th className="text-highlight font-bold font-asap">Ref.</th>
            <th className="text-highlight font-bold font-asap">Designation</th>
            <th className="text-highlight font-bold font-asap">Quantité</th>
            <th className="text-highlight font-bold font-asap text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {renderTable}
          <tr>
            <td className="border-t border-t-weakest-contrast"></td>
            <td className="border-t border-t-weakest-contrast"></td>
            <td className="border-t border-t-weakest-contrast"></td>
            <td className="border-t border-t-weakest-contrast"></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>TOTAL HT</td>
            <td className="text-right">699.00 MAD</td>
          </tr>
          <tr className="group">
            <td></td>
            <td></td>
            <td>TVA</td>
            <td className="text-right">699.00 MAD</td>
          </tr>
          <tr className="group">
            <td className="group-last:pb-6 p-3"></td>
            <td className="group-last:pb-6"></td>
            <td className="group-last:pb-6">TOTAL TTC</td>
            <td className="group-last:pb-6 text-right">699.00 MAD</td>
          </tr>
        </tbody>
      </table>
      <div className="w-full flex flex-col gap-4 items-end p-2 text-strong-contrast">
        <div className="flex gap-4 items-center">
          <button className="py-2 px-4 text-sm bg-highlight text-white rounded-lg">Modifier la facture</button>
        </div>
      </div>
    </Card>
  )
}

const InvoiceDetails = ({ details }) => {
  const generateRows = (details || []).map(({ check, material, quantity, ref, remaining }) => {
    return (
      <tr key={ref} className="text-strong-contrast font-asap text-base">
        <td>{material}</td>
        <td>{ref}</td>
        <td>{quantity}</td>
        <td>
          <Checkbox initialChecked={check} />
        </td>
        <td>{remaining}</td>
      </tr>
    )
  })
  return (
    <Card>
      <h1 className="text-strong-contrast font-semibold font-asap">Details de Livraison</h1>
      <hr className="m-0 p-0 border-weakest-contrast" />
      <table className="border-separate border-spacing-y-2">
        <thead>
          <tr className="text-highlight font-asap font-bold text-base">
            <td>MATERIEL</td>
            <td>REF.</td>
            <td>QUANTITÉ</td>
            <td>CASSÉ</td>
            <td>RESTE</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-strong-contrast font-asap text-base">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {generateRows}
        </tbody>
      </table>
      <hr className="m-0 p-0 border-weakest-contrast" />
      <div className="flex gap-4 items-center justify-end">
        <Button textContent="Importer une facture" type="soft" />
        <Button textContent="Ajoutez un article" />
      </div>
    </Card>
  );
}

async function loadAppointment() {
  const { appointmentID } = useParams();
  if (appointmentID === "new") return structuredClone(APPOINTMENT_SHARED.defaults.appointment);

  const query = await getAppointment(appointmentID);
  return query.instance;
}

const reducerGeneralized = (state, action, draftName) => {
  const { edits } = action;
  for (const key in edits) {
    const new_value = edits[key];
    if (Object.keys(state).includes(key)) {
      const newState = structuredClone(state);
      newState[key] = new_value;
      return newState;
    } else throw new Error(`[Draft#${draftName}] doesn't contain ${key} key.`);
  }
}

const AppointmentHeader = () => {
  return <div className="flex items-center gap-2">
    <h1 className="text-lg font-bold text-weak-contrast font-asap">DÉTAILS DE LA NOMINATION</h1>
    <div className="flex items-center gap-2 ml-auto">
      <button className="bg-transparent border border-strong-contrast text-strong-contrast hover:bg-strong-contrast hover:text-secondary transition-colors duration-150 p-1 rounded-lg flex items-center justify-center">
        <AiOutlineArrowLeft className="text-lg" />
      </button>
      <Button type="soft" textContent="DUPLIQUER" />
      <button className="bg-transparent border border-strong-contrast text-strong-contrast hover:bg-strong-contrast hover:text-secondary transition-colors duration-150 p-1 rounded-lg flex items-center justify-center">
        <AiOutlineArrowRight className="text-lg" />
      </button>
    </div>
  </div>
}

const SelectedAppointment = ({ appointment }) => {
  const customer = appointment.order.devis.customer;
  const [draftClient, dispatchClient] = useReducer((s, a) => reducerGeneralized(s, a, "Client"), { loading: false, id: customer.id, firstName: customer.firstName, lastName: customer.lastName, address: customer.address, phone: customer.phone, type: customer.company ?? "Individuel" });
  const [draftGeneral, dispatchGeneral] = useReducer((s, a) => reducerGeneralized(s, a, "General"), { id: appointment.id, status: appointment.status, createdAt: appointment.createdAt, type: appointment.type, title: appointment.title });
  const saveRemoteGeneral = async (fields) => {
    dispatchGeneral({ edits: fields })
    await updateAppointment(appointment.id, fields);
  }
  const saveRemoteClient = async (fields) => {
    const { id: customerID, ...edits } = fields;
    if (customerID) {
      dispatchClient({ edits: { customerID, ...fields } });
      await updateDevis(appointment.order.devis.id, { customerId: customerID });
      await updateCustomer(customerID, edits);
    } else {
      dispatchClient({ edits });
      await updateCustomer(customer.id, edits);
    }
  }
  return (
    <div className="w-full h-full bg-primary flex flex-col gap-4 p-4">
      <AppointmentHeader />
      <div className="w-full flex gap-4">
        <div className="w-2/3 flex flex-col gap-4">
          <GeneralCard {...draftGeneral} saveRemote={saveRemoteGeneral} />
          <OrderDetails />
          <InvoiceDetails />
        </div>
        <div className="w-1/3 flex flex-col gap-4 text-strong-contrast">
          <ClientCard {...draftClient} saveRemote={saveRemoteClient} />
          <PaymentCard />
          <EmployeesCard />
          <DeliveryCard address={data.address} />
          <NoteCard note={data.note} />
        </div>
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="w-full h-full bg-secondary flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-bold text-weak-contrast font-asap">DÉTAILS DE LA NOMINATION</h1>
        <div className="flex items-center gap-2 ml-auto">
          <button disabled className="bg-transparent border border-strong-contrast text-strong-contrast hover:bg-strong-contrast hover:text-secondary transition-colors duration-150 p-1 rounded-lg flex items-center justify-center">
            <AiOutlineArrowLeft className="text-lg" />
          </button>
          <Button type="soft" textContent="DUPLIQUER" />
          <button disabled className="bg-transparent border border-strong-contrast text-strong-contrast hover:bg-strong-contrast hover:text-secondary transition-colors duration-150 p-1 rounded-lg flex items-center justify-center">
            <AiOutlineArrowRight className="text-lg" />
          </button>
        </div>
      </div>
      <div className="w-full flex gap-4">
        <div className="w-2/3 flex flex-col gap-4">
          <GeneralCard loading={true} />
          <OrderDetails loading={true} />
          <NoteCard loading={true} />
        </div>
        <div className="w-1/3 flex flex-col gap-4 text-strong-contrast">
          <ClientCard loading={true} />
          <PaymentCard loading={true} />
          <EmployeesCard loading={true} />
          <DeliveryCard loading={true} />
        </div>
      </div>
    </div>
  );
};

const ComponentLoader = () => {
  const component_promise = loadAppointment();
  return <React.Suspense fallback={<Skeleton />}>
    <Await resolve={component_promise} children={(appointment) => <SelectedAppointment appointment={appointment} />} />
  </React.Suspense>
}

export default ComponentLoader;
