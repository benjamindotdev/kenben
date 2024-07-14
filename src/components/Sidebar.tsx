import React from "react";
import type { ToDo } from "../types/ToDo";

type SidebarProps = {
  toDos: ToDo[];
  setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
};

const Sidebar: React.FC<SidebarProps> = ({ toDos, setToDos }) => {
  return (
    <div className="w-[30%] flex flex-col gap-2 justify-start">SIDEBAR</div>
  );
};

export default Sidebar;
