import { useState } from "react";
import { AiOutlineClockCircle, AiOutlineCheckCircle, AiOutlineQuestion } from "react-icons/ai";

export const APPOINTMENT_SHARED = {
  event: [
    { value: 1, label: "Rendez-vous" },
    { value: 2, label: "Anniversaire" },
    { value: 3, label: "Mariage" },
  ],
  status: [
    { value: null, label: "Inconnue", className: "", Icon: AiOutlineClockCircle, iconClassName: "inline text-xl text-orange-700" },
    { value: 1, label: "En attente", className: "", Icon: AiOutlineClockCircle, iconClassName: "inline text-xl text-orange-700" },
    { value: 2, label: "Programmé", className: "text-green-600", Icon: AiOutlineCheckCircle, iconClassName: "inline text-xl text-green-600" },
    { value: 3, label: "Terminé", className: "text-gray-500", Icon: AiOutlineCheckCircle, iconClassName: "inline text-xl text-gray-500" },
  ],
  getStatus(id) {
    return this.status.find(({ value }) => value === id)
      ??
      this.status.at(0);
  },
  employee_status: [
    { value: 1, label: "Actif" },
    { value: 2, label: "Congé" },
    { value: 3, label: "En attente" },
    { value: 4, label: "Résiliation" },
    { value: 5, label: "Retraité" },
  ],
  getEmployeeStatus(id) {
    return this.employee_status.find(({ value }) => value === id)
      ??
      this.employee_status.at(0);
  },
  payment_methods: [
    { value: "espece", label: "Espece" },
    { value: "cheque", label: "Cheque" },
    { value: "virement", label: "Virement" },
  ],
  getPaymentMethod(id) {
    return this.payment_methods.find(({ value }) => value == id) ?? this.payment_methods.at(0);
  },
  unknown: { value: NaN, label: "Inconnue", className: "", Icon: AiOutlineQuestion, iconClassName: "inline text-xl" },
  defaults: {
    appointment: {
      id: NaN,
      title: "Nouvelle nomination",
      type: 1,
      status: 1,
      createdAt: null,
      scheduledDate: null,
      orderId: null,
      order: null,
    },
    customer: {
      id: NaN,
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      type: "Individuel",
    }
  }
};

const capitalize = (e) => e.charAt(0).toUpperCase() + e.slice(1);

export const DATETIME_FORMAT = {
  export: { format: (date) => date.toISOString() },
  long: {
    formatter: new Intl.DateTimeFormat("fr-FR", { dateStyle: "full" }),
    format(date) {
      return this.formatter.formatToParts(date).map((e) => capitalize(e.value)).join("");
    },
  },
  default: new Intl.DateTimeFormat("fr-FR"),
  extended: new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }),
};

export const CLASS_NAMES = {
  label: "text-base text-strong-contrast font-medium font-roboto",
  input: "p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-medium font-inter disabled:cursor-not-allowed",
  select: {
    menu: () => "mt-2 rounded-xl bg-secondary p-2 shadow-x border border-weakeast-contrast",
    option: () => "px-4 py-2 text-strong-contrast text-sm rounded-xl hover:bg-highlight hover:text-weakest-contrast",
    control: () => "bg-weakest-contrast px-2 rounded-xl text-sm",
    placeholder: () => "text-sm text-weak-contrast font-medium font-inter truncate",
  }
}

/**
 * 
 * @param  {...[string, T, ( "select" | "date" | undefined)]} keys
 * @returns {Map<string, { getter: T, setter: Function, setterDirect: Function, exporter: () => (string | number) }>}
 */
