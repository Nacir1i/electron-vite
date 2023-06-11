import TimelineItem from "./TimelineItem";

const TimelineContainer = ({ timelineData }) => {
  const renderItems = timelineData.map((data) => (
    <TimelineItem key={Math.random() * 100} data={data} />
  ));
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      {renderItems}
    </ol>
  );
};

export default TimelineContainer;
