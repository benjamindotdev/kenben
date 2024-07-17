import ContentItem from "./ContentItem";
import type { Item } from "../types/Item";

type ContentListProps = {
  items: Item[];
};

const ContentList: React.FC<ContentListProps> = ({ items }) => {
  return (
    <ul className="h-[100%] flex flex-col justify-start align-top gap-6 flex-nowrap blur-[1px] hover:blur-0">
      {items.map((item: Item) => (
        <ContentItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default ContentList;
