import { useState } from "react";
import "./App.css";
import { ItemsProvider } from "@/context/ItemsContext";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <div
      className={`flex flex-col justify-center align-middle h-[100vh] w-[100vw]`}
    >
      <ItemsProvider>
        <Navbar />
        <Main />
      </ItemsProvider>
    </div>
  );
}

export default App;
