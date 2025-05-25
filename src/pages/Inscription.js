// src/pages/Inscription.js
import React, { useState, useEffect } from 'react';
import './Inscription.css';

// Mapping des compétences par profil
const skillsOptions = {
  QA: ['Selenium', 'Cypress', 'JUnit', 'TestRail', 'Postman'],
  DEV: ['React', 'Node.js', 'Java', 'Python', 'Docker'],
  PO: ['Jira', 'Confluence', 'Roadmapping', 'Stakeholder Management'],
  Scrum: ['Scrum', 'Kanban', 'Facilitation', 'Coaching'],
  Data: ['SQL', 'Python', 'R', 'Tableau', 'Power BI'],
};

export default function Inscription() {
  const [showModal, setShowModal] = useState(true);
  const [tab, setTab] = useState('register'); // 'register' ou 'login'

  const [profileType, setProfileType] = useState('DEV');
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    skills: [],
    location: '',
    availability: 'Immediately',
  });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  // Réinitialise les compétences quand profileType change
  useEffect(() => {
    setRegisterForm(f => ({ ...f, skills: [] }));
  }, [profileType]);

  const handleRegisterChange = e => {
    const { name, value } = e.target;
    setRegisterForm(f => ({ ...f, [name]: value }));
  };
  const handleSkillsChange = e => {
    const options = Array.from(e.target.selectedOptions).map(o => o.value);
    setRegisterForm(f => ({ ...f, skills: options }));
  };
  const handleLoginChange = e => {
    const { name, value } = e.target;
    setLoginForm(f => ({ ...f, [name]: value }));
  };

  const submitRegister = e => {
    e.preventDefault();
    console.log('Register:', { profileType, ...registerForm });
    setShowModal(false);
  };
  const submitLogin = e => {
    e.preventDefault();
    console.log('Login:', loginForm);
    setShowModal(false);
  };

  return (
    <section className="inscription-page">
      <h2>Inscription / Connexion</h2>
      <button className="open-modal-btn" onClick={() => setShowModal(true)}>
        S’inscrire / Se connecter
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {/* Onglets */}
            <div className="modal-tabs">
              <button
                className={tab === 'register' ? 'active' : ''}
                onClick={() => setTab('register')}
              >
                Inscription
              </button>
              <button
                className={tab === 'login' ? 'active' : ''}
                onClick={() => setTab('login')}
              >
                Connexion
              </button>
            </div>

            {tab === 'register' ? (
              <form className="inscription-form" onSubmit={submitRegister}>
                <div className="form-group">
                  <label>Profil</label>
                  <select
                    name="profileType"
                    value={profileType}
                    onChange={e => setProfileType(e.target.value)}
                  >
                    <option value="QA">QA</option>
                    <option value="DEV">Développeur</option>
                    <option value="PO">Product Owner</option>
                    <option value="Scrum">Scrum Master</option>
                    <option value="Data">Data Analyst</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Prénom</label>
                  <input
                    name="firstName"
                    value={registerForm.firstName}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nom</label>
                  <input
                    name="lastName"
                    value={registerForm.lastName}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Mot de passe</label>
                  <input
                    name="password"
                    type="password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirmer mot de passe</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={registerForm.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Compétences</label>
                  <select
                    name="skills"
                    multiple
                    size={skillsOptions[profileType].length}
                    value={registerForm.skills}
                    onChange={handleSkillsChange}
                  >
                    {skillsOptions[profileType].map(skill => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Localisation</label>
                  <input
                    name="location"
                    value={registerForm.location}
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="form-group">
                  <label>Disponibilité</label>
                  <select
                    name="availability"
                    value={registerForm.availability}
                    onChange={handleRegisterChange}
                  >
                    <option>Immediately</option>
                    <option>1 week</option>
                    <option>2 weeks</option>
                    <option>1 month</option>
                    <option>Negotiable</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="submit-btn">
                    Valider
                  </button>
                </div>
              </form>
            ) : (
              <form className="inscription-form" onSubmit={submitLogin}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Mot de passe</label>
                  <input
                    name="password"
                    type="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="submit-btn">
                    Se connecter
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
