import Card from "../../components/Card"
import Checkbox from "../../components/Checkbox";
import Select, { components } from "react-select";

import { useReducer } from "react";
import { AiFillCaretDown, AiFillSave, AiOutlineCopy, AiOutlineReload } from "react-icons/ai";

const EditGeneral = ({ title, id, status, type, dispatch }) => {
  const onChange = {
    "title": (event) => {
      const newValue = event.target.value;
      dispatch({ field: "title", newValue });
    },
    "status": (event) => {
      const newValue = event.target.value;
      dispatch({ field: "status", newValue });
    },
    "type": (event) => {
      const newValue = event.target.value;
      dispatch({ field: "type", newValue });
    },
  }
  return (
    <Card>
      <div className="flex flex-col gap-2">
        <h1 className="text-strong-contrast font-semibold font-asap">Titre de Bon</h1>
        <input type="text" className="w-full bg-weakest-contrast text-highlight rounded-xl p-2 text-sm" value={title} onChange={onChange["title"]} placeholder="Type in the invoice title..." />
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-gray-800 font-semibold font-open-sans text-sm">Bon Command N°</h1>
          <input type="text" className="w-full bg-weakest-contrast text-highlight rounded-xl p-2 text-sm" readOnly value={id} />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-gray-800 font-semibold font-open-sans text-sm">Statut</h1>
          <input type="text" className="w-full bg-weakest-contrast text-highlight rounded-xl p-2 text-sm" value={status} onChange={onChange["status"]} placeholder="Type in the invoice status..." />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-gray-800 font-semibold font-open-sans text-sm">Type d'Événement</h1>
          <input type="text" className="w-full bg-weakest-contrast text-highlight rounded-xl p-2 text-sm" value={type} onChange={onChange["type"]} placeholder="Type in the invoice event type..." />
        </div>
      </div>
    </Card>
  );
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
      <div className="flex gap-4 items-center">
        <h1 className="text-strong-contrast font-semibold font-asap">Detailles de Bon</h1>
        <button className="ml-auto text-gray-800">Importer une facture</button>
        <button className="px-8 py-2 bg-highlight text-gray-100 rounded-lg text-sm hover:bg-highlight">Ajoutez un article</button>
      </div>
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
    </Card>
  );
}

const ClientDetails = ({ client }) => {
  const format_client = (_client) => {
    return [
      {label: "Nom", content: _client["name"]},
      {label: "Tél.", content: _client["phone"]},
      {label: "Addresse", content: _client["address"]},
      {label: "Type", content: _client["type"]},
    ];
  };
  const generateDetails = (_client) => format_client(_client).map(({ label, content }, index) => {
    return (
      <div key={index} className="w-full flex gap-2">
        <h1 className="flex-1 text-highlight text-sm font-roboto font-medium">{label.charAt(0).toUpperCase() + label.slice(1)}</h1>
        <h1 className="flex-[3_3_0%] text-gray-900 text-sm font-roboto text-left">{content}</h1>
      </div>
    )
  });
  return (
    <Card>
      <div className="flex justify-between items-center">
        <h1 className="text-highlight font-semibold font-asap">Informations sur le client</h1>
        <button className="text-highlight font-bold text-sm font-open-sans">MODIFIER</button>
      </div>
      <div className="flex flex-col gap-2">
        {generateDetails(client)}
      </div>
    </Card>
  )
}

const AssignEmployees = () => {
  const selectionOptions = ["xenobas", "mawrk", "n0chill"];
  const formatted_selectionOptions = selectionOptions.map((opt) => {
    return {
      value: opt,
      label: opt.toUpperCase(),
    };
  });
  const renderAssignmentSystem = (employees) => {
    const selectOnChange = (newValue, actionMeta) => {
      // TODO: submit change.
    };
    const CustomIndicator = (props) => {
      return (
        <components.DropdownIndicator {...props}>
          <AiFillCaretDown />
        </components.DropdownIndicator>
      );
    };
    const EmployeeBadge = (props) => {
      return (
        <div className="text-sm font-asap">
          <components.MultiValueContainer {...props} />
        </div>
      );
    }
    return (
      <Select classNames={{ indicatorSeparator: () => "hidden" }} components={{ MultiValueContainer: EmployeeBadge, DropdownIndicator: CustomIndicator }} options={employees} isMulti closeMenuOnSelect={false} onChange={selectOnChange} placeholder="Affectation des employés" />
    )
  };
  return (
    <Card>
      <h1 className="text-highlight font-semibold font-asap">Employés</h1>
      <div className="text-sm">
        {renderAssignmentSystem(formatted_selectionOptions)}
      </div>
    </Card>
  )
}

const EditDelivery = () => {
  return (
    <Card>
      <div className="flex flex-col gap-2">
        <h1 className="text-highlight font-semibold font-asap">Adresse de livraison</h1>
        <input type="text" className="w-full bg-weakest-contrast text-highlight rounded-xl p-2 text-sm" placeholder="Tapez l'adresse..." />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-800 font-medium font-asap">Date de livraison</h1>
        <input type="date" className="w-full bg-weakest-contrast text-highlight rounded-xl p-2 text-sm" placeholder="Select the date..." />
      </div>
    </Card>
  )
}

