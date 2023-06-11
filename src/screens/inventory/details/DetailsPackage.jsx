// import React, { useState } from "react";

// import Card from "../../../components/Card"
// import Table from "../../../components/Table";
// import Button from "../../../components/Button";
// import AppLoading from "../../AppLoading";
// import AsyncSelect from "react-select/async";
// import EditToolbox from "../../../components/EditToolbox";

// import { CLASS_NAMES, createStates, PromiseTimeout } from "../../../utils/common";
// import { Await, useParams, useAsyncValue } from "react-router-dom";

// import { getDatabase, updateDatabase } from "../../../utils/temporary";

// const GeneralCard = ({ title, id, category, sub_category }) => {
//   const states = createStates(["title", title], ["category", category, "select"], ["subCategory", sub_category]);

//   const [modeEdit, setModeEdit] = useState(false);
//   const toggleModeEdit = () => setModeEdit((prev) => !prev);

//   const saveChanges = async () => {
//     const database = getDatabase();

//     const index = database["packages"].findIndex((_package) => _package.id === id);
//     if (index === -1) {
//       toggleModeEdit();
//       return;
//     }

//     for (const key of states.keys()) {
//       switch (key) {
//         case "__reset":
//           continue;
//         case "category": {
//           const value = states.get(key).exporter();
//           database["packages"][index]["categoryId"] = value;
//         } break;
//         default: {
//           const value = states.get(key).exporter();
//           database["packages"][index][key] = value;
//         }
//       }
//     }

//     updateDatabase(database);
//     await PromiseTimeout(300);

//     toggleModeEdit();
//   };
//   const cancelChanges = async () => {
//     states.get("__reset")();
//     toggleModeEdit();
//   };

//   return (
//     <Card>
//       <EditToolbox save={saveChanges} cancel={cancelChanges} toggle={toggleModeEdit} modeEdit={modeEdit} />
//       <div className="flex flex-col gap-2">
//         <h4 className="font-asap font-bold text-strong-contrast">Titre</h4>
//         <input readOnly={!modeEdit} value={states.get("title").getter} onChange={states.get("title").setter} type="text" className={CLASS_NAMES.input} placeholder="Saisissez un titre...." />
//       </div>
//       <div className="flex gap-4">
//         <div className="flex flex-1 flex-col gap-2">
//           <h4 className="font-asap font-bold text-strong-contrast">Ref N°</h4>
//           <input value={id} readOnly={true} type="text" className={CLASS_NAMES.input} placeholder="This is not supposed empty." defaultValue="IJK3397" />
//         </div>
//         <div className="flex flex-1 flex-col gap-2">
//           <h4 className="font-asap font-bold text-strong-contrast">Categorie</h4>
//           <AsyncSelect isDisabled={!modeEdit} value={states.get("category").getter} onChange={states.get("category").setter} />
//         </div>
//         <div className="flex flex-1 flex-col gap-2">
//           <h4 className="font-asap font-bold text-strong-contrast">Sous-Categorie</h4>
//           <input readOnly={!modeEdit} value={states.get("subCategory").getter} onChange={states.get("subCategory").setter} type="text" className={CLASS_NAMES.input} placeholder="Saisissez une sous-catégorie..." />
//         </div>
//       </div>
//     </Card>
//   );
// }

// /**
//  * 
//  * @param {{products?: any[], services?: any[]}} props
//  */
// const ListCard = ({ products, services }) => {
//   const tableMapper = ({ __type, title, id }) => {
//     return [
//       { contentType: "link", contentValue: { href: `/${__type}/${id}`, text: id } },
//       { contentType: "text", contentValue: title },
//       { contentType: "text", contentValue: (__type === "products") ? "Produit" : "Service" },
//     ];
//   }
//   const head = [
//     { contentType: "head", contentValue: "REF." },
//     { contentType: "head", contentValue: "TITRE" },
//     { contentType: "head", contentValue: "GENRE" }
//   ];
//   const rows = products.map((p) => tableMapper({ ...p, __type: "products" }))
//     .concat(...services.map((s) => tableMapper({ ...s, __type: "services" })));
//   return (
//     <Card>
//       <h1 className="font-asap font-bold text-base text-strong-contrast">Detailles de package</h1>
//       <hr className="border-weakest-contrast" />
//       <Table isCompact={true} head={head} rows={rows} />
//       <hr className="border-weakest-contrast" />
//       <div className="flex justify-end gap-4">
//         <Button type="soft" textContent="Modifier" />
//         <Button textContent="Ajouter un article" />
//       </div>
//     </Card>
//   )
// }

