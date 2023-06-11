// import { useEffect, useReducer } from "react";
// import { AiFillMinusSquare, AiFillPlusSquare, AiOutlineInfoCircle, AiOutlineDelete, AiOutlinePlusSquare, AiOutlineSearch } from "react-icons/ai";

// import Select from "react-select";
// import DatePicker from "react-datepicker";
// import AsyncSelect from "react-select/async";

// import Card from "../../components/Card";
// import Radio from "../../components/Radio";
// import Table from "../../components/Table";
// import Button from "../../components/Button";
// import Checkbox from "../../components/Checkbox";
// import GlobalModal from "../../components/GlobalModal";
// import TemplateEdit from "../../components/templates/TemplateEdit";
// import { APPOINTMENT_SHARED, CLASS_NAMES, createStatesNew } from "../../utils/common";
// import { createOrder, getFilteredCustomers, getFilteredEventTypes, getFilteredPackages, getFilteredProducts, getFilteredQuotes, getFilteredServices } from "../../config/httpRequests";
// import { useNavigate } from "react-router-dom";
// import { capitalize } from "lodash";

// const select_classNames = {
//   menu: () => "mt-2 rounded-xl bg-secondary p-2 shadow-x border border-weakeast-contrast",
//   option: () => "px-4 py-2 text-strong-contrast text-sm rounded-xl hover:bg-highlight hover:text-weakest-contrast",
//   control: () => "bg-weakest-contrast px-2 rounded-xl text-sm",
//   placeholder: () => "text-sm text-weak-contrast font-medium font-inter truncate",
// }
// async function searchEventTypes(searchTerm) {
//   function mapper({ id, title }) {
//     return { value: id, label: title };
//   };
//   const { appointmentEvents = [] } = await getFilteredEventTypes(searchTerm);
//   return appointmentEvents.map(mapper);
// }
// function defaultHeadParser(...labels) {
//   const cells = [];
//   for (const label of labels) cells.push({ contentType: "head", contentValue: label });
//   return cells;
// }

// // CARDS
// const GeneralCard = ({ dispatch, title, status, event_type }) => {
//   const states = createStatesNew({
//     title,
//     status: APPOINTMENT_SHARED.getStatus(status),
//     event_type: {
//       value: event_type?.id,
//       label: event_type?.title,
//     },
//   }, { status: "select", event_type: "select" }, dispatch);
//   useEffect(() => states.get("title").set(title), [title]);
//   useEffect(() => states.get("status").set(APPOINTMENT_SHARED.getStatus(status)), [status]);
//   return <Card className="grid grid-cols-3 grid-rows-2 gap-4" isRaw={true}>
//     <div className="flex flex-col gap-2 col-span-3">
//       <label htmlFor="title" className={CLASS_NAMES.label}>Titre</label>
//       <input type="text" name="title" id="title" placeholder="Saisissez une titre pour ce bon..." className={CLASS_NAMES.input} value={states.get("title").value} onChange={states.get("title").onChange} />
//     </div>
//     <div className="flex flex-col gap-2">
//       <label htmlFor="ref_id" className={CLASS_NAMES.label}>Bon de Commande Nº</label>
//       <input type="text" name="ref_id" id="ref_id" placeholder="Ce champs ce remplit aprés la creation..." className={CLASS_NAMES.input} disabled />
//     </div>
//     <div className="flex flex-col gap-2">
//       <div className="relative w-fit">
//         <label htmlFor="type" className={CLASS_NAMES.label + "inline-block"}>Statut</label>
//         <AiOutlineInfoCircle className="absolute top-0 -translate-y-1/4 -right-4 text-xs text-highlight cursor-pointer" />
//       </div>
//       <Select unstyled classNames={select_classNames} options={APPOINTMENT_SHARED.status} value={states.get("status").value} onChange={states.get("status").onChange} />
//     </div>
//     <div className="flex flex-col gap-2">
//       <div className="relative w-fit">
//         <label htmlFor="status" className={CLASS_NAMES.label + "inline-block"}>Type d'événement</label>
//         <AiOutlineInfoCircle className="absolute top-0 -translate-y-1/4 -right-4 text-xs text-highlight cursor-pointer" />
//       </div>
//       <AsyncSelect unstyled classNames={select_classNames} placeholder="Choisir un type d'événement" defaultOptions={true} loadOptions={searchEventTypes} value={states.get("event_type").value} onChange={states.get("event_type").onChange} />
//     </div>
//   </Card>
// }

// const ReceiptArticles = ({ packages = [], services = [], products = [], dispatch }) => {
//   function format_list_to_row(target, list) {
//     function onChange(event, id) {
//       const quantity_str = event.target.value ?? "1";
//       const quantity = parseInt(quantity_str);
//       dispatch({
//         __id: id,
//         __key: "quantity",
//         __type: "edit",
//         __target: target,
//         __value: quantity,
//       });
//     }
//     function removeArticle(id) {
//       return () => {
//         dispatch({
//           __id: id,
//           __type: "remove",
//           __target: target,
//         });
//       }
//     }
//     return list.map((element) => [
//       { contentType: "text", contentValue: element.title },
//       { contentType: "text", contentValue: [element.price?.toFixed(2), "MAD"].reverse().join(" ") },
//       { contentType: "wrapped", contentValue: <input type="number" className={CLASS_NAMES.input} onChange={(event) => onChange(event, element.id)} value={element.quantity} /> },
//       { contentType: "text", contentValue: [(element.price * (element.quantity ?? 1)).toFixed(2), "MAD"].join(" "), className: "text-right" },
//       { contentType: "wrapped", contentValue: <AiOutlineDelete onClick={removeArticle(element.id)} className="cursor-pointer duration-300 transition-colors text-strong-contrast hover:text-red-600" /> , className: "text-right" },
//     ]);
//   }
//   const table_args = {
//     isCompact: true,
//     head: [...defaultHeadParser("Désignation", "Prix", "Quantité"), { contentType: "head", contentValue: "Total", className: "text-right" }],
//     rows: [
//       ...format_list_to_row("products", products),
//       ...format_list_to_row("services", services),
//       ...format_list_to_row("packages", packages),
//     ],
//   };
//   return <Table {...table_args} className="border-spacing-x-2" />
// }
// const ReceiptCost = ({ tax, discount, shipping, sub_total, discount_is_percentage, onModal }) => {
//   const tax_display = tax?.toFixed(2) ?? "0.00";
//   const shipping_display = shipping?.toFixed(2) ?? "0.00";
//   const discount_display = [discount?.toFixed(2) ?? "0.00", discount_is_percentage ? "%" : "MAD"].join(" ");
//   const sub_total_display = sub_total?.toFixed(2) ?? "0.00";

//   let total = sub_total;
//   if (discount_is_percentage) total -= (sub_total / 100) * discount;
//   else total -= discount;
//   total += shipping;
//   total += (total / 100) * tax;

//   const total_display = total?.toFixed(2) ?? "0.00";


//   return <div className="w-full grid grid-cols-[1fr_auto_1fr] grid-rows-4 items-center">
//     <h4 className="font-semibold text-weak-contrast py-2">Total partiel</h4>
//     <h4 className="text-sm text-strong-contrast text-right col-start-3">{sub_total_display} MAD</h4>

//     <Button onClick={() => onModal("discount")} type="soft" className="px-0 hover:bg-transparent" textClassName="font-medium text-roboto text-highlight text-base" textContent="Ajouter une réduction" />
//     <h4 className="font-semibold text-weak-contrast">-</h4>
//     <h4 className="text-sm text-strong-contrast text-right">{discount_display}</h4>

//     <Button onClick={() => onModal("shipping")} type="soft" className="px-0 hover:bg-transparent" textClassName="font-medium text-roboto text-highlight text-base text-left" textContent="Ajouter des frais d'expédition" />
//     <h4 className="font-semibold text-weak-contrast">-</h4>
//     <h4 className="text-sm text-strong-contrast text-right">{shipping_display} MAD</h4>

//     <Button onClick={() => onModal("tax")} type="soft" className="px-0 hover:bg-transparent" textClassName="font-medium text-roboto text-highlight text-base" textContent="TVA Éstime" />
//     <h4 className="font-semibold text-weak-contrast">Non Calculé</h4>
//     <h4 className="text-sm text-strong-contrast text-right">{tax_display} %</h4>
//     <span className="col-start-1 h-4"></span>
//     <h4 className="font-semibold text-strong-contrast col-start-1">Total</h4>
//     <h4 className="text-sm text-strong-contrast text-right col-start-3">{total_display} MAD</h4>
//   </div>
// }
// /**
//  * 
//  * @param {{
//  *    products: Array<any>,
//  *    services: Array<any>,
//  *    packages: Array<any>,
//  *    tax: number,
//  *    shipping: number,
//  *    discount: number,
//  *    discount_is_percentage: boolean,
//  *    onModal: (key: "tax" | "shipping" | "discount" | "quote" | "article") => void
//  * }} param0 
//  * @returns 
//  */
// const ReceiptCard = ({ products = [], services = [], packages = [], tax, shipping, discount, discount_is_percentage, onModal, dispatch }) => {
//   const receipt_empty = (products?.length + services?.length + packages?.length) === 0;
//   let sub_total = products.reduce((prev, x) => prev + (x.price * (x.quantity ?? 1)), 0);
//   sub_total += services.reduce((prev, x) => prev + (x.price * (x.quantity ?? 1)), 0);
//   sub_total += packages.reduce((prev, x) => prev + (x.price * (x.quantity ?? 1)), 0);
//   const cost_args = { tax, discount, shipping, discount_is_percentage, sub_total, onModal };
//   return <Card className="gap-4 min-h-[256px]">
//     <div className="flex items-center justify-between">
//       <h1>Détails de la facture</h1>
//       <div className="flex items-center gap-4">
//         <Button onClick={() => onModal("quote")} type="soft" textContent="Importer" />
//         <Button onClick={() => onModal("article")} textContent="Ajouter un article" />
//       </div>
//     </div>
//     {
//       receipt_empty
//         ? <h1 className="font-roboto text-center text-highlight text-lg m-auto">Ajouter des articles a cette facture...</h1>
//         : <ReceiptArticles packages={packages} services={services} products={products} dispatch={dispatch} />
//     }
//     {(!receipt_empty) && <hr className="border-none" />}
//     {(!receipt_empty) && <ReceiptCost {...cost_args} />}
//   </Card>
// }

