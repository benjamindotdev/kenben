import { useItems } from "@/context/ItemsContext";
import MiniButton from "./MiniButton";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

type ContentButtonsProps = {
  itemId: string;
  status?: string;
};

const ContentButtons: React.FC<ContentButtonsProps> = ({ itemId, status }) => {
  const { items, setItems } = useItems();
  const filteredItems = items.filter((item) => item.id !== itemId);
  const itemToUpdate = items.find((item) => item.id === itemId);
  const navigate = useNavigate();
  const handleDone = () => {
    if (itemToUpdate) {
      const updatedItem = {
        ...itemToUpdate,
        status: "Done",
        dueDate: new Date().toDateString(),
      };
      setItems([...filteredItems, updatedItem]);
      navigate(`/done`);
    }
  };
  const handleDelete = () => {
    setItems(filteredItems);
    navigate(`/`);
  };
  const handleEdit = () => {
    itemToUpdate && navigate(`/${itemToUpdate.status}/${itemId}/edit`);
  };

  const handleBacklog = () => {
    if (itemToUpdate) {
      const updatedItem = {
        ...itemToUpdate,
        status: "Backlog",
        dueDate: new Date().toDateString(),
      };
      setItems([...filteredItems, updatedItem]);
      navigate(`/backlog`);
    }
  };
  return (
    <div className="flex flex-row justify-between ">
      <Button
        onClick={handleDone}
        disabled={status === "Done"}
        className="flex flex-row gap-2 w-[23%] hover:text-pink-400 transition-all ease-in-out duration-300"
      >
        Done
        <MiniButton type="Done" />
      </Button>

      <Button
        onClick={handleDelete}
        disabled={status === "Done"}
        className="flex flex-row gap-2 w-[23%] hover:text-red-600 transition-all ease-in-out duration-300"
      >
        Delete
        <MiniButton type="Delete" />
      </Button>
      <Button
        onClick={handleEdit}
        className="flex flex-row gap-2 w-[23%] hover:text-pink-400 transition-all ease-in-out duration-300"
      >
        Edit
        <MiniButton type="Edit" />
      </Button>
      <Button
        onClick={handleBacklog}
        disabled={status === "Backlog" || status === "Done"}
        className="flex flex-row gap-2 w-[23%] hover:text-pink-400 transition-all ease-in-out duration-300"
      >
        Backlog
        <MiniButton type="Backlog" />
      </Button>
    </div>
  );
};

export default ContentButtons;
