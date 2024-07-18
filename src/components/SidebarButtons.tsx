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
        navigate(`/${itemToUpdate.status}/${itemId}/edit`);
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
    <span className="flex flex-row justify-start gap-2 ease-in-out transition-all hover:text-pink-200">
      <MiniButton type={"Done"} clickHandler={() => handleClick("Done")} />
      <MiniButton type={"Delete"} clickHandler={() => handleClick("Delete")} />
      <MiniButton type={"Edit"} clickHandler={() => handleClick("Edit")} />
      <MiniButton
        type={"Backlog"}
        clickHandler={() => handleClick("Backlog")}
      />
    </span>
  );
};

export default SidebarButtons;
