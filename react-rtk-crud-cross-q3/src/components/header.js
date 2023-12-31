import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/header.css";
const Header = () => {
  const location = useLocation();
  const isActive = (pathname) => {
    return location.pathname === pathname;
  };

  return (
    <header className="header">
      <div className="header-logo">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Device Marketplace</h1>
      </div>

      <nav className="nav">
        <ul>
          <li>
            <Link to="/" className={isActive("/") ? "active" : ""}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/devices"
              className={isActive("/devices") ? "active" : ""}
            >
              Devices
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
