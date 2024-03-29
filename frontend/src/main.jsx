import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import RegistrationWindow from "./Registration/Register";
import LoginPage from "./Login/Login";
import NotFound from "./not-found/NotFound"
import Main from "./Main/Main";
import AddPcForm from "./AddPc/AddPcForm";
import PcPage from "./pc/PcPage";
import MyComputers from "./my-computers/MyComputers";
import LoggedIn from './LoggedIn';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Main />,
  },
  {
    path: "/registration",
    element: <RegistrationWindow />
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/add-new-pc",
    element: <LoggedIn><AddPcForm /></LoggedIn>,
  },
  {
    path: "/pc/:id",
    element: <PcPage />,
  },
  {
    path: "my-computers",
    element: <LoggedIn><MyComputers/></LoggedIn>,
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
   </React.StrictMode>
)
