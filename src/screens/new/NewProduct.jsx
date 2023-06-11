import Card from "../../components/Card";
import Button from "../../components/Button";
import TemplateEdit from "../../components/templates/TemplateEdit";

import { createCustomer, createEmployee, createLocation, createProduct, createProductCategory, createVendor, deliveryFrequencies, getFilteredLocation, getFilteredProductCategory, getFilteredRoles, getProductCategoriesFiltered } from "../../config/httpRequests";
import { createStatesNew, CLASS_NAMES, APPOINTMENT_SHARED } from "../../utils/common";

import Select from "react-select";
import DatePicker from "react-datepicker";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from 'react-select/async-creatable';

import { useReducer, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";

const StatisticsCard = () => {
  return <Card>
    <h1 className={CLASS_NAMES.label}>Statistiques</h1>
    <h2 className="text-center font-regular font-inter text-highlight">Veuillez créer le produit avant d'essayer de mesurer ses statistiques.</h2>
  </Card>
}

const GeneralCard = ({ dispatch, title, category, publish_method }) => {
  const publish_methods = [{ value: "automatic", label: "Alimentation et boissons" }, { value: "manual", label: "Matériau" }];
  const states = createStatesNew({ title, publish_method, category: { value: category?.id, label: category?.title } }, { publish_method: "select", category: "select" }, dispatch);

  async function queryCategories(searchTerm) {
    const { categories } = await getFilteredProductCategory(searchTerm);
    const mapper = ({ id, title }) => ({ value: id, label: title });
    return categories.map(mapper);
  }
  const createCategory = async (title) => {
    const { product_category } = await createProductCategory(title);
    states.get("category").set({
      value: product_category?.id,
      label: product_category?.title,
    });
  }
  return <Card className="grid grid-cols-4 gap-4" isRaw={true}>
    <div className="flex flex-col gap-2 col-span-3">
      <label htmlFor="title" className={CLASS_NAMES.label}>Titre</label>
      <input type="text" name="title" id="title" placeholder="Saisissez une titre pour ce produit..." className={CLASS_NAMES.input} value={states.get("title").value} onChange={states.get("title").onChange} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="ref_id" className={CLASS_NAMES.label}>Produit Nº</label>
      <input type="text" name="ref_id" id="ref_id" placeholder="Ce champs ce remplit aprés la creation..." className={CLASS_NAMES.input} disabled />
    </div>
    <div className="flex flex-col gap-2 col-span-2">
      <label htmlFor="sub_category" className={CLASS_NAMES.label}>Catégorie</label>
      <Select options={publish_methods} type="text" name="sub_category" id="sub_category" placeholder="Saisissez une sous-categorie  pour ce produit..." unstyled classNames={CLASS_NAMES.select} value={states.get("publish_method").value} onChange={states.get("publish_method").onChange} />
    </div>
    <div className="flex flex-col gap-2 col-span-2">
      <label htmlFor="category" className={CLASS_NAMES.label}>Sous-Catégorie</label>
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

const InventoryCard = ({ barcode = "", sku = "", quantity = 0, quantity_threshold, dispatch }) => {
  const states = createStatesNew({ barcode, sku, quantity, quantity_threshold }, {}, dispatch);

  return <Card isRaw className="grid grid-cols-2 items-center gap-4">
    <h1 className={CLASS_NAMES.label + " col-span-2"}>Inventaire</h1>
    <div className="flex flex-col gap-2">
      <label htmlFor="barcode">Code-barres (ISBN, UPC, GTIN, etc.)</label>
      <input className={CLASS_NAMES.input} type="text" name="barcode" id="barcode" onChange={states.get("barcode").onChange} value={states.get("barcode").value} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="sku">UGS (Unité de gestion des stocks)</label>
      <input className={CLASS_NAMES.input} type="text" name="sku" id="sku" onChange={states.get("sku").onChange} value={states.get("sku").value} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="quantity">Niveau de stock actuel</label>
      <input className={CLASS_NAMES.input} type="number" name="quantity" id="quantity" onChange={states.get("quantity").onChange} value={states.get("quantity").value} />
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="quantity_threshold">Point de commande</label>
      <input className={CLASS_NAMES.input} type="number" name="quantity_threshold" id="quantity_threshold" onChange={states.get("quantity_threshold").onChange} value={states.get("quantity_threshold").value} />
    </div>
  </Card>
}

const LocationCard = ({ location, dispatch }) => {
  const states = createStatesNew({ location: { value: location?.id, label: location?.title } }, { location: "select" }, dispatch);

  async function queryLocations(searchTerm) {
    const { locations } = await getFilteredLocation(searchTerm);
    const mapper = ({ id, title }) => ({ value: id, label: title });
    return locations.map(mapper);
  }
  const _createLocation = async (title) => {
    const { location } = await createLocation(title);
    states.get("location").set({
      value: location?.id,
      label: location?.title,
    });
  }

  return <Card className="gap-4">
    <label htmlFor="location" className={CLASS_NAMES.label}>Location</label>
    <AsyncCreatableSelect onCreateOption={_createLocation} cacheOptions={false} defaultOptions={true} loadOptions={queryLocations} unstyled classNames={CLASS_NAMES.select} value={states.get("location").value} onChange={states.get("location").onChange} />
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
  }
  return new_state;
}

const starter_draft = {
  cost: 0,
  price: 0,
  title: "",
  description: "",
  barcode: "",
  sku: "",
  quantity: 0,
  quantity_threshold: 0,
  location: null,
  category: null,
  publish_method: { value: "automatic", label: "Alimentation et boissons" }
};

const NewProduct = () => {
  const navigate = useNavigate();
  const [draft, dispatch] = useReducer(baseReducer, starter_draft);
  const actions = {
    async onPublish() {
      const snapshot = structuredClone(draft);

      snapshot["cost"] = parseInt(snapshot["cost"] ?? 0);
      snapshot["price"] = parseInt(snapshot["price"] ?? 0);
      snapshot["quantity"] = parseInt(snapshot["quantity"] ?? 0);
      snapshot["quantity_threshold"] = parseInt(snapshot["quantity_threshold"] ?? 0);

      snapshot["location_id"] = snapshot["location"]?.id;
      snapshot["category_id"] = snapshot["category"]?.id;

      const isAutomatic = snapshot["publish_method"]?.value === "automatic";
      delete snapshot["category"];
      delete snapshot["location"];
      delete snapshot["publish_method"];

      const { product } = await createProduct(snapshot, isAutomatic);
      navigate(`/products/${product.id}`);
    },
    onCancel() {
      navigate("/");
    }
  }
  return <TemplateEdit title="NOUVEAU PRODUIT">
    <GeneralCard column="primary" {...draft} dispatch={dispatch} />
    <InventoryCard column="primary" {...draft} dispatch={dispatch} />
    <StatisticsCard column="primary" {...draft} dispatch={dispatch} />

    <DescriptionCard column="auxilary" {...draft} dispatch={dispatch} />
    <PriceCard column="auxilary" {...draft} dispatch={dispatch} />
    <LocationCard column="auxilary" {...draft} dispatch={dispatch} />

    <ActionCard column="auxilary" {...actions} dispatch={dispatch} />
  </TemplateEdit>
}

export default NewProduct;