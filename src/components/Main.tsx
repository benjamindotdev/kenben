import Sidebar from "./Sidebar";
import Content from "./Content";
import { BrowserRouter } from "react-router-dom";

const Main = () => {
  return (
    <BrowserRouter>
      <main className="flex flex-row h-[90vh] w-[100vw] justify-evenly">
        <Sidebar />
        <Content />
      </main>
    </BrowserRouter>
  );
};

export default Main;
