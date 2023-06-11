const Toggle = ({ id, state, onChange, ...props}) => {
  const inputClassName = [
    "peer hidden appearance-none bg-transparent m-0",
    "w-full h-full",
  ].join(" ");

  const labelClassName = [
    "w-12 h-6 inline-block relative cursor-pointer",
    "before:content-[\"\"] before:absolute before:top-0 before:left-0 before:w-12 before:h-6 before:rounded-xl before:bg-secondary before:border-2 before:border-highlight",
    "after:content[\"\"] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1 after:w-4 after:h-4 after:rounded-full after:bg-highlight peer-checked:after:left-7",
    "after:transition-[left] after:duration-150 after:ease-in"
  ].join(" ");

  return <div className="inline-flex flex-col place-items-center w-fit h-fit relative">
    <input type="checkbox" className={inputClassName} id={id} checked={state} onChange={onChange} {...props} />
    <label className={labelClassName} htmlFor={id}></label>
  </div>
};

export default Toggle;