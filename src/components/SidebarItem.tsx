import { useState } from "react";
import { CardDescription } from "./ui/card";
import type { Item } from "../types/Item";
import SidebarButtons from "./SidebarButtons";
import { useNavigate } from "react-router-dom";

type SidebarItemProps = {
  item: Item;
  status: "To Do" | "In Progress" | "Done" | "Backlog";
};

const SidebarItem: React.FC<SidebarItemProps> = ({ item, status }) => {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <div
      className={`flex flex-col gap-2 hover:text-pink-200  transition-all ease-in duration-300`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      key={item.id}
    >
      <CardDescription
        className={`cursor-pointer opacity-50 hover:opacity-100 before:pr-2 before:text-pink-300 ${
          status === "Done" && "before:content-['✔']"
        }
        ${status === "To Do" && "before:content-['*']"}
        ${status === "In Progress" && "before:content-['>']"}
        ${status === "Backlog" && "before:content-['...']"}`}
        onClick={() => navigate(`${item.status}/${item.id}`)}
      >
        {item.title}
      </CardDescription>
      <CardDescription>
        {show && <SidebarButtons itemId={item.id} />}
      </CardDescription>
    </div>
  );
};

export default SidebarItem;
