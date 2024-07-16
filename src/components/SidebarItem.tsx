import { useState } from "react";
import { CardDescription } from "./ui/card";
import MiniButton from "./MiniButton";
import type { Item } from "../types/Item";

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
      {item.title}
      {show && (
        <div className="flex flex-row justify-start gap-2 ease-in-out transition-all ">
          <MiniButton type={"Edit"} />
          <MiniButton type={"Delete"} />
          <MiniButton type={"Done"} />
          <MiniButton type={"Backlog"} />
        </div>
      )}
    </CardDescription>
  );
};

export default SidebarItem;
