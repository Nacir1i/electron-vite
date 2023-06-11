// import Card from "../components/Card";
// import Button from "../components/Button";
// import AppLoading from "./AppLoading";
// import DatePicker from "react-datepicker";
// import {
//   getFilteredRoles,
//   getEmployee,
//   updateEmployee,
// } from "../config/httpRequests";

// import { Suspense, useState, forwardRef, useReducer } from "react";
// import AsyncSelect from "react-select/async";
// import EditToolbox from "../components/EditToolbox";

// import { AiOutlineCalendar } from "react-icons/ai";
// import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

// import {
//   Await,
//   useAsyncValue,
//   useAsyncError,
//   useParams,
// } from "react-router-dom";
// import {
//   CLASS_NAMES,
//   createStates,
//   DATETIME_FORMAT,
//   PromiseTimeout,
// } from "../utils/common";

// // TODO(XENOBAS): Fix null input value warning in devtools.

// async function loadItem() {
//   const { employeeID } = useParams();

//   const id = parseInt(employeeID);
//   if (isNaN(id)) throw new Error("IDs must be numbers.");

//   const { employee } = await getEmployee(id);
//   if (!employee) throw new Error(`Employee#${id} does not exist.`);

//   return employee;
// }

// const GeneralCard = ({ id, first_name, last_name, role, dispatch }) => {
//   const states = createStates(
//     ["first_name", first_name],
//     ["last_name", last_name],
//     ["employee_id", id],
//     ["role_id", { value: role.id, label: role.title }, "select"]
//   );

//   const [modeEdit, setModeEdit] = useState(false);
//   const toggleModeEdit = () => setModeEdit((prev) => !prev);

//   async function saveChanges() {
//     const action = {};

//     const keys = Array.from(states.keys()).filter((e) => e !== "__reset");
//     for (const key of keys) action[key] = states.get(key).exporter();

//     try {
//       console.log(action);
//       await updateEmployee(action);
//       dispatch(action);
//     } catch (error) {
//       console.error(error);
//       await cancelChanges();
//     }
//     toggleModeEdit();
//   }
//   async function cancelChanges() {
//     states.get("__reset")();
//     toggleModeEdit();
//   }

//   async function loadRolesPromise(searchTerm) {
//     function roleMapper(role) {
//       return { value: role.id, label: role.title };
//     }
//     try {
//       const { roles } = await getFilteredRoles(searchTerm);

//       return roles.map(roleMapper);
//     } catch (error) {
//       console.log(error);
//       return [];
//     }
//   }

//   return (
//     <Card>
//       <div className="flex items-center justify-between">
//         <h1 className="font-bold text-strong-contrast">Generale</h1>
//         <EditToolbox
//           modeEdit={modeEdit}
//           save={saveChanges}
//           cancel={cancelChanges}
//           toggle={toggleModeEdit}
//         />
//       </div>
//       <div className="flex items-center gap-2">
//         <div className="flex-1 flex flex-col w-full gap-2">
//           <label htmlFor="last_name" className="text-strong-contrast">
//             Nom
//           </label>
//           <input
//             readOnly={!modeEdit}
//             id="last_name"
//             type="text"
//             className={CLASS_NAMES.input}
//             value={states.get("last_name").getter}
//             onChange={states.get("last_name").setter}
//           />
//         </div>
//         <div className="flex-1 flex flex-col w-full gap-2">
//           <label htmlFor="first_name" className="text-strong-contrast">
//             Prénom
//           </label>
//           <input
//             readOnly={!modeEdit}
//             id="first_name"
//             type="text"
//             className={CLASS_NAMES.input}
//             value={states.get("first_name").getter}
//             onChange={states.get("first_name").setter}
//           />
//         </div>
//       </div>
//       <div className="flex gap-4 w-full">
//         <div className="flex-1 flex flex-col gap-2">
//           <label htmlFor="id" className="text-strong-contrast">
//             ID
//           </label>
//           <input
//             readOnly={true}
//             id="id"
//             type="text"
//             className={CLASS_NAMES.input}
//             value={id}
//           />
//         </div>
//         <div className="flex-1 flex flex-col gap-2">
//           <label htmlFor="role" className="text-strong-contrast">
//             Profession
//           </label>
//           <AsyncSelect
//             id="role"
//             isDisabled={!modeEdit}
//             value={states.get("role_id").getter}
//             onChange={states.get("role_id").setter}
//             loadOptions={loadRolesPromise}
//           />
//         </div>
//       </div>
//     </Card>
//   );
// };

