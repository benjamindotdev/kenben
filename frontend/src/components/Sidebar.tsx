import { useItems } from "../context/ItemsContext";
import SidebarList from "./SidebarList";

const Sidebar = () => {
  const { state } = useItems();
  const { toDos, inProgress, done, backlog } = state;
  return (
    <div className="w-[25%] flex flex-col gap-2 justify-start ">
      <SidebarList status="Done" url="done" state={done} />
      <SidebarList status="In Progress" url="inprogress" state={inProgress} />
      <SidebarList status="To Do" url="todo" state={toDos} />
      <SidebarList status="Backlog" url="backlog" state={backlog} />
    </div>
  );
};

export default Sidebar;
