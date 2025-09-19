import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './views/Home/App';
import NewTodos from './views/New Todos/NewTodos';
import { BrowserRouter, Route, Routes } from 'react-router';


const root = createRoot(document.querySelector('#root'));

root.render(
        <BrowserRouter>
        <Routes>
                <Route path='/' element={<App/>}/>
                <Route path='/new' element={<NewTodos/>}/>
        </Routes>
        </BrowserRouter>
)