// const CustomerCard = ({ onModify, customer }) => {
//   const value_class_name = "font-inter text-strong-contrast text-sm";
//   const label_class_name = "font-inter text-strong-contrast text-sm font-bold";
//   const full_name = !!(customer?.hasOwnProperty("first_name")) ? [customer.first_name, customer.last_name].join(" ") : null;
//   return <Card>
//     <div className="flex items-center justify-between">
//       <h1 className={CLASS_NAMES.label}>Données du client</h1>
//       <Button type="soft" textContent="Modifier" textClassName="text-highlight font-bold" onClick={onModify} />
//     </div>
//     {
//       (!!customer) ?
//         <div className="grid grid-cols-[auto_1fr] items-center gap-4">
//           <label className={label_class_name}>Nom Complet</label>
//           <h4 className={value_class_name}>{full_name ?? "Mohamed Ali Clay"}</h4>
//           <label className={label_class_name}>Tél.</label>
//           <h4 className={value_class_name}>{customer.contact?.phone}</h4>
//           <label className={label_class_name}>Email</label>
//           <h4 className={value_class_name}>{customer.contact?.email}</h4>
//           <label className={label_class_name}>Addresse</label>
//           <h4 className={value_class_name}>{customer.contact?.address}</h4>
//         </div> :
//         <h1 className="text-sm text-center text-highlight font-medium font-inter">Veuillez sélectionner un client pour cette facture</h1>
//     }
//   </Card>
// }
// const DatesCard = ({ dispatch, due_date }) => {
//   const states = createStatesNew({ created_at: new Date(), due_date: new Date(due_date) }, { created_at: "datepicker", due_date: "datepicker" }, dispatch);
//   const label_class_name = "font-inter text-strong-contrast text-sm font-bold";
//   const datepicker_class_name = "font-inter text-strong-contrast text-sm font-medium bg-weakest-contrast rounded-xl disabled:cursor-not-allowed py-2 px-4 w-full text-center";
//   return <Card>
//     <h1 className={CLASS_NAMES.label}>Dates</h1>
//     <div className="grid grid-cols-2 items-center gap-4">
//       <label className={label_class_name}>Date de Création</label>
//       <DatePicker className={datepicker_class_name} selected={states.get("created_at").value} onChange={states.get("created_at").onChange} disabled />
//       <label className={label_class_name}>Date d'Échéance</label>
//       <DatePicker className={datepicker_class_name} selected={states.get("due_date").value} onChange={states.get("due_date").onChange} />
//     </div>
//   </Card>
// }
// const DeliveryCard = ({ dispatch, delivery_address }) => {
//   const states = createStatesNew({ delivery_address }, {}, dispatch);
//   return <Card>
//     <label htmlFor="delivery_address" className={CLASS_NAMES.label}>Adresse de livraison</label>
//     <input
//       type="text"
//       name="delivery_address"
//       id="delivery_address"
//       className={CLASS_NAMES.input}
//       onChange={states.get("delivery_address").onChange}
//       value={states.get("delivery_address").value}
//       placeholder="Saisissez une addresse de livraison"
//     />
//   </Card>
// }
// const PaymentCard = ({ dispatch, payment_method, amount_paid, price = amount_paid }) => {
//   const _payment_method = APPOINTMENT_SHARED.getPaymentMethod(payment_method);
//   const states = createStatesNew({ payment_method: _payment_method, amount_paid, rest: parseInt(price) - parseInt(amount_paid) }, { payment_method: "select" }, dispatch);
//   useEffect(() => {
//     let amount_paid = parseInt(states.get("amount_paid").value);
//     if (amount_paid > price) amount_paid = price;
//     if (amount_paid < 0) amount_paid = 0;
//     states.get("rest").set(parseInt(price) - amount_paid);
//     states.get("amount_paid").set(amount_paid);
//   }, [states.get("amount_paid").value])
//   useEffect(() => {
//     states.get("rest").set(parseInt(price) - parseInt(states.get("amount_paid").value));
//   }, [price])
//   const label_class_name = "font-inter text-strong-contrast text-sm font-bold";
//   return <Card>
//     <h1 className={CLASS_NAMES.label}>Paiement</h1>
//     <div className="grid grid-cols-2 items-center gap-4">
//       <label className={`${label_class_name} col-span-2`}>Methode de Paiement</label>
//       <Select unstyled classNames={{ ...select_classNames, container: () => "col-span-2" }} options={APPOINTMENT_SHARED.payment_methods} value={states.get("payment_method").value} onChange={states.get("payment_method").onChange} />
//       <label htmlFor="paid" className={label_class_name}>Payé</label>
//       <label htmlFor="remainder" className={label_class_name}>Reste</label>
//       <div className="relative w-full h-fit">
//         <input value={states.get("amount_paid").value} onChange={states.get("amount_paid").onChange} className={CLASS_NAMES.input + " w-[inherit] pl-12"} type="number" name="paid" id="paid" />
//         <span className="absolute top-1/2 -translate-y-1/2 left-2 leading-none text-highlight font-roboto font-semibold text-sm">MAD</span>
//       </div>
//       <div className="relative w-full h-fit">
//         <input value={states.get("rest").value} className={CLASS_NAMES.input + " w-[inherit] pl-12"} type="number" name="remainder" id="remainder" disabled />
//         <span className="absolute top-1/2 -translate-y-1/2 left-2 leading-none text-highlight font-roboto font-semibold text-sm">MAD</span>
//       </div>
//     </div>
//   </Card>
// }
// const ActionCard = ({ onPublish, onCancel }) => {
//   return <Card isRaw={true} className="flex justify-end items-center gap-4 mt-auto">
//     <Button onClick={onCancel} type="soft" textContent="Annuler" />
//     <Button onClick={onPublish} textContent="Publier" />
//   </Card>
// }

// // MODALS
// const CustomerModal = ({ show, customer, onSubmit, onClose }) => {
//   const [state, dispatch] = useReducer((state, actions) => {
//     const newState = structuredClone(state);
//     for (const action in actions) newState[action] = actions[action];
//     return newState;
//   }, {
//     selected: customer,

//     searchTerm: "",
//     searchValid: false,
//     searchValidMessage: "Empty search term",
//     searchResult: [],
//   });

//   async function onSearch(event) {
//     const searchTerm = event.target.value;
//     if (searchTerm.length === 0) {
//       dispatch({ searchTerm, searchValid: false, searchValidMessage: "Empty search term" });
//       return;
//     }
//     const { customers } = await getFilteredCustomers(searchTerm, { contact: true });
//     if (customers.length === 0) {
//       dispatch({ searchTerm, searchValid: false, searchValidMessage: "Search term yields no results." });
//       return;
//     }
//     dispatch({ searchTerm, searchValid: true, searchResult: customers });
//   }

//   const CustomerResults = ({ message, selected, valid = true, customers = [] }) => {
//     if (!valid) return <h1 className="font-roboto font-medium text-center text-highlight">{message}</h1>
//     const rows = customers.map((customer) => {
//       const { id, first_name, last_name } = customer;
//       return <tr key={id}>
//         <td>{[first_name, last_name].join(" ")}</td>
//         <td>
//           <input type="radio" name="customer_picker" id={`customer_picker_${id}`} checked={selected?.id === id} onChange={() => dispatch({ selected: customer })} />
//         </td>
//       </tr>
//     });
//     return <table>
//       <thead className="font-bold text-base font-asap text-highlight">
//         <tr>
//           <th className="text-left">NOM COMPLET</th>
//           <th></th>
//         </tr>
//       </thead>
//       <tbody>
//         {rows}
//       </tbody>
//     </table>
//   }

//   function _onSubmit() {
//     const { id = null } = state.selected;
//     onSubmit(id, state.selected);
//     onClose();
//   }

//   function _onCancel() {
//     dispatch({
//       selected: customer,

//       searchTerm: "",
//       searchValid: false,
//       searchValidMessage: "Empty search term",
//     });
//     onClose();
//   }

//   return <GlobalModal show={show} className="flex flex-col gap-4 min-w-[50vw]">
//     <h2 className="font-asap font-bold text-strong-contrast">CHANGEMENT DE CLIENT</h2>
//     <div className="relative w-full">
//       <input type="text" name="searchTerm" id="searchTerm" placeholder="Chercher votre client..." className={CLASS_NAMES.input + " pl-12 w-full"} value={state.searchTerm} onChange={onSearch} />
//       <AiOutlineSearch className="absolute top-1/2 -translate-y-1/2 text-2xl left-4 text-highlight" />
//     </div>
//     <CustomerResults valid={state.searchValid} message={state.searchValidMessage} customers={state.searchResult} selected={state.selected} />
//     <hr className="border-weakest-contrast" />
//     <div className="flex justify-end items-center gap-4">
//       <Button onClick={_onCancel} type="soft" textContent="Annuler" />
//       <Button disabled={!(state.selected)} onClick={_onSubmit} textContent="Appliquer" />
//     </div>
//   </GlobalModal>
// }
// const ArticleModal = ({ show, products = [], packages = [], services = [], onClose, dispatch: draft_dispatch }) => {
//   const [state, dispatch] = useReducer((state, action) => {
//     const new_state = structuredClone(state);
//     switch (action["__type"]) {
//       case "add": {
//         const { __target, __value } = action;
//         new_state[__target]?.push(__value);
//       } break;
//       case "remove": {
//         const { __target, __id } = action;
//         new_state[__target] = new_state[__target]?.filter(({ id }) => id !== __id);
//       } break;
//       default:
//         for (const field in action) new_state[field] = action[field];
//     }
//     return new_state;
//   }, {
//     selected: null,

//     searchTerm: "",
//     searchValid: false,
//     searchValidMessage: "Empty search term",
//     searchResult: [],

//     products,
//     packages,
//     services,
//   });

//   /**
//    * 
//    * @param {{target: {value: string}}} event 
//    * @returns 
//    */
//   async function onSearch(event) {
//     const searchTerm = event.target.value;
//     if (searchTerm.length === 0) {
//       dispatch({ searchTerm, searchValid: false, searchValidMessage: "Empty search term" });
//       return;
//     }

//     const promise_products = getFilteredProducts(searchTerm);
//     const promise_services = getFilteredServices(searchTerm);
//     const promise_packages = getFilteredPackages(searchTerm);
//     const response_articles = await Promise.allSettled([promise_products, promise_services, promise_packages]);

//     for (const article of response_articles) if (article.status === "rejected") throw article.reason;

//     const [fulfilled_products, fulfilled_services, fulfilled_packages] = response_articles;
//     const { value: { products } } = fulfilled_products;
//     const { value: { services } } = fulfilled_services;
//     const { value: { packages } } = fulfilled_packages;

//     const articles = [];
//     articles.push(
//       ...products.map((product) => ({ key: "product", product })),
//       ...services.map((service) => ({ key: "service", service })),
//       ...packages.map((_package) => ({ key: "package", package: _package })),
//     );

//     if (articles.length === 0) {
//       dispatch({ searchTerm, searchValid: false, searchValidMessage: "Search term yields no results." });
//       return;
//     }
//     dispatch({ searchTerm, searchValid: true, searchResult: articles });
//   }

//   const ArticleQuery = ({ message, valid = true, articles = [] }) => {
//     if (!valid) return <h1 className="font-roboto font-medium text-center text-highlight">{message}</h1>

//     /**
//      * 
//      * @param {"products" | "services" | "packages"} __target 
//      * @param {*} __article 
//      */
//     function addArticle(__target, __article) {
//       dispatch?.({
//         __type: "add",
//         __target,
//         __value: __article,
//       });
//     }
//     const rows = articles.map((article) => {
//       const { key } = article;
//       const { id, title, price } = article[key];
//       return <tr key={[id, key, "query"].join("-")}>
//         <td className="text-2xl text-left">
//           <AiFillPlusSquare onClick={() => addArticle(key + "s", article[key])} className="inline-block m-0 cursor-pointer text-highlight/90 hover:text-highlight duration-150 transition-colors" />
//         </td>
//         <td>{title}</td>
//         <td>{capitalize(key)}</td>
//         <td className="text-right">{[price?.toFixed(2), "MAD"].join(" ")}</td>
//       </tr>
//     });
//     return <table className="border-separate border-spacing-2">
//       <thead className="font-bold text-base font-asap text-highlight">
//         <tr>
//           <th></th>
//           <th className="text-left">TITRE</th>
//           <th className="text-left">CATEGORIE</th>
//           <th className="text-right">PRIX</th>
//         </tr>
//       </thead>
//       <tbody>
//         {rows}
//       </tbody>
//     </table>
//   }

//   const ArticleManage = ({ products = [], packages = [], services = [] }) => {
//     const articles = [];
//     articles.push(
//       ...products.map((product) => ({ key: "product", product })),
//       ...services.map((service) => ({ key: "service", service })),
//       ...packages.map((p1ckage) => ({ key: "package", package: p1ckage })), // Intentional misspelling to avoid conflict with js `package` keyword.
//     );
//     function removeArticle(__target, __id) {
//       dispatch?.({
//         __type: "remove",
//         __target,
//         __id,
//       });
//     }
//     const rows = articles.map((article) => {
//       const { key } = article;
//       const { id, title, price } = article[key];
//       return <tr key={[id, key, "manage"].join("-")}>
//         <td className="text-2xl text-left">
//           <AiFillMinusSquare onClick={() => removeArticle(key + "s", id)} className="inline-block m-0 cursor-pointer text-red-800/90 hover:text-red-800 duration-150 transition-colors" />
//         </td>
//         <td>{title}</td>
//         <td>{capitalize(key)}</td>
//         <td className="text-right">{[price?.toFixed(2), "MAD"].join(" ")}</td>
//       </tr>
//     });
//     return <table className="border-separate border-spacing-2">
//       <thead className="font-bold text-base font-asap text-highlight">
//         <tr>
//           <th></th>
//           <th className="text-left">TITRE</th>
//           <th className="text-left">CATEGORIE</th>
//           <th className="text-right">PRIX</th>
//         </tr>
//       </thead>
//       <tbody>
//         {rows}
//       </tbody>
//     </table>
//   }

