import Sidebar from "./Sidebar";
import Content from "./Content";
import { BrowserRouter } from "react-router-dom";
import { useItems } from "@/context/ItemsContext";

const Main: React.FC = () => {
  const {
    items,
    setItems,
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
    <BrowserRouter>
      <main className="flex flex-row h-[90vh] w-[100vw]">
        <Sidebar
          toDos={toDos}
          setToDos={setToDos}
          inProgress={inProgress}
          setInProgress={setInProgress}
          done={done}
          setDone={setDone}
          backlog={backlog}
          setBacklog={setBacklog}
          items={items}
          setItems={setItems}
        />
        <Content
          toDos={toDos}
          setToDos={setToDos}
          inProgress={inProgress}
          setInProgress={setInProgress}
          done={done}
          setDone={setDone}
          backlog={backlog}
          setBacklog={setBacklog}
          items={items}
          setItems={setItems}
        />
      </main>
    </BrowserRouter>
  );
};

export default Main;
