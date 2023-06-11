const TemplateList = ({ components: { Informations, Table } }) => {
  return <div className="w-full h-full p-4 flex flex-col gap-4 bg-primary text-strong-contrast font-regular font-roboto">
    <Informations />
    <Table />
  </div>
};

export default TemplateList;