//   function _onSubmit() {
//     // const { id = null } = state.selected;
//     const { products: new_products, packages: new_packages, services: new_services } = state;
//     const to_add = {
//       products: [],
//       packages: [],
//       services: [],
//     };
//     for (let i = 0; i < products?.length ?? 0; i++) {
//       const { id } = products[i];
//       const existing_id = new_products.findIndex((product) => product.id === id);
//       if (existing_id === -1) to_add["products"].push(products[i]);
//       else new_products[existing_id].quantity = products[i].quantity;
//     }
//     for (let i = 0; i < services?.length ?? 0; i++) {
//       const { id } = services[i];
//       const existing_id = new_services.findIndex((service) => service.id === id);
//       if (existing_id === -1) to_add["services"].push(services[i]);
//       else new_services[existing_id].quantity = services[i].quantity;
//     }
//     for (let i = 0; i < packages?.length ?? 0; i++) {
//       const { id } = packages[i];
//       const existing_id = new_packages.findIndex((_package) => _package.id === id);
//       if (existing_id === -1) to_add["packages"].push(packages[i]);
//       else new_packages[existing_id].quantity = packages[i].quantity;
//     }
//     new_products.push(...to_add["products"]);
//     new_packages.push(...to_add["packages"]);
//     new_services.push(...to_add["services"]);
//     draft_dispatch?.({ products: new_products, packages: new_packages, services: new_services });
//     onClose();
//   }

//   function _onCancel() {
//     dispatch({
//       selected: null,

//       searchTerm: "",
//       searchValid: false,
//       searchValidMessage: "Empty search term",
//     });
//     onClose();
//   }

//   return <GlobalModal show={show} className="flex flex-col gap-4 min-w-[50vw]">
//     <h2 className="font-asap font-bold text-strong-contrast">AJOUTER DES ARTICLES</h2>
//     <div className="relative w-full">
//       <input type="text" name="searchTerm" id="searchTerm" placeholder="Chercher votre client..." className={CLASS_NAMES.input + " pl-12 w-full"} value={state.searchTerm} onChange={onSearch} />
//       <AiOutlineSearch className="absolute top-1/2 -translate-y-1/2 text-2xl left-4 text-highlight" />
//     </div>
//     <ArticleQuery valid={state.searchValid} message={state.searchValidMessage} articles={state.searchResult} />
//     <hr className="border-weakest-contrast" />
//     {
//       ((state.products?.length + state.packages?.length + state.services?.length) > 0) && <ArticleManage {...state} />
//     }
//     <div className="flex justify-end items-center gap-4">
//       <Button onClick={_onCancel} type="soft" textContent="Annuler" />
//       <Button onClick={_onSubmit} textContent="Appliquer" />
//     </div>
//   </GlobalModal>
// }
// const QuoteModal = ({ show, products = [], services = [], packages = [], quote = null, dispatch: draft_dispatch, onSubmit, onClose }) => {
//   const [state, dispatch] = useReducer((state, action) => {
//     const new_state = structuredClone(state);
//     switch (action["__type"]) {
//       // case "add": {
//       //   const { __target, __value } = action;
//       //   new_state[__target]?.push(__value);
//       // } break;
//       // case "remove": {
//       //   const { __target, __id } = action;
//       //   new_state[__target] = new_state[__target]?.filter(({ id }) => id !== __id);
//       // } break;
//       default:
//         for (const field in action) new_state[field] = action[field];
//     }
//     return new_state;
//   }, {
//     selected: null,

//     searchTerm: "",
//     searchValid: false,
//     searchValidMessage: "Empty search term",
//     searchResult: [],
//   });

//   /**
//    * 
//    * @param {{target: {value: string}}} event 
//    * @returns 
//    */
//   async function onSearch(event) {
//     const searchTerm = event.target.value;
//     if (searchTerm.length === 0) {
//       dispatch({ searchTerm, searchValid: false, searchValidMessage: "Empty search term" });
//       return;
//     }

//     const include = {
//       products: {
//         include: {
//           product: true,
//         }
//       },
//       services: {
//         include: {
//           service: true,
//         }
//       },
//       packages: {
//         include: {
//           package: true,
//         }
//       },
//     }
//     const { quotes } = await getFilteredQuotes(searchTerm, include);

//     if (quotes.length === 0) {
//       dispatch({ searchTerm, searchValid: false, searchValidMessage: "Search term yields no results." });
//       return;
//     }
//     dispatch({ searchTerm, searchValid: true, searchResult: quotes });
//   }

//   const QuotesQuery = ({ message, selected, valid = true, quotes = [] }) => {
//     if (!valid) return <h1 className="font-roboto font-medium text-center text-highlight">{message}</h1>
//     const rows = quotes.map((quote) => {
//       const { id, title, price } = quote;
//       return <tr key={id}>
//         <td>{title}</td>
//         <td className="text-right">{[price?.toFixed(2), "MAD"].join(" ")}</td>
//         <td>
//           <input type="radio" name="customer_picker" id={`customer_picker_${id}`} checked={selected?.id === id} onChange={() => dispatch({ selected: quote })} />
//         </td>
//       </tr>
//     });
//     return <table className="border-separate border-spacing-2">
//       <thead className="font-bold text-base font-asap text-highlight">
//         <tr>
//           <th className="text-left">TITRE</th>
//           <th className="text-right">PRIX</th>
//           <th></th>
//         </tr>
//       </thead>
//       <tbody>
//         {rows}
//       </tbody>
//     </table>
//   }

//   // const ArticleManage = ({ products = [], packages = [], services = [] }) => {
//   //   const articles = [];
//   //   articles.push(
//   //     ...products.map((product) => ({ key: "product", product })),
//   //     ...services.map((service) => ({ key: "service", service })),
//   //     ...packages.map((p1ckage) => ({ key: "package", package: p1ckage })), // Intentional misspelling to avoid conflict with js `package` keyword.
//   //   );
//   //   function removeArticle(__target, __id) {
//   //     dispatch?.({
//   //       __type: "remove",
//   //       __target,
//   //       __id,
//   //     });
//   //   }
//   //   const rows = articles.map((article) => {
//   //     const { key } = article;
//   //     const { id, title, price } = article[key];
//   //     return <tr key={[id, key, "manage"].join("-")}>
//   //       <td className="text-2xl text-left">
//   //         <AiFillMinusSquare onClick={() => removeArticle(key + "s", id)} className="inline-block m-0 cursor-pointer text-red-800/90 hover:text-red-800 duration-150 transition-colors" />
//   //       </td>
//   //       <td>{title}</td>
//   //       <td>{capitalize(key)}</td>
//   //       <td className="text-right">{[price?.toFixed(2), "MAD"].join(" ")}</td>
//   //     </tr>
//   //   });
//   //   return <table className="border-separate border-spacing-2">
//   //     <thead className="font-bold text-base font-asap text-highlight">
//   //       <tr>
//   //         <th></th>
//   //         <th className="text-left">TITRE</th>
//   //         <th className="text-left">CATEGORIE</th>
//   //         <th className="text-right">PRIX</th>
//   //       </tr>
//   //     </thead>
//   //     <tbody>
//   //       {rows}
//   //     </tbody>
//   //   </table>
//   // }

//   function _onSubmit() {
//     const quote = state.selected;
//     const { products: new_products_interface, packages: new_packages_interface, services: new_services_interface } = quote;
//     const new_products = new_products_interface.map(({ product, quantity }) => ({ ...product, quantity }));
//     const new_packages = new_packages_interface.map(({ element }) => element);
//     const new_services = new_services_interface.map(({ element }) => element);
//     const to_add = [];
//     for (let i = 0; i < products?.length ?? 0; i++) {
//       const { id } = products[i];
//       const existing_id = new_products.findIndex((product) => product.id === id);
//       if (existing_id === -1) to_add.push(products[i]);
//       else new_products[existing_id].quantity = products[i].quantity;
//     }
//     new_products.push(...to_add);
//     draft_dispatch?.({ quote, products: new_products, packages: new_packages, services: new_services });
//     onClose();
//   }

//   function _onCancel() {
//     dispatch({
//       selected: null,

//       searchTerm: "",
//       searchValid: false,
//       searchValidMessage: "Empty search term",
//     });
//     onClose();
//   }

//   return <GlobalModal show={show} className="flex flex-col gap-4 min-w-[50vw]">
//     <h2 className="font-asap font-bold text-strong-contrast">IMPORTER UN DEVIS</h2>
//     <div className="relative w-full">
//       <input type="text" name="searchTerm" id="searchTerm" placeholder="Chercher untte commande..." className={CLASS_NAMES.input + " pl-12 w-full"} value={state.searchTerm} onChange={onSearch} />
//       <AiOutlineSearch className="absolute top-1/2 -translate-y-1/2 text-2xl left-4 text-highlight" />
//     </div>
//     <QuotesQuery valid={state.searchValid} message={state.searchValidMessage} quotes={state.searchResult} selected={state.selected} />
//     <hr className="border-weakest-contrast" />
//     <div className="flex justify-end items-center gap-4">
//       <Button onClick={_onCancel} type="soft" textContent="Annuler" />
//       <Button onClick={_onSubmit} textContent="Appliquer" />
//     </div>
//   </GlobalModal>
// }
// const DiscountModal = ({ show, discount = 0, discount_is_percentage = false, onSubmit, onClose }) => {
//   const discount_options = [
//     { value: true, label: "Pourcentage" },
//     { value: false, label: "Montant" },
//   ];
//   const discount_option = discount_options.find(({ value }) => value === discount_is_percentage);

//   const states = createStatesNew({ discount_option, discount }, { discount_option: "select" });

//   useEffect(() => {
//     const is_percentage = states.get("discount_option").value.value;
//     let discount = parseInt(states.get("discount").value);
//     if (is_percentage && discount > 100) discount = 100;
//     if (discount < 0) discount = 0;
//     states.get("discount").set(discount);
//   }, [states.get("discount").value, states.get("discount_option").value.value])

//   function _onSubmit() {
//     const discount_is_percentage = states.get("discount_option").value?.value;
//     const discount = parseInt(states.get("discount").value);
//     onSubmit(discount, discount_is_percentage);
//     onClose();
//   }
//   function _onClose() {
//     onClose();
//   }
//   return <GlobalModal show={show} className="flex flex-col gap-4 min-w-[50vw]">
//     <h2 className="font-asap font-bold text-strong-contrast">CHANGEMENT DE RÉDUCTION</h2>
//     <hr className="border-weakest-contrast" />
//     <div className="grid grid-cols-2 gap-4">
//       <div className="flex flex-col gap-4">
//         <label htmlFor="discount_type">Type de réduction</label>
//         <Select id="discount_type" unstyled classNames={select_classNames} options={discount_options} value={states.get("discount_option").value} onChange={states.get("discount_option").onChange} />
//       </div>
//       <div className="flex flex-col gap-4">
//         <label htmlFor="discount_value">Valeur de la réduction</label>
//         <div className="w-full relative">
//           <input type="number" name="discount_value" id="discount_value" className={CLASS_NAMES.input + ` w-full pl-${states.get("discount_option").value?.value ? "8" : "16"}`} value={states.get("discount").value} onChange={states.get("discount").onChange} />
//           <label htmlFor="discount_value" className="absolute top-1/2 -translate-y-1/2 left-4 font-inter font-semibold text-sm">{states.get("discount_option").value?.value ? "%" : "MAD"}</label>
//         </div>
//       </div>
//       <div className="flex flex-col gap-4 col-span-2">
//         <label htmlFor="discount_value">Motif</label>
//         <input type="text" name="discount_motif" id="discount_motif" className={CLASS_NAMES.input} placeholder="Saisissez un motif pour cette réduction..." />
//       </div>
//     </div>
//     <hr className="border-weakest-contrast" />
//     <div className="flex justify-end items-center gap-4">
//       <Button onClick={_onClose} type="soft" textContent="Annuler" />
//       <Button onClick={_onSubmit} textContent="Appliquer" />
//     </div>
//   </GlobalModal>
// }
// const ShippingModal = ({ show, shipping = 0, onSubmit, onClose }) => {
//   const shipping_mode_options = [
//     { id: "free", label: "Expédition Gratuit (Sans frais de livraison)" },
//     { id: "custom", label: "Personalisée" },
//   ];
//   const states = createStatesNew({ shipping_mode: shipping === 0 ? "free" : "custom", shipping: 0 });

