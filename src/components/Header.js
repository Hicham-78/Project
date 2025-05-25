// src/components/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { FaUserPlus } from 'react-icons/fa';

export default function Header({ onOpenModal }) {
  return (
    <header className="site-header">
      {/* Logo + titre */}
      <div className="header-left">
        <img src="/favicon.ico" alt="Logo" className="logo-img" />
        <h1 className="logo-title">IT-QUALITY</h1>
      </div>

      {/* Navigation */}
      <nav className="header-nav">
        <ul className="nav-menu">
          <li><NavLink to="/recruteur">Recruteur</NavLink></li>
          <li><NavLink to="/missions/freelance">Freelance</NavLink></li>
          <li><NavLink to="/missions/cdi">CDI</NavLink></li>
          <li><NavLink to="/formatheque">Formathèque</NavLink></li>
        </ul>
      </nav>

      {/* Bouton Auth */}
      <div className="header-right">
        <button className="auth-button" onClick={onOpenModal}>
          <FaUserPlus />
          <span>Inscription / Connexion</span>
        </button>
      </div>
    </header>
  );
}
