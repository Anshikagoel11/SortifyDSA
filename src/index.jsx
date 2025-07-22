import { createRoot } from "react-dom/client";
import "./index.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom"; // ✅ FIXED
import Sorting from "./components/Sorting/sorting";
import SortingComp from "./components/Sorting/SortingComp";
import { AlgoControlProvider } from "./context/algoControlContext";
import Searching from "./components/Searching/searching";
import SearchingComp from "./components/Searching/SearchingComp";
import Stack from "./components/Stack/stackComp";
import { StackProvider } from "./context/stackContext";
import { QueueProvider } from "./context/queueContext";
import Queue from "./components/queue/queueComp";
import Tree from "./components/tree/treeComp";
import { TreeProvider } from "./context/treeContext";
import ComingSoon from "./components/comingSoon";
import ScrollToTop from "./components/scrollToTop";
import ChatBot from "./components/chatbot/chatbotComponent";


function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <AlgoControlProvider>
          <StackProvider>
            <QueueProvider>
              <TreeProvider>
                <Routes>
                  <Route element={<Navbar />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/chatbot" element={<ChatBot/>}></Route>
                    <Route element={<Sorting />}>
                      <Route path="/sorting/:type" element={<SortingComp />} />
                    </Route>
                    <Route element={<Searching />}>
                      <Route
                        path="/searching/:type"
                        element={<SearchingComp />}
                      />
                    </Route>
                    <Route path="/stack" element={<Stack />}></Route>
                    <Route path="/queue" element={<Queue />}></Route>
                    <Route path="/tree" element={<Tree />}></Route>
                    <Route path="/comingSoon" element={<ComingSoon />}></Route>
                  </Route>
                </Routes>
              </TreeProvider>
            </QueueProvider>
          </StackProvider>
        </AlgoControlProvider>
      </BrowserRouter>
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
