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
    element: <AddPcForm />,
  },
  {
    path: "/pc/:id",
    element: <PcPage />,
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
