import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import SidebarItem from "./SidebarItem";
import { useActive } from "../context/ActiveContext";
import { ListTodo, ListChecks, Glasses, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Item } from "../types/Item";
import SidebarAddItem from "./SidebarAddItem";
import { useItems } from "../context/ItemsContext";

type SidebarListProps = {
  status: "To Do" | "In Progress" | "Done" | "Backlog";
  url: "todo" | "inprogress" | "done" | "backlog";
  state: Item[];
};

const SidebarList: React.FC<SidebarListProps> = ({ status, url, state }) => {
  const { active, setActive } = useActive();
  const navigate = useNavigate();
  const handleClick = () => {
    setActive(status);
    navigate(`/${url}`);
  };
  return (
    <Card
      className={` opacity-50 hover:opacity-100 transition-all hover:ease-in duration-300 border-none  outline-2 outline-pink-200 hover:outline-double hover:cursor-pointer ${
        active === status &&
        "outline-white outline-double outline-offset-1 opacity-100 bg-slate-800"
      }`}
    >
      <CardHeader
        onClick={handleClick}
        className={` text-white hover:text-pink-300   ${
          active === status &&
          "text-pink-300 hover:text-pink-300 animate-pulse duration-1000 ease-in-out"
        }`}
      >
        <span className="flex flex-row gap-2">
          <span className="flex flex-row">
            <sup className="text-pink-400 font-bold">
              {state.length > 0 ? state.length : " "}
            </sup>
            {status === "To Do" && <ListTodo size={24} />}
            {status === "Done" && <ListChecks size={24} />}
            {status === "In Progress" && <Glasses size={24} />}
            {status === "Backlog" && <History size={24} />}
          </span>
          <CardTitle>{status}</CardTitle>
        </span>
      </CardHeader>
      {active === status && (
        <>
          <CardContent className=" text-white overflow-y-scroll">
            {state.map((item: Item) => {
              return <SidebarItem key={item.id} item={item} status={status} />;
            })}
          </CardContent>
          <CardFooter className="h-[20%]">
            <SidebarAddItem status={status} />
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default SidebarList;
