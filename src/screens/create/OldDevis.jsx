import _ from "lodash";
import { useEffect, useState } from "react";
import { SlOptions } from "react-icons/sl";
import { AiOutlineClose } from "react-icons/ai";
import Select from "react-select";
import Modal from "../components/Modal";
import IconSelect from "../components/IconSelect";
import InvoiceHeader from "../components/InvoiceHeader";

const data = [
  {
    category: "category1",
    products: [
      {
        name: "Colby cheese",
        ref: "SE73VJZU6G",
        prix: 66.0,
        quantity: 1,
      },
      {
        name: "top cookies",
        ref: "KZS6WLR3YO",
        prix: 69.0,
        quantity: 1,
      },
      {
        name: "bzi",
        ref: "X53YMAUAW5",
        prix: 420.0,
        quantity: 1,
      },
    ],
  },
  {
    category: "category2",
    products: [
      {
        name: "amlou",
        ref: "ZAwpB5Byj9",
        prix: 66.0,
        quantity: 1,
      },
      {
        name: "ziit",
        ref: "lGkdj4oPA6",
        prix: 69.0,
        quantity: 1,
      },
      {
        name: "realto",
        ref: "w05lLnfq5g",
        prix: 420.0,
        quantity: 1,
      },
    ],
  },
  {
    category: "category3",
    products: [
      {
        name: "mlabaw",
        ref: "NWHXQdIgRf",
        prix: 66.0,
        quantity: 1,
      },
      {
        name: "howhow",
        ref: "I0udeokEVQ",
        prix: 69.0,
        quantity: 1,
      },
      {
        name: "kalbon",
        ref: "jXx3soZj2j",
        prix: 420.0,
        quantity: 1,
      },
    ],
  },
];
const clients = [
  {
    firstName: "client1",
    lastName: "lastName1",
    email: "example@email.com",
    phone: "06 00 00 00 00",
    address: "Ibn maja, Agadir",
    rib: "NL38INGB3367466468",
    swift: "1470708070",
    ice: "123584694",
  },
  {
    firstName: "client2",
    lastName: "lastName2",
    email: "example@email.com",
    phone: "06 00 00 00 00",
    address: "Ibn maja, Agadir",
    rib: "NL38INGB3367466468",
    swift: "1470708070",
    ice: "123584694",
  },
  {
    firstName: "client3",
    lastName: "lastName3",
    email: "example@email.com",
    phone: "06 00 00 00 00",
    address: "Ibn maja, Agadir",
    rib: "NL38INGB3367466468",
    swift: "1470708070",
    ice: "123584694",
  },
  {
    firstName: "client4",
    lastName: "lastName4",
    email: "example@email.com",
    phone: "06 00 00 00 00",
    address: "Ibn maja, Agadir",
    rib: "NL38INGB3367466468",
    swift: "1470708070",
    ice: "123584694",
  },
  {
    firstName: "client5",
    lastName: "lastName5",
    email: "example@email.com",
    phone: "06 00 00 00 00",
    address: "Ibn maja, Agadir",
    rib: "NL38INGB3367466468",
    swift: "1470708070",
    ice: "123584694",
  },
];