export function createStates(...keys) {
  const states = new Map();
  for (const [key, defaultValue, type] of keys) {
    switch (type) {
      case "select": {
        const _defaultValue = {
          value: defaultValue?.id,
          label: defaultValue?.title,
        };
        const [_key, setKey] = useState(_defaultValue);
        states.set(key, {
          getter: _key,
          setter(newValue) {
            setKey(() => newValue);
          },
          setterDirect(newValue) {
            setKey(newValue);
          },
          exporter() {
            return this.getter?.value ?? _defaultValue?.value;
          },
        });
      } break;
      case "time": {
        const _defaultValue = new Date(defaultValue);
        const [_key, setKey] = useState(_defaultValue);
        states.set(key, {
          getter: _key,
          setter(date) {
            setKey(() => date);
          },
          setterDirect(newValue) { setKey(newValue) },
          exporter() {
            return DATETIME_FORMAT.export.format(this.getter);
          },
        });
      } break;
      case "date": {
        const _defaultValue = new Date(defaultValue);
        const [_key, setKey] = useState(_defaultValue);
        states.set(key, {
          getter: _key,
          setter(date) {
            setKey(() => date);
          },
          setterDirect(newValue) { setKey(newValue) },
          exporter() {
            return DATETIME_FORMAT.export.format(this.getter);
          },
        });
      } break;
      default: {
        const [_key, setKey] = useState(defaultValue);
        states.set(key, {
          getter: _key,
          setter(event) {
            setKey(() => event?.target?.value);
          },
          setterDirect(newValue) {
            setKey(newValue)
          },
          exporter() {
            return this.getter;
          },
        });
      }
    }
  }
  states.set("__reset", () => {
    for (const [key, defaultValue, type] of keys) {
      switch (type) {
        case "select":
          states.get(key).setterDirect({
            value: defaultValue?.id,
            label: defaultValue?.title,
          });
          break;
        case "date":
        case "time":
          states.get(key).setterDirect(new Date(defaultValue));
          break;
        default:
          states.get(key).setterDirect(defaultValue);
      }
    }
  });
  return states;
}


/**
 * 
 * @param {string | any} startValue 
 * @param {"input" | "select" | "datepicker" | undefined} type 
 * @param {string | undefined} key 
 * @param {Function} dispatch 
 * @returns 
 */
function _createState(startValue, type, key, dispatch, dispatch_container) {
  const [value, setValue] = useState(startValue);
  switch (type) {
    case "select": {
      return {
        value,
        onChange: (newValue) => {
          setValue(newValue);
          if (!!dispatch_container) {
            const parent_key = Object.keys(dispatch_container).at(0);
            dispatch_container[parent_key][key] = newValue;
            dispatch?.(dispatch_container);
          } else dispatch?.({ [key]: newValue });
        },
        set: setValue,
      };
    }
    case "datepicker": {
      return {
        value,
        onChange: (newValue) => {
          setValue(newValue);
          if (!!dispatch_container) {
            const parent_key = Object.keys(dispatch_container).at(0);
            dispatch_container[parent_key][key] = newValue?.toISOString();
            dispatch?.(dispatch_container);
          } else dispatch?.({ [key]: newValue?.toISOString() });
        },
        set: setValue,
      }
    }
    case "input":
    default: {
      return {
        value,
        onChange: (event) => {
          setValue(event.target.value);
          if (!!dispatch_container) {
            const parent_key = Object.keys(dispatch_container).at(0);
            dispatch_container[parent_key][key] = event.target.value;
            dispatch?.(dispatch_container);
          } else dispatch?.({ [key]: event.target.value });
        },
        set: setValue,
      };
    }
  }
}

/**
 * 
 * @param {Object} values 
 * @param {{[key: string]: "select" | "datepicker" | "input" | undefined}} types 
 * @param {Function} dispatch
 * @param {any} dispatch_container
 * @returns 
 */
export function createStatesNew(values, types, dispatch, dispatch_container) {
  const states = new Map();
  for (const key in values) states.set(key, _createState(values[key], types?.[key], key, dispatch, dispatch_container));
  return states;
}


export const PromiseTimeout = (duration) => new Promise((resolve) => setTimeout(() => resolve(), duration));