import { Routes, Route } from "react-router-dom";
import ContentList from "./ContentList";
import ContentFullPage from "./ContentFullPage";
import AddItemForm from "./AddItemForm";
import EditItemForm from "./EditItemForm";

const Content = () => {
  return (
    <div className="w-[65%]">
      <Routes>
        <Route path="/" element={<ContentList />} />
        <Route path="/add" element={<AddItemForm />} />
        <Route path="/:status" element={<ContentList />} />
        <Route path="/:status/:id" element={<ContentFullPage />} />
        <Route path="/:status/:id/edit" element={<EditItemForm />} />
      </Routes>
    </div>
  );
};

export default Content;
