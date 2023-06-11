import Card from "../../components/Card"

const EditGeneral = () => {
  return (
    <Card>
      <div className="flex flex-col gap-2">
        <h1 className="text-highlight font-semibold font-asap">Order Title</h1>
        <input type="text" className="w-full bg-secondary border border-highlight rounded-[4px] py-1 px-2 text-sm" placeholder="Type in the order title..." />
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-gray-800 font-semibold font-asap">Bon Command N°</h1>
          <input type="text" className="w-full bg-secondary border border-highlight rounded-[4px] py-1 px-2 text-sm" placeholder="Type in the order title..." />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-gray-800 font-semibold font-asap">Status</h1>
          <input type="text" className="w-full bg-secondary border border-highlight rounded-[4px] py-1 px-2 text-sm" placeholder="Type in the order title..." />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-gray-800 font-semibold font-asap">Event Type</h1>
          <input type="text" className="w-full bg-secondary border border-highlight rounded-[4px] py-1 px-2 text-sm" placeholder="Type in the order title..." />
        </div>
      </div>
    </Card>
  );
}

const OrderDetails = ({ details }) => {
  if (!details) details = [];
  const generateRows = details.map(({ total, material, quantity, ref }) => {
    return (
      <tr key={ref} className="text-gray-700 font-open-sans text-sm font-bold">
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
        <h1 className="text-highlight font-semibold font-asap">Order Details</h1>
        <button className="ml-auto text-gray-800">Import Order</button>
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
  return (
    <Card>
      <div className="flex justify-between items-center">
        <h1 className="text-highlight font-semibold font-asap">Client Details</h1>
        <button className="text-highlight font-bold text-sm font-open-sans">EDIT</button>
      </div>
      <div className="flex flex-col gap-2">
        {generateDetails(client)}
      </div>
    </Card>
  )
}

const EditDelivery = () => {
  return (
    <Card>
      <h1 className="text-highlight font-semibold font-asap">Delivery Date</h1>
      <div className="flex gap-2">
        <h1 className="flex-1 text-gray-800 font-medium font-asap">Created at</h1>
        <input type="date" className="bg-secondary border border-highlight rounded-[4px] py-1 px-2 text-sm" placeholder="Select the date..." />
      </div>
      <div className="flex gap-2">
        <h1 className="flex-1 text-gray-800 font-medium font-asap">Due at</h1>
        <input type="date" className="bg-secondary border border-highlight rounded-[4px] py-1 px-2 text-sm" placeholder="Select the date..." />
      </div>
    </Card>
  )
}

const PaymentDetails = () => {
  return (
    <Card>
      <h1 className="text-highlight font-semibold font-asap">Payment</h1>
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-800 font-medium font-asap">Payment Method</h1>
        <input type="text" className="bg-secondary border border-highlight rounded-[4px] py-1 px-2 text-sm" placeholder="Espece ?" />
      </div>
      <div className="inline-flex w-full">
        <div className="flex flex-col w-1/2 gap-2 pr-1">
          <h1 className="text-gray-800 font-medium font-asap">Paid</h1>
          <div className="relative">
            <input type="number" className="bg-secondary max-w-[100%] border border-highlight rounded-[4px] py-1 px-2 pr-16 text-sm" placeholder="Coût..." />
            <span className="absolute top-1/2 -translate-y-1/2 right-2 font-open-sans text-gray-800 font-bold">MAD</span>
          </div>
        </div>
        <div className="flex flex-col w-1/2 gap-2 pl-1">
          <h1 className="text-gray-800 font-medium font-asap">Rest</h1>
          <div className="relative">
            <input type="number" className="bg-secondary max-w-[100%] border border-highlight rounded-[4px] py-1 px-2 pr-16 text-sm" placeholder="Coût..." />
            <span className="absolute top-1/2 -translate-y-1/2 right-2 font-open-sans text-gray-800 font-bold">MAD</span>
          </div>
        </div>
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

const CreateOrder = () => {
  const order_data = {
    client: {
      name: "Mohamed Ali Clay",
      phone: "+212 644-610548",
      address: "Rue Tamada, Hay Adrar, Agadir",
      type: "Individual",
    },
    details: [
      {
        "material": "la Corne du Gardien",
        "quantity": 15,
        "ref": "JAT7887",
        "total": 184.90525509821433
      },
      {
        "material": "la Lettre de l'Ange",
        "quantity": 15,
        "ref": "IKH8913",
        "total": 267.72684415703964
      },
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
      },
      {
        "material": "la Clé de Souhaits",
        "quantity": 13,
        "ref": "IKH0641",
        "total": 98.11243773015343
      },
      {
        "material": "la Gemme de Captivation",
        "quantity": 1,
        "ref": "BOI4842",
        "total": 372.04095816924706
      },
      {
        "material": "la Plaque de Pourriture",
        "quantity": 4,
        "ref": "SAL6921",
        "total": 213.84759963352207
      },
      {
        "material": "l'Épée de Résolutions",
        "quantity": 8,
        "ref": "SAL2718",
        "total": 49.026983489010874
      },
      {
        "material": "la Bague d'Illusion",
        "quantity": 10,
        "ref": "SAL4870",
        "total": 250.1558312057313
      }
    ]
  }
  return (
    <div className="w-full h-full bg-primary flex flex-col gap-4 p-4 font-open-sans">
      <div className="flex flex-col gap-2 justify-start">
        <h1 className="text-xl text-highlight font-asap font-semibold">CRÉER UN NOUVEAU BON DE COMMANDE</h1>
        <h4 className="text-sm text-weak-contrast font-open-sans font-semibold">Créez un nouveau bon de commande, et envoyez le par e-mail ou par impression.</h4>
      </div>
      <div className="w-full flex gap-4 font-open-sans flex-1">
        <div className="w-2/3 h-full flex flex-col gap-4">
          <EditGeneral />
          <OrderDetails details={order_data.details.slice(6)} />
        </div>
        <div className="w-1/3 h-full flex flex-col gap-4">
          <ClientDetails client={order_data.client} />
          <EditDelivery />
          <PaymentDetails />
          <NoteDisplay />
        </div>
      </div>
    </div>
  );
}

export default CreateOrder;