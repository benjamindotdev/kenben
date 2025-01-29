import { Routes, Route } from "react-router-dom";
import ContentList from "./ContentList";
import ContentFullPage from "./ContentFullPage";
import AddItemForm from "./AddItemForm";
import EditItemForm from "./EditItemForm";
import Login from "./Login";
import { useSession } from "../context/SessionContext";

const Content = () => {

  const {loggedIn} = useSession();

  if (!loggedIn) {
    return <Login />;
  }

  return (
    <div className="w-[65%]">
      <Routes>
        <Route path="/" element={<ContentList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<AddItemForm />} />
        <Route path="/:status" element={<ContentList />} />
        <Route path="/:status/:id" element={<ContentFullPage />} />
        <Route path="/:status/:id/edit" element={<EditItemForm />} />
      </Routes>
    </div>
  );
};

export default Content;
