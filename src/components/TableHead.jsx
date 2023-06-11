import { AiOutlinePlus } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";

const TableHead = ({ title, setSearch, toggleModal }) => {
  return (
    <div className="navbar h-16 bg-white">
      <div className="flex-1">
        <h1 className="btn btn-ghost normal-case text-2xl text-weak-contrast">
          {title}
        </h1>
      </div>
      <div className="flex-none gap-4">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="h-10 input input-bordered bg-secondary"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <BsFilter className="text-2xl cursor-pointer" />
        <button
          onClick={toggleModal}
          className="py-2 px-4 bg-highlight text-white rounded-md text-xl flex items-center gap-2"
        >
          <AiOutlinePlus />
          <span> Add new </span>
        </button>
      </div>
    </div>
  );
};

export default TableHead;
