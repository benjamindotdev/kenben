import { Routes, Route } from "react-router-dom";
import ContentList from "./ContentList";
import ContentFullPage from "./ContentFullPage";
import { useItems } from "@/context/ItemsContext";
import AddItem from "./AddItem";
import AddItemForm from "./AddItemForm";

const Content = () => {
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
    <div className="w-[70%]">
      <Routes>
        <Route
          path="/"
          element={
            <ContentList
              items={[...toDos, ...inProgress, ...done, ...backlog]}
              setItems={setItems}
            />
          }
        />
        <Route
          path={`/todo`}
          element={<ContentList items={toDos} setItems={setToDos} />}
        >
          <Route path={`:id`} element={<ContentFullPage />} />
        </Route>

        <Route
          path={`/inprogress`}
          element={<ContentList items={inProgress} setItems={setInProgress} />}
        >
          <Route path={`:id`} element={<ContentFullPage />} />
        </Route>
        <Route
          path={`/done`}
          element={<ContentList items={done} setItems={setDone} />}
        >
          <Route path={`:id`} element={<ContentFullPage />} />
        </Route>
        <Route
          path={`/backlog`}
          element={<ContentList items={backlog} setItems={setBacklog} />}
        >
          <Route path={`:id`} element={<ContentFullPage />} />
        </Route>
        <Route path="add" element={<AddItemForm />} />
      </Routes>
    </div>
  );
};

export default Content;
