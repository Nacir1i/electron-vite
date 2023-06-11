import Button from "../components/Button";
import Calendar from "../components/Calendar";
import TemplateList from "../components/templates/TemplateList";

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
]

const AppointmentsCalendar = () => {
  const components = {
    Informations: () => <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <h1 className="font-asap font-semibold text-lg text-weak-contrast">NOMINATIONS</h1>
          <p className="text-weak-contrast font-roboto text-sm">Créez une nomination, et envoyez-le au client par E-mail ou par impression.</p>
        </div>
        <Button to="/appointments/new" textContent="Ajoutez une nomination" />
      </div>
      <h4 className="text-weak-contrast text-sm font-roboto font-semibold">Prochaines <span className="text-highlight font-inter">Nominations</span></h4>
    </div>,
    Table: () => <Calendar data={calendar} />
  }
  return <TemplateList components={components} />
}

export default AppointmentsCalendar;