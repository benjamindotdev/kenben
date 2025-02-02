import Sidebar from "./Sidebar";
import Content from "./Content";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";

const Main = () => {
  return (
    <Router>
      <Navbar />
      <main className="flex flex-row h-[90vh] w-[100%] justify-evenly">
        <Sidebar />
        <Content />
      </main>
    </Router>
  );
};

export default Main;
