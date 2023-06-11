const Card = ({ children, className, isRaw }) => {
  let _internal_className = [isRaw ? "p-4 border border-weakest-contrast bg-secondary text-strong-contrast rounded-xl" : "w-full flex flex-col gap-4 p-4 border border-weakest-contrast bg-secondary text-strong-contrast rounded-xl", className].filter((c) => !!c).join(" ");
  return (
    <div className={_internal_className}>
      {children}
    </div>
  );
}

export default Card;