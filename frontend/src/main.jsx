import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App.jsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Pages
import Home from './routes/Home.jsx';
import RegisterDrivers from './routes/RegisterDrivers.jsx';
import DailyPayment from './routes/DailyPayment.jsx';
import DriverDaily from './routes/DriverDaily.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/add-driver",
        element: <RegisterDrivers />
      },
      {
        path: "/drivers/:id", 
        element: <DriverDaily />
      },
      {
        path: "/dailyPayment",
        element: <DailyPayment />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render( 
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
