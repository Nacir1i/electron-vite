const Modal = ({ children, show }) => {
  return (
    <div
      className={
        show
          ? "absolute top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-strong-contrast/25"
          : "hidden"
      }
    >
      <div className="relative z-auto bg-secondary p-4 rounded-md">{children}</div>
    </div>
  );
};

export default Modal;
