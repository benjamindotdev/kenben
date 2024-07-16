import { useItems } from "@/context/ItemsContext";
import MiniButton from "./MiniButton";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

type ContentButtonsProps = {
  itemId: string;
};

const ContentButtons: React.FC<ContentButtonsProps> = ({ itemId }) => {
  const { items, setItems } = useItems();
  const handleClick = (status: string) => {
    const filteredItems = items.filter((item) => item.id !== itemId);
    const itemToUpdate = items.find((item) => item.id === itemId);
    if (itemToUpdate) {
      if (status === "Delete") {
        setItems(filteredItems);
        return;
      } else {
        const updatedItem = {
          ...itemToUpdate,
          status: status,
          doneDate: new Date().toDateString(),
        };
        setItems([...filteredItems, updatedItem]);
      }
    }
  };
  return (
    <div className="flex flex-row justify-between ">
      <Button
        onClick={() => handleClick("Done")}
        className="flex flex-row gap-2 w-[23%] hover:text-pink-400 "
      >
        Done
        <MiniButton type="Done" />
        <Link to="/done" />
      </Button>

      <Button
        onClick={() => handleClick("Delete")}
        className="flex flex-row gap-2 w-[23%] hover:text-pink-900"
      >
        Delete
        <MiniButton type="Delete" />
        <Link to="/todo" />
      </Button>
      <Button className="flex flex-row gap-2 w-[23%] hover:text-pink-400">
        Edit
        <MiniButton type="Edit" />
      </Button>
      <Button
        onClick={() => handleClick("Backlog")}
        className="flex flex-row gap-2 w-[23%] hover:text-pink-400"
      >
        Backlog
        <MiniButton type="Backlog" />
        <Link to="/backlog" />
      </Button>
    </div>
  );
};

export default ContentButtons;
