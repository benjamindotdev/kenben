import { useItems } from "@/context/ItemsContext";
import MiniButton from "./MiniButton";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

type ContentButtonsProps = {
  itemId: string;
};

const ContentButtons: React.FC<ContentButtonsProps> = ({ itemId }) => {
  const { items, setItems } = useItems();
  const item = items.find((item) => item.id === itemId);
  const handleDone = () => {
    // Filter out the item that matches itemId
    const filteredItems = items.filter((item) => item.id !== itemId);

    // Find the item to update
    const itemToUpdate = items.find((item) => item.id === itemId);

    // Check if the item exists
    if (itemToUpdate) {
      // Update the item and add it to the filteredItems array
      const updatedItem = {
        ...itemToUpdate,
        status: "Done",
        doneDate: new Date().toDateString(),
      };
      setItems([...filteredItems, updatedItem]);
    }

    // Navigate to the /done page
  };
  return (
    <div className="flex flex-row justify-between ">
      <Button
        onClick={() => handleDone()}
        className="flex flex-row gap-2 w-[23%] hover:text-pink-400 "
      >
        Done
        <MiniButton type="Done" />
        <Link to="/done" />
      </Button>

      <Button className="flex flex-row gap-2 w-[23%] hover:text-pink-900">
        Delete
        <MiniButton type="Delete" />
      </Button>
      <Button className="flex flex-row gap-2 w-[23%] hover:text-pink-400">
        Edit
        <MiniButton type="Edit" />
      </Button>
      <Button className="flex flex-row gap-2 w-[23%] hover:text-pink-400">
        Backlog
        <MiniButton type="Backlog" />
      </Button>
    </div>
  );
};

export default ContentButtons;
