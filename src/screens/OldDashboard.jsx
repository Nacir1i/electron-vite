import { useId } from "react";
import { AiOutlineCheck, AiOutlineExport, AiOutlineClose } from "react-icons/ai";

import EventContainer from "../components/EventContainer";

const informationData = [
  {
    title: "Revenue",
    date: "Jan 1, 2022 - Jan 3, 2023",
    information: "22500.00",
    suffix: "MAD",
    highlight: false,
  },
  {
    title: "Expenses",
    date: "Jan 1, 2022 - Jan 3, 2023",
    information: "4500.00",
    suffix: "MAD",
    highlight: false,
  },
  {
    title: "Profit",
    date: "Jan 1, 2022 - Jan 3, 2023",
    information: "18000.00",
    suffix: "MAD",
    highlight: false,
  },
  {
    title: "Solde impayé",
    date: "Jan 1, 2022 - Jan 3, 2023",
    information: "22500.00",
    suffix: "MAD",
    highlight: false,
  },
  {
    title: "Avance versée",
    date: "Jan 1, 2022 - Jan 3, 2023",
    information: "4500.00",
    suffix: "MAD",
    highlight: true,
  },
  {
    title: "Le rest",
    date: "Jan 1, 2022 - Jan 3, 2023",
    information: "18000.00",
    suffix: "MAD",
    highlight: true,
  },
];

const charges = [
  {
    date: "2/11/2022",
    designation: "Location de bureau",
    prix: 6000,
    payed: true,
  },
  {
    date: "2/11/2022",
    designation: "Location de stock",
    prix: 5000,
    payed: true,
  },
  {
    date: "3/11/2022",
    designation: "Salaires",
    prix: 16000,
    payed: false,
  },
  {
    date: "4/11/2022",
    designation: "electricite",
    prix: 4000,
    payed: false,
  },
];

const events = [
  {
    date: "Monday, Mar 4, 2023",
    startTime: "12am",
    endTime: "2pm",
    type: "appointment",
    title: "Mariage Souad x Elhabib",
    address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
    address2: "Agadir 80000",
  },
  {
    date: "Monday, Mar 4, 2023",
    startTime: "2pm",
    endTime: "3pm",
    type: "event",
    title: "Birthday Khadija",
    address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
    address2: "Agadir 80000",
  },
  {
    date: "Monday, Mar 4, 2023",
    startTime: "4pm",
    endTime: "7pm",
    type: "custom",
    title: "Event Mawazine 2023",
    address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
    address2: "Agadir 80000",
  },
];

