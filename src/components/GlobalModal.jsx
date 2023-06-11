import Card from "./Card";

const GlobalModal = ({ children, show, className }) => {
  return (
    <div
      className={
        show
          ? "fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-strong-contrast/25"
          : "hidden"
      }
    >
      <Card className={["relative z-auto w-fit h-fit", className].join(" ")} isRaw={true}>{children}</Card>
    </div>
  );
};

export default GlobalModal;
