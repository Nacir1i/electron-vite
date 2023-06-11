import Card from "../../components/Card"
import { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";

const EditGeneral = () => {
  return (
    <Card>
      <div className="flex flex-col gap-2">
        <h1 className="text-highlight font-semibold font-asap">Title</h1>
        <input type="text" className="p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-open-sans" placeholder="Type in the order title..." />
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-gray-800 font-semibold font-asap">Devis N°</h1>
          <input type="text" className="p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-open-sans" placeholder="Type in the order title..." />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-gray-800 font-semibold font-asap">Status</h1>
          <input type="text" className="p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-open-sans" placeholder="Type in the order title..." />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-gray-800 font-semibold font-asap">Event Type</h1>
          <input type="text" className="p-2 bg-weakest-contrast rounded-xl text-sm text-strong-contrast font-open-sans" placeholder="Type in the order title..." />
        </div>
      </div>
    </Card>
  );
}

const DevisDetails = ({ details }) => {
  if (!details) details = [];
  const generateRows = details.map(({ total, material, quantity, ref }) => {
    return (
      <tr key={ref} className="text-strong-contrast font-open-sans text-sm font-bold">
        <td>{material}</td>
        <td>{ref}</td>
        <td>{quantity}</td>
        <td className="text-right">MAD {total.toFixed(2)}</td>
      </tr>
    )
  });
  const subtotal = details.reduce((prev, a) => prev + a.total, 0);
  const discount = 0;
  const shipping = 0;
  const tax = 0;
  const total = subtotal + discount + shipping + tax;
  return (
    <Card>
      <div className="flex gap-4 items-center">
        <h1 className="text-highlight font-semibold font-asap">Devis Details</h1>
        <button className="ml-auto text-gray-800">Import Devis</button>
        <button className="px-8 py-2 bg-highlight text-gray-100 rounded-lg text-sm hover:bg-highlight">Add item</button>
      </div>
      <hr className="m-0 p-0" />
      <table className="border-separate border-spacing-y-2 px-4">
        <thead>
          <tr className="text-highlight font-asap font-bold text-base">
            <td>MATERIAL</td>
            <td>REF.</td>
            <td>QUANTITY</td>
            <td className="text-right">TOTAL</td>
          </tr>
        </thead>
        <tbody>
          {generateRows}
        </tbody>
      </table>
      <hr className="m-0 p-0" />
      <h1 className="text-highlight font-semibold font-asap">Extra Options</h1>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-strong-contrast font-asap font-medium">Subtotal</h1>
          <h4 className="text-gray-700 font-open-sans text-sm font-bold">MAD {subtotal.toFixed(2)}</h4>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-highlight font-asap font-medium">Add Discount</h1>
          <h4 className="text-gray-700 font-open-sans text-sm font-bold">MAD {discount.toFixed(2)}</h4>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-highlight font-asap font-medium">Add Shipping</h1>
          <h4 className="text-gray-700 font-open-sans text-sm font-bold">MAD {shipping.toFixed(2)}</h4>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-highlight font-asap font-medium">Estimated Tax</h1>
          <h4 className="text-weak-contrast font-open-sans text-sm font-medium mr-auto ml-8">Not Calculated</h4>
          <h4 className="text-gray-700 font-open-sans text-sm font-bold">MAD {tax.toFixed(2)}</h4>
        </div>
      </div>
      <div className="flex justify-between items-center pr-4">
        <h1 className="text-highlight font-asap font-medium">Total</h1>
        <h4 className="text-gray-700 font-open-sans text-sm font-bold">MAD {total.toFixed(2)}</h4>
      </div>
    </Card>
  );
}

const ClientDetails = ({ client }) => {
  const format_client = (_client) => {
    return Object.keys(_client).map((label) => {
      return { label, content: _client[label] }
    })
  }
  const generateDetails = (_client) => format_client(_client).map(({ label, content }, index) => {
    return (
      <div key={index} className="w-full flex gap-2">
        <h1 className="flex-1 text-gray-800 font-semibold">{label.charAt(0).toUpperCase() + label.slice(1)}</h1>
        <h1 className="flex-[3_3_0%] text-weak-contrast font-medium text-left">{content}</h1>
      </div>
    )
  });
  const [ellipsisOpen, setEllipsisOpen] = useState(false);
  const toggleEllipsisOpen = () => setEllipsisOpen((prev) => !prev);
  return (
    <Card>
      <div className="flex justify-between items-center relative">
        <h1 className="text-highlight font-semibold font-asap">Client Details</h1>
        <button className="text-gray-800 text-2xl" onClick={toggleEllipsisOpen}>
          <AiOutlineEllipsis />
        </button>
        {
          ellipsisOpen ? (
            <div className="absolute top-full right-0 z-10 bg-secondary border border-weakest-contrast/25 shadow-lg rounded-lg w-fit h-fit min-w-[75%]">
              <div className="flex flex-col py-2">
                <h1 className="px-4 py-2 text-highlight font-semibold font-asap">Edit Customer Details</h1>
                <hr className="border-weakest-contrast"/>
                <h2 className="px-4 py-2 font-asap font-medium cursor-pointer text-gray-800 hover:bg-weak-contrast/40">Edit Delivery Addresse</h2>
                <h2 className="px-4 py-2 font-asap font-medium cursor-pointer text-gray-800 hover:bg-weak-contrast/40">Edit Billing Addresse</h2>
                <h2 className="px-4 py-2 font-asap font-medium cursor-pointer text-red-600 hover:bg-weak-contrast/40">Remove Customer</h2>
              </div>
            </div>
          ) : ""
        }
      </div>
      <div className="flex flex-col gap-2">
        {generateDetails(client)}
      </div>
    </Card>
  )
}

const NoteDisplay = () => {
  return (
    <Card>
      <h1 className="text-highlight font-semibold font-asap">Notes</h1>
      <textarea className="w-full h-fit min-h-8 bg-secondary resize-none p-2" placeholder="Add a note..."></textarea>
    </Card>
  )
}

const CreateDevis = () => {
  const devis_data = {
    client: {
      title: "Mr",
      contact: "clay_ali@yahoo.us.com",
      name: "Mohamed Ali Clay",
      phone: "+212 644-610548",
      address: "Rue Tamada, Hay Adrar, Agadir",
      type: "Individual",
    },
    details: [
      {
        "material": "le Monolithe de Relance",
        "quantity": 12,
        "ref": "BOI2695",
        "total": 132.81912246532443
      },
      {
        "material": "le Diadème de Destruction",
        "quantity": 6,
        "ref": "SAL5224",
        "total": 181.1316497455424
      },
      {
        "material": "le Cube de Magie Noire",
        "quantity": 8,
        "ref": "SAL4486",
        "total": 390.26034411255307
      }
    ]
  }
  return (
    <div className="w-full h-full bg-primary flex flex-col gap-4 p-4 font-open-sans">
      <div className="flex flex-col gap-2 justify-start">
        <h1 className="text-xl text-highlight font-asap font-semibold">CRÉER UN NOUVEAU DEVIS</h1>
        <h4 className="text-sm text-weak-contrast font-open-sans font-semibold">Créez un nouveau devis, et envoyez le par e-mail ou par impression.</h4>
      </div>
      <div className="w-full flex gap-4 font-open-sans flex-1">
        <div className="w-2/3 h-full flex flex-col gap-4">
          <EditGeneral />
          <DevisDetails details={devis_data.details} />
        </div>
        <div className="w-1/3 h-full flex flex-col gap-4">
          <ClientDetails client={devis_data.client} />
          <NoteDisplay />
        </div>
      </div>
    </div>
  );
}

export default CreateDevis;