import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ FIXED
import Sorting from "./components/Sorting/sorting";
import SortingComp from "./components/Sorting/SortingComp";
import { AlgoControlProvider } from "./context/algoControlContext";
import Searching from "./components/Searching/searching";
import SearchingComp from "./components/Searching/SearchingComp";
import StackComp from "./components/Stack/stackComp";
import { StackProvider } from "./context/stackContext";
import { QueueProvider } from "./context/queueContext";
import QueueComp from "./components/queue/queueComp";

function App() {
  return (
    <>
      <BrowserRouter>
        <AlgoControlProvider>
          <StackProvider>
          <QueueProvider>
          <Routes>
            <Route element={<Navbar />}>
              <Route path="/" element={<Home />} />
              <Route element={<Sorting />}>
                <Route path="/sorting/:type" element={<SortingComp />} />
              </Route>
              <Route element={<Searching />}>
                <Route path="/searching/:type" element={<SearchingComp />} />
              </Route>
              <Route path="/stack" element={<StackComp/>}></Route>
              <Route path="/queue" element={<QueueComp/>}></Route>
            </Route>
          </Routes>
          </QueueProvider>
          </StackProvider>
        </AlgoControlProvider>
      </BrowserRouter>
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