const NoteDisplay = () => {
  return (
    <Card>
      <h1 className="text-highlight font-semibold font-asap">Notes</h1>
      <textarea className="w-full bg-weakest-contrast text-highlight rounded-xl p-2 text-sm h-fit min-h-8 resize-none" placeholder="Ajouter un commentaire..."></textarea>
    </Card>
  )
}

const CreateInvoice = () => {

  const invoice_client = {
    name: "Mohamed Ali Clay",
    phone: "+212 644-610548",
    address: "Rue Tamada, Hay Adrar, Agadir",
    type: "Individuel",
  };
  const invoice_informations = {
    id: "95794",
    type: "Mariage",
    note: "12 flower 14 Torch 15 Decoration",
    date: "17-09-2023",
    title: "Mariage Alae x Safae",
    status: "Scheduled",
    address: "Rue Tamada, Hay Adrar Agadir",
    employees: ["mawrk"],
  };
  const invoice_members = [
    {
      "material": "la Corne du Gardien",
      "quantity": 15,
      "ref": "JAT7887",
      "check": true,
      "remaining": 6
    },
    {
      "material": "la Lettre de l'Ange",
      "quantity": 15,
      "ref": "IKH8913",
      "check": false,
      "remaining": 5
    },
    {
      "material": "le Monolithe de Relance",
      "quantity": 12,
      "ref": "BOI2695",
      "check": false,
      "remaining": 2
    },
    {
      "material": "le Diadème de Destruction",
      "quantity": 6,
      "ref": "SAL5224",
      "check": true,
      "remaining": 5
    },
    {
      "material": "le Cube de Magie Noire",
      "quantity": 8,
      "ref": "SAL4486",
      "check": false,
      "remaining": 7
    },
    {
      "material": "la Clé de Souhaits",
      "quantity": 13,
      "ref": "IKH0641",
      "check": false,
      "remaining": 1
    },
    {
      "material": "la Gemme de Captivation",
      "quantity": 1,
      "ref": "BOI4842",
      "check": false,
      "remaining": 1
    },
    {
      "material": "la Plaque de Pourriture",
      "quantity": 4,
      "ref": "SAL6921",
      "check": true,
      "remaining": 1
    },
    {
      "material": "l'Épée de Résolutions",
      "quantity": 8,
      "ref": "SAL2718",
      "check": false,
      "remaining": 4
    },
    {
      "material": "la Bague d'Illusion",
      "quantity": 10,
      "ref": "SAL4870",
      "check": false,
      "remaining": 5
    }
  ];

  const [draft_info, dispatchInfo] = useReducer((state, action) => {
    const { field, newValue } = action;
    if (Object.keys(state).includes(field)) {
      const newState = structuredClone(state);
      newState[field] = newValue;
      return newState;
      // console.log(`[Object draft_info] updated ${field} to contain "${newValue}".`);
    } else if (field === "all") {
      const newState = structuredClone(invoice_informations);
      return newState;
      // console.log("old vs new :", state.title, newState.title)
    } else throw new Error(`[Object draft_info] doesn't contain ${field} key.`);
  }, structuredClone(invoice_informations));

  const revertDraft = () => {
    dispatchInfo({
      field: "all",
      newValue: null,
    });
  }

  return (
    <div className="w-full h-full bg-primary flex flex-col gap-4 p-4 font-open-sans">
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-start">
          <h1 className="text-lg text-strong-contrast font-asap font-semibold">CRÉER UN NOUVEAU BON DE LIVRAISON</h1>
          <h4 className="text-sm text-weak-contrast font-asap font-semibold">Créez un nouveau bon de livraison, et envoyez le par e-mail ou par impression.</h4>
        </div>
        <div className="flex gap-2 items-center">
          <button className="bg-transparent p-2 text-roboto text-2xl text-highlight hover:bg-highlight hover:text-secondary rounded-full transition-colors duration-300 ease-in">
            <AiOutlineCopy />
          </button>
          <button className="bg-transparent p-2 text-roboto text-2xl text-highlight hover:bg-highlight hover:text-secondary rounded-full transition-colors duration-300 ease-in" onClick={revertDraft}>
            <AiOutlineReload />
          </button>
          <button className="bg-transparent p-2 text-roboto text-2xl text-highlight hover:bg-highlight hover:text-secondary rounded-full transition-colors duration-300 ease-in">
            <AiFillSave />
          </button>
        </div>
      </div>
      <div className="w-full flex gap-4 font-open-sans flex-1">
        <div className="w-2/3 h-full flex flex-col gap-4">
          <EditGeneral {...draft_info} dispatch={dispatchInfo} />
          <InvoiceDetails details={invoice_members} />
        </div>
        <div className="w-1/3 h-full flex flex-col gap-4">
          <ClientDetails client={invoice_client} />
          <AssignEmployees />
          <EditDelivery />
          <NoteDisplay />
        </div>
      </div>
    </div>
  );
}

export default CreateInvoice;