import { Suspense, useEffect, useReducer } from "react";
import { AiOutlineInfoCircle, AiOutlineSearch } from "react-icons/ai";
import { useNavigate, useAsyncValue, Await, useParams } from "react-router-dom";

import Select from "react-select";
import DatePicker from "react-datepicker";
import AsyncSelect from "react-select/async";

import Card from "../../components/Card";
import Radio from "../../components/Radio";
import Table from "../../components/Table";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import AppLoading from "../AppLoading";
import GlobalModal from "../../components/GlobalModal";
import TemplateEdit from "../../components/templates/TemplateEdit";
import { APPOINTMENT_SHARED, CLASS_NAMES, createStatesNew } from "../../utils/common";
import { getOrder, createOrder, getFilteredCustomers, getFilteredEventTypes, getFilteredQuotes } from "../../config/httpRequests";
import { useState } from "react";

const select_classNames = {
  menu: () => "mt-2 rounded-xl bg-secondary p-2 shadow-x border border-weakeast-contrast",
  option: () => "px-4 py-2 text-strong-contrast text-sm rounded-xl hover:bg-highlight hover:text-weakest-contrast",
  control: () => "bg-weakest-contrast px-2 rounded-xl text-sm",
  placeholder: () => "text-sm text-weak-contrast font-medium font-inter truncate",
}

async function searchEventTypes(searchTerm) {
  function mapper({ id, title }) {
    return { value: id, label: title };
  };
  const { appointmentEvents = [] } = await getFilteredEventTypes(searchTerm);
  return appointmentEvents.map(mapper);
}

const GeneralCard = ({ dispatch, title, status, event_type }) => {
  const states = createStatesNew({
    title,
    status: APPOINTMENT_SHARED.getStatus(status),
    event_type: {
      value: event_type?.id,
      label: event_type?.title,
    },
  }, { status: "select", event_type: "select" }, dispatch);
  useEffect(() => states.get("title").set(title), [title]);
  useEffect(() => states.get("status").set(APPOINTMENT_SHARED.getStatus(status)), [status]);
  return <Card className="grid grid-cols-3 grid-rows-2 gap-4" isRaw={true}>
    <div className="flex flex-col gap-2 col-span-3">
      <label htmlFor="title" className={CLASS_NAMES.label}>Titre</label>
      <input type="text" name="title" id="title" placeholder="Saisissez une titre pour ce bon..." className={CLASS_NAMES.input} value={states.get("title").value} onChange={states.get("title").onChange} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="ref_id" className={CLASS_NAMES.label}>Bon de Commande Nº</label>
      <input type="text" name="ref_id" id="ref_id" placeholder="Ce champs ce remplit aprés la creation..." className={CLASS_NAMES.input} disabled />
    </div>
    <div className="flex flex-col gap-2">
      <div className="relative w-fit">
        <label htmlFor="type" className={CLASS_NAMES.label + "inline-block"}>Statut</label>
        <AiOutlineInfoCircle className="absolute top-0 -translate-y-1/4 -right-4 text-xs text-highlight cursor-pointer" />
      </div>
      <Select unstyled classNames={select_classNames} options={APPOINTMENT_SHARED.status} value={states.get("status").value} onChange={states.get("status").onChange} />
    </div>
    <div className="flex flex-col gap-2">
      <div className="relative w-fit">
        <label htmlFor="status" className={CLASS_NAMES.label + "inline-block"}>Type d'événement</label>
        <AiOutlineInfoCircle className="absolute top-0 -translate-y-1/4 -right-4 text-xs text-highlight cursor-pointer" />
      </div>
      <AsyncSelect unstyled classNames={select_classNames} placeholder="Choisir un type d'événement" defaultOptions={true} loadOptions={searchEventTypes} value={states.get("event_type").value} onChange={states.get("event_type").onChange} />
    </div>
  </Card>
}

function defaultHeadParser(...labels) {
  const cells = [];
  for (const label of labels) cells.push({ contentType: "head", contentValue: label });
  return cells;
}

