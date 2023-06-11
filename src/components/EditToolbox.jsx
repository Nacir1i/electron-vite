import { AiFillSave, AiFillEdit, AiFillCloseCircle } from "react-icons/ai";

const EditToolbox = ({ save, cancel, toggle, modeEdit }) => {
  return <div className="flex items-center justify-end gap-2">
    {
      modeEdit &&
      <button onClick={cancel} className="bg-secondary text-red-700/75 rounded-full text-xl hover:text-red-700 transition-colors duration-150"><AiFillCloseCircle /></button>
    }
    <button onClick={modeEdit ? save : toggle} className="bg-secondary text-highlight/75 rounded-full text-xl hover:text-highlight transition-colors duration-150">
      {modeEdit ? <AiFillSave /> : <AiFillEdit />}
    </button>
  </div>
}

export default EditToolbox;