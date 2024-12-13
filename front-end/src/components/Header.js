import React from 'react';
import './Header.css';
import logo from './Logo.jpg'; // Assuming you have a logo.png in the same directory

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <h1 className="title">Network Traffic Analyzer</h1>
    </header>
  );
};

export default Header;
