import ItemCard from "./ContentCard";
import type { Item } from "../types/Item";

type ContentProps = {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  current: "To Do" | "In Progress" | "Done" | "Backlog" | "All";
};

const Content: React.FC<ContentProps> = ({ items, setItems, current }) => {
  return (
    <ul className="w-[70%] flex flex-col justify-start align-top gap-6">
      {items.map((item: Item) =>
        item.status === current || current === "All" ? (
          <ItemCard key={item.id} {...item} />
        ) : null
      )}
    </ul>
  );
};

export default Content;