// const CustomDatePickerInput = forwardRef(({ value, onClick }, ref) => (
//   <div onClick={onClick} ref={ref} className="w-full h-fit relative">
//     <button className="w-full h-full bg-weakest-contrast text-strong-contrast rounded-xl m-auto p-2 text-left">
//       {value}
//     </button>
//     <AiOutlineCalendar className="absolute top-1/2 -translate-y-1/2 right-2 text-xl text-highlight" />
//   </div>
// ));

// const InformationCard = ({ id, joined_at, created_at, salary, dispatch }) => {
//   const states = createStates(
//     ["joined_at", joined_at, "date"],
//     ["created_at", created_at, "date"],
//     ["salary", salary],
//     ["employee_id", id]
//   );

//   const [modeEdit, setModeEdit] = useState(false);
//   const toggleModeEdit = () => setModeEdit((prev) => !prev);

//   async function saveChanges() {
//     const action = {};

//     const keys = Array.from(states.keys()).filter((e) => e !== "__reset");
//     for (const key of keys) action[key] = states.get(key).exporter();

//     try {
//       console.log({ ...action, salary: Number(action.salary) });
//       await updateEmployee({ ...action, salary: Number(action.salary) });
//       dispatch(action);
//     } catch (error) {
//       console.error(error);
//       await cancelChanges();
//     }
//     toggleModeEdit();
//   }
//   const cancelChanges = async () => {
//     states.get("__reset")();
//     toggleModeEdit();
//   };

//   return (
//     <Card>
//       <div className="flex justify-between items-center">
//         <h1 className="font-bold text-strong-contrast">Informations privées</h1>
//         <EditToolbox
//           save={saveChanges}
//           cancel={cancelChanges}
//           toggle={toggleModeEdit}
//           modeEdit={modeEdit}
//         />
//       </div>
//       <div className="flex flex-col gap-4">
//         <div className="w-full flex gap-4">
//           <div className="flex-1 flex flex-col gap-2">
//             <label htmlFor="hire_date" className="text-strong-contrast">
//               Date d'embauche
//             </label>
//             <DatePicker
//               showIcon
//               selected={states.get("joined_at").getter}
//               onChange={states.get("joined_at").setter}
//               readOnly={!modeEdit}
//               customInput={<CustomDatePickerInput />}
//             />
//           </div>
//           <div className="flex-1 flex flex-col gap-2">
//             <label htmlFor="birth_date" className="text-strong-contrast">
//               Date de naissance
//             </label>
//             <DatePicker
//               showIcon
//               selected={states.get("created_at").getter}
//               onChange={states.get("created_at").setter}
//               readOnly={!modeEdit}
//               customInput={<CustomDatePickerInput />}
//             />
//           </div>
//         </div>
//         <div className="w-full flex gap-4">
//           <div className="flex-1 flex flex-col gap-2">
//             <label htmlFor="salary" className="text-strong-contrast">
//               Salaire
//             </label>
//             <input
//               readOnly={!modeEdit}
//               id="salary"
//               type="number"
//               className="p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter"
//               value={states.get("salary").getter}
//               onChange={states.get("salary").setter}
//             />
//           </div>
//           <div className="flex-1 flex flex-col gap-2">
//             <label htmlFor="payment_method" className="text-strong-contrast">
//               Mode de paiement
//             </label>
//             <input
//               id="payment_method"
//               type="text"
//               className="p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter"
//               value="Cheque"
//               readOnly={true}
//             />
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// };

// const ContactCard = ({ id, phone, email, address, dispatch }) => {
//   const states = createStates(
//     ["phone", phone],
//     ["email", email],
//     ["address", address],
//     ["employee_id", id]
//   );

//   const [modeEdit, setModeEdit] = useState(false);
//   const toggleModeEdit = () => setModeEdit((prev) => !prev);

//   async function saveChanges() {
//     const action = {};

//     const keys = Array.from(states.keys()).filter(
//       (e) => e !== "__reset" && e !== "employee_id"
//     );
//     for (const key of keys) action[key] = states.get(key).exporter();

//     try {
//       console.log({
//         employee_id: states.get("employee_id").exporter(),
//         contactInformation: action,
//       });
//       await updateEmployee({
//         employee_id: states.get("employee_id").exporter(),
//         contactInformation: action,
//       });
//       dispatch(action);
//     } catch (error) {
//       console.error(error);
//       await cancelChanges();
//     }
//   }
//   async function cancelChanges() {
//     states.get("__reset")();
//     toggleModeEdit();
//   }

