const weekNames = [
  {
    name: "Sun",
  },
  {
    name: "Mon",
  },
  {
    name: "Tue",
  },
  {
    name: "Wed",
  },
  {
    name: "Thu",
  },
  {
    name: "Fri",
  },
  {
    name: "Sat",
  },
];

const renderItems = (items) => {
  return items.map((field) => (
    <div
      key={Math.random() * 100}
      className={`w-full text-center ${
        field.type === "appointment" ? "bg-green-200/60" : "bg-yellow-200/60"
      } `}
    >
      <p>{field.type}</p>
    </div>
  ));
};

const renderWeek = weekNames.map((field) => (
  <div
    key={Math.random() * 100}
    className="w-full h-14 flex justify-center items-center bg-white border"
  >
    <p className="text-xl font-semibold text-gray-400">{field.name}</p>
  </div>
));

const Calendar = ({ data }) => {
  const renderCell = data.map((cell) => {
    if (cell) {
      return (
        <div
          key={Math.random() * 100}
          className="relative h-32 flex flex-col gap-1 justify-center items-center bg-white border p-3"
        >
          <h1 className="absolute top-2 left-2 text-weak-contrast text-lg">
            {cell.index}
          </h1>
          {renderItems(cell.data)}
        </div>
      );
    }
    return (
      <div
        key={Math.random() * 100}
        className="bg-gray-100 h-32 border"
      ></div>
    );
  });

  return (
    <div className="w-full grid grid-rows-7 grid-cols-7 border">
      {renderWeek}
      {renderCell}
    </div>
  );
};

export default Calendar;
