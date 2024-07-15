import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import MiniButton from "./MiniButton";
import { Check, Delete } from "lucide-react";
import type { Item } from "../types/Item";

type SidebarListProps = {
  type: "To Do" | "In Progress" | "Done" | "Backlog";
  state: Item[];
  setState: React.Dispatch<React.SetStateAction<Item[]>>;
};

const SidebarList: React.FC<SidebarListProps> = ({ type, state, setState }) => {
  return (
    <Card className="h-[25%]">
      <CardHeader>
        <CardTitle>{type}</CardTitle>
      </CardHeader>
      <CardContent>
        {state.map((item: Item) => {
          return (
            <CardDescription
              className="p-2 rounded-xl hover:text-black hover:bg-white cursor-pointer"
              key={item.id}
            >
              {item.title}
              <div className="flex flex-row justify-end gap-2">
                <MiniButton type={"Edit"} />
                <MiniButton type={"Delete"} />
                <MiniButton type={"Done"} />
              </div>
            </CardDescription>
          );
        })}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            setState([]);
          }}
        >
          {type === "Done" ? <Delete /> : <Check />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SidebarList;