//   useEffect(() => {
//     const shipping = parseInt(states.get("shipping").value);
//     if (shipping < 0) states.get("shipping").set(0);
//   }, [states.get("shipping").value]);

//   useEffect(() => {
//     const shipping_mode = states.get("shipping_mode").value;
//     if (shipping_mode === "free") states.get("shipping").set(0);
//   }, [states.get("shipping_mode").value]);

//   function _onSubmit() {
//     const shipping = parseInt(states.get("shipping").value);
//     onSubmit(shipping);
//     onClose();
//   }
//   function _onClose() {
//     onClose();
//   }
//   return <GlobalModal show={show} className="flex flex-col gap-4 min-w-[50vw]">
//     <h2 className="font-asap font-bold text-strong-contrast">CHANGEMENT DE LIVRAISON</h2>
//     <hr className="border-weakest-contrast" />
//     <Radio group="shipping_mode" options={shipping_mode_options} onChange={states.get("shipping_mode").set} selected={states.get("shipping_mode").value} />
//     {
//       (states.get("shipping_mode").value === "custom")
//       &&
//       <div className="grid grid-cols-2 gap-4 items-center">
//         <div className="flex flex-col gap-2">
//           <label htmlFor="shipping_name">Nom du tarif</label>
//           <input type="text" name="shipping_name" id="shipping_name" className={CLASS_NAMES.input + " w-full"} placeholder="Saisissez un nom pour ce tarif..." />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label htmlFor="shipping">Prix</label>
//           <div className="w-full relative">
//             <input type="number" name="shipping" id="shipping" className={CLASS_NAMES.input + " w-full pl-16"} value={states.get("shipping").value} onChange={states.get("shipping").onChange} />
//             <label htmlFor="shipping" className="absolute top-1/2 -translate-y-1/2 left-4 font-inter font-semibold text-sm">MAD</label>
//           </div>
//         </div>
//       </div>
//     }
//     <hr className="border-weakest-contrast" />
//     <div className="flex justify-end items-center gap-4">
//       <Button onClick={_onClose} type="soft" textContent="Annuler" />
//       <Button onClick={_onSubmit} textContent="Appliquer" />
//     </div>
//   </GlobalModal>
// }
// const TaxModal = ({ show, tax = 0, onSubmit, onClose }) => {
//   const tax_options = [
//     { id: 0, label: "0%" },
//     { id: 10, label: "10%" },
//     { id: 20, label: "20%" },
//   ];
//   const states = createStatesNew({ tax });

//   function _onSubmit() {
//     const tax = parseInt(states.get("tax").value);
//     onSubmit(tax);
//     onClose();
//   }
//   function _onClose() {
//     onClose();
//   }
//   return <GlobalModal show={show} className="flex flex-col gap-4 min-w-[50vw]">
//     <h2 className="font-asap font-bold text-strong-contrast">CHANGEMENT DE LIVRAISON</h2>
//     <hr className="border-weakest-contrast" />
//     <Radio group="tax" options={tax_options} onChange={states.get("tax").set} selected={states.get("tax").value} />
//     <hr className="border-weakest-contrast" />
//     <div className="flex justify-end items-center gap-4">
//       <Button onClick={_onClose} type="soft" textContent="Annuler" />
//       <Button onClick={_onSubmit} textContent="Appliquer" />
//     </div>
//   </GlobalModal>
// }

// // PAGES
// export const NewOrder_Customer = () => {
//   const navigate = useNavigate();

//   function calculateTotal({ products = [], packages = [], services = [], discount, tax, shipping, discount_is_percentage }) {
//     const price_reducer = (prev, x) => prev + (x.price * (x.quantity ?? 1));
//     const sub_total = [...products, ...packages, ...services].reduce(price_reducer, 0);
//     const _discount = discount_is_percentage ? ((sub_total / 100) * discount) : (discount);
//     const total = ((sub_total - _discount) + shipping) * (1 + (tax / 100));
//     return total;
//   }

//   function defaultReducer(state, action) {
//     const new_state = structuredClone(state);
//     switch (action["__type"]) {
//       case "edit": {
//         const { __id, __target, __key, __value } = action;
//         const index = new_state[__target]?.findIndex(({ id }) => id === __id);
//         new_state[__target][index][__key] = __value;
//         action[__target] = true;
//       } break;
//       case "remove": {
//         const { __id, __target } = action;
//         new_state[__target] = new_state[__target]?.filter(({ id }) => id !== __id);
//         action[__target] = true;
//       } break;
//       default:
//         for (const field in action) new_state[field] = action[field];
//     }
//     if (
//       !!action["tax"] || !!action["discount"] || !!action["discount_is_percentage"] || !!action["shipping"] ||
//       !!action["products"] || !action["services"] || !!action["packages"]
//     ) {
//       new_state["price"] = calculateTotal(new_state);
//     }
//     return new_state;
//   }
//   function modalsReducer(state, action) {
//     const newState = structuredClone(state);
//     for (const key in newState) newState[key] = !!(action?.[key]);
//     return newState;
//   }
//   const loadedDraft = {
//     title: "",
//     delivery_address: "",
//     status: 1,
//     customer_id: null,
//     customer: null,
//     quote_id: null,
//     quote: null,
//     price: 0,
//     amount_paid: 0,
//     payment_method: "espece",
//     tax: 0,
//     shipping: 0,
//     discount: 0,
//     discount_is_percentage: false,
//     due_date: "2023-03-22T17:18:42.000Z",
//     products: [],
//     services: [],
//     packages: []
//   }
//   const loadedModals = { customer: false, quote: false, discount: false, shipping: false, tax: false, article: false };
//   const [draft, dispatchDraft] = useReducer(defaultReducer, loadedDraft);
//   const [modals, dispatchModals] = useReducer(modalsReducer, loadedModals);


//   function cancelChanges() { dispatchDraft(loadedDraft) }
//   function onModify_Customer() { dispatchModals({ customer: true }) }
//   function onModal_Dynamic(key) { dispatchModals({ [key]: true }) }

//   function onSubmit_Customer(customer_id, customer) { dispatchDraft({ customer, customer_id }) }
//   function onSubmit_Discount(discount, discount_is_percentage) { dispatchDraft({ discount, discount_is_percentage }) }
//   function onSubmit_Shipping(shipping) { dispatchDraft({ shipping }) }
//   function onSubmit_Tax(tax) { dispatchDraft({ tax }) }
//   function onSubmit_Quote(quote_id, quote) {
//     if (!!quote) {
//       const products = quote.products.map(({ product, quantity }) => { return { ...product, quantity } });
//       const price = products.reduce((prev, x) => prev + (x.quantity * x.price), 0);

//       dispatchDraft({ quote, quote_id, products, price });
//     } else {
//       dispatchDraft({ quote, quote_id })
//     }
//   }
//   async function publishChanges() {
//     const extractID = (obj) => obj?.id ?? null;
//     const changes = structuredClone(draft);

//     const { services: unmapped_services, packages: unmapped_packages, products: unmapped_products } = changes;

//     const services = unmapped_services.map(extractID);
//     const packages = unmapped_packages.map(extractID);
//     const products = unmapped_products.map(extractID);

//     const { quote, customer } = changes;
//     const quote_id = extractID(quote);
//     const customer_id = extractID(customer);

//     const { amount_paid: amount_paid_string } = changes;
//     const amount_paid = parseInt(amount_paid_string) || loadedDraft.price;

//     const { discount, discount_is_percentage: discout_is_percentage, tax, shipping } = changes;

//     const discount_information = { discount, shipping, tax, discout_is_percentage }

//     const { event_type: event_type_id } = changes;
//     const { title, status, payment_method, due_date, price, delivery_address } = changes;

//     const payload = {
//       quote_id,
//       customer_id,
//       event_type_id,

//       packages,
//       products,
//       services,

//       price,
//       amount_paid,

//       title,
//       status,
//       due_date,
//       payment_method,

//       discount_information,
//       delivery_address,
//     };

//     const { order } = await createOrder(payload);
//     navigate(`/orders/customers/${order?.id}`);

//   }
//   return <TemplateEdit title="NOUVEAU BON DE COMMANDE / CLIENT">
//     {/*  Modals  */}
//     <ArticleModal column="modal" show={modals.article} {...draft} onClose={dispatchModals} dispatch={dispatchDraft} />
//     <CustomerModal column="modal" show={modals.customer} onClose={dispatchModals} onSubmit={onSubmit_Customer} />
//     <QuoteModal column="modal" show={modals.quote} {...draft} onClose={dispatchModals} onSubmit={onSubmit_Quote} dispatch={dispatchDraft} />
//     <DiscountModal column="modal" show={modals.discount} onClose={dispatchModals} onSubmit={onSubmit_Discount} />
//     <ShippingModal column="modal" show={modals.shipping} onClose={dispatchModals} onSubmit={onSubmit_Shipping} />
//     <TaxModal column="modal" show={modals.tax} onClose={dispatchModals} onSubmit={onSubmit_Tax} />

//     {/*  Cards  */}

//     <GeneralCard column="primary" dispatch={dispatchDraft} {...draft} />
//     <ReceiptCard column="primary" dispatch={dispatchDraft} onModal={onModal_Dynamic} {...draft} />

//     <CustomerCard column="auxilary" onModify={onModify_Customer} customer={draft.customer} />
//     <DatesCard column="auxilary" due_date={draft.due_date} dispatch={dispatchDraft} />
//     <DeliveryCard column="auxilary" delivery_address={draft.delivery_address} dispatch={dispatchDraft} />
//     <PaymentCard column="auxilary" dispatch={dispatchDraft} amount_paid={draft.amount_paid} price={draft.price} payment_method={draft.payment_method} />
//     <ActionCard column="auxilary" onCancel={cancelChanges} onPublish={publishChanges} />

//   </TemplateEdit>
// }
// export const NewOrder_Vendor = () => {
//   return <div></div>
// }

import Card from "../../components/Card";
import Table from "../../components/Table";
import Radio from "../../components/Radio";
import Button from "../../components/Button";
import GlobalModal from "../../components/GlobalModal";
import TemplateEdit from "../../components/templates/TemplateEdit";

import { createStatesNew, CLASS_NAMES, APPOINTMENT_SHARED } from "../../utils/common";
import { getFilteredPackages, getFilteredProducts, getFilteredCustomers, getFilteredServices, getFilteredQuotes, getFilteredVendors } from "../../config/httpRequests";

import Select from "react-select";
import AsyncSelect from "react-select/async";

import { useReducer } from "react";
import { capitalize } from "lodash";
import { useNavigate } from "react-router-dom";
import { AiFillEdit, AiFillMinusSquare, AiFillPlusSquare, AiOutlineEdit, AiOutlineSearch } from "react-icons/ai";

const StatisticsCard = () => {
  return <Card>
    <h1 className={CLASS_NAMES.label}>Statistiques</h1>
    <h2 className="text-center font-regular font-inter text-highlight">Veuillez créer la commande avant d'essayer de mesurer ses statistiques.</h2>
  </Card>
}

