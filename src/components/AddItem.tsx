import { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Item } from "@/types/Item";

type AddItemProps = {
  type: "To Do" | "In Progress" | "Done" | "Backlog";
  state: Item[];
  setState: React.Dispatch<React.SetStateAction<Item[]>>;
};

const AddItem: React.FC<AddItemProps> = ({ type, state, setState }) => {
  const [show, setShow] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [assignee, setAssignee] = useState<string>("You");
  const [status, setStatus] = useState<string>(type);
  const [priority, setPriority] = useState<string>("");
  const [createdDate, setCreatedDate] = useState<string>(
    `${new Date().toDateString()}`
  );
  const [dueDate, setDueDate] = useState<string>("");
  const handleReset = () => {
    setTitle("");
    setDescription("");
    setAssignee("You");
    setStatus(type);
    setPriority("");
    setCreatedDate(`${new Date().toDateString()}`);
    setDueDate("");
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState([...state]);
    handleReset();
    setShow(false);
  };
  return (
    <>
      {show ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="p-2 rounded-xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            className="p-2 rounded-xl"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p>Assignee: {assignee}</p>
          <p>Status: {status}</p>
          <p>Priority: {priority}</p>
          <select title="priority">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <p>{createdDate}</p>
          <input
            placeholder="Date"
            defaultValue={new Date().getDate() + 1}
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      ) : (
        <span
          className="p-2 rounded-xl cursor-pointer opacity-50 hover:opacity-100"
          onClick={() => setShow(true)}
        >
          <Plus size={16} />
        </span>
      )}
    </>
  );
};

export default AddItem;
