// TODO: This module exports both variants for Vendor and Customer

import Card from "../../components/Card";
import Table from "../../components/Table";
import Radio from "../../components/Radio";
import Button from "../../components/Button";
import GlobalModal from "../../components/GlobalModal";
import TemplateEdit from "../../components/templates/TemplateEdit";

import { createStatesNew, CLASS_NAMES, APPOINTMENT_SHARED } from "../../utils/common";
import { getFilteredPackages, getFilteredProducts, getFilteredCustomers, getFilteredServices, getFilteredQuotes, getFilteredVendors, getFilteredOrders } from "../../config/httpRequests";

import Select from "react-select";
import AsyncSelect from "react-select/async";

import { useReducer } from "react";
import { capitalize } from "lodash";
import { useNavigate } from "react-router-dom";
import { AiFillEdit, AiFillMinusSquare, AiFillPlusSquare, AiOutlineEdit, AiOutlineSearch } from "react-icons/ai";
import Checkbox from "../../components/Checkbox";

const StatisticsCard = () => {
  return <Card>
    <h1 className={CLASS_NAMES.label}>Statistiques</h1>
    <h2 className="text-center font-regular font-inter text-highlight">Veuillez créer la commande avant d'essayer de mesurer ses statistiques.</h2>
  </Card>
}