const ReceiptPrices = ({ onDiscount, onShipping, onTax, sub_total = 0, discount = 0, shipping = 0, tax = 0, discount_is_percentage = true }) => {
  function calculateTotal() {
    let total = sub_total;
    const edits = [];
    if (discount_is_percentage) edits.push(-(total / 100) * discount);
    else edits.push(-discount);
    edits.push(shipping);
    total = edits.reduce((prev, x) => prev + x, total);
    total += (total / 100) * tax;
    return total;
  }
  const total = calculateTotal();
  function numberDisplay(n, suffix = "MAD") {
    return [n.toFixed(suffix === "%" ? 0 : 2), suffix].join(" ")
  }
  return <div className="w-full grid grid-cols-[1fr_auto_1fr] grid-rows-4 items-center gap-4">
    <h4 className="font-semibold text-weak-contrast px-4 py-2">Total partiel</h4>
    <h4 className="font-semibold text-strong-contrast text-right col-start-3">{numberDisplay(sub_total)}</h4>

    <Button onClick={onDiscount} type="soft" textClassName="font-bold text-roboto text-highlight text-base" textContent="Ajouter une réduction" />
    <h4 className="font-semibold text-weak-contrast">-</h4>
    <h4 className="font-semibold text-strong-contrast text-right">{numberDisplay(discount, discount_is_percentage ? "%" : "MAD")}</h4>

    <Button onClick={onShipping} type="soft" textClassName="font-bold text-roboto text-highlight text-base text-left" textContent="Ajouter des frais d'expédition" />
    <h4 className="font-semibold text-weak-contrast">-</h4>
    <h4 className="font-semibold text-strong-contrast text-right">{numberDisplay(shipping)}</h4>

    <Button onClick={onTax} type="soft" textClassName="font-bold text-roboto text-highlight text-base" textContent="TVA Éstime" />
    <h4 className="font-semibold text-weak-contrast">Non Calculé</h4>
    <h4 className="font-semibold text-strong-contrast text-right">{numberDisplay(tax, "%")}</h4>

    <h4 className="font-semibold text-strong-contrast">Total</h4>
    <h4 className="font-semibold text-strong-contrast text-right col-start-3">{numberDisplay(total)}</h4>
  </div>
}

