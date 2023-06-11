// TODO: Nouvelle Nominations Modal
// TODO: Toggle component rework
// Icons
import { AiOutlineDelete, AiOutlinePlus, AiOutlineSync, AiOutlineEdit } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
// Use
import { useState } from "react";
import { Link } from "react-router-dom";
// Components
import Calendar from "../components/Calendar";
import AppointmentStatus from "../components/AppointmentStatus";

// React
import React from "react"
import { Await } from "react-router-dom";
import AppLoading from "./AppLoading";
import { getDevis } from "../config/httpRequests";
import Table from "../components/Table";
import Toggle from "../components/Toggle";
import Button from "../components/Button";

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

const debugAppointments = [
  {
    "id": "05527",
    "firstName": "Antoinette",
    "lastName": "Porter",
    "date": "Oct 14, 2023",
    "status": "waiting",
    "location": "72 Cody Ridge Road"
  },
  {
    "id": "05526",
    "firstName": "Dale",
    "lastName": "Allison",
    "date": "Apr 22, 2023",
    "status": "scheduled",
    "location": "3447 Seltice Way"
  },
  {
    "id": "05525",
    "firstName": "Judith",
    "lastName": "Garrett",
    "date": "Sep 30, 2023",
    "status": "scheduled",
    "location": "830 Mayo Street"
  },
  {
    "id": "05524",
    "firstName": "Sonya",
    "lastName": "Daniels",
    "date": "Oct 02, 2023",
    "status": "scheduled",
    "location": "3218 Steele Street"
  },
  {
    "id": "05523",
    "firstName": "Michelle",
    "lastName": "Higgins",
    "date": "May 09, 2023",
    "status": "waiting",
    "location": "233 Sharon Lane"
  },
  {
    "id": "05522",
    "firstName": "Harriet",
    "lastName": "Bass",
    "date": "Nov 01, 2023",
    "status": "visited",
    "location": "2467 Oral Lake Road"
  },
  {
    "id": "05521",
    "firstName": "Maurice",
    "lastName": "Kelly",
    "date": "Apr 12, 2023",
    "status": "unknown",
    "location": "4573 Maple Court"
  },
  {
    "id": "05520",
    "firstName": "Steven",
    "lastName": "Hughes",
    "date": "Mar 29, 2023",
    "status": "scheduled",
    "location": "4167 Filbert Street"
  },
  {
    "id": "05519",
    "firstName": "Rodney",
    "lastName": "Sutton",
    "date": "Jul 25, 2023",
    "status": "waiting",
    "location": "4596 Central Avenue"
  },
  {
    "id": "05518",
    "firstName": "Amy",
    "lastName": "Potter",
    "date": "Oct 12, 2023",
    "status": "visited",
    "location": "3936 Fannie Street"
  }
]

const _Appointments = ({ appointments }) => {
  const [toggle, setToggle] = useState(false);
  const formatAppointmentToRow = ({ id, date, firstName, lastName, location, status }) => {
    const editLink = "/appointments/"+id;
    return [
      {
        contentType: "link",
        contentValue: {
          href: editLink,
          text: id,
        },
      },
      {
        contentType: "text",
        contentValue: date,
      },
      {
        contentType: "text",
        contentValue: [firstName, lastName].join(" "),
      },
      {
        contentType: "text",
        contentValue: "Shooting",
      },
      {
        contentType: "text",
        contentValue: location,
      },
      {
        contentType: "raw",
        contentValue: <AppointmentStatus status={status} />,
      },
      {
        className: "group relative pr-2",
        contentType: "wrapped",
        contentValue: [
          <SlOptionsVertical className="text-weak-contrast text-xl cursor-pointer" />,
          <div className="flex px-8 transition-all invisible opacity-0 bg-gray-100 absolute top-1/2 -translate-y-1/2 right-0 group-hover:visible group-hover:gap-2 group-hover:opacity-100 group-hover:right-[100%] ">
            <AiOutlineSync className="text-2xl cursor-pointer text-weak-contrast disabled:text-weak-contrast disabled" disabled />
            <Link to={editLink}>
              <AiOutlineEdit className="text-2xl cursor-pointer text-weak-contrast disabled:text-weak-contrast disabled" disabled />
            </Link>
            <AiOutlineDelete className="text-2xl cursor-pointer text-weak-contrast hover:text-red-600 disabled:text-weak-contrast" />
          </div>
        ]
      }
    ]
  };
  const appointmentsAsRows = appointments.map(formatAppointmentToRow);
  const headAsRow = ["REF.", "DATE", "CLIENT", "TYPE D'ÉVÉNEMENT", "LIEU", "STATUS"].map((label) => {
    return {
      contentType: "head",
      contentValue: label,
    }
  });

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 bg-secondary text-strong-contrast">
      <div className="w-full flex justify-between items-center gap-4">
        <h1 className="text-lg font-semibold font-asap text-weak-contrast pl-4">NOMINATIONS</h1>
        <div className="flex gap-4">
          <Button Icon={<AiOutlinePlus />} textContent="Nouvelle nomination" />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <div className="form-control w-fit">
          <label className="cursor-pointer label font-semibold flex gap-4 items-center">
            <span className="label-text text-strong-contrast text-sm">Table</span>
            <Toggle id="SwitchMode" state={toggle} onChange={({target: { checked }}) => setToggle(() => checked)} />
            <span className="label-text text-strong-contrast text-sm">Calendrier</span>
          </label>
        </div>
      </div>
      {toggle ? (
        <div className="w-full px-4 rounded-md">
          <div className="w-full flex justify-between items-center">
            <h1 className="mb-5 text-weak-contrast text-2xl font-semibold">
              Jan 2023
            </h1>
          </div>
          <Calendar data={calendar} />
        </div>
      ) : (
        <div className="w-full font-asap">
          <div className="w-full flex justify-between items-center">
            <h1 className="pl-4 text-weak-contrast font-semibold">Prochains <span className="text-highlight">rendez-vous</span></h1>
          </div>
          <Table head={headAsRow} rows={appointmentsAsRows} />
        </div>
      )}
    </div>
  );
};

async function loadAppointments() {
  return await new Promise((resolve, reject) => {
    resolve(debugAppointments)
  });
}

// /** @param {{pagesCount: number, devis: {id: number, customerId: number, title: string, createdAt: string, services: any[], stock: any[], packages: any[]}[]}} appointments */
function createAppointments(appointments) {
  return <_Appointments appointments={appointments} />
}

const Appointments = () => {
  return (
    <React.Suspense fallback={<AppLoading />}>
      <Await resolve={loadAppointments()} children={createAppointments} />
    </React.Suspense>
  );
}

export default Appointments;
