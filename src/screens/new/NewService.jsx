import Card from "../../components/Card";
import Button from "../../components/Button";
import TemplateEdit from "../../components/templates/TemplateEdit";

import { createService, createServiceCategory, getFilteredServiceCategory, getProductCategoriesFiltered } from "../../config/httpRequests";
import { createStatesNew, CLASS_NAMES, APPOINTMENT_SHARED } from "../../utils/common";

import Select from "react-select";
import DatePicker from "react-datepicker";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";

import { useReducer, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";

const InvoicesCard = ({ orders = [] }) => {
  const is_empty = orders.length === 0;
  return <Card>
    <h1 className={CLASS_NAMES.label}>Dernières factures</h1>
    {
      is_empty
        ? (<h2 className="text-center font-regular font-inter text-highlight">Ce fournisseur n'a pas de factures liées...</h2>)
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
    <h2 className="text-center font-regular font-inter text-highlight">Veuillez créer le produit avant d'essayer de mesurer ses statistiques.</h2>
  </Card>
}

const GeneralCard = ({ dispatch, title, category }) => {
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
      <input type="text" name="ref_id" id="ref_id" placeholder="Ce champs ce remplit aprés la creation..." className={CLASS_NAMES.input} disabled />
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
    switch (typeof (action[field])) {
      case "object": {
        new_state[field] = { ...new_state[field], ...action[field] };
      } break;
      default:
        new_state[field] = action[field];
    }
  }
  return new_state;
}

const starter_draft = {
  cost: 0,
  title: "",
  duration: "",
  delivery: "",
  category: null,
  description: "",
};

const NewService = () => {
  const navigate = useNavigate();
  const [draft, dispatch] = useReducer(baseReducer, starter_draft);
  const actions = {
    async onPublish() {
      const snapshot = structuredClone(draft);
      snapshot["cost"] = parseInt(snapshot["cost"])
      snapshot["price"] = parseInt(snapshot["price"])
      snapshot["category_id"] = snapshot["category"]?.id;
      delete snapshot["category"];

      const { service } = await createService(snapshot);
      navigate(`/services/${service.id}`);
    },
    onCancel() {
      navigate("/");
    }
  }
  return <TemplateEdit title="NOUVEAU SERVICE">
    <GeneralCard column="primary" {...draft} dispatch={dispatch} />
    <InvoicesCard column="primary" {...draft} dispatch={dispatch} />
    <StatisticsCard column="primary" {...draft} dispatch={dispatch} />

    <DescriptionCard column="auxilary" {...draft} dispatch={dispatch} />
    <DeliveryCard column="auxilary" {...draft} dispatch={dispatch} />
    <PriceCard column="auxilary" {...draft} dispatch={dispatch} />

    <ActionCard column="auxilary" {...actions} dispatch={dispatch} />
  </TemplateEdit>
}

export default NewService;