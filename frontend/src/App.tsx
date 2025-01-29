import "./App.css";
import { ItemsProvider } from "@/context/ItemsContext";
import { ActiveProvider } from "@/context/ActiveContext";
import Main from "./components/Main";
import { SessionProvider } from "./context/SessionContext";

function App() {
  return (
    <div
      className={`flex flex-col justify-center align-middle h-[100vh] w-[100vw] mx-auto xl:w-[80vw]`}
    >
      <SessionProvider>
        <ItemsProvider>
          <ActiveProvider>
            <Main />
          </ActiveProvider>
        </ItemsProvider>
      </SessionProvider>
    </div>
  );
}

export default App;
