import { useState } from "react";
import "./App.css";
import data from "./data/data.json";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import type { ToDo } from "./types/ToDo";

function App() {
  const [theme, setTheme] = useState("light");
  const [toDos, setToDos] = useState<ToDo[]>(data);
  return (
    <div
      className={`${theme} flex flex-col justify-center align-middle h-[95vh] py-[2.5vh] w-[95vw] px-[2.5vw]`}
    >
      <Navbar />
      <Main toDos={toDos} setToDos={setToDos} />
      <Footer />
    </div>
  );
}

export default App;
