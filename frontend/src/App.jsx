import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Importe o Outlet e useLocation
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const location = useLocation();

  // Verifique se a localização atual é diferente da rota raiz ("/") para renderizar o Navbar, o Footer e o ToastContainer
  const shouldRenderNavbarAndFooter = location.pathname !== '/';

  return (
    <div className='App'>
      {/* Renderize o Navbar e o Footer apenas se a localização atual não for a rota raiz */}
      {shouldRenderNavbarAndFooter && <Navbar />}
      <div className="container">
        <Outlet />
      </div>
      {shouldRenderNavbarAndFooter && <Footer />}
      {/* Renderize o ToastContainer apenas se a localização atual não for a rota raiz */}
      {shouldRenderNavbarAndFooter && (
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      )}
    </div>
  );
};

export default App;
