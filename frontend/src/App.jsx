import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const location = useLocation();

  // Verifique se a localização atual é diferente da rota raiz ("/") ou da rota de registro ("/register")
  const shouldRenderNavbarAndFooter = location.pathname !== '/' && location.pathname !== '/register';

  return (
    <div className='App'>
      {shouldRenderNavbarAndFooter && <Navbar />}
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
      <div className="container">
        <Outlet />
      </div>
      {shouldRenderNavbarAndFooter && <Footer />}
    </div>
  );
};

export default App;
