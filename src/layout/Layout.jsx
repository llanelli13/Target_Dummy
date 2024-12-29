import React from 'react';
import Header from './Header';
import LoginPage from '../pages/LoginPage'
import { useLocation } from "react-router-dom";


const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col bg-primaryDark text-white min-h-screen">
      {location.pathname === "/" ? <LoginPage /> : 
      <>
        <Header />
        <main className="flex-grow container mx-auto p-5">{children}</main>  
      </>
       }
      
    </div>
  );
};

export default Layout;
