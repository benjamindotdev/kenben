import ContentItem from "./ContentItem";
import type { Item } from "../types/Item";

type ContentListProps = {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

const ContentList: React.FC<ContentListProps> = ({ items, setItems }) => {
  return (
    <ul className="h-[100%] flex flex-col justify-start align-top gap-6 flex-nowrap blur-[1px] hover:blur-0">
      {items.map((item: Item) => (
        <ContentItem key={item.id} item={item} setItems={setItems} />
      ))}
    </ul>
  );
};

export default ContentList;
