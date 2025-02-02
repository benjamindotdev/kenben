import { Routes, Route } from "react-router-dom";
import ContentList from "./ContentList";
import ContentFullPage from "./ContentFullPage";
import AddItemForm from "./AddItemForm";
import EditItemForm from "./EditItemForm";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Account from "./Account";

const Content = () => {

  return (
    <div className="w-[65%]">
      <Routes>
        <Route path="/" element={<ContentList />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/account" element={<Account />} />
        <Route path="/add" element={<AddItemForm />} />
        <Route path="/:status" element={<ContentList />} />
        <Route path="/:status/:id" element={<ContentFullPage />} />
        <Route path="/:status/:id/edit" element={<EditItemForm />} />
      </Routes>
    </div>
  );
};

export default Content;