//   return (
//     <Card>
//       <div className="flex items-center justify-between">
//         <h1 className="font-bold text-strong-contrast">
//           Informations de contact
//         </h1>
//         <EditToolbox
//           save={saveChanges}
//           cancel={cancelChanges}
//           toggle={toggleModeEdit}
//           modeEdit={modeEdit}
//         />
//       </div>
//       <div className="flex flex-col gap-2">
//         <div className="flex gap-4 items-center">
//           <label className="flex-1" htmlFor="phone">
//             Tél.
//           </label>
//           <input
//             readOnly={!modeEdit}
//             id="phone"
//             type="text"
//             value={states.get("phone").getter}
//             onChange={states.get("phone").setter}
//             className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter"
//           />
//         </div>
//         <div className="flex gap-4 items-center">
//           <label className="flex-1" htmlFor="email">
//             Email
//           </label>
//           <input
//             readOnly={!modeEdit}
//             id="email"
//             type="email"
//             value={states.get("email").getter}
//             onChange={states.get("email").setter}
//             className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter"
//           />
//         </div>
//         <div className="flex gap-4 items-center">
//           <label className="flex-1" htmlFor="address">
//             Addresse
//           </label>
//           <input
//             readOnly={!modeEdit}
//             id="address"
//             type="text"
//             value={states.get("address").getter}
//             onChange={states.get("address").setter}
//             className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter"
//           />
//         </div>
//       </div>
//     </Card>
//   );
// };

// const EmergencyContactCard = ({ id, phone, email, address, dispatch }) => {
//   const states = createStates(
//     ["phone", phone],
//     ["email", email],
//     ["address", address],
//     ["employee_id", id]
//   );

//   const [modeEdit, setModeEdit] = useState(false);
//   const toggleModeEdit = () => setModeEdit((prev) => !prev);

//   async function saveChanges() {
//     const action = {};

//     const keys = Array.from(states.keys()).filter(
//       (e) => e !== "__reset" && e !== "employee_id"
//     );
//     for (const key of keys) action[key] = states.get(key).exporter();

//     try {
//       console.log({
//         employee_id: states.get("employee_id").exporter(),
//         emergencyContact: action,
//       });
//       // await updateEmployee({
//       //   employee_id: states.get("employee_id").exporter(),
//       //   contactInformation: action,
//       // });
//       dispatch(action);
//     } catch (error) {
//       console.error(error);
//       await cancelChanges();
//     }

//     toggleModeEdit();
//   }

//   async function cancelChanges() {
//     states.get("__reset")();
//     toggleModeEdit();
//   }
//   return (
//     <Card>
//       <div className="flex items-center justify-between">
//         <h1 className="font-bold text-strong-contrast">
//           Coordonnées d'urgence
//         </h1>
//         <EditToolbox
//           save={saveChanges}
//           cancel={cancelChanges}
//           toggle={toggleModeEdit}
//           modeEdit={modeEdit}
//         />
//       </div>
//       <div className="flex flex-col gap-2">
//         <div className="flex gap-4 items-center">
//           <label className="flex-1" htmlFor="phone">
//             Tél.
//           </label>
//           <input
//             readOnly={!modeEdit}
//             id="phone"
//             type="text"
//             value={states.get("phone").getter}
//             onChange={states.get("phone").setter}
//             className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter"
//           />
//         </div>
//         <div className="flex gap-4 items-center">
//           <label className="flex-1" htmlFor="email">
//             Email
//           </label>
//           <input
//             readOnly={!modeEdit}
//             id="email"
//             type="email"
//             value={states.get("email").getter}
//             onChange={states.get("email").setter}
//             className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter"
//           />
//         </div>
//         <div className="flex gap-4 items-center">
//           <label className="flex-1" htmlFor="address">
//             Addresse
//           </label>
//           <input
//             readOnly={!modeEdit}
//             id="address"
//             type="text"
//             value={states.get("address").getter}
//             onChange={states.get("address").setter}
//             className="flex-[3_3_0%] p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter"
//           />
//         </div>
//       </div>
//     </Card>
//   );
// };

