import { useItems } from "@/context/ItemsContext";
import MiniButton from "./MiniButton";
import { useNavigate } from "react-router-dom";

type SidebarButtonsProps = {
  itemId: string;
};

const SidebarButtons: React.FC<SidebarButtonsProps> = ({ itemId }) => {
  const { items, setItems } = useItems();
  const navigate = useNavigate();
  const handleClick = (status: string) => {
    const filteredItems = items.filter((item) => item.id !== itemId);
    const itemToUpdate = items.find((item) => item.id === itemId);
    if (itemToUpdate) {
      if (status === "Delete") {
        setItems(filteredItems);
        return;
      } else if (status === "Edit") {
        navigate(`/edit/${itemId}`);
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
    <div className="flex flex-row justify-start gap-2 ease-in-out transition-all hover:text-pink-200">
      <span onClick={() => handleClick("Done")}>
        <MiniButton type={"Done"} />
      </span>
      <span onClick={() => handleClick("Delete")}>
        <MiniButton type={"Delete"} />
      </span>
      <span onClick={() => handleClick("Edit")}>
        <MiniButton type={"Edit"} />
      </span>
      <span onClick={() => handleClick("Backlog")}>
        <MiniButton type={"Backlog"} />
      </span>
    </div>
  );
};

export default SidebarButtons;
