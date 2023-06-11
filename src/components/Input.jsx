const Input = ({
  title = null,
  placeHolder,
  name,
  register,
  type = "text",
}) => {
  return (
    <div className="w-full flex flex-col mt-3 shadow-lg">
      <label className="text-lg mb-2" htmlFor={title}>
        {title}
      </label>
      <input
        {...register(name)}
        className="bg-transparent border border-highlight p-2 bg-gray-100"
        type={type}
        placeholder={placeHolder}
        id={title}
      />
    </div>
  );
};

export default Input;