const calendar = [
  null,
  null,
  null,
  null,
  {
    index: 1,
    day: "Saturday",
    date: "10-01-2022",
    data: [
      {
        date: "Monday, Mar 4, 2023",
        startTime: "12am",
        endTime: "2pm",
        type: "appointment",
        title: "Mariage Souad x Elhabib",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
    ],
  },
  {
    index: 2,
    day: "Sunday",
    date: "10-02-2022",
    data: [
      {
        date: "Monday, Mar 4, 2023",
        startTime: "2pm",
        endTime: "3pm",
        type: "event",
        title: "Birthday Khadija",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
    ],
  },
  {
    index: 3,
    day: "Monday",
    date: "10-03-2022",
    data: [
      {
        date: "Monday, Mar 4, 2023",
        startTime: "12am",
        endTime: "2pm",
        type: "appointment",
        title: "Mariage Souad x Elhabib",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
      {
        date: "Monday, Mar 4, 2023",
        startTime: "2pm",
        endTime: "3pm",
        type: "event",
        title: "Birthday Khadija",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
    ],
  },
  {
    index: 4,
    day: "Sunday",
    date: "10-02-2022",
    data: [],
  },
  {
    index: 5,
    day: "Monday",
    date: "10-03-2022",
    data: [
      {
        date: "Monday, Mar 4, 2023",
        startTime: "12am",
        endTime: "2pm",
        type: "appointment",
        title: "Mariage Souad x Elhabib",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
      {
        date: "Monday, Mar 4, 2023",
        startTime: "2pm",
        endTime: "3pm",
        type: "event",
        title: "Birthday Khadija",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
      {
        date: "Monday, Mar 4, 2023",
        startTime: "2pm",
        endTime: "3pm",
        type: "event",
        title: "Birthday Khadija",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
    ],
  },
  {
    index: 6,
    day: "Tuesday",
    date: "10-04-2022",
    data: [],
  },
  {
    index: 7,
    day: "Wednesday",
    date: "10-05-2022",
    data: [
      {
        date: "Monday, Mar 4, 2023",
        startTime: "2pm",
        endTime: "3pm",
        type: "event",
        title: "Birthday Khadija",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
    ],
  },
  {
    index: 8,
    day: "Thursday",
    date: "10-06-2022",
    data: [],
  },
  {
    index: 9,
    day: "Friday",
    date: "10-07-2022",
    data: [
      {
        date: "Monday, Mar 4, 2023",
        startTime: "12am",
        endTime: "2pm",
        type: "appointment",
        title: "Mariage Souad x Elhabib",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
      {
        date: "Monday, Mar 4, 2023",
        startTime: "2pm",
        endTime: "3pm",
        type: "event",
        title: "Birthday Khadija",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
      {
        date: "Monday, Mar 4, 2023",
        startTime: "12am",
        endTime: "2pm",
        type: "appointment",
        title: "Mariage Souad x Elhabib",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
      {
        date: "Monday, Mar 4, 2023",
        startTime: "2pm",
        endTime: "3pm",
        type: "event",
        title: "Birthday Khadija",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
    ],
  },
  {
    index: 10,
    day: "Saturday",
    date: "10-08-2022",
    data: [],
  },
  {
    index: 11,
    day: "Sunday",
    date: "10-09-2022",
    data: [],
  },
  {
    index: 12,
    day: "Monday",
    date: "10-10-2022",
    data: [],
  },
  {
    index: 13,
    day: "Tuesday",
    date: "10-11-2022",
    data: [
      {
        date: "Monday, Mar 4, 2023",
        startTime: "12am",
        endTime: "2pm",
        type: "appointment",
        title: "Mariage Souad x Elhabib",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
      {
        date: "Monday, Mar 4, 2023",
        startTime: "2pm",
        endTime: "3pm",
        type: "event",
        title: "Birthday Khadija",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
    ],
  },
  {
    index: 14,
    day: "Wednesday",
    date: "10-12-2022",
    data: [
      {
        date: "Monday, Mar 4, 2023",
        startTime: "12am",
        endTime: "2pm",
        type: "appointment",
        title: "Mariage Souad x Elhabib",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
      {
        date: "Monday, Mar 4, 2023",
        startTime: "2pm",
        endTime: "3pm",
        type: "event",
        title: "Birthday Khadija",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
    ],
  },
  {
    index: 15,
    day: "Thursday",
    date: "10-13-2022",
    data: [],
  },
  {
    index: 16,
    day: "Friday",
    date: "10-14-2022",
    data: [
      {
        date: "Monday, Mar 4, 2023",
        startTime: "2pm",
        endTime: "3pm",
        type: "event",
        title: "Birthday Khadija",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
    ],
  },
  {
    index: 17,
    day: "Saturday",
    date: "10-15-2022",
    data: [],
  },
  {
    index: 18,
    day: "Sunday",
    date: "10-16-2022",
    data: [],
  },
  {
    index: 19,
    day: "Monday",
    date: "10-17-2022",
    data: [],
  },
  {
    index: 20,
    day: "Tuesday",
    date: "10-18-2022",
    data: [
      {
        date: "Monday, Mar 4, 2023",
        startTime: "12am",
        endTime: "2pm",
        type: "appointment",
        title: "Mariage Souad x Elhabib",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
      {
        date: "Monday, Mar 4, 2023",
        startTime: "2pm",
        endTime: "3pm",
        type: "event",
        title: "Birthday Khadija",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
    ],
  },
  {
    index: 21,
    day: "Wednesday",
    date: "10-19-2022",
    data: [
      {
        date: "Monday, Mar 4, 2023",
        startTime: "12am",
        endTime: "2pm",
        type: "appointment",
        title: "Mariage Souad x Elhabib",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
    ],
  },
  {
    index: 22,
    day: "Thursday",
    date: "10-20-2022",
    data: [
      {
        date: "Monday, Mar 4, 2023",
        startTime: "2pm",
        endTime: "3pm",
        type: "event",
        title: "Birthday Khadija",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
    ],
  },
  {
    index: 23,
    day: "Friday",
    date: "10-21-2022",
    data: [],
  },
  {
    index: 24,
    day: "Saturday",
    date: "10-22-2022",
    data: [],
  },
  {
    index: 25,
    day: "Sunday",
    date: "10-23-2022",
    data: [
      {
        date: "Monday, Mar 4, 2023",
        startTime: "2pm",
        endTime: "3pm",
        type: "event",
        title: "Birthday Khadija",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
    ],
  },
  {
    index: 26,
    day: "Monday",
    date: "10-24-2022",
    data: [
      {
        date: "Monday, Mar 4, 2023",
        startTime: "12am",
        endTime: "2pm",
        type: "appointment",
        title: "Mariage Souad x Elhabib",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
    ],
  },
  {
    index: 27,
    day: "Tuesday",
    date: "10-25-2022",
    data: [
      {
        date: "Monday, Mar 4, 2023",
        startTime: "12am",
        endTime: "2pm",
        type: "appointment",
        title: "Mariage Souad x Elhabib",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
      {
        date: "Monday, Mar 4, 2023",
        startTime: "2pm",
        endTime: "3pm",
        type: "event",
        title: "Birthday Khadija",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
      {
        date: "Monday, Mar 4, 2023",
        startTime: "2pm",
        endTime: "3pm",
        type: "event",
        title: "Birthday Khadija",
        address: "EL HOUDAIGUI, N° 46 AV ABDERRAHMEN",
        address2: "Agadir 80000",
      },
    ],
  },
  {
    index: 28,
    day: "Wednesday",
    date: "10-26-2022",
    data: [],
  },
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

const renderTable = charges.map((charge) => (
  <tr key={Math.random() * 100}>
    <td className="p-3 px-5">{charge.date}</td>
    <td>{charge.designation}</td>
    <td>{charge.prix}</td>
    <td>{charge.payed ? <AiOutlineCheck /> : <AiOutlineClose />}</td>
  </tr>
));

const renderEvents = events.map((event, index) => {
  return (
    <EventContainer data={event} key={index} />
  )
});

const OperationCard = ({ title, information, highlight, suffix }) => {
  const gen_className = (highlight) => {
    return highlight ? "font-bold text-xl text-highlight" : "font-bold text-xl text-strong-contrast";
  }
  return (
    <div className="w-48 flex flex-col justify-between gap-2 p-4 font-open-sans">
      <h1 className="text-gray-500 font-medium text-base">{title}</h1>
      <h1 className={gen_className(highlight)}>
        <span>{information}</span>
        <span className="text-base pl-1">{suffix}</span>
      </h1>
    </div>
  )
}

const Dashboard = () => {
  const operation_cards = informationData.map(({ title, information, suffix, highlight }, index) => {
    return (<OperationCard title={title} information={information} highlight={highlight} suffix={suffix} key={index} />)
  });
  const FicheChargeFix = () => {
    const table_body = charges.map(({date, designation, prix, payed}, index) => {
      return (
        <tr key={index}>
          <td className="px-4">{date}</td>
          <td>{designation}</td>
          <td>{prix}</td>
          <td>{payed ? <AiOutlineCheck /> : <AiOutlineClose />}</td>
        </tr>
      )
    });
    return (
      <table className="mt-2 border-separate border-spacing-x-0 border-spacing-y-4">
        <thead>
          <tr className="text-left text-highlight">
            <th className="p-2 px-4 border-t border-b border-l border-highlight rounded-l-3xl">DATE</th>
            <th className="border-t border-b border-highlight">DESIGNIATION</th>
            <th className="border-t border-b border-highlight">PRIX</th>
            <th className="border-t border-b border-r border-highlight rounded-r-3xl">PAYÉ</th>
          </tr>
        </thead>
        <tbody className="mt-16">
          {table_body}
        </tbody>
      </table>
    )
  }
  return (
    <div className="w-full h-full p-5 py-8 flex flex-col gap-2 bg-gray-100 text-strong-contrast">
      <h1 className="text-xl text-weak-contrast font-semibold font-asap">VUE D'ENSEMBLE D'OPERATION</h1>
      <div className="w-full flex flex-1 flex-col gap-10">
        <div className="w-full flex flex-1 gap-10">
          <div className="w-2/3 flex flex-col h-full">
            <div className="w-full flex flex-wrap gap-x-4 gap-y-8 mb-auto">
              {operation_cards}
            </div>
            <h1 className="text-xl text-weak-contrast font-semibold font-asap">
              LA FICHE DES CHARGE FIX :
            </h1>
            <FicheChargeFix />
          </div>
          <div className="w-1/3 flex flex-col h-full">
            <div className="w-full flex flex-col gap-4 p-4 bg-gray-100 h-full">
              <div className="w-full flex justify-between">
                <h1 className="text-xl text-highlight font-asap font-semibold">Les prochaines rendez-vous</h1>
                <AiOutlineExport className="text-xl " />
              </div>
              <p className="text-sm">Don't miss scheduled events</p>
              {renderEvents}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
