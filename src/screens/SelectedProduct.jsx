import { toUpper } from "lodash";
import { BsArrowLeft } from "react-icons/bs";
import TimelineContainer from "../components/TimelineContainer";

const data = {
  title: "Red bull",
  category: "Drink",
  subCategory: "Energy drink",
  ref: "ooRhDmrNEK",
  code: "1af90ReE54",
  quantity: "XX",
  minQuantity: "XX",
  buyingPrice: 50,
  sellingPrice: 620,
  locations: [
    {
      location: "location 1",
      incoming: 2,
      committed: 8,
      available: 69,
    },
    {
      location: "location 2",
      incoming: 0,
      committed: 0,
      available: 40,
    },
    {
      location: "location 3",
      incoming: 12,
      committed: 0,
      available: 120,
    },
    {
      location: "location 4",
      incoming: 32,
      committed: 40,
      available: 69420,
    },
  ],
  comment: [
    {
      comment: "Contrary to popular belief, Lorem ",
      time: "09:05 PM",
    },
    {
      comment: "Contrary to Lorem Ipsum is ",
      time: "09:05 PM",
    },
    {
      comment: "Ipsum is not simply random text.",
      time: "09:05 PM",
    },
    {
      comment: "Contrary to Lorem Ipsum.",
      time: "09:05 PM",
    },
    {
      comment: "Contrary to popular text.",
      time: "09:05 PM",
    },
    {
      comment: "Contrary to popular not.",
      time: "09:05 PM",
    },
    {
      comment: "Contrary to popular belief.",
      time: "09:05 PM",
    },
  ],
};

const renderLocation = data.locations.map((location, index) => (
  <tr key={Math.random() * 100} className="text-strong-contrast text-left">
    <th>{index}</th>
    <td className="py-2">{location.location}</td>
    <td>{location.incoming}</td>
    <td>{location.committed}</td>
    <td>{location.available}</td>
  </tr>
));

const SelectedProduct = () => {
  return (
    <div className="w-full bg-primary">
      <div className="w-full p-10">
        <div className="w-full flex items-center gap-4 text-strong-contrast mb-6">
          <BsArrowLeft className="text-strong-contrast text-3xl font-extrabold" />
          <div>
            <h1 className="text-weak-contrast text-xl">Back</h1>
          </div>
        </div>
        <h1 className="mb-5 text-2xl text-strong-contrast">
          {toUpper("Product details")} :
        </h1>
        <div className="w-full flex gap-5">
          <div className="w-2/3 flex flex-col gap-6">
            <div className="w-full flex flex-col gap-5 justify-between p-6 border border-highlight shadow-lg bg-gray-100">
              <div className="w-full">
                <h1 className="w-full text-strong-contrast text-md">Title : </h1>
                <input
                  className="w-full border border-strong-contrast bg-white p-2 text-strong-contrast"
                  type="text"
                  value={data.title}
                  disabled
                />
              </div>
              <div className="w-full flex gap-5">
                <div className="w-1/2">
                  <h1 className="w-full text-strong-contrast text-md">Category : </h1>
                  <input
                    className="w-full border border-strong-contrast bg-white p-2 text-strong-contrast"
                    type="text"
                    value={data.category}
                    disabled
                  />
                </div>
                <div className="w-1/2">
                  <h1 className="w-full text-strong-contrast text-md">Sub Category : </h1>
                  <input
                    className="w-full border border-strong-contrast bg-white p-2 text-strong-contrast"
                    type="text"
                    value={data.subCategory}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-5 justify-between p-6 border border-highlight shadow-lg bg-gray-100">
              <h1 className="text-strong-contrast text-xl">Inventory : </h1>
              <div className="w-full flex gap-5">
                <div className="w-1/2">
                  <h1 className="w-full text-strong-contrast text-md">
                    Barcode (ISBN, UPC, GTIN, etc.) :
                  </h1>
                  <input
                    className="w-full border border-strong-contrast bg-white p-2 text-strong-contrast"
                    type="text"
                    value={data.code}
                    disabled
                  />
                </div>
                <div className="w-1/2">
                  <h1 className="w-full text-strong-contrast text-md">
                    SKU (Stock Keeping Unit) :
                  </h1>
                  <input
                    className="w-full border border-strong-contrast bg-white p-2 text-strong-contrast"
                    type="text"
                    value={data.ref}
                    disabled
                  />
                </div>
              </div>
              <div className="w-full flex gap-5">
                <div className="w-1/2">
                  <h1 className="w-full text-strong-contrast text-md">Quantité :</h1>
                  <input
                    className="w-full border border-strong-contrast bg-white p-2 text-strong-contrast"
                    type="text"
                    value={data.quantity}
                    disabled
                  />
                </div>
                <div className="w-1/2">
                  <h1 className="w-full text-strong-contrast text-md">Min Quantité :</h1>
                  <input
                    className="w-full border border-strong-contrast bg-white p-2 text-strong-contrast"
                    type="text"
                    value={data.minQuantity}
                    disabled
                  />
                </div>
              </div>
              <h1 className="text-strong-contrast text-xl">Location : </h1>
              <table>
                <thead>
                  <tr className="text-left text-strong-contrast border-b border-strong-contrast">
                    <th>#</th>
                    <th className="py-4">Location</th>
                    <th>Incoming</th>
                    <th>Committed</th>
                    <th>Available</th>
                  </tr>
                </thead>
                <tbody>{renderLocation}</tbody>
              </table>
            </div>
            <div className="w-full flex flex-col gap-5 justify-between p-6 border border-highlight shadow-lg bg-gray-100">
              <h1 className="text-strong-contrast text-xl">Pricing : </h1>
              <div className="w-full flex gap-5">
                <div className="w-1/2">
                  <h1 className="w-full text-strong-contrast text-md">Prix de vente :</h1>
                  <input
                    className="w-full border border-strong-contrast bg-white p-2 text-strong-contrast"
                    type="text"
                    value={data.sellingPrice}
                    disabled
                  />
                </div>
                <div className="w-1/2">
                  <h1 className="w-full text-strong-contrast text-md">Prix d'achat :</h1>
                  <input
                    className="w-full border border-strong-contrast bg-white p-2 text-strong-contrast"
                    type="text"
                    value={data.buyingPrice}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="relative w-full flex flex-col justify-between p-6 border border-highlight shadow-lg bg-gray-100">
              <div className="w-full flex">
                <div className="w-10 flex justify-center border-l border-gray-200 dark:border-gray-700">
                  <label
                    tabIndex={0}
                    className="absolute left-1 top-5 btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img src="https://placeimg.com/80/80/people" />
                    </div>
                  </label>
                </div>
                <div className="w-full">
                  <div className="w-full">
                    <textarea
                      className="w-full rounded-lg p-5 bg-white resize-none"
                      cols="4"
                      rows="2"
                      placeholder="Comment ..."
                    ></textarea>
                    <div className="w-full flex items-center justify-end py-5">
                      <button className="bg-highlight p-2 rounded-md text-white font-sans text-sm">
                        Post a comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <TimelineContainer timelineData={data.comment} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedProduct;
