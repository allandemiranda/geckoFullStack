import React from 'react';
import logo from './logo.png';
import './Header.css';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <RouterLink to="/">
        <img
          alt="logo"
          src={logo}
        />
        <h1>Gecko Portal</h1>
      </RouterLink>
    </div>
  );
};

export default Header;