const GeneralCard = ({ dispatch, title, status, category }) => {
  const _status = APPOINTMENT_SHARED.getStatus(status);
  const states = createStatesNew({ title, status: _status, category: { value: category?.id, label: category?.title } }, { status: "select", category: "select" }, dispatch);

  async function searchCategory(searchTerm) {
    return [];
  }

  return <Card className="grid grid-cols-3 gap-4" isRaw={true}>
    <div className="flex flex-col gap-2 col-span-3">
      <label htmlFor="title" className={CLASS_NAMES.label}>Titre</label>
      <input type="text" name="title" id="title" placeholder="Saisissez une titre pour cette commande..." className={CLASS_NAMES.input} value={states.get("title").value} onChange={states.get("title").onChange} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="ref_id" className={CLASS_NAMES.label}>Livraison Nº</label>
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

function defaultHeadParser(...labels) {
  const cells = [];
  for (const label of labels) cells.push({ contentType: "head", contentValue: label });
  return cells;
}

const ListMaterials = ({ products = [], dispatch }) => {
  function format_list_to_row(target, arr) {
    return arr.map?.((article) => {
      const broken = (article["broken"] !== null) && (article["broken"] !== undefined);
      function onChangeQuantity(event) {
        const clonedArticle = structuredClone(article);
        const quantity = parseInt(event.target.value ?? "1");
        clonedArticle["quantity"] = quantity;
        dispatch({
          kind: "replace",
          target,
          articles: [clonedArticle],
        });
      }
      function onChangeBrokenCount(event) {
        const clonedArticle = structuredClone(article);
        const broken = parseInt(event.target.value ?? "1");
        clonedArticle["broken"] = broken;
        dispatch({
          kind: "replace",
          target,
          articles: [clonedArticle],
        });
      }
      function onChangeBrokenState(oldValue, newValue) {
        const clonedArticle = structuredClone(article);
        const quantity = clonedArticle["quantity"];
        if (newValue) clonedArticle["broken"] = quantity;
        else clonedArticle["broken"] = undefined;
        dispatch({
          kind: "replace",
          target,
          articles: [clonedArticle],
        });
        // const clonedArticle = structuredClone(article);
        // const quantity = parseInt(event.target.value ?? "1");
        // clonedArticle["quantity"] = quantity;
        // dispatch({
        //   kind: "replace",
        //   target,
        //   articles: [clonedArticle],
        // });
      }
      return [
        { contentType: "text", contentValue: article.title },
        { contentType: "text", contentValue: [article.price?.toFixed(2), "MAD"].reverse().join(" ") },
        { contentType: "wrapped", contentValue: <input type="number" className={CLASS_NAMES.input + " max-w-[4rem]"} onChange={onChangeQuantity} value={article.quantity} /> },
        { contentType: "wrapped", contentValue: <Checkbox initialChecked={broken} onChange={onChangeBrokenState} /> },
        { contentType: "text", contentValue: broken ? <input type="number" className={CLASS_NAMES.input + " max-w-[4rem]"} onChange={onChangeBrokenCount} value={article["broken"]} /> : article.quantity },
      ];
    }) ?? [];
    // BAD(XENOBAS): Input loses focus on rerender.
  }
  const table_args = {
    isCompact: true,
    head: defaultHeadParser("Materiel", "Réf.", "Quantité", "Cassé", "Reste"),
    rows: [
      ...format_list_to_row("products", products),
    ],
  };
  return <Table {...table_args} className="border-spacing-x-2" />
}

const OrderMaterials = ({ services = [], products = [], packages = [] }) => {
  function format_list_to_row(target, arr) {
    return arr.map?.((article) => {
      console.log(article);
      return [
        { contentType: "text", contentValue: article.title },
        { contentType: "text", contentValue: [article.price?.toFixed(2), "MAD"].reverse().join(" ") },
        { contentType: "wrapped", contentValue: article.quantity },
      ];
    }) ?? [];
    // BAD(XENOBAS): Input loses focus on rerender.
  }
  const table_args = {
    isCompact: true,
    head: defaultHeadParser("Désignation", "Prix", "Quantité"),
    rows: [
      ...format_list_to_row("products", products),
      ...format_list_to_row("services", services),
      ...format_list_to_row("packages", packages),
    ],
  };
  return <Table {...table_args} className="border-spacing-x-2" />
}
const OrderCard = ({ customer, vendor, order = {}, onModal }) => {
  const { products: un_products = [], services = [], packages = [] } = order;
  const is_empty = un_products?.length + services?.length + packages?.length === 0;
  const products = un_products.map(({ product, quantity }) => {
    const clone = structuredClone(product);
    clone["quantity"] = quantity;
    return clone;
  });
  const disabled = !(!!(customer?.["id"]) || !!(vendor?.["id"]));
  return <Card className="gap-4">
    <div className="flex items-center justify-between gap-4">
      <h1 className={CLASS_NAMES.label + " col-span-2"}>Bon de Commande</h1>
      <div className="ml-auto"></div>
      <Button disabled={disabled} onClick={() => onModal("order")} textContent={!(order?.["id"]) ? "Attachez" : "Détacher"} />
    </div>
    {
      is_empty
        ? (
          <h1 className="text-center font-regular font-inter text-highlight">Veuillez joindre ce reçu à la facture de la commande.</h1>
        ) : (<OrderMaterials products={products} services={services} />)
    }
  </Card>
}

const ListCard = ({ customer, products = [], dispatch, onModal }) => {
  const is_empty = products?.length === 0;
  return <Card className="gap-4">
    <div className="flex items-center justify-between gap-4">
      <h1 className={CLASS_NAMES.label + " col-span-2"}>Matériaux</h1>
      <Button onClick={() => onModal("article")} textContent={is_empty ? "Ajouter un matériau" : "Modifier"} />
    </div>
    <ListMaterials products={products} dispatch={dispatch} />
  </Card>
}

const VendorListCard = ({ vendor, products = [], discounts_taxes, dispatch, onModal }) => {
  const is_empty = products?.length === 0;
  return <Card className="gap-4">
    <div className="flex items-center justify-between gap-4">
      <h1 className={CLASS_NAMES.label + " col-span-2"}>Articles</h1>
      <div className="ml-auto"></div>
      <Button onClick={() => onModal("quote")} textContent="Import Devis" type="soft" disabled={!(vendor?.["id"])} />
      <Button onClick={() => onModal("article")} textContent={is_empty ? "Ajouter un article" : "Modifier"} />
    </div>
    <ListMaterials products={products} />
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

const MaterialsModal = ({ show, customer, vendor, products = [], onClose, dispatch: draft_dispatch }) => {
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
  const [collections, dispatchComplex] = useReducer(collectionsReducer, { products });

  async function onSearch(event) {
    const searchTerm = event.target.value;
    dispatch({ searchTerm });
    if (searchTerm.length === 0) {
      dispatch({ searchTerm, searchValid: false, searchValidMessage: "Terme de recherche vide..." });
      return;
    }

    const { products } = await getFilteredProducts(searchTerm);

    if (products.length === 0) {
      dispatch({ searchTerm, searchValid: false, searchValidMessage: "Search term yields no results." });
      return;
    }
    dispatch({ searchTerm, searchValid: true, searchResult: products });
  }

  const MaterialsQuery = ({ message, valid = true, products = [] }) => {
    if (!valid) return <h1 className="font-roboto font-medium text-center text-highlight">{message}</h1>
    /**
     * 
     * @param {"products" | "services" | "packages"} __target 
     * @param {*} __article 
     */
    const rows = products.map((product) => {
      const { id, title, price } = product;
      function addProduct() {
        const clonedProduct = structuredClone(product);
        dispatchComplex({
          kind: "add",
          target: "products",
          articles: [clonedProduct],
        })
      }
      return <tr key={[id, "product", "query"].join("-")}>
        <td className="text-2xl text-left">
          <AiFillPlusSquare onClick={addProduct} className="inline-block m-0 cursor-pointer text-highlight/90 hover:text-highlight duration-150 transition-colors" />
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

  const MaterialsManage = ({ products = [] }) => {
    const articles = [];
    articles.push(
      ...products.map((product) => ({ key: "product", product })),
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
    dispatchComplex({ products });
    onClose();
  }
  function _onSubmit() {
    const { products: modal_products } = collections;
    const dispatch_products = modal_products.map((product) => {
      const index = products.findIndex((p) => p.id === product.id);
      if (index !== -1)
        product["quantity"] = products[index]["quantity"];
      return product;
    });
    draft_dispatch?.({ products: dispatch_products });
    onClose();
  }

  return <GlobalModal show={show} className="flex flex-col gap-4 min-w-[50vw]">
    <h2 className="font-asap font-bold text-strong-contrast">AJOUTER DES MATÉRIAUX</h2>
    <div className="relative w-full">
      <input type="text" name="searchTerm" id="searchTerm" placeholder="Chercher votre article..." className={CLASS_NAMES.input + " pl-12 w-full"} value={state.searchTerm} onChange={onSearch} />
      <AiOutlineSearch className="absolute top-1/2 -translate-y-1/2 text-2xl left-4 text-highlight" />
    </div>
    <MaterialsQuery valid={state.searchValid} message={state.searchValidMessage} products={state.searchResult} />
    <hr className="border-weakest-contrast" />
    {
      ((collections.products?.length) > 0) && <MaterialsManage {...collections} />
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
    {
      !!(state.selected)
      && (
        <div className="contents">
          <hr className="border-weakest-contrast col-span-2" />
          <div className="px-2 grid grid-cols-[auto_1fr] items-center gap-2">
            <h2 className={CLASS_NAMES.label}>Titre</h2>
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

const OrdersModal = ({ show, customer, order, dispatch: draft_dispatch, onClose }) => {
  const [state, dispatch] = useReducer((state, actions) => {
    const newState = structuredClone(state);
    for (const action in actions) newState[action] = actions[action];
    return newState;
  }, {
    selected: order,

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
    const { orders } = await getFilteredOrders(searchTerm);
    if (orders.length === 0) {
      dispatch({ searchTerm, searchValid: false, searchValidMessage: "Search term yields no results." });
      return;
    }
    dispatch({ searchTerm, searchValid: true, searchResult: orders });
  }

  const OrdersQuery = ({ message, valid = true, orders = [] }) => {
    if (!valid) return <h1 className="font-roboto font-medium text-center text-highlight">{message}</h1>
    const rows = orders.map((order) => {
      const { id, title } = order;
      function selectOrder() {
        dispatch({ selected: order });
      }
      return <tr key={"order-" + id}>
        <td>{title}</td>
        <td className="text-2xl text-right">
          <AiOutlineEdit onClick={selectOrder} className="inline-block m-0 cursor-pointer text-highlight/90 hover:text-highlight duration-150 transition-colors" />
        </td>
      </tr>
    });
    return <table className="border-separate border-spacing-2">
      <thead className="font-bold text-base font-asap text-highlight">
        <tr>
          <th className="text-left">TITRE</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  }

  function _onSubmit() {
    const order = state.selected;
    draft_dispatch?.({ order });
    // onSubmit(id, state.selected);
    onClose();
  }

  function _onCancel() {
    dispatch({
      selected: order,

      searchTerm: "",
      searchValid: false,
      searchValidMessage: "Empty search term",
    });
    onClose();
  }

  const lproducts = state.selected?.products ?? [];
  const lservices = state.selected?.services ?? [];
  const lpackages = state.selected?.packages ?? [];

  return <GlobalModal show={show} className="flex flex-col gap-4 min-w-[50vw]">
    <h2 className="font-asap font-bold text-strong-contrast">ATTACHER UNE COMMANDE</h2>
    <div className="relative w-full">
      <input type="text" name="searchTerm" id="searchTerm" placeholder="Chercher votre client..." className={CLASS_NAMES.input + " pl-12 w-full"} value={state.searchTerm} onChange={onSearch} />
      <AiOutlineSearch className="absolute top-1/2 -translate-y-1/2 text-2xl left-4 text-highlight" />
    </div>
    <OrdersQuery valid={state.searchValid} message={state.searchValidMessage} orders={state.searchResult} selected={state.selected} />
    {
      !!(state.selected)
      && (
        <div className="contents">
          <hr className="border-weakest-contrast col-span-2" />
          <div className="px-2 grid grid-cols-[auto_1fr] items-center gap-2">
            <h2 className={CLASS_NAMES.label}>Titre</h2>
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
  if (!!action["status"]) action["status"] = { value: action["status"]?.value, label: action["status"]?.label };
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

export const NewInvoice_Customer = () => {
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
  const [modals, trigger] = useReducer(modalsReducer, { order: false, article: false, quote: false, customer: false, tax: false, discount: false, shipping: false });
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

  return <TemplateEdit title="NOUVEAU BON DE LIVRAISON">
    <CustomerModal column="modal" {...draft} show={modals.customer} onClose={closeModals} dispatch={dispatch} />
    <OrdersModal column="modal" {...draft} {...collections} show={modals.order} onClose={closeModals} dispatch={dispatch} collection_dispatch={dispatchCollections} />
    <QuotesModal column="modal" {...draft} {...collections} show={modals.quote} onClose={closeModals} dispatch={dispatch} collection_dispatch={dispatchCollections} />
    <MaterialsModal column="modal" {...collections} show={modals.article} onClose={closeModals} dispatch={dispatchCollections} />

    <TaxModal column="modal" {...draft} show={modals.tax} onClose={closeModals} dispatch={dispatch} />
    <DiscountModal column="modal" {...draft} show={modals.discount} onClose={closeModals} dispatch={dispatch} />
    <ShippingModal column="modal" {...draft} show={modals.shipping} onClose={closeModals} dispatch={dispatch} />

    <GeneralCard column="primary" {...draft} dispatch={dispatch} />
    <OrderCard column="primary" {...draft} dispatch={dispatch} onModal={onModal_Dynamic} />
    <ListCard column="primary" dispatch={dispatchCollections} onModal={onModal_Dynamic} {...draft} {...collections} />

    <CustomerCard column="auxilary" {...draft} onModal={onModal_Dynamic} />
    <DeliveryCard column="auxilary" {...draft} dispatch={dispatch} />
    <NotesCard column="auxilary" {...draft} dispatch={dispatch} />

    <ActionCard column="auxilary" {...actions} dispatch={dispatch} />
  </TemplateEdit>
}

export const NewInvoice_Vendor = () => {
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
  const [modals, trigger] = useReducer(modalsReducer, { order: false, article: false, quote: false, vendor: false, tax: false, discount: false, shipping: false });
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

  return <TemplateEdit title="NOUVEAU BON DE LIVRAISON">
    <VendorModal column="modal" {...draft} show={modals.vendor} onClose={closeModals} dispatch={dispatch} />
    <OrdersModal column="modal" {...draft} {...collections} show={modals.order} onClose={closeModals} dispatch={dispatch} collection_dispatch={dispatchCollections} />
    <QuotesModal column="modal" {...draft} {...collections} show={modals.quote} onClose={closeModals} dispatch={dispatch} collection_dispatch={dispatchCollections} />
    <MaterialsModal column="modal" {...collections} {...draft} show={modals.article} onClose={closeModals} dispatch={dispatchCollections} />

    <TaxModal column="modal" {...draft} show={modals.tax} onClose={closeModals} dispatch={dispatch} />
    <DiscountModal column="modal" {...draft} show={modals.discount} onClose={closeModals} dispatch={dispatch} />
    <ShippingModal column="modal" {...draft} show={modals.shipping} onClose={closeModals} dispatch={dispatch} />

    <GeneralCard column="primary" {...draft} dispatch={dispatch} />
    <OrderCard column="primary" {...draft} dispatch={dispatch} onModal={onModal_Dynamic} />
    <VendorListCard column="primary" dispatch={dispatchCollections} onModal={onModal_Dynamic} {...draft} {...collections} />

    <VendorCard column="auxilary" {...draft} onModal={onModal_Dynamic} />
    <DeliveryCard column="auxilary" {...draft} dispatch={dispatch} />
    <NotesCard column="auxilary" {...draft} dispatch={dispatch} />

    <ActionCard column="auxilary" {...actions} dispatch={dispatch} />
  </TemplateEdit>
}