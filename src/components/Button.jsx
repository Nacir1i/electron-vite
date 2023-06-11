import { Link } from "react-router-dom";

const Button = ({ type, to, textContent, Icon, onClick, disabled, className, textClassName, ...props }) => {
  const HTMLButton = ({ ...props }) => <button {...props}>{props.children}</button>
  const Element = (typeof (to) === "string") ? Link : HTMLButton;

  const _to = disabled ? undefined : to;
  const _onClick = disabled ? undefined : onClick;

  let classNameFactory = () => {
    const baseClassName = [
      "text-sm",
      "rounded-lg px-4 py-2",
      "flex gap-2 items-center",
      "font-asap",
      "transition-colors duration-300",
    ];
    switch (type) {
      case "soft":
        return baseClassName.concat(
          "bg-transparent hover:bg-highlight/10",
          className,
          "text-strong-contrast",
          "disabled:cursor-not-allowed disabled:text-weakest-contrast disabled:bg-strong-contrast disabled:hover:bg-strong-contrast",
        ).join(" ");
      default:
        return baseClassName.concat(
          "bg-highlight/90 hover:bg-highlight",
          className,
          "text-weakest-contrast",
          "disabled:cursor-not-allowed disabled:text-weakest-contrast disabled:bg-strong-contrast disabled:hover:bg-strong-contrast",
        ).join(" ");
    }
  }
  return <Element to={_to} onClick={_onClick} className={classNameFactory()} disabled={disabled} {...props}>
    {Icon}
    <span className={textClassName}>{textContent}</span>
  </Element>
}

export default Button;