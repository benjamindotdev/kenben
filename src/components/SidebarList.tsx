import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import SidebarItem from "./SidebarItem";
import {
  Check,
  Delete,
  ListTodo,
  ListChecks,
  Glasses,
  History,
} from "lucide-react";
import type { Item } from "../types/Item";

type SidebarListProps = {
  type: "To Do" | "In Progress" | "Done" | "Backlog";
  state: Item[];
  setState: React.Dispatch<React.SetStateAction<Item[]>>;
};

const SidebarList: React.FC<SidebarListProps> = ({ type, state, setState }) => {
  return (
    <Card className="h-[25%] opacity-50 blur-[1px] hover:opacity-100 hover:blur-none transition-blur transition-opacity hover:ease-in duration-300">
      <CardHeader>
        <span className="flex flex-row gap-6">
          {type === "To Do" && <ListTodo size={24} />}
          {type === "Done" && <ListChecks size={24} />}
          {type === "In Progress" && <Glasses size={24} />}
          {type === "Backlog" && <History size={24} />}

          <CardTitle>{type}</CardTitle>
        </span>
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
