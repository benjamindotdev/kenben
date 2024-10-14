import { useItems } from "@/context/ItemsContext";
import MiniButton from "./MiniButton";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

type ContentButtonsProps = {
  itemId: string;
  status?: string;
};

const ContentButtons: React.FC<ContentButtonsProps> = ({ itemId, status }) => {
  const { state, dispatch } = useItems();
  const { items } = state;
  const item = items.find((item) => item.id === itemId);
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
      dispatch({ type: "SET_ITEMS", payload: [...filteredItems, updatedItem] });
      navigate(`/done`);
    }
  };
  const handleDelete = () => {
    dispatch({ type: "SET_ITEMS", payload: filteredItems });
    navigate(`/`);
  };
  const handleEdit = () => {
    itemToUpdate &&
      navigate(
        `/${itemToUpdate.status.toLowerCase().replace(" ", "")}/${itemId}/edit`
      );
  };

  const handleBacklog = () => {
    if (itemToUpdate) {
      const updatedItem = {
        ...itemToUpdate,
        status: "Backlog",
        dueDate: new Date().toDateString(),
      };
      dispatch({ type: "SET_ITEMS", payload: [...filteredItems, updatedItem] });
      navigate(`/backlog`);
    }
  };
  return (
    <div className="flex flex-row justify-between ">
      <Button
        onClick={handleDone}
        disabled={item && item.status === "Done"}
        className="flex flex-row gap-2 w-[23%] hover:text-pink-400 transition-all ease-in-out duration-300"
      >
        Done
        <MiniButton type="Done" />
      </Button>

      <Button
        onClick={handleDelete}
        disabled={item && item.status === "Done"}
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
        disabled={
          (item && item.status === "Backlog") ||
          (item && item.status === "Done")
        }
        className="flex flex-row gap-2 w-[23%] hover:text-pink-400 transition-all ease-in-out duration-300"
      >
        Backlog
        <MiniButton type="Backlog" />
      </Button>
    </div>
  );
};

export default ContentButtons;
