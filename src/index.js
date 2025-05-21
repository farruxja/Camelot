import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import TestPage from './pages/TestPage';

import StartTest from './pages/StartTest';


const root = ReactDOM.createRoot(document.getElementById('root'));
const myRouter = createBrowserRouter([{
  path:"/",
  element:<App/>,
  errorElement:<ErrorPage/>,
  children:[
    {
      path:"/",
      element:<TestPage/>,
    },
    {
      path:'/test',
      element:<StartTest/>,
    } 
  ]
}])
root.render(
  <React.StrictMode>
  <RouterProvider router={myRouter}/>
  </React.StrictMode>
);

