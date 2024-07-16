import type { Item } from "../types/Item";
import SidebarList from "./SidebarList";

type SidebarProps = {
  toDos: Item[];
  setToDos: React.Dispatch<React.SetStateAction<Item[]>>;
  inProgress: Item[];
  setInProgress: React.Dispatch<React.SetStateAction<Item[]>>;
  done: Item[];
  setDone: React.Dispatch<React.SetStateAction<Item[]>>;
  backlog: Item[];
  setBacklog: React.Dispatch<React.SetStateAction<Item[]>>;
  current: "To Do" | "In Progress" | "Done" | "Backlog" | "All";
  setCurrent: React.Dispatch<
    React.SetStateAction<"To Do" | "In Progress" | "Done" | "Backlog" | "All">
  >;
};

const Sidebar: React.FC<SidebarProps> = ({
  toDos,
  setToDos,
  inProgress,
  setInProgress,
  done,
  setDone,
  backlog,
  setBacklog,
  current,
  setCurrent,
}) => {
  return (
    <div className="w-[30%] flex flex-col gap-2 justify-between">
      <SidebarList type="Done" state={done} setState={setDone} />
      <SidebarList
        type="In Progress"
        state={inProgress}
        setState={setInProgress}
      />
      <SidebarList type="To Do" state={toDos} setState={setToDos} />
      <SidebarList type="Backlog" state={backlog} setState={setBacklog} />
    </div>
  );
};

export default Sidebar;
