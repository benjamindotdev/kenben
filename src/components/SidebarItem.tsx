import { useState } from "react";
import { CardDescription } from "./ui/card";
import type { Item } from "../types/Item";
import SidebarButtons from "./SidebarButtons";

type SidebarItemProps = {
  item: Item;
  status: "To Do" | "In Progress" | "Done" | "Backlog";
};

const SidebarItem: React.FC<SidebarItemProps> = ({ item, status }) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <CardDescription
      className="p-2 rounded-xl flex flex-col gap-2 cursor-pointer opacity-50 hover:opacity-100"
      key={item.id}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <p
        className={`hover:text-pink-200 flex before:pr-2 before:text-pink-300 transition-all ease-in duration-300 
          ${status === "Done" && "before:content-['✔']"}
          ${status === "To Do" && "before:content-['*']"}
          ${status === "In Progress" && "before:content-['>']"}
          ${status === "Backlog" && "before:content-['...']"}`}
      >
        {item.title}
      </p>

      {show && <SidebarButtons itemId={item.id} />}
    </CardDescription>
  );
};

export default SidebarItem;