// /**
//  * 
//  * @param {{price: number, cost: number}} props
//  * @returns 
//  */
// const PackagePricing = ({ price, cost }) => {
//   const states = createStates(["price", price], ["cost", cost]);

//   const [modeEdit, setModeEdit] = useState(false);
//   const toggleModeEdit = () => setModeEdit((prev) => !prev);

//   const saveChanges = async () => { toggleModeEdit(); };
//   const cancelChanges = async () => { toggleModeEdit(); };

//   return (
//     <Card>
//       <div className="flex justify-between items-center">
//         <h1 className="text-strong-contrast font-asap font-bold">Détails monétaires</h1>
//         <EditToolbox modeEdit={modeEdit} cancel={cancelChanges} save={saveChanges} toggle={toggleModeEdit} />
//       </div>
//       <div className="flex flex-col gap-4">
//         <div className="flex items-center gap-4">
//           <label htmlFor="packagePrice" className="text-strong-contrast font-inter font-medium">Prix</label>
//           <input readOnly={!modeEdit} id="packagePrice" type="number" className={CLASS_NAMES.input} value={states.get("price").getter} onChange={states.get("price").setter} />
//           <label htmlFor="packagePrice" className="font-asap font-bold text-gray-500 pr-2">MAD</label>
//         </div>
//         <div className="flex items-center gap-4">
//           <label htmlFor="packageCost" className="text-strong-contrast font-inter font-medium">Coût</label>
//           <input readOnly={!modeEdit} id="packageCost" type="number" className={CLASS_NAMES.input} value={states.get("cost").getter} onChange={states.get("cost").setter} />
//           <label htmlFor="packageCost" className="font-asap font-bold text-gray-500 pr-2">MAD</label>
//         </div>
//       </div>
//     </Card>
//   )
// }

// const PackageInsights = ({ roi, conversion_rate, sold_count }) => {
//   return (
//     <Card>
//       <h1 className="font-asap font-bold text-base text-strong-contrast">Aperçus</h1>
//       <div className="w-full flex flex-col gap-2">
//         <div className="flex items-center">
//           <h1 className="text-sm font-open-sans font-medium text-gray-600 flex-[3_3_0%]">Retour sur investissement (ROI)</h1>
//           <h4 className="text-sm font-open-sans font-medium text-highlight flex-1">{roi}%</h4>
//         </div>
//         <div className="flex items-center">
//           <h1 className="text-sm font-open-sans font-medium text-gray-600 flex-[3_3_0%]">Taux de Conversion</h1>
//           <h4 className="text-sm font-open-sans font-medium text-highlight flex-1">{conversion_rate}%</h4>
//         </div>
//       </div>
//       <h4 className="text-xs font-open-sans font-medium text-gray-400">Vendu <span className="font-bold text-sm">{sold_count.toFixed(0)}</span> fois au cours des 3 derniers mois</h4>
//     </Card>
//   )
// }

// const PackageDescription = ({ children }) => {
//   return (
//     <Card>
//       <div className="flex items-center justify-between">
//         <h1 className="font-asap font-bold text-base text-strong-contrast">Description</h1>
//         <button className="bg-transparent text-highlight text-xs font-asap font-semibold">EDIT</button>
//       </div>
//       <p dangerouslySetInnerHTML={{ __html: children }} className="text-weak-contrast text-sm pl-4 border-l-2 border-l-highlight" />
//     </Card>
//   );
// }

// const PackageOptions = () => {
//   return (
//     <Card>
//       <h1 className="font-asap font-bold text-base text-strong-contrast">Options</h1>
//       <div className="flex gap-4 w-full items-center">
//         <label className="text-sm text-gray-700 font-semibold font-asap flex-1" htmlFor="estimated_time">Durée estimée</label>
//         <input className="text-sm text-strong-contrast font-normal font-open-sans bg-secondary rounded-lg py-1 px-2" type="text" id="estimated_time" name="estimated_time" />
//       </div>
//       <div className="flex gap-4 w-full items-center">
//         <label className="text-sm text-gray-700 font-semibold font-asap flex-1" htmlFor="delivery">Livraison</label>
//         <input className="text-sm text-strong-contrast font-normal font-open-sans bg-secondary rounded-lg py-1 px-2" type="text" id="delivery" name="delivery" />
//       </div>
//     </Card>
//   )
// }

