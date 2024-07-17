import { useItems } from "../context/ItemsContext";
import SidebarList from "./SidebarList";

const Sidebar = () => {
  const {
    toDos,
    setToDos,
    inProgress,
    setInProgress,
    done,
    setDone,
    backlog,
    setBacklog,
  } = useItems();
  return (
    <div className="w-[30%] flex flex-col gap-2 justify-start">
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