const ReceiptCard = ({ dispatch, onImport, onDiscount, onTax, onShipping, customer, quote, tax, discount, discount_is_percentage, shipping }) => {
  const quote_products_interface = quote?.products ?? [];
  const quote_products_display = quote_products_interface.map(({ quantity, product: { id, title, price, genre = "PRODUIT" } }) => {
    return {
      id,
      genre,
      title,
      quantity,
      total: price * quantity,
    };
  });
  const quote_products_rows = quote_products_display.map(({ id, genre, title, quantity, total }) => [
    { contentType: "text", contentValue: [genre, id].join("#") },
    { contentType: "text", contentValue: title },
    { contentType: "text", contentValue: quantity },
    { contentType: "text", contentValue: [total.toFixed(2), "MAD"].join(" "), className: "text-right" },
  ]);
  const quote_products_head = defaultHeadParser("Désignation", "Titre", "Quantité").concat({
    contentType: "head",
    contentValue: "Total",
    className: "text-right",
  });
  const quote_products_sub_total = quote_products_display.reduce((prev, { total }) => prev + total, 0);
  return <Card>
    <div className="flex items-center justify-between gap-4">
      <h1 className={CLASS_NAMES.label + " flex gap-4 items-center"}>
        <span>Détails de la facture</span>
        {!!(quote) && <span className="text-sm text-weak-contrast">DEVIS#{quote?.id}</span>}
      </h1>
      <div className="flex items-center gap-4">
        <Button disabled={!(customer?.id || false)} onClick={onImport} type="soft" textContent="Importer" />
        <Button disabled={!(!!customer && !!quote)} textContent="Ajouter un article" />
      </div>
    </div>
    <hr className="border-weakest-contrast" />
    <Table isCompact={true} rows={quote_products_rows} head={quote_products_head} />
    <hr className="border-weakest-contrast" />
    <h1 className={CLASS_NAMES.label}>Options</h1>
    { // TODO(XENOBAS): Table Empty Message
    }
    <ReceiptPrices onShipping={onShipping} onTax={onTax} onDiscount={onDiscount} sub_total={quote_products_sub_total} tax={tax} shipping={shipping} discount={discount} discount_is_percentage={discount_is_percentage} />
  </Card>
}

const CustomerCard = ({ onModify, customer }) => {
  console.log("Customer", customer);
  const value_class_name = "font-inter text-strong-contrast text-sm";
  const label_class_name = "font-inter text-strong-contrast text-sm font-bold";
  const full_name = !!(customer?.hasOwnProperty("first_name")) ? [customer.first_name, customer.last_name].join(" ") : null;
  return <Card>
    <div className="flex items-center justify-between">
      <h1 className={CLASS_NAMES.label}>Données du client</h1>
      <Button type="soft" textContent="Modifier" textClassName="text-highlight font-bold" onClick={onModify} />
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

const DatesCard = ({ dispatch, due_date }) => {
  const states = createStatesNew({ created_at: new Date(), due_date: new Date(due_date) }, { created_at: "datepicker", due_date: "datepicker" }, dispatch);
  const label_class_name = "font-inter text-strong-contrast text-sm font-bold";
  const datepicker_class_name = "font-inter text-strong-contrast text-sm font-medium bg-weakest-contrast rounded-xl disabled:cursor-not-allowed py-2 px-4 w-full text-center";
  return <Card>
    <h1 className={CLASS_NAMES.label}>Dates</h1>
    <div className="grid grid-cols-2 items-center gap-4">
      <label className={label_class_name}>Date de Création</label>
      <DatePicker className={datepicker_class_name} selected={states.get("created_at").value} onChange={states.get("created_at").onChange} disabled />
      <label className={label_class_name}>Date d'Échéance</label>
      <DatePicker className={datepicker_class_name} selected={states.get("due_date").value} onChange={states.get("due_date").onChange} />
    </div>
  </Card>
}

const PaymentCard = ({ dispatch, payment_method, amount_paid, price = amount_paid }) => {
  const _payment_method = APPOINTMENT_SHARED.getPaymentMethod(payment_method);
  const states = createStatesNew({ payment_method: _payment_method, amount_paid, rest: parseInt(price) - parseInt(amount_paid) }, { payment_method: "select" }, dispatch);
  useEffect(() => {
    let amount_paid = parseInt(states.get("amount_paid").value);
    if (amount_paid > price) amount_paid = price;
    if (amount_paid < 0) amount_paid = 0;
    states.get("rest").set(parseInt(price) - amount_paid);
    states.get("amount_paid").set(amount_paid);
  }, [states.get("amount_paid").value])
  useEffect(() => {
    states.get("rest").set(parseInt(price) - parseInt(states.get("amount_paid").value));
  }, [price])
  const label_class_name = "font-inter text-strong-contrast text-sm font-bold";
  return <Card>
    <h1 className={CLASS_NAMES.label}>Paiement</h1>
    <div className="grid grid-cols-2 items-center gap-4">
      <label className={`${label_class_name} col-span-2`}>Methode de Paiement</label>
      <Select unstyled classNames={{ ...select_classNames, container: () => "col-span-2" }} options={APPOINTMENT_SHARED.payment_methods} value={states.get("payment_method").value} onChange={states.get("payment_method").onChange} />
      <label htmlFor="paid" className={label_class_name}>Payé</label>
      <label htmlFor="remainder" className={label_class_name}>Reste</label>
      <div className="relative w-full h-fit">
        <input value={states.get("amount_paid").value} onChange={states.get("amount_paid").onChange} className={CLASS_NAMES.input + " w-[inherit] pl-12"} type="number" name="paid" id="paid" />
        <span className="absolute top-1/2 -translate-y-1/2 left-2 leading-none text-highlight font-roboto font-semibold text-sm">MAD</span>
      </div>
      <div className="relative w-full h-fit">
        <input value={states.get("rest").value} className={CLASS_NAMES.input + " w-[inherit] pl-12"} type="number" name="remainder" id="remainder" disabled />
        <span className="absolute top-1/2 -translate-y-1/2 left-2 leading-none text-highlight font-roboto font-semibold text-sm">MAD</span>
      </div>
    </div>
  </Card>
}

const ActionCard = ({ onPublish, onCancel }) => {
  return <Card isRaw={true} className="flex justify-end items-center gap-4 mt-auto">
    <Button onClick={onCancel} type="soft" textContent="Annuler" />
    <Button onClick={onPublish} textContent="Publier" />
  </Card>
}

const CustomerModal = ({ show, customer, onSubmit = (id, customer) => { }, onClose = () => { } }) => {
  const states = createStatesNew({
    searchTerm: "",
    searchRows: [],
    searchResult: [],
    searchValid: false,
    searchValidMessage: "Terme de recherche vide...",
    searchSelected: customer?.id,
    searchSelectedData: customer ?? null,
  });

  function _onSubmit() {
    const newCustomerID = states.get("searchSelected").value;
    const customer = states.get("searchSelectedData").value;
    onSubmit(newCustomerID, customer);
    onClose();
  }
  function _onClose() {
    states.get("searchSelected").set(customer?.id);
    states.get("searchSelectedData").set(customer ?? null);
    states.get("searchTerm").set("");
    onClose();
  }

  function onSearch(event) {
    customersQuery(event.target.value);
    states.get("searchTerm").onChange(event);
  }
  const CustomerRow = ({ customer }) => {
    const { id, first_name, last_name } = customer;
    const [checked, setChecked] = useState(id === states.get("searchSelected").value);
    useEffect(() => {
      // setChecked(() => states.get("searchSelected").value === id);
      // console.log("setChecked", first_name, states.get("searchSelected").value === id);
    }, [checked])
    function onSelectCustomer(event) {
      states.get("searchSelected").set(id);
      states.get("searchSelectedData").set(structuredClone(customer));
      setChecked(true);
    }
    const name = [last_name, first_name].join(" ");
    return <tr key={id}>
      <td className="text-sm">{name}</td>
      <td>
        <input type="radio" name="customer_picker" id={`customer_picker-${id}`} checked={checked} onChange={onSelectCustomer} />
      </td>
    </tr>
  }
  // function parseCustomersForTable(customer) {
  //   const { id, first_name, last_name } = customer;
  //   function onSelectCustomer() {
  //     states.get("searchSelected").set(id);
  //     states.get("searchSelectedData").set(structuredClone(customer));
  //   }
  //   const name = [last_name, first_name].join(" ");
  //   return <tr key={id}>
  //     <td className="text-sm">{name}</td>
  //     <td>
  //       <input type="radio" name="customer_picker" id={`customer_picker-${id}`} checked={states.get("searchSelected").value === id} onClick={onSelectCustomer} />
  //     </td>
  //   </tr>
  // }
  async function customersQuery(searchTerm) {
    if (!searchTerm) {
      states.get("searchResult").set([]);
      states.get("searchValid").set(false);
      states.get("searchValidMessage").set("Terme de recherche vide...");
      return;
    }
    const { customers } = await getFilteredCustomers(searchTerm, { contact: true });
    if (!!(customers?.length ?? 0)) {
      const rows = customers.map((customer) => (<CustomerRow customer={customer} />));
      states.get("searchValid").set(true);
      states.get("searchValidMessage").set("");
      states.get("searchRows").set(rows);
      states.get("searchResult").set(structuredClone(customers));
    } else {
      states.get("searchValid").set(false);
      states.get("searchRows").set([]);
      states.get("searchResult").set([]);
      states.get("searchValidMessage").set("Votre recherche ne donne aucun résultat...");
    }
  }
  return <GlobalModal show={show} className="flex flex-col gap-4">
    <h2 className="font-asap font-bold text-strong-contrast">CHANGEMENT DE CLIENT</h2>
    <hr className="border-weakest-contrast" />
    <div className="relative w-full">
      <input type="text" name="searchTerm" id="searchTerm" placeholder="Chercher votre client..." className={CLASS_NAMES.input + " pl-12"} value={states.get("searchTerm").value} onChange={onSearch} />
      <AiOutlineSearch className="absolute top-1/2 -translate-y-1/2 text-2xl left-4 text-highlight" />
    </div>
    {
      states.get("searchValid").value
        ? (
          <table className="bg-secondary px-4 w-full h-fit border-separate border-spacing-2">
            <thead className="font-bold text-base font-asap text-highlight">
              <tr>
                <th className="text-left">NOM COMPLET</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {states.get("searchRows").value}
            </tbody>
          </table>
        )
        : <h1 className="font-asap font-medium text-center text-red-700">{states.get("searchValidMessage").value}</h1>
    }
    <hr className="border-weakest-contrast" />
    <div className="flex justify-end items-center gap-4">
      <Button onClick={_onClose} type="soft" textContent="Annuler" />
      <Button disabled={!(states.get("searchSelected").value)} onClick={_onSubmit} textContent="Appliquer" />
    </div>
  </GlobalModal>
}

const QuoteModal = ({ show, quote = null, onSubmit = (id, quote) => { }, onClose = () => { } }) => {
  const states = createStatesNew({
    searchTerm: "",
    searchRows: [],
    searchResult: [],
    searchValid: false,
    searchValidMessage: "Terme de recherche vide...",
    searchSelected: null,
    searchSelectedData: null,
  });

  function _onSubmit() {
    const quote_id = states.get("searchSelected").value;
    const quote = states.get("searchSelectedData").value;
    onSubmit(quote_id, quote);
    onClose();
  }
  function _onClose() {
    states.get("searchTerm").set("");
    states.get("searchSelected").set(quote?.id);
    states.get("searchSelectedData").set(quote);
    onClose();
  }

  function onSearch(event) {
    quotesQuery(event.target.value);
    states.get("searchTerm").onChange(event);
  }
  function parseQuotesForTable(_quote) {
    const { id, title } = _quote;
    function onSelectQuote(_, newValue) {
      states.get("searchSelected").set(newValue ? id : null);
      states.get("searchSelectedData").set(newValue ? structuredClone(_quote) : null);
    }
    return <tr key={id}>
      <td className="text-sm">{id}</td>
      <td className="text-sm">{title}</td>
      <td>
        <Checkbox
          id={Math.random() * id}
          initialChecked={states.get("searchSelected").value === id}
          onChange={onSelectQuote}
        />
      </td>
    </tr>
  }
  async function quotesQuery(searchTerm) {
    if (!searchTerm) {
      states.get("searchResult").set([]);
      states.get("searchValid").set(false);
      states.get("searchValidMessage").set("Terme de recherche vide...");
      return;
    }
    const { quotes } = await getFilteredQuotes(searchTerm, { products: { include: { product: true } } });
    if (!!(quotes?.length ?? 0)) {
      const rows = quotes.map(parseQuotesForTable);
      states.get("searchValid").set(true);
      states.get("searchValidMessage").set("");
      states.get("searchRows").set(rows);
      states.get("searchResult").set(structuredClone(quotes));
    } else {
      states.get("searchValid").set(false);
      states.get("searchRows").set([]);
      states.get("searchResult").set([]);
      states.get("searchValidMessage").set("Votre recherche ne donne aucun résultat...");
    }
  }
  return <GlobalModal show={show} className="flex flex-col gap-4">
    <h2 className="font-asap font-bold text-strong-contrast">CHANGEMENT DE DEVIS</h2>
    <hr className="border-weakest-contrast" />
    <div className="relative w-full">
      <input type="text" name="searchTerm" id="searchTerm" placeholder="Chercher votre devis..." className={CLASS_NAMES.input + " pl-12"} value={states.get("searchTerm").value} onChange={onSearch} />
      <AiOutlineSearch className="absolute top-1/2 -translate-y-1/2 text-2xl left-4 text-highlight" />
    </div>
    {
      states.get("searchValid").value
        ? (
          <table className="bg-secondary px-4 w-full h-fit border-separate border-spacing-2">
            <thead className="font-bold text-base font-asap text-highlight">
              <tr>
                <th className="text-left">REF.</th>
                <th className="text-left">TITRE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {states.get("searchRows").value}
            </tbody>
          </table>
        )
        : <h1 className="font-asap font-medium text-center text-red-700">{states.get("searchValidMessage").value}</h1>
    }
    <hr className="border-weakest-contrast" />
    <div className="flex justify-end items-center gap-4">
      <Button onClick={_onClose} type="soft" textContent="Annuler" />
      <Button onClick={_onSubmit} textContent="Appliquer" />
    </div>
  </GlobalModal>
}

const DiscountModal = ({ show, discount = 0, discount_is_percentage = false, onSubmit = () => { }, onClose = () => { } }) => {
  const discount_options = [
    { value: true, label: "Pourcentage" },
    { value: false, label: "Montant" },
  ];
  const discount_option = discount_options.find(({ value }) => value === discount_is_percentage);

  const states = createStatesNew({ discount_option, discount }, { discount_option: "select" });

  useEffect(() => {
    const is_percentage = states.get("discount_option").value.value;
    let discount = parseInt(states.get("discount").value);
    if (is_percentage && discount > 100) discount = 100;
    if (discount < 0) discount = 0;
    states.get("discount").set(discount);
  }, [states.get("discount").value, states.get("discount_option").value.value])

  function _onSubmit() {
    const discount_is_percentage = states.get("discount_option").value?.value;
    const discount = parseInt(states.get("discount").value);
    onSubmit(discount, discount_is_percentage);
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
        <Select id="discount_type" unstyled classNames={select_classNames} options={discount_options} value={states.get("discount_option").value} onChange={states.get("discount_option").onChange} />
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="discount_value">Valeur de la réduction</label>
        <div className="w-full relative">
          <input type="number" name="discount_value" id="discount_value" className={CLASS_NAMES.input + ` w-full pl-${states.get("discount_option").value?.value ? "8" : "16"}`} value={states.get("discount").value} onChange={states.get("discount").onChange} />
          <label htmlFor="discount_value" className="absolute top-1/2 -translate-y-1/2 left-4 font-inter font-semibold text-sm">{states.get("discount_option").value?.value ? "%" : "MAD"}</label>
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

const ShippingModal = ({ show, shipping = 0, onSubmit = () => { }, onClose = () => { } }) => {
  const shipping_mode_options = [
    { id: "free", label: "Expédition Gratuit (Sans frais de livraison)" },
    { id: "custom", label: "Personalisée" },
  ];
  const states = createStatesNew({ shipping_mode: shipping === 0 ? "free" : "custom", shipping: 0 });

  useEffect(() => {
    const shipping = parseInt(states.get("shipping").value);
    if (shipping < 0) states.get("shipping").set(0);
  }, [states.get("shipping").value]);

  useEffect(() => {
    const shipping_mode = states.get("shipping_mode").value;
    if (shipping_mode === "free") states.get("shipping").set(0);
  }, [states.get("shipping_mode").value]);

  function _onSubmit() {
    const shipping = parseInt(states.get("shipping").value);
    onSubmit(shipping);
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

const TaxModal = ({ show, tax = 0, onSubmit = () => { }, onClose = () => { } }) => {
  const tax_options = [
    { id: 0, label: "0%" },
    { id: 10, label: "10%" },
    { id: 20, label: "20%" },
  ];
  const states = createStatesNew({ tax });

  function _onSubmit() {
    const tax = parseInt(states.get("tax").value);
    onSubmit(tax);
    onClose();
  }
  function _onClose() {
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

async function loadItem() {
  const { orderID } = useParams();

  const id = parseInt(orderID);
  if (isNaN(id)) throw new Error("IDs must be numbers.");

  const order = await getOrder(id);
  if (!order) throw new Error(`Order#${id} does not exist.`);

  return order;
}

const OrderCustomer_Widget = () => {
  const navigate = useNavigate();

  function defaultReducer(state, action) {
    const new_state = structuredClone(state);
    for (const field in action) new_state[field] = action[field];
    return new_state;
  }
  function modalsReducer(state, action) {
    const newState = structuredClone(state);
    for (const key in newState) newState[key] = !!(action?.[key]);
    return newState;
  }
  const loadedDraft = useAsyncValue();
  console.log("Loaded draft:", loadedDraft);
  const loadedModals = { customer: false, quote: false, discount: false, shipping: false, tax: false };
  const [draft, dispatchDraft] = useReducer(defaultReducer, loadedDraft);
  const [modals, dispatchModals] = useReducer(modalsReducer, loadedModals);


  function cancelChanges() {
    dispatchDraft(loadedDraft);
  }
  function onModify_Customer() { dispatchModals({ customer: true }) }
  function onModify_Quote() { dispatchModals({ quote: true }) }
  function onModify_Discount() { dispatchModals({ discount: true }) }
  function onModify_Tax() { dispatchModals({ tax: true }) }
  function onModify_Shipping() { dispatchModals({ shipping: true }) }

  function onSubmit_Customer(customer_id, customer) { dispatchDraft({ customer, customer_id }) }
  function onSubmit_Discount(discount, discount_is_percentage) { dispatchDraft({ discount, discount_is_percentage }) }
  function onSubmit_Shipping(shipping) { dispatchDraft({ shipping }) }
  function onSubmit_Tax(tax) { dispatchDraft({ tax }) }
  function onSubmit_Quote(quote_id, quote) {
    if (!!quote) {
      const products = quote.products.map(({ product, quantity }) => { return { ...product, quantity } });
      const price = products.reduce((prev, x) => prev + (x.quantity * x.price), 0);

      dispatchDraft({ quote, quote_id, products, price });
    } else {
      dispatchDraft({ quote, quote_id })
    }
  }
  async function publishChanges() {
    const extractID = (obj) => obj?.id ?? null;
    const changes = structuredClone(draft);

    const { services: unmapped_services, packages: unmapped_packages, products: unmapped_products } = changes;

    const services = unmapped_services.map(extractID);
    const packages = unmapped_packages.map(extractID);
    const products = unmapped_products.map(extractID);

    const { quote, customer } = changes;
    const quote_id = extractID(quote);
    const customer_id = extractID(customer);

    const { amount_paid: amount_paid_string } = changes;
    const amount_paid = parseInt(amount_paid_string) || loadedDraft.price;

    const { discount, discount_is_percentage: discout_is_percentage, tax, shipping } = changes;

    const discount_information = { discount, shipping, tax, discout_is_percentage }

    const { event_type: event_type_id } = changes;
    const { title, status, payment_method, due_date, price } = changes;

    const payload = {
      quote_id,
      customer_id,
      event_type_id,

      packages,
      products,
      services,

      price,
      amount_paid,

      title,
      status,
      due_date,
      payment_method,

      discount_information,
      delivery_address: "",
    };

    const { order } = await createOrder(payload);
    navigate(`/order/customers/${order?.id}`);

  }
  return <TemplateEdit title="NOUVEAU BON DE COMMANDE / CLIENT">
    {/*  Modals  */}
    <CustomerModal column="modal" show={modals.customer} customer={draft.customer} onClose={dispatchModals} onSubmit={onSubmit_Customer} />
    <QuoteModal column="modal" show={modals.quote} onClose={dispatchModals} onSubmit={onSubmit_Quote} />
    <DiscountModal column="modal" show={modals.discount} onClose={dispatchModals} onSubmit={onSubmit_Discount} />
    <ShippingModal column="modal" show={modals.shipping} onClose={dispatchModals} onSubmit={onSubmit_Shipping} />
    <TaxModal column="modal" show={modals.tax} onClose={dispatchModals} onSubmit={onSubmit_Tax} />
    {/*  Cards  */}
    <GeneralCard column="primary" dispatch={dispatchDraft} {...draft} />
    <ReceiptCard column="primary" onImport={onModify_Quote} onDiscount={onModify_Discount} onTax={onModify_Tax} onShipping={onModify_Shipping} customer={draft.customer} quote={draft.quote} tax={draft.tax} shipping={draft.shipping} discount={draft.discount} discount_is_percentage={draft.discount_is_percentage} />
    <CustomerCard column="auxilary" onModify={onModify_Customer} customer={draft.customer} />
    <DatesCard column="auxilary" due_date={draft.due_date} dispatch={dispatchDraft} />
    <PaymentCard column="auxilary" dispatch={dispatchDraft} amount_paid={draft.amount_paid} price={draft.price} payment_method={draft.payment_method} />
    <ActionCard column="auxilary" onCancel={cancelChanges} onPublish={publishChanges} />
  </TemplateEdit>
}

export const EditOrder_Customer = () => {
  const query_promise = loadItem();
  return (
    <Suspense fallback={<AppLoading />}>
      <Await resolve={query_promise}>
        <OrderCustomer_Widget />
      </Await>
    </Suspense>
  );
}