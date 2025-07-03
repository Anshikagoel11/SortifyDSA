import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ FIXED
import Sorting from './components/Sorting/sorting';
import SortingComp from './components/Sorting/SortingComp';
import { SortingProvider } from './context/sortingContext';
import Searching from './components/Searching/searching';
import SearchingComp from './components/Searching/SearchingComp';

function App() {
  return (
    <>
      <BrowserRouter>
        <SortingProvider>
          <Routes>
            <Route element={<Navbar />}>
              <Route path="/" element={<Home />} />
              <Route element={<Sorting />}>
                <Route path="/sorting/:type" element={<SortingComp />} />
              </Route>
              <Route element={<Searching />}>
                <Route path="/searching/:type" element={<SearchingComp />} />
              </Route>
            </Route>
          </Routes>
        </SortingProvider>
      </BrowserRouter>
    </>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
