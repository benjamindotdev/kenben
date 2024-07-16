import { Routes, Route } from "react-router-dom";
import ContentList from "./ContentList";
import type { Item } from "../types/Item";
import ContentFullPage from "./ContentFullPage";

type ContentProps = {
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

const Content: React.FC<ContentProps> = ({
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
      </Routes>
    </div>
  );
};

export default Content;
