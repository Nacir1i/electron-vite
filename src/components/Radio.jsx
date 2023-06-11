const Radio = ({ options = [], selected, onChange, group }) => {
  if (!group) group = Math.random().toFixed(5);
  const _onChange = (id) => onChange(id);
  const options_element = options.map(({ id, label }, index) => {
    return <div key={index} className="flex items-center gap-2">
      <input type="checkbox" name={group} id={[group, id || index].join("-")} checked={selected === id} onChange={() => _onChange(id)} />
      <label htmlFor={[group, id || index].join("-")}>{label}</label>
    </div>
  });
  return <div className="flex flex-col gap-2">
    {options_element}
  </div>
}

export default Radio;