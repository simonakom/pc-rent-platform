import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import RegistrationWindow from "./Registration/Register";
import LoginPage from "./Login/Login";
import NotFound from "./not-found/NotFound"

const router = createBrowserRouter([
  {
    path: "/",
    element: <div className=''>Hello world!</div>,
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
    path: "*",
    element: <NotFound />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
