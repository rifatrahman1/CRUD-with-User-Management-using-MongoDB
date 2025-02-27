import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import All_user from './Components/All_user.jsx';
import New_user from './Components/New_user.jsx';

const router = createBrowserRouter([
      {
        path: "/",
        element: <All_user></All_user>,
        loader: () => fetch('http://localhost:5000/users')
      },
      {
        path: '/new_user',
        element: <New_user></New_user>
      }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
