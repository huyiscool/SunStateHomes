// src/components/Header.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Re-import Link and NavLink
import './Header.css';

const Header = ({ logoSrc, siteTitle, backgroundImage, navLinks, authLinks }) => {
  // Default navigation links using 'to' for React Router
  const defaultNavLinks = [
    { to: "/", label: "Home", end: true }, // 'end' prop for exact match on NavLink
    { to: "/rent", label: "Rent" },
    { to: "/neighborhoods", label: "Neighborhoods" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" }
  ];

  // Default authentication links using 'to'
  const defaultAuthLinks = {
    // login: { to: "/login", label: "Login" },
    // signup: { to: "/signup", label: "Sign Up" }
  };

  const currentNavLinks = navLinks || defaultNavLinks;
  const currentAuthLinks = authLinks || defaultAuthLinks;

  return (
    <header
      className="site-header"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      <div className="header-overlay"></div>
      <div className="header-content">
        <Link to="/" className="logo-link"> {/* Changed back to Link */}
          {logoSrc ? (
            <img src={logoSrc} alt={`${siteTitle || 'Real Estate'} Logo`} className="logo-image" />
          ) : (
            <h1 className="logo-text">{siteTitle || 'Real Estate Pro'}</h1>
          )}
        </Link>
        <nav className="main-navigation">
          <ul>
            {currentNavLinks.map(link => (
              <li key={link.label}>
                {/* Use NavLink for navigation items to get active class styling */}
                <NavLink to={link.to} end={link.end}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-auth-buttons">
          {currentAuthLinks.login && (
            <Link to={currentAuthLinks.login.to} className="auth-button login"> {/* Changed back to Link */}
              {currentAuthLinks.login.label}
            </Link>
          )}
          {currentAuthLinks.signup && (
            <Link to={currentAuthLinks.signup.to} className="auth-button signup"> {/* Changed back to Link */}
              {currentAuthLinks.signup.label}
            </Link>
          )}
        </div>
        {/* <button className="mobile-menu-toggle">Menu</button> */}
      </div>
    </header>
  );
};

export default Header;