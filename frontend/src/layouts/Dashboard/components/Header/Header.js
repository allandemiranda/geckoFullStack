import React from "react";
import logo from "./logo.png";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Gecko Portal</h1>
    </header>
  );
};

export default Header;
