import Card from "../../components/Card";
import Table from "../../components/Table";
import Radio from "../../components/Radio";
import Button from "../../components/Button";
import GlobalModal from "../../components/GlobalModal";
import TemplateEdit from "../../components/templates/TemplateEdit";

import { createStatesNew, CLASS_NAMES, APPOINTMENT_SHARED } from "../../utils/common";
import { getFilteredPackages, getFilteredProducts, getFilteredCustomers, getFilteredServices } from "../../config/httpRequests";

import Select from "react-select";
import AsyncSelect from "react-select/async";

import { useReducer } from "react";
import { capitalize } from "lodash";
import { useNavigate } from "react-router-dom";
import { AiFillMinusSquare, AiFillPlusSquare, AiOutlineEdit, AiOutlineSearch } from "react-icons/ai";

const StatisticsCard = () => {
  return <Card>
    <h1 className={CLASS_NAMES.label}>Statistiques</h1>
    <h2 className="text-center font-regular font-inter text-highlight">Veuillez créer le devis avant d'essayer de mesurer ses statistiques.</h2>
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
      <input type="text" name="title" id="title" placeholder="Saisissez une titre pour ce devis..." className={CLASS_NAMES.input} value={states.get("title").value} onChange={states.get("title").onChange} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="ref_id" className={CLASS_NAMES.label}>Devis Nº</label>
      <input type="text" name="ref_id" id="ref_id" placeholder="Ce champs ce remplit aprés la creation..." className={CLASS_NAMES.input} disabled />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="status" className={CLASS_NAMES.label}>Statut</label>
      <Select options={APPOINTMENT_SHARED.status} type="text" name="status" id="status" placeholder="Saisissez un statut pour ce devis..." unstyled classNames={CLASS_NAMES.select} value={states.get("status").value} onChange={states.get("status").onChange} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="category" className={CLASS_NAMES.label}>Catégorie</label>
      <AsyncSelect defaultOptions={true} loadOptions={searchCategory} type="text" name="category" id="category" placeholder="Saisissez une categorie  pour ce devis..." unstyled classNames={CLASS_NAMES.select} value={states.get("category").value} onChange={states.get("category").onChange} />
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

const NotesCard = ({ note = "", dispatch }) => {
  const states = createStatesNew({ note }, {}, dispatch);

  return <Card className="gap-4">
    <label htmlFor="note" className={CLASS_NAMES.label}>Notes</label>
    <textarea className={CLASS_NAMES.input + " min-h-[5rem] resize-none"} placeholder="Saisissez vos notes à propos de ce devis..." name="note" id="note" value={states.get("note").value} onChange={states.get("note").onChange}></textarea>
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
        console.log(clonedArticle);
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

const ListFees = ({ products = [], services = [], packages = [], discounts_taxes = {}, onModal }) => {
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


  return <div className="w-full grid grid-cols-[1fr_auto_1fr] grid-rows-4 items-center">
    <h4 className="font-semibold text-weak-contrast py-2">Total partiel</h4>
    <h4 className="text-sm text-strong-contrast text-right col-start-3">{sub_total_display} MAD</h4>

    <Button onClick={() => onModal("discount")} type="soft" className="px-0 hover:bg-transparent" textClassName="font-medium text-roboto text-highlight text-base" textContent="Ajouter une réduction" />
    <h4 className="font-semibold text-weak-contrast">-</h4>
    <h4 className="text-sm text-strong-contrast text-right">{discount_display}</h4>

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

const ListCard = ({ products = [], services = [], packages = [], discounts_taxes, dispatch, onModal }) => {
  const is_empty = products?.length + services?.length + packages?.length === 0;
  return <Card className="gap-4">
    <div className="flex items-center justify-between">
      <h1 className={CLASS_NAMES.label + " col-span-2"}>Articles</h1>
      <Button onClick={() => onModal("article")} textContent={is_empty ? "Ajouter un article" : "Modifier"} />
    </div>
    <ListArticles products={products} services={services} dispatch={dispatch} />
    <hr className="border-weakest-contrast" />
    <ListFees products={products} services={services} packages={packages} discounts_taxes={discounts_taxes} onModal={onModal} />
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

const ArticlesModal = ({ show, products = [], services = [], packages = [], onClose, dispatch: draft_dispatch }) => {
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
      console.log(target, article);
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

const NewQuote = () => {
  const starter_draft = {
    price: 0,
    status: 1,
    note: "",
    title: "",
    customer: null,
    event_type: null,
    discounts_taxes: {
      tax: 0,
      shipping: 0,
      discount: 0,
      discount_is_percentage: false,
    },
  };
  const started_collections = {
    packages: [],
    services: [],
    products: [],
  };
  const navigate = useNavigate();
  const [modals, trigger] = useReducer(modalsReducer, { article: false, customer: false, tax: false, discount: false, shipping: false });
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

  return <TemplateEdit title="NOUVEAU DEVIS">
    <ArticlesModal column="modal" {...collections} show={modals.article} onClose={closeModals} dispatch={dispatchCollections} />
    <CustomerModal column="modal" {...draft} show={modals.customer} onClose={closeModals} dispatch={dispatch} />

    <TaxModal column="modal" {...draft} show={modals.tax} onClose={closeModals} dispatch={dispatch} />
    <DiscountModal column="modal" {...draft} show={modals.discount} onClose={closeModals} dispatch={dispatch} />
    <ShippingModal column="modal" {...draft} show={modals.shipping} onClose={closeModals} dispatch={dispatch} />

    <CustomerModal column="modal" {...draft} show={modals.customer} onClose={closeModals} dispatch={dispatch} />

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

export default NewQuote;