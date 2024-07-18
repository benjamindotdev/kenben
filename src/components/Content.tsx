import { Routes, Route } from "react-router-dom";
import ContentList from "./ContentList";
import ContentFullPage from "./ContentFullPage";
import { useItems } from "@/context/ItemsContext";
import AddItemForm from "./AddItemForm";

const Content = () => {
  const { items, toDos, inProgress, done, backlog } = useItems();
  return (
    <div className="w-[65%]">
      <Routes>
        <Route path="/" element={<ContentList items={items} />} />
        <Route path={`/todo`} element={<ContentList items={toDos} />}>
          <Route path={`:id`} element={<ContentFullPage />} />
        </Route>

        <Route
          path={`/inprogress`}
          element={<ContentList items={inProgress} />}
        >
          <Route path={`:id`} element={<ContentFullPage />} />
        </Route>
        <Route path={`/done`} element={<ContentList items={done} />}>
          <Route path={`:id`} element={<ContentFullPage />} />
        </Route>
        <Route path={`/backlog`} element={<ContentList items={backlog} />}>
          <Route path={`:id`} element={<ContentFullPage />} />
        </Route>
        <Route path={"add/:type"} element={<AddItemForm />} />
        <Route path={"edit/"} element={<AddItemForm />}>
          <Route path={`:id`} element={<AddItemForm />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Content;
