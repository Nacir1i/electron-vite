// import { Suspense, useState } from "react";
// import { Await, useAsyncValue, useParams } from "react-router-dom";
// import Select from "react-select";
// import Button from "../../../components/Button";
// import Card from "../../../components/Card";
// import EditToolbox from "../../../components/EditToolbox";
// import Table from "../../../components/Table";
// import { CLASS_NAMES, createStates, DATETIME_FORMAT, PromiseTimeout } from "../../../utils/common";
// import { getDatabase } from "../../../utils/temporary";
// import AppLoading from "../../AppLoading";

// const GeneralCard = ({ id, title, category, subCategory }) => {
//   const states = createStates(["title", title], ["category", category, "select"], ["subCategory", subCategory]);
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
//       <div className="flex flex-col gap-2">
//         <div className="flex justify-between items-center">
//           <h4 className="font-asap font-bold text-strong-contrast">Titre</h4>
//           <EditToolbox save={saveChanges} cancel={cancelChanges} toggle={toggleModeEdit} modeEdit={modeEdit} />
//         </div>
//         <input type="text" className={CLASS_NAMES.input} readOnly={!modeEdit} value={states.get("title").getter} onChange={states.get("title").setter} placeholder="Type in a titre..." />
//       </div>
//       <div className="flex gap-4">
//         <div className="flex flex-1 flex-col gap-2">
//           <h4 className="font-asap text-strong-contrast">Ref N°</h4>
//           <input type="text" className={CLASS_NAMES.input} value={id} placeholder="This is not supposed empty." readOnly={true} />
//         </div>
//         <div className="flex flex-1 flex-col gap-2">
//           <h4 className="font-asap text-strong-contrast">Categorie</h4>
//           <Select isDisabled={!modeEdit} value={states.get("category").getter} onChange={states.get("category").setter} />
//           {/* <input type="text" className={CLASS_NAMES.input} placeholder="Type in a catgorie..." /> */}
//         </div>
//         <div className="flex flex-1 flex-col gap-2">
//           <h4 className="font-asap text-strong-contrast">Sous-Categorie</h4>
//           <input type="text" className={CLASS_NAMES.input} readOnly={!modeEdit} value={states.get("subCategory")?.getter} onChange={states.get("subCategory")?.setter} placeholder="Type in a sous-categorie..." />
//         </div>
//       </div>
//     </Card>
//   );
// }

// const ListCard = ({ rows }) => {
//   const table_head = ["DATE", "DESIGNATION", "PRIX"].map((e) => {
//     return { contentType: "head", contentValue: e };
//   });
//   const table_rows = rows.map(({ date, designation, price }) => [
//     { contentType: "text", contentValue: DATETIME_FORMAT.default.format(new Date(date)) },
//     { contentType: "text", contentValue: designation },
//     { contentType: "text", contentValue: [price.toFixed(2), "MAD"].join(" ") },
//   ]);
//   return (
//     <Card>
//       <h1 className="font-asap font-bold text-base text-strong-contrast">Detailles de service</h1>
//       <hr className="border-weakest-contrast" />
//       <Table isCompact={true} head={table_head} rows={table_rows} />
//       <hr className="border-weakest-contrast" />
//       <div className="flex justify-end gap-4">
//         <Button type="soft" textContent="Modifier" />
//         <Button textContent="Ajouter une article" />
//       </div>
//     </Card>
//   )
// }

// const PricesCard = ({ buy, sell }) => {
//   return (
//     <Card>
//       <h1 className="text-strong-contrast font-asap font-bold">Prix</h1>
//       <div className="flex gap-4">
//         <div className="flex flex-col gap-2 flex-1">
//           <h4 className="text-gray-700 font-asap font-medium">Prix de vente</h4>
//           <h4 className="pl-4">
//             <span className="font-asap font-bold text-gray-500 pr-2">MAD</span>
//             <span className="font-open-sans font-normal text-strong-contrast pl-2">{sell.toFixed(2)}</span>
//           </h4>
//         </div>
//         <div className="flex flex-col gap-2 flex-1">
//           <h4 className="text-gray-700 font-asap font-medium">Prix d'achat</h4>
//           <h4 className="pl-4">
//             <span className="font-asap font-bold text-gray-500 pr-2">MAD</span>
//             <span className="font-open-sans font-normal text-strong-contrast pl-2">{buy.toFixed(2)}</span>
//           </h4>
//         </div>
//       </div>
//     </Card>
//   )
// }

// const InsightsCard = ({ roi, conversion_rate, sold_count }) => {
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

// const DescriptionCard = ({ description }) => {
//   return (
//     <Card>
//       <div className="flex items-center justify-between">
//         <h1 className="font-asap font-bold text-base text-strong-contrast">Description</h1>
//         <button className="bg-transparent text-highlight text-xs font-asap font-semibold">EDIT</button>
//       </div>
//       <p className="w-full text-gray-700 font-open-sans text-sm">{description}</p>
//     </Card>
//   );
// }

