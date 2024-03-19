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
import PaymentVoucher from './routes/PaymentVoucher.jsx';

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
      ,
      {
        path: "/dailyPayment", // Defina o caminho para a página DailyPayment
        element: <DailyPayment />
      },
      {
        path: "/drivers/:id", 
        element: <DriverDaily />
      },
      {
         path: "/payment-voucher/:imageName", element: < PaymentVoucher />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render( 
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