const GeneralCard = ({ dispatch, title, status, category }) => {
  const _status = APPOINTMENT_SHARED.getStatus(status);
  const states = createStatesNew({ title, status: _status, category: { value: category?.id, label: category?.title } }, { category: "select" }, dispatch);

  async function searchCategory(searchTerm) {
    return [];
  }

  return <Card className="grid grid-cols-3 gap-4" isRaw={true}>
    <div className="flex flex-col gap-2 col-span-3">
      <label htmlFor="title" className={CLASS_NAMES.label}>Titre</label>
      <input type="text" name="title" id="title" placeholder="Saisissez une titre pour cette commande..." className={CLASS_NAMES.input} value={states.get("title").value} onChange={states.get("title").onChange} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="ref_id" className={CLASS_NAMES.label}>Commande Nº</label>
      <input type="text" name="ref_id" id="ref_id" placeholder="Ce champs ce remplit aprés la creation..." className={CLASS_NAMES.input} disabled />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="status" className={CLASS_NAMES.label}>Statut</label>
      <Select options={APPOINTMENT_SHARED.status} type="text" name="status" id="status" placeholder="Saisissez un statut pour cette commande..." unstyled classNames={CLASS_NAMES.select} value={states.get("status").value} onChange={states.get("status").onChange} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="category" className={CLASS_NAMES.label}>Catégorie</label>
      <AsyncSelect defaultOptions={true} loadOptions={searchCategory} type="text" name="category" id="category" placeholder="Saisissez une categorie  pour cette commande..." unstyled classNames={CLASS_NAMES.select} value={states.get("category").value} onChange={states.get("category").onChange} />
    </div>
  </Card>
}

const CustomerCard = ({ customer, onModal }) => {
  const value_class_name = "font-inter text-strong-contrast text-sm";
  const label_class_name = "font-inter text-strong-contrast text-sm font-bold";
  const full_name = !!(customer?.hasOwnProperty("first_name")) ? [customer.first_name, customer.last_name].join(" ") : null;
  return <Card>
    <div className="flex items-center justify-between">
      <h1 className={CLASS_NAMES.label}>Données du client</h1>
      <Button type="soft" textContent="Modifier" textClassName="text-highlight font-bold" onClick={() => onModal("customer")} />
    </div>
    {
      (!!customer) ?
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <label className={label_class_name}>Nom Complet</label>
          <h4 className={value_class_name}>{full_name ?? "Mohamed Ali Clay"}</h4>
          <label className={label_class_name}>Tél.</label>
          <h4 className={value_class_name}>{customer.contact?.phone}</h4>
          <label className={label_class_name}>Email</label>
          <h4 className={value_class_name}>{customer.contact?.email}</h4>
          <label className={label_class_name}>Addresse</label>
          <h4 className={value_class_name}>{customer.contact?.address}</h4>
        </div> :
        <h1 className="text-sm text-center text-highlight font-medium font-inter">Veuillez sélectionner un client pour cette facture</h1>
    }
  </Card>
}

const VendorCard = ({ vendor, onModal }) => {
  const value_class_name = "font-inter text-strong-contrast text-sm";
  const label_class_name = "font-inter text-strong-contrast text-sm font-bold";
  const full_name = [vendor?.first_name, vendor?.last_name].join(" ");
  return <Card>
    <div className="flex items-center justify-between">
      <h1 className={CLASS_NAMES.label}>Données du fournisseur</h1>
      <Button type="soft" textContent="Modifier" textClassName="text-highlight font-bold" onClick={() => onModal("vendor")} />
    </div>
    {
      (!!vendor) ?
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <label className={label_class_name}>Nom Complet</label>
          <h4 className={value_class_name}>{full_name}</h4>
          <label className={label_class_name}>Tél.</label>
          <h4 className={value_class_name}>{vendor.contact?.phone}</h4>
          <label className={label_class_name}>Email</label>
          <h4 className={value_class_name}>{vendor.contact?.email}</h4>
          <label className={label_class_name}>Addresse</label>
          <h4 className={value_class_name}>{vendor.contact?.address}</h4>
        </div> :
        <h1 className="text-sm text-center text-highlight font-medium font-inter">Veuillez sélectionner un fournisseur pour cette facture</h1>
    }
  </Card>
}

const NotesCard = ({ delivery_note = "", dispatch }) => {
  const states = createStatesNew({ delivery_note }, {}, dispatch);

  return <Card className="gap-4">
    <label htmlFor="delivery_note" className={CLASS_NAMES.label}>Notes</label>
    <textarea className={CLASS_NAMES.input + " min-h-[5rem] resize-none"} placeholder="Saisissez vos notes à propos de cette commande..." name="delivery_note" id="delivery_note" value={states.get("delivery_note").value} onChange={states.get("delivery_note").onChange}></textarea>
  </Card>
}

const PriceCard = ({ price = 0, discounts_taxes = {}, products = [], services = [], packages = [], dispatch }) => {
  const states = createStatesNew({ price }, {}, dispatch);

  const { discount = 0, shipping = 0, tax = 0, discount_is_percentage = false } = discounts_taxes;
  const sub_total = [...products, ...services, ...packages].reduce((prev, x) => prev + (x.cost * x.quantity), 0);
  let total = sub_total;
  if (discount_is_percentage) total -= (sub_total / 100) * discount;
  else total -= discount;
  total += shipping;
  total += (total / 100) * tax;
  const cost = total;

  return <Card isRaw className="grid grid-cols-[auto_1fr] items-center gap-4">
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Tarification</h1>
    <label htmlFor="price" className={CLASS_NAMES.label}>Prix</label>
    <div className="flex relative w-full">
      <input id="price" type="number" className={[CLASS_NAMES.input, "w-full pl-16"].join(" ")} placeholder="Prix..." value={states.get("price").value} onChange={states.get("price").onChange} />
      <span className="absolute top-1/2 -translate-y-1/2 left-4 text-sm font-bold text-highlight">MAD</span>
    </div>
    <label htmlFor="cost" className={CLASS_NAMES.label}>Coût</label>
    <div className="flex relative w-full">
      <input id="cost" type="number" className={[CLASS_NAMES.input, "w-full pl-16 cursor-not-allowed"].join(" ")} placeholder="Coût..." value={cost} readOnly />
      <span className="absolute top-1/2 -translate-y-1/2 left-4 text-sm font-bold text-highlight">MAD</span>
    </div>
  </Card>
}

function defaultHeadParser(...labels) {
  const cells = [];
  for (const label of labels) cells.push({ contentType: "head", contentValue: label });
  return cells;
}

const ListArticles = ({ services = [], products = [], packages = [], dispatch }) => {
  function format_list_to_row(target, arr) {
    return arr.map?.((article) => {
      function onChange(event) {
        const clonedArticle = structuredClone(article);
        const quantity = parseInt(event.target.value ?? "1");
        clonedArticle["quantity"] = quantity;
        dispatch({
          kind: "replace",
          target,
          articles: [clonedArticle],
        });
      }
      return [
        { contentType: "text", contentValue: article.title },
        { contentType: "text", contentValue: [article.price?.toFixed(2), "MAD"].reverse().join(" ") },
        { contentType: "wrapped", contentValue: <input type="number" className={CLASS_NAMES.input} onChange={onChange} value={article.quantity} /> },
        { contentType: "text", contentValue: [(article.price * (article.quantity ?? 1)).toFixed(2), "MAD"].join(" "), className: "text-right" },
      ];
    }) ?? [];
    // BAD(XENOBAS): Input loses focus on rerender.
  }
  const table_args = {
    isCompact: true,
    head: [...defaultHeadParser("Désignation", "Prix", "Quantité"), { contentType: "head", contentValue: "Total", className: "text-right" }],
    rows: [
      ...format_list_to_row("products", products),
      ...format_list_to_row("services", services),
      ...format_list_to_row("packages", packages),
    ],
  };
  return <Table {...table_args} className="border-spacing-x-2" />
}

const ListFees = ({ products = [], services = [], packages = [], discounts_taxes = {}, onModal, short }) => {
  const sub_total = [...products, ...services, ...packages].reduce((prev, x) => prev + (x.price * x.quantity), 0);
  const { discount = 0, shipping = 0, tax = 0, discount_is_percentage = false } = discounts_taxes;
  const tax_display = tax?.toFixed(2) ?? "0.00";
  const shipping_display = shipping?.toFixed(2) ?? "0.00";
  const discount_display = [discount?.toFixed(2) ?? "0.00", discount_is_percentage ? "%" : "MAD"].join(" ");
  const sub_total_display = sub_total?.toFixed(2) ?? "0.00";

  let total = sub_total;
  if (discount_is_percentage) total -= (sub_total / 100) * discount;
  else total -= discount;
  total += shipping;
  total += (total / 100) * tax;

  const total_display = total?.toFixed(2) ?? "0.00";


  return <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center">
    <h4 className="font-semibold text-weak-contrast py-2">Total partiel</h4>
    <h4 className="text-sm text-strong-contrast text-right col-start-3">{sub_total_display} MAD</h4>

    {!short && (<div className="contents">
      <Button onClick={() => onModal("discount")} type="soft" className="px-0 hover:bg-transparent" textClassName="font-medium text-roboto text-highlight text-base" textContent="Ajouter une réduction" />
      <h4 className="font-semibold text-weak-contrast">-</h4>
      <h4 className="text-sm text-strong-contrast text-right">{discount_display}</h4>
    </div>)}

    <Button onClick={() => onModal("shipping")} type="soft" className="px-0 hover:bg-transparent" textClassName="font-medium text-roboto text-highlight text-base text-left" textContent="Ajouter des frais d'expédition" />
    <h4 className="font-semibold text-weak-contrast">-</h4>
    <h4 className="text-sm text-strong-contrast text-right">{shipping_display} MAD</h4>

    <Button onClick={() => onModal("tax")} type="soft" className="px-0 hover:bg-transparent" textClassName="font-medium text-roboto text-highlight text-base" textContent="TVA Éstime" />
    <h4 className="font-semibold text-weak-contrast">Non Calculé</h4>
    <h4 className="text-sm text-strong-contrast text-right">{tax_display} %</h4>
    <span className="col-start-1 h-4"></span>
    <h4 className="font-semibold text-strong-contrast col-start-1">Total</h4>
    <h4 className="text-sm text-strong-contrast text-right col-start-3">{total_display} MAD</h4>
  </div>
}

const ListCard = ({ customer, products = [], services = [], packages = [], discounts_taxes, dispatch, onModal }) => {
  const is_empty = products?.length + services?.length + packages?.length === 0;
  return <Card className="gap-4">
    <div className="flex items-center justify-between gap-4">
      <h1 className={CLASS_NAMES.label + " col-span-2"}>Articles</h1>
      <div className="ml-auto"></div>
      <Button onClick={() => onModal("quote")} textContent="Import Devis" type="soft" disabled={!(customer?.["id"])} />
      <Button onClick={() => onModal("article")} textContent={is_empty ? "Ajouter un article" : "Modifier"} />
    </div>
    <ListArticles products={products} services={services} dispatch={dispatch} />
    <hr className="border-weakest-contrast" />
    <ListFees products={products} services={services} packages={packages} discounts_taxes={discounts_taxes} onModal={onModal} />
  </Card>
}

const VendorListCard = ({ vendor, products = [], services = [], packages = [], discounts_taxes, dispatch, onModal }) => {
  const is_empty = products?.length + services?.length + packages?.length === 0;
  return <Card className="gap-4">
    <div className="flex items-center justify-between gap-4">
      <h1 className={CLASS_NAMES.label + " col-span-2"}>Articles</h1>
      <div className="ml-auto"></div>
      <Button onClick={() => onModal("quote")} textContent="Import Devis" type="soft" disabled={!(vendor?.["id"])} />
      <Button onClick={() => onModal("article")} textContent={is_empty ? "Ajouter un article" : "Modifier"} />
    </div>
    <ListArticles products={products} services={services} dispatch={dispatch} />
    <hr className="border-weakest-contrast" />
    <ListFees short products={products} services={services} packages={packages} discounts_taxes={discounts_taxes} onModal={onModal} />
  </Card>
}

