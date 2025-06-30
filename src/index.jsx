import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter ,Routes,Route} from 'react-router';
import Sorting from './components/Sorting/sorting';
import SortingComp from './components/Sorting/SortingComp';
import {SortingProvider} from './context/sortingContext'
function App(){
    return(
       <>
       <BrowserRouter>
       <SortingProvider>
       <Routes>
        <Route element={<Navbar/>}>
       <Route path={"/"} element={ <Home/>}></Route>
        <Route element={<Sorting/>}>
        <Route path='/sorting/:type' element={<SortingComp/>}></Route>
        </Route>
        </Route>
       
       </Routes>
       </SortingProvider>
        </BrowserRouter>
       </>
    )
}
const root = createRoot(document.getElementById('root'));
root.render(<App/>);
