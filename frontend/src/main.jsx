// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import App from './App';
import LoginForm from './components/LoginForm'; // Importe o componente LoginForm

// Pages
import Home from './routes/Home';
import RegisterDrivers from './routes/RegisterDrivers';
import DailyPayment from './routes/DailyPayment';
import DriverDaily from './routes/DriverDaily';
import PaymentVoucher from './routes/PaymentVoucher';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Defina a rota de login como a raiz
      {
        path: "/",
        element: <LoginForm />
      },
      // Adicione as outras rotas como sub-rotas
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/add-driver",
        element: <RegisterDrivers />
      },
      {
        path: "/add-driver/:id",
        element: <RegisterDrivers />
      },
      {
        path: "/dailyPayment",
        element: <DailyPayment />
      },
      {
        path: "/drivers/:id",
        element: <DriverDaily />
      },
      {
        path: "/payment-voucher/:imageName",
        element: <PaymentVoucher />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
