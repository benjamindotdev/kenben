import "./App.css";
import { ItemsProvider } from "@/context/ItemsContext";
import { ActiveProvider } from "@/context/ActiveContext";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

function App() {
  return (
    <div
      className={`flex flex-col justify-center align-middle h-[100vh] w-[100vw]`}
    >
      <ItemsProvider>
        <Navbar />
        <ActiveProvider>
          <Main />
        </ActiveProvider>
      </ItemsProvider>
    </div>
  );
}

export default App;
