import { useState } from "react";
import { CardDescription } from "./ui/card";
import MiniButton from "./MiniButton";
import type { Item } from "../types/Item";
import SidebarButtons from "./SidebarButtons";

type SidebarItemProps = {
  item: Item;
  state: Item[];
  setState: React.Dispatch<React.SetStateAction<Item[]>>;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ item, state, setState }) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <CardDescription
      className="p-2 rounded-xl flex flex-col gap-2 cursor-pointer opacity-50 hover:opacity-100"
      key={item.id}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <p className="italic hover:text-pink-200">{item.title}</p>

      {show && <SidebarButtons itemId={item.id} />}
    </CardDescription>
  );
};

export default SidebarItem;
