import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import Navbar from './components/Navbar';
import Home from './components/Home';


function App(){
    return(
       <>
        <Navbar/>
        <Home/>
       </>
    )
}
const root = createRoot(document.getElementById('root'));
root.render(<App/>);