// const DetailsPackage = () => {
//   const _package = useAsyncValue();
//   // const _package = {
//   //   id: 1,
//   //   title: "Super-Mariage",
//   //   description: "Le mariage inoubliable, Ceci de vos reves.<br />C'est une experience qui evoquait des emotions;<br />Toute organisée par les meilleurs traiteurs sur l'echelle mondiale.",
//   //   price: 62_999,
//   //   cost: 56_320,
//   //   created_at: "03/03/2023",
//   //   category_id: 1,
//   //   category: {
//   //     id: 1,
//   //     title: "Traiteur",
//   //   },
//   //   sub_category_id: null,
//   //   sub_category: null,
//   //   logs: [],
//   //   products: [],
//   //   services: [],
//   //   quotes: [],
//   //   orders: [],
//   // };
//   const _statistics = {
//     roi: 97,
//     conversion_rate: 36,
//     sold_count: 11,
//   }
//   return (
//     <div className="w-full h-full flex flex-col gap-4 bg-primary p-4 font-open-sans">
//       <h1 className="font-asap font-semibold text-weak-contrast">Package Details</h1>
//       <div className="flex gap-4 w-full flex-1">
//         <div className="w-2/3 flex flex-col gap-4">
//           <GeneralCard {..._package} />
//           <ListCard {..._package} />
//         </div>
//         <div className="w-1/3 flex flex-col gap-4">
//           <PackageInsights {..._statistics} />
//           <PackageDescription>
//             {_package.description}
//           </PackageDescription>
//           <PackagePricing {..._package} />
//           <PackageOptions />
//         </div>
//       </div>
//     </div>
//   )
// }

// const Skeleton = () => {
//   return <div className="w-full h-full bg-primary flex flex-col gap-4 p-4">
//     <AppLoading />
//   </div>
// }

import Card from "../../../components/Card";
import Button from "../../../components/Button";
import GlobalModal from "../../../components/GlobalModal";
import TemplateEdit from "../../../components/templates/TemplateEdit";

import { createCustomer, createEmployee, createPackage, createPackageCategory, createVendor, deliveryFrequencies, getFilteredPackageCategory, getFilteredProducts, getFilteredRoles, getFilteredServices, getPackage, getProductCategoriesFiltered } from "../../../config/httpRequests";
import { createStatesNew, CLASS_NAMES, APPOINTMENT_SHARED } from "../../../utils/common";

import Select from "react-select";
import DatePicker from "react-datepicker";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";

import { Suspense, useReducer, forwardRef } from "react";
import { useNavigate, Await, useParams } from "react-router-dom";
import { AiFillMinusSquare, AiFillPlusSquare, AiOutlineSearch } from "react-icons/ai";
import Table from "../../../components/Table";
import { capitalize } from "lodash";
import AppLoading from "../../AppLoading";
import { useAsyncValue } from "react-router-dom";

const StatisticsCard = () => {
  return <Card>
    <h1 className={CLASS_NAMES.label}>Statistiques</h1>
    <h2 className="text-center font-regular font-inter text-highlight">Veuillez créer le produit avant d'essayer de mesurer ses statistiques.</h2>
  </Card>
}

const GeneralCard = ({ dispatch, id, title, category }) => {
  const states = createStatesNew({ title, category: { value: category?.id, label: category?.title } }, { category: "select" }, dispatch);

  async function queryCategory(searchTerm) {
    const { categories } = await getFilteredPackageCategory(searchTerm);
    const mapper = ({ id, title }) => ({ value: id, label: title });
    return categories.map(mapper);
  }
  const createCategory = async (title) => {
    const { package_category } = await createPackageCategory(title);
    states.get("category").set({
      value: package_category?.id,
      label: package_category?.title,
    });
  }

  return <Card className="grid grid-cols-4 gap-4" isRaw={true}>
    <div className="flex flex-col gap-2 col-span-4">
      <label htmlFor="title" className={CLASS_NAMES.label}>Titre</label>
      <input type="text" name="title" id="title" placeholder="Saisissez une titre pour ce produit..." className={CLASS_NAMES.input} value={states.get("title").value} onChange={states.get("title").onChange} />
    </div>
    <div className="flex flex-col gap-2 col-span-2">
      <label htmlFor="ref_id" className={CLASS_NAMES.label}>Package Nº</label>
      <input type="text" name="ref_id" id="ref_id" placeholder="Ce champs ce remplit aprés la creation..." className={CLASS_NAMES.input} disabled readOnly value={id} />
    </div>
    <div className="flex flex-col gap-2 col-span-2">
      <label htmlFor="sub_category" className={CLASS_NAMES.label}>Catégorie</label>
      <AsyncCreatableSelect onCreateOption={createCategory} defaultOptions={true} loadOptions={queryCategory} unstyled classNames={CLASS_NAMES.select} value={states.get("category").value} onChange={states.get("category").onChange} />
    </div>
  </Card>
}

