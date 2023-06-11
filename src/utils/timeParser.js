export const getTime = (string) => {
  const date = new Date(string);
  const formatDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return formatDate;
};

export const getDateDifference = (string) => {
  const selectedDate = new Date(string);
  const currentDate = new Date();

  return (
    (currentDate.getFullYear() - selectedDate.getFullYear()) * 12 +
    (currentDate.getMonth() - selectedDate.getMonth())
  );
};
