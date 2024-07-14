import React from "react";
import type { Item } from "../types/Item";

type SidebarListProps = {
  type: "To Do" | "In Progress" | "Done" | "Backlog";
  state: Item[];
  setState: React.Dispatch<React.SetStateAction<Item[]>>;
};

const SidebarList: React.FC<SidebarListProps> = ({ type, state, setState }) => {
  return (
    <div className="h-[25%]">
      <h2>{type}</h2>
      <ul>
        {state.map((item: Item) => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default SidebarList;
