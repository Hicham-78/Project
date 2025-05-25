import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { FaUserPlus } from 'react-icons/fa';
import { getAuth, signOut } from 'firebase/auth';

export default function Header({ user, onOpenModal }) {
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Optionnel : tu peux faire un redirect ou reset état après déconnexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

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

      {/* Bouton Auth / Déconnexion */}
      <div className="header-right">
        {user ? (
          <>
            <span className="user-email">Connecté : {user.email}</span>
            <button className="auth-button logout-button" onClick={handleLogout}>
              Déconnexion
            </button>
          </>
        ) : (
          <button className="auth-button" onClick={onOpenModal}>
            <FaUserPlus />
            <span>Inscription / Connexion</span>
          </button>
        )}
      </div>
    </header>
  );
}