const DeliveryCard = ({ delivery, duration, dispatch }) => {
  const states = createStatesNew({ delivery, duration }, {}, dispatch);

  return <Card className="grid grid-cols-[auto_1fr] items-center gap-4">
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Options</h1>
    <label htmlFor="duration" className={CLASS_NAMES.label}>Durée estimée</label>
    <input id="duration" type="number" className={[CLASS_NAMES.input, "w-full"].join(" ")} placeholder="Prix..." value={states.get("duration").value} onChange={states.get("duration").onChange} />
    <label htmlFor="delivery" className={CLASS_NAMES.label}>Frais de livraison</label>
    <div className="flex relative w-full">
      <input id="delivery" type="number" className={[CLASS_NAMES.input, "w-full pl-16"].join(" ")} placeholder="Coût..." value={states.get("delivery").value} onChange={states.get("delivery").onChange} />
      <span className="absolute top-1/2 -translate-y-1/2 left-4 text-sm font-bold text-highlight">MAD</span>
    </div>
  </Card>
}

const ActionCard = ({ onPublish, onCancel }) => {
  return <Card isRaw={true} className="flex justify-end items-center gap-4 mt-auto">
    <Button onClick={onCancel} type="soft" textContent="Annuler" />
    <Button onClick={onPublish} textContent="Publier" />
  </Card>
}

const ArticlesModal = ({ show, customer, vendor, products = [], services = [], packages = [], onClose, dispatch: draft_dispatch }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const new_state = structuredClone(state);
    for (const field in action) new_state[field] = action[field];
    return new_state;
  }, {
    searchTerm: "",
    searchValid: false,
    searchValidMessage: "Empty search term",
    searchResult: [],
  });

  // TODO(XENOBAS): Unsure about this exact reducer, maybe it's useless...
  const [collections, dispatchComplex] = useReducer(collectionsReducer, { products, services, packages });

  async function onSearch(event) {
    const searchTerm = event.target.value;
    dispatch({ searchTerm });
    if (searchTerm.length === 0) {
      dispatch({ searchTerm, searchValid: false, searchValidMessage: "Terme de recherche vide..." });
      return;
    }

    const promise_products = getFilteredProducts(searchTerm);
    const promise_services = getFilteredServices(searchTerm);
    const promise_packages = getFilteredPackages(searchTerm);
    const response_articles = await Promise.allSettled([promise_products, promise_services, promise_packages]);

    for (const article of response_articles) if (article.status === "rejected") throw article.reason;

    const [fulfilled_products, fulfilled_services, fulfilled_packages] = response_articles;
    const { value: { products } } = fulfilled_products;
    const { value: { services } } = fulfilled_services;
    const { value: { packages } } = fulfilled_packages;

    const articles = [];
    articles.push(
      ...products.map((product) => ({ key: "product", product })),
      ...services.map((service) => ({ key: "service", service })),
      ...packages.map((pack7ge) => ({ key: "package", pack7ge })),
    );

    if (articles.length === 0) {
      dispatch({ searchTerm, searchValid: false, searchValidMessage: "Search term yields no results." });
      return;
    }
    dispatch({ searchTerm, searchValid: true, searchResult: articles });
  }

  const ArticleQuery = ({ message, valid = true, articles = [] }) => {
    if (!valid) return <h1 className="font-roboto font-medium text-center text-highlight">{message}</h1>
    /**
     * 
     * @param {"products" | "services" | "packages"} __target 
     * @param {*} __article 
     */
    function addArticle(target, article) {
      const clonedArticle = structuredClone(article);
      clonedArticle["quantity"] = 1;
      dispatchComplex({
        kind: "add",
        target,
        articles: [clonedArticle],
      })
    }
    const rows = articles.map((article) => {
      const { key } = article;
      const { id, title, price } = article[key];
      return <tr key={[id, key, "query"].join("-")}>
        <td className="text-2xl text-left">
          <AiFillPlusSquare onClick={() => addArticle(key + "s", article[key])} className="inline-block m-0 cursor-pointer text-highlight/90 hover:text-highlight duration-150 transition-colors" />
        </td>
        <td>{title}</td>
        <td>{capitalize(key)}</td>
        <td className="text-right">{[price?.toFixed(2), "MAD"].join(" ")}</td>
      </tr>
    });
    return <table className="border-separate border-spacing-2">
      <thead className="font-bold text-base font-asap text-highlight">
        <tr>
          <th></th>
          <th className="text-left">TITRE</th>
          <th className="text-left">CATEGORIE</th>
          <th className="text-right">PRIX</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  }

  const ArticleManage = ({ products = [], services = [], packages = [] }) => {
    const articles = [];
    articles.push(
      ...products.map((product) => ({ key: "product", product })),
      ...services.map((service) => ({ key: "service", service })),
      ...packages.map((pack7ge) => ({ key: "package", pack7ge })),
    );
    function removeArticle(target, article) {
      const clonedArticle = structuredClone(article);
      dispatchComplex({
        kind: "remove",
        target,
        articles: [clonedArticle],
      });
    }
    const rows = articles.map((article) => {
      const { key } = article;
      const { id, title, price } = article[key];
      return <tr key={[id, key, "manage"].join("-")}>
        <td className="text-2xl text-left">
          <AiFillMinusSquare onClick={() => removeArticle(key + "s", article[key])} className="inline-block m-0 cursor-pointer text-red-800/90 hover:text-red-800 duration-150 transition-colors" />
        </td>
        <td>{title}</td>
        <td>{capitalize(key)}</td>
        <td className="text-right">{[price?.toFixed(2), "MAD"].join(" ")}</td>
      </tr>
    });
    return <table className="border-separate border-spacing-2">
      <thead className="font-bold text-base font-asap text-highlight">
        <tr>
          <th></th>
          <th className="text-left">TITRE</th>
          <th className="text-left">CATEGORIE</th>
          <th className="text-right">PRIX</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  }

  function _onCancel() {
    dispatchComplex({ products, services });
    onClose();
  }
  function _onSubmit() {
    const { products: modal_products, services: modal_services, packages: modal_pack7ges } = collections;
    const dispatch_products = modal_products.map((product) => {
      const index = products.findIndex((p) => p.id === product.id);
      if (index !== -1)
        product["quantity"] = products[index]["quantity"];
      return product;
    });
    const dispatch_services = modal_services.map((service) => {
      const index = services.findIndex((p) => p.id === service.id);
      if (index !== -1)
        service["quantity"] = services[index]["quantity"] ?? 1;
      return service;
    });
    const dispatch_pack7ges = modal_pack7ges.map((pack7ge) => {
      const index = packages.findIndex((p) => p.id === pack7ge.id);
      if (index !== -1)
        pack7ge["quantity"] = packages[index]["quantity"] ?? 1;
      return pack7ge;
    });
    draft_dispatch?.({ products: dispatch_products, services: dispatch_services, packages: dispatch_pack7ges });
    onClose();
  }

  return <GlobalModal show={show} className="flex flex-col gap-4 min-w-[50vw]">
    <h2 className="font-asap font-bold text-strong-contrast">AJOUTER DES ARTICLES</h2>
    <div className="relative w-full">
      <input type="text" name="searchTerm" id="searchTerm" placeholder="Chercher votre article..." className={CLASS_NAMES.input + " pl-12 w-full"} value={state.searchTerm} onChange={onSearch} />
      <AiOutlineSearch className="absolute top-1/2 -translate-y-1/2 text-2xl left-4 text-highlight" />
    </div>
    <ArticleQuery valid={state.searchValid} message={state.searchValidMessage} articles={state.searchResult} />
    <hr className="border-weakest-contrast" />
    {
      ((collections.products?.length + collections.services?.length + collections.packages?.length) > 0) && <ArticleManage {...collections} />
    }
    <div className="flex justify-end items-center gap-4">
      <Button onClick={_onCancel} type="soft" textContent="Annuler" />
      <Button onClick={_onSubmit} textContent="Appliquer" />
    </div>
  </GlobalModal>
}

const QuotesModal = ({ show, products = [], services = [], packages = [], onClose, dispatch: draft_dispatch, collection_dispatch }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const new_state = structuredClone(state);
    for (const field in action) new_state[field] = action[field];
    return new_state;
  }, {
    selected: null,

    searchTerm: "",
    searchValid: false,
    searchValidMessage: "Empty search term",
    searchResult: [],
  });

  async function onSearch(event) {
    const searchTerm = event.target.value;
    dispatch({ searchTerm });
    if (searchTerm.length === 0) {
      dispatch({ searchTerm, searchValid: false, searchValidMessage: "Terme de recherche vide..." });
      return;
    }

    const include = {
      products: {
        include: {
          product: true,
        }
      },
      services: {
        include: {
          service: true,
        }
      },
      packages: {
        include: {
          package: true,
        }
      },
    };
    const { quotes } = await getFilteredQuotes(searchTerm, include);

    if (quotes.length === 0) {
      dispatch({ searchTerm, searchValid: false, searchValidMessage: "Search term yields no results." });
      return;
    }
    dispatch({ searchTerm, searchValid: true, searchResult: quotes });
  }

  const QuotesQuery = ({ valid, message, selected, quotes }) => {
    if (!valid) return <h1 className="font-roboto font-medium text-center text-highlight">{message}</h1>

    const rows = quotes.map((quote) => {
      function selectQuote() {
        dispatch({ selected: quote });
      }
      const { id, title, price } = quote;
      return <tr key={[id, "quote", "query"].join("-")}>
        <td className="text-2xl text-left">
          <AiFillEdit onClick={selectQuote} className="inline-block m-0 cursor-pointer text-highlight/90 hover:text-highlight duration-150 transition-colors" />
        </td>
        <td>{title}</td>
        <td className="text-right">{[price?.toFixed(2), "MAD"].join(" ")}</td>
      </tr>
    });
    return <table className="border-separate border-spacing-2">
      <thead className="font-bold text-base font-asap text-highlight">
        <tr>
          <th></th>
          <th className="text-left">TITRE</th>
          <th className="text-right">PRIX</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  }

  function _onCancel() {
    // dispatchComplex({ products, services });
    onClose();
  }
  function _onSubmit() {
    // const { products: modal_products, services: modal_services, packages: modal_pack7ges } = collections;
    // const dispatch_products = modal_products.map((product) => {
    //   const index = products.findIndex((p) => p.id === product.id);
    //   if (index !== -1)
    //     product["quantity"] = products[index]["quantity"];
    //   return product;
    // });
    // const dispatch_services = modal_services.map((service) => {
    //   const index = services.findIndex((p) => p.id === service.id);
    //   if (index !== -1)
    //     service["quantity"] = services[index]["quantity"] ?? 1;
    //   return service;
    // });
    // const dispatch_pack7ges = modal_pack7ges.map((pack7ge) => {
    //   const index = packages.findIndex((p) => p.id === pack7ge.id);
    //   if (index !== -1)
    //     pack7ge["quantity"] = packages[index]["quantity"] ?? 1;
    //   return pack7ge;
    // });
    // draft_dispatch?.({ products: dispatch_products, services: dispatch_services, packages: dispatch_pack7ges });
    const { selected: quote } = state;
    const { products: interface_products = [], services: interface_services = [], packages: interface_pack7ges = [] } = quote;
    const modal_products = interface_products.map(({ product, quantity }) => {
      const clone = structuredClone(product);
      clone["quantity"] = quantity;
      return clone;
    });
    const dispatch_products = modal_products.map((product) => {
      const index = products.findIndex((p) => p.id === product.id);
      if (index !== -1)
        product["quantity"] = products[index]["quantity"];
      return product;
    });
    const modal_services = interface_services.map(({ service }) => service);
    const dispatch_services = modal_services.map((service) => {
      const index = services.findIndex((p) => p.id === service.id);
      if (index !== -1)
        service["quantity"] = services[index]["quantity"] ?? 1;
      return service;
    });
    const modal_pack7ges = interface_pack7ges.map(({ package: pack7ge }) => pack7ge);
    const dispatch_pack7ges = modal_pack7ges.map((pack7ge) => {
      const index = packages.findIndex((p) => p.id === pack7ge.id);
      if (index !== -1)
        pack7ge["quantity"] = packages[index]["quantity"] ?? 1;
      return pack7ge;
    });
    collection_dispatch?.({ products: dispatch_products, services: dispatch_services, packages: dispatch_pack7ges });
    draft_dispatch?.({ quote });
    onClose();
  }

  const lproducts = state.selected?.products ?? [];
  const lservices = state.selected?.services ?? [];
  const lpackages = state.selected?.packages ?? [];

  return <GlobalModal show={show} className="flex flex-col gap-4 min-w-[50vw]">
    <h2 className="font-asap font-bold text-strong-contrast">IMPORTER UN DEVIS</h2>
    <div className="relative w-full">
      <input type="text" name="searchTerm" id="searchTerm" placeholder="Chercher votre article..." className={CLASS_NAMES.input + " pl-12 w-full"} value={state.searchTerm} onChange={onSearch} />
      <AiOutlineSearch className="absolute top-1/2 -translate-y-1/2 text-2xl left-4 text-highlight" />
    </div>
    <QuotesQuery valid={state.searchValid} message={state.searchValidMessage} selected={state.selected} quotes={state.searchResult} />
    <hr className="border-weakest-contrast" />
    {
      !!(state.selected)
      && (
        <div className="contents">
          <hr className="border-weakest-contrast col-span-2" />
          <div className="px-2 grid grid-cols-[auto_1fr] items-center gap-2">
            <h2 className={CLASS_NAMES.label}>Title</h2>
            <h5 className="text-lg text-right">{state.selected.title}</h5>
            <h2 className={CLASS_NAMES.label}>Compte des produits</h2>
            <h5 className="text-lg text-right">{[lproducts.length ?? 0, "produits"].join(" ")}</h5>
            <h2 className={CLASS_NAMES.label}>Compte des services</h2>
            <h5 className="text-lg text-right">{[lservices.length ?? 0, "services"].join(" ")}</h5>
            <h2 className={CLASS_NAMES.label}>Compte des packs</h2>
            <h5 className="text-lg text-right">{[lpackages.length ?? 0, "packs"].join(" ")}</h5>
          </div>
        </div>
      )
    }
    <div className="flex justify-end items-center gap-4">
      <Button onClick={_onCancel} type="soft" textContent="Annuler" />
      <Button onClick={_onSubmit} textContent="Appliquer" />
    </div>
  </GlobalModal>
}

