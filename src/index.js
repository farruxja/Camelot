import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import TestPage from './pages/TestPage';

import StartTest from './pages/StartTest';
import CreateCustomer from './pages/CreateCustomer';
import AboutPage from './pages/AboutPage';
import Register from './pages/Register';


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
    } ,
    {
      path:"/leads",
      element:<CreateCustomer/>
    },{
      path:"/about",
      element:<AboutPage/>
    },{
      path:"/register",
      element:<Register/> 
    }
  ]
}])
root.render(
  <React.StrictMode>
  <RouterProvider router={myRouter}/>
  </React.StrictMode>
);