// const PaymentHistoryCard = ({ history }) => {
//   if (!history)
//     history = [
//       {
//         date: "08/01/2023",
//         id: "TRM001",
//         total: "MAD 699.00",
//         status: "Complete",
//         method: "Cash",
//       },
//     ];
//   const HistoryEntries = history.map(
//     ({ date, id, total, status, method }, index) => (
//       <tr
//         key={index}
//         className="text-gray-700 font-open-sans text-sm font-bold"
//       >
//         <td>{date}</td>
//         <td>{id}</td>
//         <td>{total}</td>
//         <td>{status}</td>
//         <td>{method}</td>
//       </tr>
//     )
//   );
//   return (
//     <Card>
//       <h1 className="font-bold text-strong-contrast">
//         Historique des paiements
//       </h1>
//       <hr className="border-weakest-contrast" />
//       <table className="w-full border-separate border-spacing-4">
//         <thead>
//           <tr className="text-highlight font-asap font-bold text-base">
//             <td>Date</td>
//             <td className="w-24">ID</td>
//             <td>Total</td>
//             <td>Statut</td>
//             <td>Mode de Paiement</td>
//           </tr>
//         </thead>
//         <tbody>{HistoryEntries}</tbody>
//       </table>
//       <hr className="border-weakest-contrast" />
//       <div className="flex justify-end gap-2">
//         <button className="bg-highlight text-secondary text-roboto px-4 py-2 rounded-lg font-light">
//           Ajout d'entrée
//         </button>
//       </div>
//     </Card>
//   );
// };

// const PaymentDetailsCard = ({ id, name, number, rib, dispatch }) => {
//   const states = createStates(
//     ["name", name],
//     ["number", number],
//     ["rib", rib],
//     ["employee_id", id]
//   );

//   const [modeEdit, setModeEdit] = useState(false);
//   const toggleModeEdit = () => setModeEdit((prev) => !prev);

//   async function saveChanges() {
//     const action = {};

//     const keys = Array.from(states.keys()).filter(
//       (e) => e !== "__reset" && e !== "employee_id"
//     );
//     for (const key of keys) action[key] = states.get(key).exporter();

//     try {
//       console.log({
//         employee_id: states.get("employee_id").exporter(),
//         bankInformation: action,
//       });
//       await updateEmployee({
//         employee_id: states.get("employee_id").exporter(),
//         bankInformation: action,
//       });
//       dispatch(action);
//     } catch (error) {
//       console.error(error);
//       await cancelChanges();
//     }

//     toggleModeEdit();
//   }
//   const cancelChanges = async () => {
//     states.get("__reset")();
//     toggleModeEdit();
//   };
//   return (
//     <Card>
//       <div className="flex items-center justify-between">
//         <h1 className="font-bold text-strong-contrast">Détails du paiement</h1>
//         <EditToolbox
//           save={saveChanges}
//           cancel={cancelChanges}
//           toggle={toggleModeEdit}
//           modeEdit={modeEdit}
//         />
//       </div>
//       <div className="flex flex-col gap-2">
//         <div className="flex flex-col">
//           <label
//             className="font-inter font-medium text-highlight text-sm"
//             htmlFor="bank"
//           >
//             Banque
//           </label>
//           <input
//             id="bank"
//             type="text"
//             value={states.get("name").getter}
//             onChange={states.get("name").setter}
//             readOnly={!modeEdit}
//             className="w-full p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label
//             className="font-inter font-medium text-highlight text-sm"
//             htmlFor="account_number"
//           >
//             Numero de Compte
//           </label>
//           <input
//             id="account_number"
//             type="text"
//             value={states.get("number").getter}
//             onChange={states.get("number").setter}
//             readOnly={!modeEdit}
//             className="w-full p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label
//             className="font-inter font-medium text-highlight text-sm"
//             htmlFor="rib"
//           >
//             RIB
//           </label>
//           <input
//             id="rib"
//             type="text"
//             value={states.get("rib").getter}
//             onChange={states.get("rib").setter}
//             readOnly={!modeEdit}
//             className="w-full p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter"
//           />
//         </div>
//       </div>
//     </Card>
//   );
// };

// function reducer(state, action) {
//   const new_state = structuredClone(state);
//   for (const field in action) new_state[field] = action[field];
//   return new_state;
// }

// const SelectedEmployee = () => {
//   const employee = useAsyncValue();

//   const contact = { ...employee.contact, id: employee.id };
//   const bank_information = { ...employee.bank_information, id: employee.id };

