import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { createCustomer } from "../config/httpRequests";
import Input from "./Input";

const CustomerForm = ({ close }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const response = await createCustomer(data);

    console.log(response);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full h-10 flex items-center justify-between">
        <p className="text-3xl">Add new customer</p>
        <AiOutlineClose
          onClick={close}
          className="text-highlight text-2xl cursor-pointer"
        />
      </div>
      <div className="w-[900px] my-5 flex justify-center items-center gap-7">
        <div className="w-full">
          <h1 className="text-2xl mb-2">Details</h1>
          <div className="flex gap-6">
            <Input
              name="firstName"
              title="First Name"
              placeHolder="e.g., Mohammed ..."
              register={register}
            />
            <Input
              name="lastName"
              title="Last Name"
              placeHolder="e.g., El ghezoui ..."
              register={register}
            />
            <Input
              name="gender"
              title="gender"
              placeHolder="simo/ somiwa"
              register={register}
            />
          </div>
          <Input
            name="company"
            title="Company name"
            placeHolder="Deginotal"
            register={register}
          />
          <h1 className="text-2xl mt-8">Addresse</h1>
          <div className="flex flex-col gap-2">
            <div className="w-full flex gap-6">
              <Input
                name="address"
                title="Addresse"
                placeHolder=""
                register={register}
              />
              <Input
                name="rib"
                title="RIB"
                placeHolder=""
                register={register}
              />
              <Input
                name="swift"
                title="Swift"
                placeHolder=""
                register={register}
              />
            </div>
            <div className="w-full flex gap-6">
              <Input
                name="ice"
                title="I.C.E"
                placeHolder=""
                register={register}
              />
              <Input
                name="bankName"
                title="Bank name"
                placeHolder=""
                register={register}
              />
              <Input
                name="bankAccountNumber"
                title="Bank account number"
                placeHolder=""
                register={register}
              />
            </div>
          </div>
          <h1 className="text-2xl mt-8">Contact Details</h1>
          <div className="flex gap-6">
            <Input
              name="email"
              title="Email"
              placeHolder="example@gmail.com"
              register={register}
            />
            <Input
              name="phone"
              title="Phone Number"
              placeHolder="06 00 00 00 00"
              register={register}
            />
          </div>
        </div>
      </div>
      <div className=" h-10"></div>
      <button className="absolute bottom-5 right-5 btn bg-highlight hover:bg-highlight/70 w-24 border-none text-white text-md">
        Save
      </button>
    </form>
  );
};

export default CustomerForm;