const DescriptionCard = ({ description = "", dispatch }) => {
  const states = createStatesNew({ description }, {}, dispatch);

  return <Card className="gap-4">
    <label htmlFor="description" className={CLASS_NAMES.label}>Description</label>
    <textarea className={CLASS_NAMES.input + " min-h-[5rem] resize-none"} placeholder="Saisissez une description de une ou deux paragraphes pour ce produit..." name="description" id="description" value={states.get("description").value} onChange={states.get("description").onChange}></textarea>
  </Card>
}

const PriceCard = ({ price = 0, products = [], services = [], dispatch }) => {
  const states = createStatesNew({ price }, {}, dispatch);
  const cost = [...products, ...services].reduce((prev, x) => prev + (x.price * x.quantity), 0);

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

const ListArticles = ({ services = [], products = [], dispatch }) => {
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
    ],
  };
  return <Table {...table_args} className="border-spacing-x-2" />
}

const ListCard = ({ products = [], services = [], dispatch, onModal }) => {
  const is_empty = products?.length + services?.length === 0;
  return <Card className="gap-4">
    <div className="flex items-center justify-between">
      <h1 className={CLASS_NAMES.label + " col-span-2"}>Articles</h1>
      <Button onClick={() => onModal("article")} textContent={is_empty ? "Ajouter un article" : "Modifier"} />
    </div>
    <ListArticles products={products} services={services} dispatch={dispatch} />
  </Card>
}

const DeliveryCard = ({ delivery, duration, dispatch }) => {
  const states = createStatesNew({ delivery, duration }, {}, dispatch);

  return <Card isRaw className="grid grid-cols-2 items-center gap-4">
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Options de livraison</h1>
    <label htmlFor="duration" className={CLASS_NAMES.label}>Durée estimée</label>
    <input id="duration" type="text" className={CLASS_NAMES.input} placeholder="Durée estimée..." value={states.get("duration").value} onChange={states.get("duration").onChange} />
    <label htmlFor="delivery" className={CLASS_NAMES.label}>Frais de livraison</label>
    <input id="delivery" type="text" className={CLASS_NAMES.input} placeholder="Frais de livraison..." value={states.get("delivery").value} onChange={states.get("delivery").onChange} />
  </Card>
}

const ActionCard = ({ onPublish, onCancel }) => {
  return <Card isRaw={true} className="flex justify-end items-center gap-4 mt-auto">
    <Button onClick={onCancel} type="soft" textContent="Annuler" />
    <Button onClick={onPublish} textContent="Publier" />
  </Card>
}