const DiscountModal = ({ show, discounts_taxes, dispatch: draft_dispatch, onClose }) => {
  const discount_options = [
    { value: true, label: "Pourcentage" },
    { value: false, label: "Montant" },
  ];
  const { discount_is_percentage = false, discount = 0 } = discounts_taxes ?? {};
  const discount_option = discount_options.find(({ value }) => value === discount_is_percentage);

  function localReducer(state, action) {
    const new_state = structuredClone(state);
    for (const field in action)
      new_state[field] = structuredClone(action[field]);
    return new_state;
  }
  const [state, dispatch] = useReducer(localReducer, { discount_option, discount });
  function onChange(key) {
    const dict = {
      discount_option(newValue) {
        const is_percentage = newValue;
        const value = state.discount;
        let discount = parseInt(value);
        if (is_percentage && discount > 100) discount = 100;
        dispatch({ discount_option: newValue, discount });
      },
      discount(event) {
        const value = event.target.value ?? "0";
        let discount = parseInt(value);
        const is_percentage = state.discount_option.value;
        if (is_percentage && discount > 100) discount = 100;
        if (discount < 0) discount = 0;
        dispatch({ discount });
      },
    };

    return dict[key];
  }

  function _onSubmit() {
    const discount = parseInt(state.discount);
    const discount_is_percentage = state.discount_option?.value ?? false;
    const payload = structuredClone(discounts_taxes);
    payload["discount"] = discount;
    payload["discount_is_percentage"] = discount_is_percentage;
    draft_dispatch({ discounts_taxes: payload });
    onClose();
  }
  function _onClose() {
    onClose();
  }
  return <GlobalModal show={show} className="flex flex-col gap-4 min-w-[50vw]">
    <h2 className="font-asap font-bold text-strong-contrast">CHANGEMENT DE RÉDUCTION</h2>
    <hr className="border-weakest-contrast" />
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <label htmlFor="discount_type">Type de réduction</label>
        <Select id="discount_type" unstyled classNames={CLASS_NAMES.select} options={discount_options} value={state.discount_option} onChange={onChange("discount_option")} />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="discount_value">Valeur de la réduction</label>
        <div className="w-full relative">
          <input type="number" name="discount_value" id="discount_value" className={CLASS_NAMES.input + ` w-full pl-${state.discount_option?.value ? "8" : "16"}`} value={state.discount} onChange={onChange("discount")} />
          <label htmlFor="discount_value" className="absolute top-1/2 -translate-y-1/2 left-4 font-inter font-semibold text-sm">{state.discount_option?.value ? "%" : "MAD"}</label>
        </div>
      </div>
      <div className="flex flex-col gap-4 col-span-2">
        <label htmlFor="discount_value">Motif</label>
        <input type="text" name="discount_motif" id="discount_motif" className={CLASS_NAMES.input} placeholder="Saisissez un motif pour cette réduction..." />
      </div>
    </div>
    <hr className="border-weakest-contrast" />
    <div className="flex justify-end items-center gap-4">
      <Button onClick={_onClose} type="soft" textContent="Annuler" />
      <Button onClick={_onSubmit} textContent="Appliquer" />
    </div>
  </GlobalModal>
}
const ShippingModal = ({ show, discounts_taxes, dispatch: draft_dispatch, onClose }) => {
  const shipping_mode_options = [
    { id: "free", label: "Expédition Gratuit (Sans frais de livraison)" },
    { id: "custom", label: "Personalisée" },
  ];
  const { shipping = 0 } = discounts_taxes ?? {};
  const states = createStatesNew({ shipping_mode: shipping === 0 ? "free" : "custom", shipping: 0 });

  // useEffect(() => {
  //   const shipping = parseInt(states.get("shipping").value);
  //   if (shipping < 0) states.get("shipping").set(0);
  // }, [states.get("shipping").value]);

  // useEffect(() => {
  //   const shipping_mode = states.get("shipping_mode").value;
  //   if (shipping_mode === "free") states.get("shipping").set(0);
  // }, [states.get("shipping_mode").value]);

  function _onSubmit() {
    const shipping = parseInt(states.get("shipping").value);
    const payload = structuredClone(discounts_taxes);
    payload["shipping"] = shipping;
    draft_dispatch({ discounts_taxes: payload });
    onClose();
  }
  function _onClose() {
    onClose();
  }
  return <GlobalModal show={show} className="flex flex-col gap-4 min-w-[50vw]">
    <h2 className="font-asap font-bold text-strong-contrast">CHANGEMENT DE LIVRAISON</h2>
    <hr className="border-weakest-contrast" />
    <Radio group="shipping_mode" options={shipping_mode_options} onChange={states.get("shipping_mode").set} selected={states.get("shipping_mode").value} />
    {
      (states.get("shipping_mode").value === "custom")
      &&
      <div className="grid grid-cols-2 gap-4 items-center">
        <div className="flex flex-col gap-2">
          <label htmlFor="shipping_name">Nom du tarif</label>
          <input type="text" name="shipping_name" id="shipping_name" className={CLASS_NAMES.input + " w-full"} placeholder="Saisissez un nom pour ce tarif..." />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="shipping">Prix</label>
          <div className="w-full relative">
            <input type="number" name="shipping" id="shipping" className={CLASS_NAMES.input + " w-full pl-16"} value={states.get("shipping").value} onChange={states.get("shipping").onChange} />
            <label htmlFor="shipping" className="absolute top-1/2 -translate-y-1/2 left-4 font-inter font-semibold text-sm">MAD</label>
          </div>
        </div>
      </div>
    }
    <hr className="border-weakest-contrast" />
    <div className="flex justify-end items-center gap-4">
      <Button onClick={_onClose} type="soft" textContent="Annuler" />
      <Button onClick={_onSubmit} textContent="Appliquer" />
    </div>
  </GlobalModal>
}
const TaxModal = ({ show, discounts_taxes, dispatch: draft_dispatch, onClose }) => {
  const tax_options = [
    { id: 0, label: "0%" },
    { id: 10, label: "10%" },
    { id: 20, label: "20%" },
  ];
  const { tax = 0 } = discounts_taxes ?? {};
  const states = createStatesNew({ tax });

  function _onSubmit() {
    const tax = parseInt(states.get("tax").value);
    const payload = structuredClone(discounts_taxes);
    payload["tax"] = tax;
    draft_dispatch({ discounts_taxes: payload });
    onClose();
  }
  function _onClose() {
    const { tax = 0 } = discounts_taxes ?? {};
    states.get("tax").set(tax);
    onClose();
  }
  return <GlobalModal show={show} className="flex flex-col gap-4 min-w-[50vw]">
    <h2 className="font-asap font-bold text-strong-contrast">CHANGEMENT DE LIVRAISON</h2>
    <hr className="border-weakest-contrast" />
    <Radio group="tax" options={tax_options} onChange={states.get("tax").set} selected={states.get("tax").value} />
    <hr className="border-weakest-contrast" />
    <div className="flex justify-end items-center gap-4">
      <Button onClick={_onClose} type="soft" textContent="Annuler" />
      <Button onClick={_onSubmit} textContent="Appliquer" />
    </div>
  </GlobalModal>
}

const CustomerModal = ({ show, customer, dispatch: draft_dispatch, onClose }) => {
  const [state, dispatch] = useReducer((state, actions) => {
    const newState = structuredClone(state);
    for (const action in actions) newState[action] = actions[action];
    return newState;
  }, {
    selected: customer,

    searchTerm: "",
    searchValid: false,
    searchValidMessage: "Empty search term",
    searchResult: [],
  });

  async function onSearch(event) {
    const searchTerm = event.target.value;
    if (searchTerm.length === 0) {
      dispatch({ searchTerm, searchValid: false, searchValidMessage: "Empty search term" });
      return;
    }
    const { customers } = await getFilteredCustomers(searchTerm, { contact: true });
    if (customers.length === 0) {
      dispatch({ searchTerm, searchValid: false, searchValidMessage: "Search term yields no results." });
      return;
    }
    dispatch({ searchTerm, searchValid: true, searchResult: customers });
  }

  const CustomersQuery = ({ message, selected, valid = true, customers = [] }) => {
    if (!valid) return <h1 className="font-roboto font-medium text-center text-highlight">{message}</h1>
    const rows = customers.map((customer) => {
      const { id, first_name, last_name } = customer;
      function selectCustomer() {
        dispatch({ selected: customer });
      }
      return <tr key={id}>
        <td>{[first_name, last_name].join(" ")}</td>
        <td className="text-2xl text-right">
          <AiOutlineEdit onClick={selectCustomer} className="inline-block m-0 cursor-pointer text-highlight/90 hover:text-highlight duration-150 transition-colors" />
        </td>
      </tr>
    });
    return <table className="border-separate border-spacing-2">
      <thead className="font-bold text-base font-asap text-highlight">
        <tr>
          <th className="text-left">NOM COMPLET</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  }

  function _onSubmit() {
    const customer = state.selected;
    draft_dispatch?.({ customer });
    // onSubmit(id, state.selected);
    onClose();
  }

  function _onCancel() {
    dispatch({
      selected: customer,

      searchTerm: "",
      searchValid: false,
      searchValidMessage: "Empty search term",
    });
    onClose();
  }

  return <GlobalModal show={show} className="flex flex-col gap-4 min-w-[50vw]">
    <h2 className="font-asap font-bold text-strong-contrast">CHANGEMENT DE CLIENT</h2>
    <div className="relative w-full">
      <input type="text" name="searchTerm" id="searchTerm" placeholder="Chercher votre client..." className={CLASS_NAMES.input + " pl-12 w-full"} value={state.searchTerm} onChange={onSearch} />
      <AiOutlineSearch className="absolute top-1/2 -translate-y-1/2 text-2xl left-4 text-highlight" />
    </div>
    <CustomersQuery valid={state.searchValid} message={state.searchValidMessage} customers={state.searchResult} selected={state.selected} />
    {
      !!(state.selected)
      && (
        <div className="contents">
          <hr className="border-weakest-contrast col-span-2" />
          <div className="px-2 grid grid-cols-[auto_1fr] items-center gap-2">
            <h2 className={CLASS_NAMES.label}>Nom complet</h2>
            <h5 className="text-lg text-right">{[state.selected.first_name, state.selected.last_name].join(" ")}</h5>
            <h2 className={CLASS_NAMES.label}>Email</h2>
            <h5 className="text-lg text-right">{state.selected.contact?.email}</h5>
            <h2 className={CLASS_NAMES.label}>Tél.</h2>
            <h5 className="text-lg text-right">{state.selected.contact?.phone}</h5>
          </div>
        </div>
      )
    }
    <hr className="border-weakest-contrast" />
    <div className="flex justify-end items-center gap-4">
      <Button onClick={_onCancel} type="soft" textContent="Annuler" />
      <Button disabled={!(state.selected)} onClick={_onSubmit} textContent="Appliquer" />
    </div>
  </GlobalModal>
}