//   const [draft_contact, dispatchContact] = useReducer(reducer, contact);
//   const [draft_emergency, dispatchEmergency] = useReducer(reducer, contact);
//   const [draft_employee, dispatchEmployee] = useReducer(reducer, employee);
//   const [draft_bank_information, dispatchBankInformation] = useReducer(
//     reducer,
//     bank_information
//   );

//   const error = useAsyncError();
//   if (error)
//     return (
//       <div className="w-full h-full bg-primary flex flex-col justify-center items-center">
//         {error}
//       </div>
//     );
//   return (
//     <div className="w-full h-full bg-primary flex flex-col gap-4 p-4">
//       <div className="flex items-center gap-2">
//         <h1 className="text-lg font-bold text-weak-contrast font-asap">
//           DÉTAILS DE L'EMPLOYÉ
//         </h1>
//         <div className="ml-auto flex items-center gap-2">
//           <Button type="soft" textContent="Dupliquer" />
//           <button className="bg-transparent border-2 border-strong-contrast text-strong-contrast p-1 rounded-lg flex items-center justify-center">
//             <FaLongArrowAltLeft className="text-lg" />
//           </button>
//           <button className="bg-transparent border-2 border-strong-contrast text-strong-contrast p-1 rounded-lg flex items-center justify-center">
//             <FaLongArrowAltRight className="text-lg" />
//           </button>
//         </div>
//       </div>
//       <div className="w-full flex gap-4">
//         <div className="w-2/3 flex flex-col gap-4">
//           <GeneralCard {...draft_employee} dispatch={dispatchEmployee} />
//           <InformationCard {...draft_employee} dispatch={dispatchEmployee} />
//           <PaymentHistoryCard {...employee} />
//         </div>
//         <div className="w-1/3 flex flex-col gap-4">
//           <ContactCard {...draft_contact} dispatch={dispatchContact} />
//           <EmergencyContactCard
//             {...draft_emergency}
//             dispatch={dispatchEmergency}
//           />
//           <PaymentDetailsCard
//             {...draft_bank_information}
//             dispatch={dispatchBankInformation}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const Skeleton = () => {
//   return (
//     <div className="w-full h-full bg-secondary flex flex-col gap-4 p-4">
//       <div className="flex items-center gap-2">
//         <h1 className="text-lg font-bold text-weak-contrast font-asap">
//           DÉTAILS DE L'EMPLOYÉ
//         </h1>
//         <div className="ml-auto flex items-center gap-2">
//           <Button type="soft" textContent="Dupliquer" />
//           <button className="bg-transparent border-2 border-strong-contrast text-strong-contrast p-1 rounded-lg flex items-center justify-center">
//             <FaLongArrowAltLeft className="text-lg" />
//           </button>
//           <button className="bg-transparent border-2 border-strong-contrast text-strong-contrast p-1 rounded-lg flex items-center justify-center">
//             <FaLongArrowAltRight className="text-lg" />
//           </button>
//         </div>
//       </div>
//       <div className="w-full h-full flex items-center justify-center gap-4">
//         <AppLoading />
//       </div>
//     </div>
//   );
// };

// const ComponentLoader = () => {
//   const query_promise = loadItem();
//   return (
//     <Suspense fallback={<Skeleton />}>
//       <Await resolve={query_promise}>
//         <SelectedEmployee />
//       </Await>
//     </Suspense>
//   );
// };

// export default ComponentLoader;

import Card from "../components/Card";
import Button from "../components/Button";
import AppLoading from "./AppLoading";
import TemplateEdit from "../components/templates/TemplateEdit";

import { createStatesNew, CLASS_NAMES, APPOINTMENT_SHARED } from "../utils/common";
import { createRole, getFilteredRoles, getEmployee, updateEmployee } from "../config/httpRequests";

import Select from "react-select";
import DatePicker from "react-datepicker";
import AsyncCreatableSelect from 'react-select/async-creatable';

import { AiOutlineCalendar } from "react-icons/ai";
import { Suspense, useReducer, forwardRef } from "react";
import { Await, useNavigate, useParams, useAsyncValue } from "react-router-dom";

const DatePickerWrapper = forwardRef(({ value, onClick }, ref) => (
  <div onClick={onClick} ref={ref}>
    <input type="text" onClick={onClick} value={value} className={CLASS_NAMES.input + " w-full"} readOnly={true} />
    <AiOutlineCalendar className="absolute top-1/2 -translate-y-1/2 right-2 text-xl text-highlight" />
  </div>
));

