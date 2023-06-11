const Select = ({ children, title }) => {
  return (
    <fieldset className="border border-highlight bg-gray-100 rounded-md pb-2 px-1">
      <legend className="mx-2 px-2 text-highlight">{title}</legend>
      <select className="w-full bg-gray-100">{children}</select>
    </fieldset>
  );
};

export default Select;