// const OptionsCard = () => {
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

// const DetailsService = () => {
//   const service = useAsyncValue();
//   const service_details = {
//     entries: [
//       {
//         date: "02/12/2022",
//         designation: "Custom Website Design",
//         price: 0,
//       },
//       {
//         date: "02/12/2022",
//         designation: "Custom Website Design",
//         price: 0,
//       },
//       {
//         date: "02/12/2022",
//         designation: "Custom Website Design",
//         price: 0,
//       },
//       {
//         date: "02/12/2022",
//         designation: "Custom Website Design",
//         price: 0,
//       },
//     ],
//     description: `A full-service catering option
//                   including setup, service, and cleanup of a 
//                   buffet-style meal for up to 100 guests`,
//   }
//   return (
//     <div className="w-full h-full flex flex-col gap-4 bg-primary p-4 font-open-sans">
//       <h1 className="font-asap font-semibold text-weak-contrast">Service Details</h1>
//       <div className="flex gap-4 w-full flex-1">
//         <div className="w-2/3 flex flex-col gap-4">
//           <GeneralCard {...service} />
//           <ListCard rows={service_details.entries} />
//           <PricesCard buy={200} sell={300} />
//         </div>
//         <div className="w-1/3 flex flex-col gap-4">
//           <InsightsCard roi={70} conversion_rate={0} sold_count={2} />
//           <DescriptionCard {...service} />
//           <OptionsCard />
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

// async function loadItem() {
//   const { serviceID } = useParams(); // BAD: Throwing weird error about reading null from useContext();
//   const { services, serviceCategories } = getDatabase();

//   await PromiseTimeout(700 + (Math.random() * 200 - 100));

//   const id = parseInt(serviceID);
//   if (isNaN(id)) throw new Error("IDs must be numbers.");

//   const service = services.find((service) => service.id === id);
//   if (!service) throw new Error(`Service#${id} does not exist.`);

//   const { categoryId } = service;

//   const category = serviceCategories.find((category) => category.id === categoryId);
//   service["category"] = category;

//   return service;
// }

// const ComponentLoader = () => {
//   return <Suspense fallback={<Skeleton />}>
//     <Await resolve={loadItem()}>
//       <DetailsService />
//     </Await>
//   </Suspense>
// }

// export default ComponentLoader;

import Card from "../../../components/Card";
import Button from "../../../components/Button";
import AppLoading from "../../AppLoading";
import TemplateEdit from "../../../components/templates/TemplateEdit";

import { CLASS_NAMES, createStatesNew } from "../../../utils/common";
import { createService, createServiceCategory, getFilteredServiceCategory, getService, updateService } from "../../../config/httpRequests";

import AsyncCreatableSelect from "react-select/async-creatable";

import { useReducer, Suspense } from "react";
import { useNavigate, useParams, Await, useAsyncValue } from "react-router-dom";

