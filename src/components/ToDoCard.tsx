type ToDo = {
  title: string;
  description: string;
  assignee: string;
  status: string;
  priority: string;
  createdDate: string;
  dueDate: string;
};

const ToDoCard = ({
  title,
  description,
  assignee,
  status,
  priority,
  createdDate,
  dueDate,
}: ToDo) => {
  return (
    <div className="toDoCard">
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{assignee}</p>
      <p>{status}</p>
      <p>{priority}</p>
      <p>{createdDate}</p>
      <p>{dueDate}</p>
    </div>
  );
};

export default ToDoCard;
