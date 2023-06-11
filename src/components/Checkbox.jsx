import { useState } from "react";
import { HiOutlineCheck } from "react-icons/hi";

const Checkbox = ({ id, initialChecked, onChange }) => {
  if (!id) id = (Math.random() * 42).toFixed(8).replace(".", "");

  const className = [
    "peer", // Grouping
    "appearance-none bg-transparent m-0", // Appearance
    "text-current w-5 h-5 border rounded-md border-highlight cursor-pointer", // General
    "grid place-content-center", // Align
    "before:content[\"\"] before:cursor-pointer before:w-5 before:h-5 before:rounded-md before:scale-0 before:transition-transform before:duration-150 before:ease-in before:bg-highlight", // Before PseudoElement
    "checked:before:scale-100 checked:before:delay-150",
  ].join(" ");

  const [checked, setChecked] = useState(initialChecked);
  const onCheckedChange = ((event) => {
    const [oldValue, newValue] = [checked, event.target.checked]
    setChecked(newValue);
    if (typeof (onChange) == "function") onChange(oldValue, newValue);
  });
  return (
    <div className="w-fit h-fit relative">
      <input
        id={id}
        type="checkbox"
        className={className}
        checked={checked}
        onChange={onCheckedChange}
      />
      <label className="absolute cursur-pointer top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 origin-center scale-0 transition-transform delay-300 duration-300 ease-in-out text-secondary peer-checked:scale-100 peer-checked:delay-0" htmlFor={id}>
        <HiOutlineCheck className="text-lg" />
      </label>
    </div>
  );
}

export const CheckboxDynamic = ({ id, checked, onChange }) => {
  if (!id) id = (Math.random() * 42).toFixed(8).replace(".", "");

  const className = [
    "peer", // Grouping
    "appearance-none bg-transparent m-0", // Appearance
    "text-current w-5 h-5 border rounded-md border-highlight cursor-pointer", // General
    "grid place-content-center", // Align
    "before:content[\"\"] before:cursor-pointer before:w-5 before:h-5 before:rounded-md before:scale-0 before:transition-transform before:duration-150 before:ease-in before:bg-highlight", // Before PseudoElement
    "checked:before:scale-100 checked:before:delay-150",
  ].join(" ");

  const onCheckedChange = ((event) => {
    const [oldValue, newValue] = [checked, event.target.checked]
    if (typeof (onChange) == "function") onChange(newValue);
    // setChecked(() => newValue)
  });
  return (
    <div className="w-fit h-fit relative">
      <input
        id={id}
        type="checkbox"
        className={className}
        checked={checked}
        onChange={onCheckedChange}
      />
      <label className="absolute cursur-pointer top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 origin-center scale-0 transition-transform delay-300 duration-300 ease-in-out text-secondary peer-checked:scale-100 peer-checked:delay-0" htmlFor={id}>
        <HiOutlineCheck className="text-lg" />
      </label>
    </div>
  );
}

export default Checkbox;