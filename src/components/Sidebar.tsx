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
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
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
  items,
  setItems,
}) => {
  return (
    <div className="w-[30%] flex flex-col gap-2 justify-between">
      <SidebarList type="Done" url="done" state={done} setState={setDone} />
      <SidebarList
        type="In Progress"
        url="inprogress"
        state={inProgress}
        setState={setInProgress}
      />
      <SidebarList type="To Do" url="todo" state={toDos} setState={setToDos} />
      <SidebarList
        type="Backlog"
        url="backlog"
        state={backlog}
        setState={setBacklog}
      />
    </div>
  );
};

export default Sidebar;
