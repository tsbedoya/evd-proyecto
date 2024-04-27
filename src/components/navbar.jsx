"use client";
import  "../App.css";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`navbar ${menuOpen ? "navbarOpen" : ""}`}>
      <a href="/">
        <h2 className="logo">
          Geo<span className="color">Airbnb</span>
        </h2>
      </a>
      <nav className={menuOpen ? menuOpen : ""}>
        <div className="menuIcon" onClick={handleMenuToggle}>
          {/* Icono de hamburguesa */}
          <div className="iconLine"></div>
          <div className="iconLine"></div>
          <div className="iconLine"></div>
        </div>
        <ul className={`options_menu ${menuOpen ? "showMenu" : ""}`}>
          <li>
            <a href="/" onClick={handleMenuToggle}>
              Inicio
            </a>
          </li>
          <li>
            <a href="Mapa" onClick={handleMenuToggle}>
              Mapa
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}