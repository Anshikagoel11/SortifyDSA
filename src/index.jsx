import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter ,Routes,Route} from 'react-router';
import Sorting from './components/Sorting';

function App(){
    return(
       <>
       <BrowserRouter>
       <Routes>
        <Route element={<Navbar/>}>
       <Route path={"/"} element={ <Home/>}></Route>
        <Route path='/sorting' element={<Sorting/>}></Route>
        </Route>
       
       </Routes>
        </BrowserRouter>
       </>
    )
}
const root = createRoot(document.getElementById('root'));
root.render(<App/>);
