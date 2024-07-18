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
import { Link, NavLink } from "react-router-dom";
import type { Item } from "../types/Item";
import SidebarAddItem from "./SidebarAddItem";

type SidebarListProps = {
  type: "To Do" | "In Progress" | "Done" | "Backlog";
  url: "todo" | "inprogress" | "done" | "backlog";
  state: Item[];
};

const SidebarList: React.FC<SidebarListProps> = ({ type, url, state }) => {
  const { active, setActive } = useActive();
  return (
    <Link className="" to={`/${url}`} onClick={() => setActive(type)}>
      <Card
        className={`opacity-50 hover:opacity-100 transition-all hover:ease-in duration-300 border-none  outline-2 outline-pink-200 hover:outline-double ${
          active === type &&
          "outline-white outline-double outline-offset-1 opacity-100 bg-slate-800"
        }`}
      >
        <CardHeader
          className={`h-[20%] text-white hover:text-pink-300   ${
            active === type &&
            "text-pink-300 hover:text-pink-300 animate-pulse duration-1000 ease-in-out"
          }`}
        >
          <span className="flex flex-row gap-2">
            <span className="flex flex-row">
              <sup className="text-pink-400 font-bold">
                {state.length > 0 ? state.length : " "}
              </sup>
              {type === "To Do" && <ListTodo size={24} />}
              {type === "Done" && <ListChecks size={24} />}
              {type === "In Progress" && <Glasses size={24} />}
              {type === "Backlog" && <History size={24} />}
            </span>
            <CardTitle>{type}</CardTitle>
          </span>
        </CardHeader>
        <CardContent className="h-[60%] text-white overflow-y-scroll">
          {state.map((item: Item) => {
            return <SidebarItem key={item.id} item={item} type={type} />;
          })}
        </CardContent>
        <CardFooter className="h-[20%]">
          {active === type && <SidebarAddItem type={type} />}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default SidebarList;
