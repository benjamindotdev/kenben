import { useState } from "react";
import "./App.css";
import data from "./data/data.json";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import type { Item } from "./types/Item";

function App() {
  const [theme, setTheme] = useState("light");
  const [toDos, setToDos] = useState<Item[]>(
    data.filter((item) => item.status === "To Do")
  );
  const [inProgress, setInProgress] = useState<Item[]>(
    data.filter((item) => item.status === "In Progress")
  );
  const [done, setDone] = useState<Item[]>(
    data.filter((item) => item.status === "Done")
  );
  const [backlog, setBacklog] = useState<Item[]>(
    data.filter((item) => item.status === "Backlog")
  );
  return (
    <div
      className={`${theme} flex flex-col justify-center align-middle h-[95vh] py-[2.5vh] w-[95vw] px-[2.5vw]`}
    >
      <Navbar />
      <Main
        toDos={toDos}
        setToDos={setToDos}
        inProgress={inProgress}
        setInProgress={setInProgress}
        done={done}
        setDone={setDone}
        backlog={backlog}
        setBacklog={setBacklog}
      />
      <Footer />
    </div>
  );
}

export default App;
