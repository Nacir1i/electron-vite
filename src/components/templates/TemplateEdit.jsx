/**
 * 
 * @param {{children: Array<{props:{ column: "primary" | "auxilary" | "modal" | "toolbar"}}>, title: string}} props
 * @returns 
 */
const TemplateEdit = ({ children, title }) => {
  children ??= [];
  const modal = children.filter(({ props: { column } }) => column === "modal");
  const primary = children.filter(({ props: { column } }) => column === "primary");
  const auxilary = children.filter(({ props: { column } }) => column === "auxilary");
  const toolbar = children.filter(({ props: { column } }) => column === "toolbar");

  return <div className="w-full h-full p-4 flex flex-col gap-4 bg-primary">
    {modal}
    <div className="flex items-center gap-4">
      <h1 className="text-lg font-bold text-weak-contrast font-asap">{title}</h1>
      {toolbar}
    </div>
    <div className="grid grid-cols-[2fr_1fr] gap-4 w-full h-full">
      <div className="flex flex-col gap-4">{primary}</div>
      <div className="flex flex-col gap-4">{auxilary}</div>
    </div>
  </div>
}

export default TemplateEdit;