async function loadItem(employeeID) {
  const id = parseInt(employeeID);
  if (isNaN(id)) throw new Error("IDs must be numbers.");

  const { employee } = await getEmployee(id);
  if (!employee) throw new Error(`Employee#${id} does not exist.`);
  return employee;
}

const GeneralCard = ({ id, username = "", role = null, status_id, dispatch }) => {
  const status = APPOINTMENT_SHARED.getEmployeeStatus(status_id);
  const status_options = APPOINTMENT_SHARED.employee_status;
  const states = createStatesNew({ username, status, role: { value: role?.id, label: role?.title } }, { status: "select", role: "select" }, dispatch);
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
  return <Card className="grid grid-cols-2 gap-4" isRaw={true}>
    <div className="flex flex-col gap-2">
      <label htmlFor="ref_id" className={CLASS_NAMES.label}>Employé Nº</label>
      <input type="text" name="ref_id" id="ref_id" placeholder="Ce champs ce remplit aprés la creation..." className={CLASS_NAMES.input} value={id} readOnly disabled />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="username" className={CLASS_NAMES.label}>Nom d'utilisateur</label>
      <input type="text" name="username" id="username" placeholder="Ce champs ce remplit aprés la creation..." className={CLASS_NAMES.input} onChange={states.get("username").onChange} value={states.get("username").value} />
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
      <input type="number" name="salary" id="salary" value={states.get("salary").value} onChange={states.get("salary").onChange} placeholder="Ce champs ce remplit aprés la creation..." className={CLASS_NAMES.input} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="ref_id" className={CLASS_NAMES.label}>Mode de paiement</label>
      <Select unstyled classNames={CLASS_NAMES.select} value={states.get("payment_method").value} onChange={states.get("payment_method").onChange} options={APPOINTMENT_SHARED.payment_methods} />
    </div>
  </Card>
}

const PaymentsHistoryCard = ({ delivery_invoices = [] }) => {
  const is_empty = delivery_invoices.length === 0;
  return <Card>
    <h1 className={CLASS_NAMES.label}>Historique des paiements</h1>
    <hr className="border-weakest-contrast" />
    {
      is_empty
        ? (<h1 className="text-center font-regular font-inter text-highlight">L'employé n'a aucun paiement dans son historique de transactions.</h1>)
        : (<h1></h1>)
    }
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
  if (!!action["status"]) action["status_id"] = { id: action["status"]?.value || action["status"]?.id, title: action["status"]?.label || action["status"]?.title };
  if (!!action["payment_method"]) action["payment_method"] = action["payment_method"]?.value ?? action["payment_method"];
  delete action["status"];
  for (const field in action) {
    new_state[field] = action[field];
    new_state["changes"][field] = action[field];
  }
  return new_state;
}

const SelectedEmployee = () => {
  const navigate = useNavigate();
  const loaded_draft = {
    ...useAsyncValue(),
    changes: {},
  };
  const [draft, dispatch] = useReducer(baseReducer, loaded_draft);
  const actions = {
    async onPublish() {
      const changes = structuredClone(draft["changes"]);
      if (!!changes["role"]) changes["role_id"] = changes["role"]?.id;
      if (!!changes["status_id"]) changes["status_id"] = changes["status_id"]?.id;
      if (!!changes["contact"]) changes["contactInformation"] = changes["contact"];
      if (!!changes["vendor_category"]) changes["vendor_category_id"] = changes.vendor_category?.id;
      delete changes["vendor_category"];
      delete changes["contact"];
      delete changes["role"]; 

      console.log(changes);
      const updatedEmployee = await updateEmployee(loaded_draft.id, changes);
      navigate(`/employees/${updatedEmployee.id}`);
    },
    onCancel() {
      navigate("/");
    }
  }
  return <TemplateEdit title={[loaded_draft?.first_name, loaded_draft?.last_name].join(" ")}>
    <GeneralCard column="primary" {...draft} dispatch={dispatch} />
    <InformationsCard column="primary" {...draft} dispatch={dispatch} />
    <PaymentsHistoryCard column="primary" {...draft} dispatch={dispatch} />

    <CustomerDetailsCard column="auxilary" {...draft} dispatch={dispatch} />
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
        <SelectedEmployee />
      </Await>
    </Suspense>
  );
};

export default ComponentLoader;