const ArticlesModal = ({ show, products = [], services = [], onClose, dispatch: draft_dispatch }) => {
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
  const [collections, dispatchComplex] = useReducer(collectionsReducer, { products, services });

  async function onSearch(event) {
    const searchTerm = event.target.value;
    dispatch({ searchTerm });
    if (searchTerm.length === 0) {
      dispatch({ searchTerm, searchValid: false, searchValidMessage: "Terme de recherche vide..." });
      return;
    }

    const promise_products = getFilteredProducts(searchTerm);
    const promise_services = getFilteredServices(searchTerm);
    const response_articles = await Promise.allSettled([promise_products, promise_services]);

    for (const article of response_articles) if (article.status === "rejected") throw article.reason;

    const [fulfilled_products, fulfilled_services] = response_articles;
    const { value: { products } } = fulfilled_products;
    const { value: { services } } = fulfilled_services;

    const articles = [];
    articles.push(
      ...products.map((product) => ({ key: "product", product })),
      ...services.map((service) => ({ key: "service", service })),
    );

    if (articles.length === 0) {
      dispatch({ searchTerm, searchValid: false, searchValidMessage: "Search term yields no results." });
      return;
    }
    console.log(articles);
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

  const ArticleManage = ({ products = [], services = [] }) => {
    const articles = [];
    articles.push(
      ...products.map((product) => ({ key: "product", product })),
      ...services.map((service) => ({ key: "service", service })),
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
    const { products: modal_products, services: modal_services } = collections;
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
    draft_dispatch?.({ products: dispatch_products, services: dispatch_services });
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
      ((collections.products?.length + collections.services?.length) > 0) && <ArticleManage {...collections} />
    }
    <div className="flex justify-end items-center gap-4">
      <Button onClick={_onCancel} type="soft" textContent="Annuler" />
      <Button onClick={_onSubmit} textContent="Appliquer" />
    </div>
  </GlobalModal>
}

function baseReducer(state, action) {
  const new_state = structuredClone(state);
  for (const field in action) {
    new_state[field] = structuredClone(action[field]);
    new_state["changes"][field] = structuredClone(action[field]);
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
  new_state["__history"]?.push(action);
  return new_state;
}
function modalsReducer(state, action) {
  const newState = structuredClone(state);
  for (const key in newState) newState[key] = !!(action?.[key]);
  return newState;
}

const EditPackage = () => {
  const loaded_draft = {
    ...useAsyncValue(),
    changes: {},
  };
  const loaded_collections = {
    products: structuredClone(loaded_draft["products"]).map(({ product, quantity }) => ({ ...product, quantity })),
    services: structuredClone(loaded_draft["services"]).map(({ quantity, ...service }) => ({ ...service, quantity: 1 })),
    __history: [],
  };
  const navigate = useNavigate();
  const [modals, trigger] = useReducer(modalsReducer, { article: false });
  const [draft, dispatch] = useReducer(baseReducer, loaded_draft);
  const [collections, dispatchCollections] = useReducer(collectionsReducer, loaded_collections);
  const closeModals = () => trigger({ article: false });
  function onModal_Dynamic(key) { trigger({ [key]: true }) }

  const actions = {
    async onPublish() {
      const snapshot = structuredClone(draft);
      const coll_snapshot = structuredClone(collections);

      console.log("Changes:", snapshot["changes"]);
      console.log("History:", coll_snapshot["__history"]);

      // snapshot["price"] = parseInt(snapshot["price"])
      // snapshot["category"] = snapshot["category"]?.value ?? snapshot["category"]?.id;

      // snapshot["products"] = coll_snapshot.products.map((product) => ({ product_id: product.id, quantity: product.quantity }));
      // snapshot["services"] = coll_snapshot.services.map(({ id }) => id);

      // const { pack } = await createPackage(snapshot);
      // navigate(`/packages/${pack.id}`);
    },
    onCancel() {
      navigate("/");
    }
  }

  return <TemplateEdit title={loaded_draft.title}>
    <ArticlesModal column="modal" {...collections} show={modals.article} onClose={closeModals} dispatch={dispatchCollections} />

    <GeneralCard column="primary" {...draft} dispatch={dispatch} />
    <ListCard column="primary" dispatch={dispatchCollections} onModal={onModal_Dynamic} {...collections} />
    <StatisticsCard column="primary" {...draft} dispatch={dispatch} />

    <DescriptionCard column="auxilary" {...draft} dispatch={dispatch} />
    <PriceCard column="auxilary" {...draft} {...collections} dispatch={dispatch} />
    <DeliveryCard column="auxilary" {...draft} dispatch={dispatch} />

    <ActionCard column="auxilary" {...actions} dispatch={dispatch} />
  </TemplateEdit>
}

async function loadItem(packageID) {
  const id = parseInt(packageID);
  if (isNaN(id)) throw new Error("IDs must be numbers.");

  const { package: pack } = await getPackage(id);
  if (!pack) throw new Error(`Package#${id} does not exist.`);

  return pack;
};

const ComponentLoader = () => {
  const { packageID } = useParams();
  return <Suspense fallback={<AppLoading />}>
    <Await resolve={loadItem(packageID)}>
      <EditPackage />
    </Await>
  </Suspense>
}


export default ComponentLoader;