const InvoicesCard = ({ orders = [] }) => {
  const is_empty = orders.length === 0;
  return <Card>
    <h1 className={CLASS_NAMES.label}>Dernières factures</h1>
    {
      is_empty
        ? (<h2 className="text-center font-regular font-inter text-highlight">Ce service n'a pas de factures liées...</h2>)
        :
        (<div className="contents">
          <hr className="border-weakest-contrast" />
        </div>)
    }
  </Card>
}

const StatisticsCard = () => {
  return <Card>
    <h1 className={CLASS_NAMES.label}>Statistiques</h1>
    <h2 className="text-center font-regular font-inter text-highlight">Veuillez créer le servicservice avant d'essayer de mesurer ses statistiques.</h2>
  </Card>
}

const GeneralCard = ({ dispatch, id, title, category }) => {
  const states = createStatesNew({ title, category: { value: category?.id, label: category?.title } }, { category: "select" }, dispatch);

  async function queryCategories(searchTerm) {
    const { categories } = await getFilteredServiceCategory(searchTerm);
    const mapper = ({ id, title }) => ({ value: id, label: title });
    return categories.map(mapper);
  }
  const createCategory = async (title) => {
    const { service_category } = await createServiceCategory(title);
    states.get("category").set({
      value: service_category?.id,
      label: service_category?.title,
    });
  }

  return <Card className="grid grid-cols-4 gap-4" isRaw={true}>
    <div className="flex flex-col gap-2 col-span-4">
      <label htmlFor="title" className={CLASS_NAMES.label}>Titre</label>
      <input type="text" name="title" id="title" placeholder="Saisissez une titre pour ce produit..." className={CLASS_NAMES.input} value={states.get("title").value} onChange={states.get("title").onChange} />
    </div>
    <div className="flex flex-col gap-2 col-span-2">
      <label htmlFor="ref_id" className={CLASS_NAMES.label}>Produit Nº</label>
      <input type="text" name="ref_id" id="ref_id" placeholder="Ce champs ce remplit aprés la creation..." className={CLASS_NAMES.input} value={id} disabled readOnly />
    </div>
    <div className="flex flex-col gap-2 col-span-2">
      <label htmlFor="category" className={CLASS_NAMES.label}>Catégorie</label>
      <AsyncCreatableSelect onCreateOption={createCategory} defaultOptions={true} loadOptions={queryCategories} unstyled classNames={CLASS_NAMES.select} value={states.get("category").value} onChange={states.get("category").onChange} />
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

const DeliveryCard = ({ delivery = "", duration = "", dispatch }) => {
  const states = createStatesNew({ delivery, duration }, {}, dispatch);

  return <Card isRaw className="grid grid-cols-2 items-center gap-4">
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Options de livraison</h1>
    <label htmlFor="duration" className={CLASS_NAMES.label}>Durée estimée</label>
    <input id="duration" type="text" className={CLASS_NAMES.input} placeholder="Durée estimée..." value={states.get("duration").value} onChange={states.get("duration").onChange} />
    <label htmlFor="delivery" className={CLASS_NAMES.label}>Frais de livraison</label>
    <input id="delivery" type="text" className={CLASS_NAMES.input} placeholder="Frais de livraison..." value={states.get("delivery").value} onChange={states.get("delivery").onChange} />
  </Card>
}

const PriceCard = ({ price = 0, cost = 0, dispatch }) => {
  const states = createStatesNew({ price, cost }, {}, dispatch);

  return <Card isRaw className="grid grid-cols-[auto_1fr] items-center gap-4">
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Tarification</h1>
    <label htmlFor="price" className={CLASS_NAMES.label}>Prix</label>
    <div className="flex relative w-full">
      <input id="price" type="number" className={[CLASS_NAMES.input, "w-full pl-16"].join(" ")} placeholder="Prix..." value={states.get("price").value} onChange={states.get("price").onChange} />
      <span className="absolute top-1/2 -translate-y-1/2 left-4 text-sm font-bold text-highlight">MAD</span>
    </div>
    <label htmlFor="cost" className={CLASS_NAMES.label}>Coût</label>
    <div className="flex relative w-full">
      <input id="cost" type="number" className={[CLASS_NAMES.input, "w-full pl-16"].join(" ")} placeholder="Coût..." value={states.get("cost").value} onChange={states.get("cost").onChange} />
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

function baseReducer(state, action) {
  const new_state = structuredClone(state);
  if (!!action["location"]) action["location"] = { id: action["location"]?.value || action["location"]?.id, title: action["location"]?.label || action["location"]?.title };
  if (!!action["category"]) action["category"] = { id: action["category"]?.value || action["category"]?.id, title: action["category"]?.label || action["category"]?.title };
  for (const field in action) {
    new_state[field] = action[field];
    new_state["changes"][field] = action[field];
  }
  return new_state;
}

const EditService = () => {
  const navigate = useNavigate();
  const loaded_draft = {
    ...useAsyncValue(),
    changes: {},
  };
  console.log(loaded_draft);
  const [draft, dispatch] = useReducer(baseReducer, loaded_draft);
  const actions = {
    async onPublish() {
      const snapshot = structuredClone(draft)["changes"];
      if (!!snapshot["cost"]) snapshot["cost"] = parseInt(snapshot["cost"])
      if (!!snapshot["price"]) snapshot["price"] = parseInt(snapshot["price"])
      if (!!snapshot["category_id"]) snapshot["category_id"] = snapshot["category"]?.id;
      delete snapshot["category"];

      const { updatedService } = await updateService(loaded_draft.id, snapshot);
      navigate(`/services/${updatedService.id}`, { replace: true });
    },
    onCancel() {
      navigate("/");
    }
  }
  return <TemplateEdit title={loaded_draft.title}>
    <GeneralCard column="primary" {...draft} dispatch={dispatch} />
    <InvoicesCard column="primary" {...draft} dispatch={dispatch} />
    <StatisticsCard column="primary" {...draft} dispatch={dispatch} />

    <DescriptionCard column="auxilary" {...draft} dispatch={dispatch} />
    <DeliveryCard column="auxilary" {...draft} dispatch={dispatch} />
    <PriceCard column="auxilary" {...draft} dispatch={dispatch} />

    <ActionCard column="auxilary" {...actions} dispatch={dispatch} />
  </TemplateEdit>
}

async function loadItem() {
  const { serviceID } = useParams(); // BAD: Throwing weird error about reading null from useContext();

  const id = parseInt(serviceID);
  if (isNaN(id)) throw new Error("IDs must be numbers.");

  const { service } = await getService(id);
  if (!service) throw new Error(`Service#${id} does not exist.`);

  return service;
}

const ComponentLoader = () => {
  return <Suspense fallback={<AppLoading />}>
    <Await resolve={loadItem()}>
      <EditService />
    </Await>
  </Suspense>
}

export default ComponentLoader;