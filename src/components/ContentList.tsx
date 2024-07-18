import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Item } from "../types/Item";
import { useItems } from "../context/ItemsContext";
import ContentItem from "./ContentItem";

const ContentList = () => {
  const { items } = useItems();
  const { status } = useParams();
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);

  useEffect(() => {
    if (status) {
      const filteredItems = items.filter(
        (item) => item.status.replace(/\s/g, "").toLowerCase() === status
      );
      setFilteredItems(filteredItems);
    }
  }, [status]);

  return (
    <ul className="h-[100%] flex flex-col justify-start align-top gap-2 overflow-y-auto opacity-50 hover:opacity-100 ">
      {filteredItems.map((item: Item) => (
        <ContentItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default ContentList;
