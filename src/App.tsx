import { useState } from "react";
import "./App.css";
import data from "./data/data.json";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import type { ToDo } from "./types/ToDo";

function App() {
  const [theme, setTheme] = useState("light");
  const [toDos, setToDos] = useState(data);
  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <main className="main">
        <Sidebar />
        <Content toDos={toDos} setToDos={setToDos} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
