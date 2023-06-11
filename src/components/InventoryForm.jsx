import { AiOutlineClose } from "react-icons/ai";
import Select from "./Select";
import Input from "./Input";

const brands = [
  {
    id: 123,
    name: "Gucci",
  },
  {
    id: 124,
    name: "Luis vuitton",
  },
  {
    id: 321,
    name: "Balenciaga",
  },
  {
    id: 213,
    name: "versace",
  },
  {
    id: 132,
    name: "Nike",
  },
];

const locations = [
  {
    id: 123,
    name: "Depot El houda",
  },
  {
    id: 1234,
    name: "Depot El massira",
  },
  {
    id: 125,
    name: "Depot Hay salam",
  },
  {
    id: 13,
    name: "Depot Tilila",
  },
  {
    id: 23,
    name: "Depot El farah",
  },
];

const vendors = [
  {
    id: 123,
    name: "NoChill",
  },
  {
    id: 1234,
    name: "Qazaqi",
  },
  {
    id: 125,
    name: "Mawrk",
  },
  {
    id: 13,
    name: "Brustner",
  },
  {
    id: 23,
    name: "Oppaii",
  },
];

const renderList = (list) => {
  return list.map((item) => <option key={item.id}>{item.name}</option>);
};

const inventoryForm = ({ close }) => {
  return (
    <>
      <div className="w-full h-10 flex items-center justify-between">
        <p className="text-3xl">Add new product</p>
        <AiOutlineClose
          onClick={close}
          className="text-highlight text-2xl cursor-pointer"
        />
      </div>
      <div className="w-[1100px] my-5 flex justify-center gap-7">
        <div className="w-2/3">
          <div className="w-full flex flex-col mt-3 shadow-lg">
            <h1 className="text-2xl mb-2">Title</h1>
            <input
              className="bg-transparent border border-highlight p-2 bg-gray-100"
              type="text"
              placeholder="where was you doing maan"
              id="title"
            />
          </div>
          <div className="flex gap-6">
            <Input title="Product Type" placeHolder="e.g., Resources" />
            <Input
              title="Product Category"
              placeHolder="Search product categories"
            />
          </div>
          <h1 className="text-2xl mt-8">Pricing : </h1>
          <div className="flex gap-6">
            <Input title="Sell Price" placeHolder="00.00 MAD" />
            <Input title="Buy Price" placeHolder="00.00 MAD" />
          </div>
          <h1 className="text-2xl mt-8">Stock : </h1>
          <div className="flex gap-6">
            <Input title="SKU (Stock Keeping Unit)" placeHolder="00.00 MAD" />
            <Input title="Barcode (ISBN, UPC, etc.)" placeHolder="00.00 MAD" />
          </div>
          <div className="flex gap-6">
            <Input title="Quantity en stock" placeHolder="00.00 MAD" />
            <Input title="Minimum en stock" placeHolder="00.00 MAD" />
          </div>
        </div>
        <div className="realtive w-1/3 h-[578px]">
          <div className="absolute top-40 p-3 rounded-sm w-[360px] h-[350px] flex flex-col justify-between border-highlight border-2">
            <Select title="Brands">{renderList(brands)}</Select>
            <Select title="Locations">{renderList(locations)}</Select>
            <Select title="Vendors">{renderList(vendors)}</Select>
            <Select title="Packages">{renderList(vendors)}</Select>
          </div>
        </div>
      </div>
      <div className="w-full pt-2 flex items-end justify-between">
        <div>
          <div className="flex items-center mb-4">
            <input
              id="track"
              type="checkbox"
              className="checkbox checked:checkbox-primary border-2 border-strong-contrast"
            />
            <label htmlFor="track" className="ml-2 text-sm font-medium">
              Track quantity
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="notif"
              type="checkbox"
              className="checkbox checked:checkbox-primary border-2 border-strong-contrast"
            />
            <label htmlFor="notif" className="ml-2 text-sm font-medium">
              Notification (out of stock)
            </label>
          </div>
        </div>
      </div>
      <button className="absolute bottom-5 right-5 btn bg-highlight hover:bg-highlight/70 w-24 border-none text-white text-md">
        Save
      </button>
    </>
  );
};

export default inventoryForm;
