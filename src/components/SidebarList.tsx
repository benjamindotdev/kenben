import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import SidebarItem from "./SidebarItem";
import { ListTodo, ListChecks, Glasses, History } from "lucide-react";
import { NavLink } from "react-router-dom";
import type { Item } from "../types/Item";

type SidebarListProps = {
  type: "To Do" | "In Progress" | "Done" | "Backlog";
  url: "todo" | "inprogress" | "done" | "backlog";
  state: Item[];
  setState: React.Dispatch<React.SetStateAction<Item[]>>;
};

const SidebarList: React.FC<SidebarListProps> = ({
  type,
  url,
  state,
  setState,
}) => {
  return (
    <Card className="h-[25%] opacity-50 blur-[1px] hover:opacity-100 hover:blur-none transition-blur transition-opacity hover:ease-in duration-300">
      <CardHeader>
        <NavLink
          to={`/${url}`}
          className={({ isActive }) =>
            isActive
              ? `flex flex-row gap-6 text-pink-300 hover:text-pink-400 animate-pulse`
              : `flex flex-row gap-6 text-white hover:text-pink-500 opacity-50`
          }
        >
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
        </NavLink>
      </CardHeader>
      <CardContent>
        {state.map((item: Item) => {
          return (
            <SidebarItem
              key={item.id}
              item={item}
              state={state}
              setState={setState}
            />
          );
        })}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default SidebarList;