const CreateDevis = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [search, setSearch] = useState("");
  const [toggleList, setToggleList] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountIsValue, setDiscountIsValue] = useState({ value: true });
  const [pendingDiscount, setPendingDiscount] = useState(0);
  const [pendingDiscountType, setPendingDiscountType] = useState({
    value: true,
  });
  const [showDiscount, setShowDiscount] = useState(false);
  const [shipping, setShipping] = useState(0);
  const [rateName, setRateName] = useState(0);
  const [pendingShipping, setPendingShipping] = useState(0);
  const [isFree, setIsFree] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [tax, setTax] = useState(20);
  const [total, setTotal] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [values, setValues] = useState(() =>
    data.map((product) => ({
      label: product.category,
      options: product.products.map((field) => ({
        label: field.name,
        value: field.name,
        quantity: field.quantity,
        ref: field.ref,
        prix: field.prix,
      })),
    }))
  );
  const [clientsList, setClientsList] = useState(() =>
    clients.map((client) => ({
      label: `${client.firstName} ${client.lastName}`,
      value: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phone: client.phone,
      address: client.address,
      rib: client.rib,
      swift: client.swift,
      ice: client.ice,
    }))
  );

  const handleSearch = (item) => {
    setSearch(item);
    addItem(item);
  };

  const addItem = (item) => {
    setSelectedProducts([item, ...selectedProducts]);
  };

  const deleteItem = (ref) => {
    const newList = selectedProducts.filter((item) => item.ref != ref);

    setSelectedProducts(newList);
  };

  const changeQuantity = (item, quantity) => {
    const newList = [...selectedProducts];
    const newItem = item;

    const index = _.findIndex(
      selectedProducts,
      (element) => item.ref == element.ref
    );

    newItem.quantity = quantity;
    newList[index] = item;
    setSelectedProducts(newList);
  };

  const applyDiscountChanges = () => {
    setDiscount(Number(pendingDiscount));
    setDiscountIsValue(pendingDiscountType);
    setShowDiscount(false);
  };

  const applyShipping = () => {
    if (!isFree) {
      setShipping(Number(pendingShipping));
    } else {
      setShipping(0);
    }
    setShowShipping(false);
  };

  const cancelShipping = () => {
    setRateName("");
    setShowShipping(false);
  };

  const calculateDiscount = () => {
    return discountIsValue.value ? discount : (subTotal * discount) / 100;
  };

  const calculateTotal = () => {
    const discountPrice = calculateDiscount();
    const afterDiscount = subTotal - discountPrice;
    const HT = afterDiscount + shipping;
    const taxPrice = (HT * tax) / 100;
    const TTC = HT + taxPrice;

    return TTC;
  };

  useEffect(() => {
    if (selectedProducts.length === 0) {
      setDiscount(0);
      setSubTotal(0);
      setTotal(0);

      return;
    }
    let total = 0;
    selectedProducts.forEach((product) => {
      const currentTotal = product.prix * product.quantity;

      total += currentTotal;
    });

    setSubTotal(total);
  }, [selectedProducts]);

  useEffect(() => {
    const newTotal = calculateTotal();

    setTotal(newTotal);
  }, [subTotal, discount, discountIsValue, isFree, shipping]);

  // ------

  const renderTable = selectedProducts.map((product, index) => (
    <tr key={Math.random() * 100}>
      <th>{index}</th>
      <td className="py-2">{product.value}</td>
      <td>{product.ref}</td>
      <td>
        <input
          onChange={(e) => changeQuantity(product, e.target.value)}
          type="number"
          className="bg-gray-100 w-10"
          placeholder="xx"
          value={product.quantity}
        />
      </td>
      <td>{product.prix}</td>
      <td
        onClick={() => deleteItem(product.ref)}
        className="text-red-500 text-center cursor-pointer"
      >
        X
      </td>
    </tr>
  ));

  return (
    <div className="relative w-full h-full bg-gray-100 text-strong-contrast p-10 flex flex-col gap-7">
      <Modal show={showDiscount}>
        <div className="flex items-center justify-between">
          <p className="text-3xl">Set discount</p>
          <AiOutlineClose
            onClick={() => setShowDiscount(false)}
            className="text-highlight text-2xl cursor-pointer"
          />
        </div>
        <div className="py-5 w-[500px] flex flex-col gap-4">
          <div className="w-full flex gap-4">
            <div className="w-1/2">
              <label htmlFor="reason">Discount type</label>
              <Select
                options={[
                  { label: "Amount", value: true },
                  { label: "Percentage", value: false },
                ]}
                value={pendingDiscountType}
                onChange={(test) => setPendingDiscountType(test)}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="reason">Amount</label>
              <input
                id="reason"
                type="number"
                onChange={(e) => setPendingDiscount(e.target.value)}
                value={pendingDiscount}
                className="bg-white w-full border border-strong-contrast/20 rounded-md p-2"
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="reason">Reason</label>
            <input
              id="reason"
              type="text"
              className="bg-white w-full border border-strong-contrast/20 rounded-md p-2"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowDiscount(false)}
            className="p-1 px-4 bg-gray-100 text-sm rounded-md border border-strong-contrast text-strong-contrast"
          >
            Cancel
          </button>
          <button
            onClick={() => applyDiscountChanges()}
            className="p-1 px-4 bg-highlight text-white text-sm rounded-md"
          >
            Apply
          </button>
        </div>
      </Modal>
      <Modal show={showShipping}>
        <div className="flex items-center justify-between">
          <p className="text-3xl">Set Shipping</p>
          <AiOutlineClose
            onClick={() => setShowShipping(false)}
            className="text-highlight text-2xl cursor-pointer"
          />
        </div>
        <div className="py-5 w-[500px] flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <input
              id="free"
              type="radio"
              name="radio-1"
              className="radio bg-gray-100 checked:bg-highlight border border-strong-contrast"
              value={true}
              onChange={(e) => setIsFree(Boolean(e.target.value))}
            />
            <label htmlFor="free">Free shipping</label>
          </div>
          <div className="flex gap-3 items-center">
            <input
              id="custom"
              type="radio"
              name="radio-1"
              className="radio bg-gray-100 checked:bg-highlight border border-strong-contrast"
              value={""}
              onChange={(e) => setIsFree(Boolean(e.target.value))}
            />
            <label htmlFor="custom">Custom</label>
          </div>
          <div className="w-full flex gap-5">
            <div className="w-1/2">
              <label
                className={`${!isFree ? "text-strong-contrast " : "text-weak-contrast"}`}
                htmlFor="rate"
              >
                Name
              </label>
              <input
                id="rate"
                type="text"
                className={`w-full border border-strong-contrast/20 rounded-md p-2 ${!isFree ? "bg-white " : "bg-weak-contrast"
                  }`}
                disabled={isFree}
                onChange={(e) => setRateName(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label
                className={`${!isFree ? "text-strong-contrast " : "text-weak-contrast"}`}
                htmlFor="price"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                className={`w-full border border-strong-contrast/20 rounded-md p-2 ${!isFree ? "bg-white " : "bg-weak-contrast"
                  }`}
                disabled={isFree}
                onChange={(e) => setPendingShipping(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => cancelShipping()}
            className="p-1 px-4 bg-gray-100 text-sm rounded-md border border-strong-contrast text-strong-contrast"
          >
            Cancel
          </button>
          <button
            onClick={() => applyShipping()}
            className="p-1 px-4 bg-highlight text-white text-sm rounded-md"
          >
            Apply
          </button>
        </div>
      </Modal>
      <InvoiceHeader
        desc="Créez un nouveau devis, et envoyez-le au client par E-mail ou par impression."
        title="CRÉER UN NOUVEAU DEVIS"
        event={() => { }}
      />
      <div className="w-full h-full flex gap-6">
        <div className="w-2/3 flex flex-col gap-8">
          <div className="w-full flex flex-col gap-3 justify-around border p-5 border-highlight shadow-lg bg-gray-100">
            <div className="w-full flex justify-between items-center">
              <h1 className="text-lg text-highlight font-semibold font-asap">Products</h1>
            </div>
            <div className="w-full flex items-center">
              <div className="w-full h-10 flex items-center">
                <IconSelect
                  value={search}
                  options={values}
                  onChange={(selectedValue) => handleSearch(selectedValue)}
                  placeholder="Search or browse items, services and packages."
                  isGrouped={true}
                  className="w-full border border-highlight rounded-md text-xl"
                  iconClassName="text-xl text-highlight ml-4"
                />
              </div>
            </div>
            <div className="w-full p-5 border-t border-highlight">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Ref.</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th className="text-red-500 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>{renderTable}</tbody>
              </table>
            </div>
            {toggleList && (
              <ul className="absolute top-60 w-28 bg-gray-100 px-3 border border-highlight rounded-md">
                {renderProductsList}
              </ul>
            )}
          </div>
          <div className="relative flex flex-col gap-4 border p-5 border-highlight shadow-lg bg-gray-100">
            {selectedProducts.length === 0 && (
              <div className="absolute top-0 left-0 right-0 bottom-0 w-full bg-weak-contrast/10"></div>
            )}
            <h1 className="text-xl text-highlight font-semibold font-asap">Payment</h1>
            <div className="w-full px-10 flex flex-col gap-4">
              <div className="w-full flex justify-between">
                <h1 className="text-weak-contrast">Subtotal</h1>
                <p>{subTotal}.00 MAD</p>
              </div>
              <div className="w-full flex justify-between">
                <h1
                  onClick={() => setShowDiscount(true)}
                  className="text-weak-contrast cursor-pointer"
                >
                  Discount
                </h1>
                <p>
                  {discount} {discountIsValue.value ? "MAD" : "%"}
                </p>
              </div>
              <div className="w-full flex justify-between">
                <h1
                  onClick={() => setShowShipping(true)}
                  className="text-weak-contrast cursor-pointer"
                >
                  Add Shipping
                </h1>
                <p className="">{shipping} MAD</p>
              </div>
              <div className="w-full flex justify-between">
                <h1 className="text-weak-contrast">Tax</h1>
                <p>{tax}%</p>
              </div>
              <div className="w-full flex justify-between">
                <h1 className="text-strong-contrast">Total</h1>
                <p>{total} MAD</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 flex flex-col gap-8">
          <div className="relative flex flex-col justify-around border p-5 gap-10 border-highlight shadow-lg bg-gray-100">
            {showOptions && (
              <ul className="absolute right-5 top-12 p-4 flex flex-col gap-4 bg-gray-100 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                <li className="text-highlight cursor-pointer">
                  Edit client information
                </li>
                <li className="cursor-pointer">Edit Contact information</li>
                <li className="cursor-pointer">Edit billing information</li>
                <li
                  onClick={() => {
                    setSelectedClient(null);
                    setShowOptions(false);
                  }}
                  className="text-red-600 cursor-pointer"
                >
                  Remove client
                </li>
              </ul>
            )}
            <div className="w-full">
              <div className="w-full flex justify-between items-center">
                <h1 className="text-3xl text-strong-contrast">Client</h1>
                {selectedClient && (
                  <SlOptions
                    className="cursor-pointer"
                    onClick={() => setShowOptions((prev) => !prev)}
                  />
                )}
              </div>
              {selectedClient && (
                <div className="w-full mt-3 flex justify-center items-center">
                  <div className="w-10/12 flex flex-col gap-2">
                    <p>first name : {selectedClient.value}</p>
                    <p>last name : {selectedClient.lastName}</p>
                  </div>
                </div>
              )}
              {!selectedClient && (
                <Select
                  className="w-full"
                  options={clientsList}
                  onChange={(selected) => setSelectedClient(selected)}
                  value={selectedClient}
                />
              )}
            </div>
            {selectedClient ? (
              <>
                <div className="w-full">
                  <h1 className="text-2xl text-strong-contrast">Contact information</h1>
                  <div className="w-full mt-3 flex justify-center items-center">
                    <div className="w-10/12 flex flex-col gap-2">
                      <p>email : {selectedClient.email}</p>
                      <p>phone : {selectedClient.phone}</p>
                      <p>address : {selectedClient.address}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <h1 className="text-2xl text-strong-contrast">Billing informations</h1>
                  <div className="w-full mt-3 flex justify-center items-center">
                    <div className="w-10/12 flex flex-col gap-2">
                      <p>RIB : {selectedClient.rib}</p>
                      <p>Swift : {selectedClient.swift}</p>
                      <p>I.C.E : {selectedClient.ice}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col justify-around border p-5 gap-3 border-highlight shadow-lg bg-gray-100">
            <h1 className="text-2xl text-strong-contrast">Note</h1>
            <div className="w-full p-4 bg-gray-100 rounded-md border border-weakest-contrast">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas,
              quos. Culpa nostrum harum nulla fugit totam repellat, repudiandae
              eaque soluta ex doloremque, saepe odio accusantium dolorum
              consequuntur error, corporis ratione?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDevis;