const VendorModal = ({ show, vendor, dispatch: draft_dispatch, onClose }) => {
  const [state, dispatch] = useReducer((state, actions) => {
    const newState = structuredClone(state);
    for (const action in actions) newState[action] = actions[action];
    return newState;
  }, {
    selected: vendor,

    searchTerm: "",
    searchValid: false,
    searchValidMessage: "Empty search term",
    searchResult: [],
  });

  async function onSearch(event) {
    const searchTerm = event.target.value;
    if (searchTerm.length === 0) {
      dispatch({ searchTerm, searchValid: false, searchValidMessage: "Empty search term" });
      return;
    }
    const { vendors } = await getFilteredVendors(searchTerm, { contact: true });
    if (vendors.length === 0) {
      dispatch({ searchTerm, searchValid: false, searchValidMessage: "Search term yields no results." });
      return;
    }
    dispatch({ searchTerm, searchValid: true, searchResult: vendors });
  }

  const VendorsQuery = ({ message, selected, valid = true, vendors = [] }) => {
    if (!valid) return <h1 className="font-roboto font-medium text-center text-highlight">{message}</h1>
    const rows = vendors.map((vendor) => {
      const { id, first_name, last_name } = vendor;
      function selectVendor() {
        dispatch({ selected: vendor });
      }
      return <tr key={id}>
        <td>{[first_name, last_name].join(" ")}</td>
        <td className="text-2xl text-right">
          <AiOutlineEdit onClick={selectVendor} className="inline-block m-0 cursor-pointer text-highlight/90 hover:text-highlight duration-150 transition-colors" />
        </td>
      </tr>
    });
    return <table className="border-separate border-spacing-2">
      <thead className="font-bold text-base font-asap text-highlight">
        <tr>
          <th className="text-left">NOM COMPLET</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  }

  function _onSubmit() {
    const vendor = state.selected;
    draft_dispatch?.({ vendor });
    // onSubmit(id, state.selected);
    onClose();
  }

  function _onCancel() {
    dispatch({
      selected: vendor,

      searchTerm: "",
      searchValid: false,
      searchValidMessage: "Empty search term",
    });
    onClose();
  }

  return <GlobalModal show={show} className="flex flex-col gap-4 min-w-[50vw]">
    <h2 className="font-asap font-bold text-strong-contrast">CHANGEMENT DE FOURNISSEUR</h2>
    <div className="relative w-full">
      <input type="text" name="searchTerm" id="searchTerm" placeholder="Chercher votre fournisseur..." className={CLASS_NAMES.input + " pl-12 w-full"} value={state.searchTerm} onChange={onSearch} />
      <AiOutlineSearch className="absolute top-1/2 -translate-y-1/2 text-2xl left-4 text-highlight" />
    </div>
    <VendorsQuery valid={state.searchValid} message={state.searchValidMessage} vendors={state.searchResult} selected={state.selected} />
    {
      !!(state.selected)
      && (
        <div className="contents">
          <hr className="border-weakest-contrast col-span-2" />
          <div className="px-2 grid grid-cols-[auto_1fr] items-center gap-2">
            <h2 className={CLASS_NAMES.label}>Nom complet</h2>
            <h5 className="text-lg text-right">{[state.selected.first_name, state.selected.last_name].join(" ")}</h5>
            <h2 className={CLASS_NAMES.label}>Email</h2>
            <h5 className="text-lg text-right">{state.selected.contact?.email}</h5>
            <h2 className={CLASS_NAMES.label}>Tél.</h2>
            <h5 className="text-lg text-right">{state.selected.contact?.phone}</h5>
          </div>
        </div>
      )
    }
    <hr className="border-weakest-contrast" />
    <div className="flex justify-end items-center gap-4">
      <Button onClick={_onCancel} type="soft" textContent="Annuler" />
      <Button disabled={!(state.selected)} onClick={_onSubmit} textContent="Appliquer" />
    </div>
  </GlobalModal>
}

function baseReducer(state, action) {
  const new_state = structuredClone(state);
  if (!!action["category"]) action["category"] = action["category"]?.value ?? action["category"];
  for (const field in action) {
    switch (typeof (action[field])) {
      default:
        new_state[field] = structuredClone(action[field]);
    }
  }
  return new_state;
}
function collectionsReducer(state, action) {
  const new_state = structuredClone(state);
  const { target, kind, ...payload } = action;
  switch (kind) {
    case "add": {
      const { articles } = payload;
      const unique_articles = articles.filter(({ id }) => {
        return new_state[target].findIndex((element) => element.id === id) === -1;
      });
      new_state[target].push(...unique_articles);
    } break;
    case "replace": {
      const { articles } = payload;
      for (const article of articles) {
        const { id } = article;
        const index = new_state[target].findIndex((element) => element.id === id);
        if (index === -1) continue;
        new_state[target][index] = article;
      }
    } break;
    case "remove": {
      const { articles } = payload;
      new_state[target] = new_state[target].filter(({ id }) => {
        return articles.findIndex((element) => element.id === id) === -1;
      });
    } break;
    default: {
      for (const property in payload) new_state[property] = structuredClone(payload[property]);
    } break;
  }
  return new_state;
}
function modalsReducer(state, action) {
  const newState = structuredClone(state);
  for (const key in newState) newState[key] = !!(action?.[key]);
  return newState;
}

export const NewOrder_Customer = () => {
  const starter_draft = {
    discounts_taxes: {
      tax: 0,
      shipping: 0,
      discount: 0,
      discount_is_percentage: false,
    },

    status: 1,
    price: 0,
    amount_paid: 0,
    title: "",
    payment_method: "cheque",
    delivery_address: "",
    due_date: "",

    quote: null,
    customer: null,
    event_type: null,
    delivery_note: "",
  };
  const started_collections = {
    packages: [],
    services: [],
    products: [],
  };
  const navigate = useNavigate();
  const [modals, trigger] = useReducer(modalsReducer, { article: false, quote: false, customer: false, tax: false, discount: false, shipping: false });
  const [draft, dispatch] = useReducer(baseReducer, starter_draft);
  const [collections, dispatchCollections] = useReducer(collectionsReducer, started_collections);
  const closeModals = () => trigger({ article: false });
  function onModal_Dynamic(key) { trigger({ [key]: true }) }

  const actions = {
    async onPublish() {
      const snapshot = structuredClone(draft);
    },
    onCancel() {
      navigate("/");
    }
  }

  return <TemplateEdit title="NOUVEAU BON DE COMMAND">
    <ArticlesModal column="modal" {...collections} show={modals.article} onClose={closeModals} dispatch={dispatchCollections} />
    <CustomerModal column="modal" {...draft} show={modals.customer} onClose={closeModals} dispatch={dispatch} />
    <QuotesModal column="modal" {...draft} {...collections} show={modals.quote} onClose={closeModals} dispatch={dispatch} collection_dispatch={dispatchCollections} />

    <TaxModal column="modal" {...draft} show={modals.tax} onClose={closeModals} dispatch={dispatch} />
    <DiscountModal column="modal" {...draft} show={modals.discount} onClose={closeModals} dispatch={dispatch} />
    <ShippingModal column="modal" {...draft} show={modals.shipping} onClose={closeModals} dispatch={dispatch} />

    <GeneralCard column="primary" {...draft} dispatch={dispatch} />
    <ListCard column="primary" dispatch={dispatchCollections} onModal={onModal_Dynamic} {...draft} {...collections} />
    <StatisticsCard column="primary" {...draft} dispatch={dispatch} />

    <CustomerCard column="auxilary" {...draft} onModal={onModal_Dynamic} />
    <NotesCard column="auxilary" {...draft} dispatch={dispatch} />
    <PriceCard column="auxilary" {...draft} {...collections} dispatch={dispatch} />
    <DeliveryCard column="auxilary" {...draft} dispatch={dispatch} />

    <ActionCard column="auxilary" {...actions} dispatch={dispatch} />
  </TemplateEdit>
}

export const NewOrder_Vendor = () => {
  const starter_draft = {
    discounts_taxes: {
      tax: 0,
      shipping: 0,
      discount: 0,
      discount_is_percentage: false,
    },

    status: 1,
    price: 0,
    amount_paid: 0,
    title: "",
    payment_method: "cheque",
    delivery_address: "",
    due_date: "",

    quote: null,
    vendor: null,
    event_type: null,
    delivery_note: "",
  };
  const started_collections = {
    packages: [],
    services: [],
    products: [],
  };
  const navigate = useNavigate();
  const [modals, trigger] = useReducer(modalsReducer, { article: false, quote: false, vendor: false, tax: false, discount: false, shipping: false });
  const [draft, dispatch] = useReducer(baseReducer, starter_draft);
  const [collections, dispatchCollections] = useReducer(collectionsReducer, started_collections);
  const closeModals = () => trigger({ article: false });
  function onModal_Dynamic(key) { trigger({ [key]: true }) }

  const actions = {
    async onPublish() {
      const snapshot = structuredClone(draft);
    },
    onCancel() {
      navigate("/");
    }
  }

  return <TemplateEdit title="NOUVEAU BON DE COMMAND">
    <ArticlesModal column="modal" {...collections} {...draft} show={modals.article} onClose={closeModals} dispatch={dispatchCollections} />
    <VendorModal column="modal" {...draft} show={modals.vendor} onClose={closeModals} dispatch={dispatch} />
    <QuotesModal column="modal" {...draft} {...collections} show={modals.quote} onClose={closeModals} dispatch={dispatch} collection_dispatch={dispatchCollections} />

    <TaxModal column="modal" {...draft} show={modals.tax} onClose={closeModals} dispatch={dispatch} />
    <DiscountModal column="modal" {...draft} show={modals.discount} onClose={closeModals} dispatch={dispatch} />
    <ShippingModal column="modal" {...draft} show={modals.shipping} onClose={closeModals} dispatch={dispatch} />

    <GeneralCard column="primary" {...draft} dispatch={dispatch} />
    <VendorListCard column="primary" dispatch={dispatchCollections} onModal={onModal_Dynamic} {...draft} {...collections} />
    <StatisticsCard column="primary" {...draft} dispatch={dispatch} />

    <VendorCard column="auxilary" {...draft} onModal={onModal_Dynamic} />
    <NotesCard column="auxilary" {...draft} dispatch={dispatch} />
    <PriceCard column="auxilary" {...draft} {...collections} dispatch={dispatch} />
    <DeliveryCard column="auxilary" {...draft} dispatch={dispatch} />

    <ActionCard column="auxilary" {...actions} dispatch={dispatch} />
  </TemplateEdit>
}