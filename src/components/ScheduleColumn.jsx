export default function ScheduleColumn(props) {
  let scheduleElements;
  if (props.plans) {
    scheduleElements = props.plans.map((plan) => {
      return (
        <article className="schedule__element" key={plan.title}>
          {/* <p className="schedule__element__time">{plan.time}</p> */}
          <p className="schedule__element__title">{plan.title}</p>
          <button className="schedule__element__remove">—</button>
        </article>
      );
    });
  }
  return (
    <div className="schedule__column">
      <p className="schedule__column__title">{props.day}</p>
      <div className="schedule__column__grid">{scheduleElements}</div>
    </div>
  );
}
