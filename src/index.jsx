import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter ,Routes,Route} from 'react-router';
import Sorting from './components/Sorting';
import BubbleSort from './components/BubbleComp';

function App(){
    return(
       <>
       <BrowserRouter>
       <Routes>
        <Route element={<Navbar/>}>
       <Route path={"/"} element={ <Home/>}></Route>
        <Route element={<Sorting/>}>
        <Route path='/sorting/bubble-sort' element={<BubbleSort/>}></Route>
        {/* <Route path='/sorting/selection-sort' element={<SelectionSort/>}></Route>
        <Route path='/sorting/merge-sort' element={<MergeSort/>}></Route>
        <Route path='/sorting/quick-sort' element={<QuickSort/>}></Route>
        <Route path='/sorting/insertation-sort' element={<InsertationSort/>}></Route> */}
        </Route>
        </Route>
       
       </Routes>
        </BrowserRouter>
       </>
    )
}
const root = createRoot(document.getElementById('root'));
root.render(<App/>);
