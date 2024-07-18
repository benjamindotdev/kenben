import { useItems } from "../context/ItemsContext";
import SidebarList from "./SidebarList";

const Sidebar = () => {
  const { toDos, inProgress, done, backlog } = useItems();
  return (
    <div className="w-[25%] flex flex-col gap-2 justify-start">
      <SidebarList type="Done" url="done" state={done} />
      <SidebarList type="In Progress" url="inprogress" state={inProgress} />
      <SidebarList type="To Do" url="todo" state={toDos} />
      <SidebarList type="Backlog" url="backlog" state={backlog} />
    </div>
  );
};

export default Sidebar;
