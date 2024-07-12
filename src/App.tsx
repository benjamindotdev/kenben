import { useState } from "react";
import "./App.css";
import ToDoCard from "./components/ToDoCard";
import data from "./data/data.json";

function App() {
  const [theme, setTheme] = useState("light");
  const [toDos, setToDos] = useState(data);
  return (
    <div className={`app ${theme}`}>
      <nav className="navbar">NAVBAR</nav>
      <main className="main">
        <div className="sidebar">SIDEBAR</div>
        <div className="content">
          {toDos.map((item) => {
            return <ToDoCard key={item.id} {...item} />;
          })}
        </div>
      </main>
      <footer className="footer">FOOTER</footer>
    </div>
  );
}

export default App;
