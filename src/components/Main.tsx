import Sidebar from "./Sidebar";
import Content from "./Content";
import type { ToDo } from "../types/ToDo";
import React from "react";

type MainProps = {
  toDos: ToDo[];
  setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
};

const Main: React.FC<MainProps> = ({ toDos, setToDos }) => {
  return (
    <main className="flex flex-row h-[90vh] w-[100vw]">
      <Sidebar toDos={toDos} setToDos={setToDos} />
      <Content toDos={toDos} setToDos={setToDos} />
    </main>
  );
};

export default Main;
