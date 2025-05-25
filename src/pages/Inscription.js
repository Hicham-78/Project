import React, { useState, useEffect } from 'react';
import './Inscription.css';
import { useNavigate } from 'react-router-dom';

import { auth, db } from '../firebase'; // Ajuste le chemin
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const skillsOptions = {
  QA: ['Selenium', 'Cypress', 'JUnit', 'TestRail', 'Postman'],
  DEV: ['React', 'Node.js', 'Java', 'Python', 'Docker'],
  PO: ['Jira', 'Confluence', 'Roadmapping', 'Stakeholder Management'],
  Scrum: ['Scrum', 'Kanban', 'Facilitation', 'Coaching'],
  Data: ['SQL', 'Python', 'R', 'Tableau', 'Power BI'],
};

export default function Inscription() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState('register'); // 'register' ou 'login'
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null); // data Firestore

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
        setShowModal(false);
        navigate('/offres'); // redirige automatiquement connecté
      } else {
        setUser(null);
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Reset skills when profileType changes
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

  const submitRegister = async e => {
    e.preventDefault();
    setErrorMsg('');
    if (registerForm.password !== registerForm.confirmPassword) {
      setErrorMsg("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerForm.email,
        registerForm.password
      );
      const firebaseUser = userCredential.user;

      await setDoc(doc(db, "users", firebaseUser.uid), {
        firstName: registerForm.firstName,
        lastName: registerForm.lastName,
        email: registerForm.email,
        profileType,
        skills: registerForm.skills,
        location: registerForm.location,
        availability: registerForm.availability,
        createdAt: new Date(),
      });

      // Reset form & close modal handled by onAuthStateChanged
      setRegisterForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        skills: [],
        location: '',
        availability: 'Immediately',
      });
    } catch (error) {
      setErrorMsg(error.message);
    }
    setLoading(false);
  };

  const submitLogin = async e => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
      // Fermeture et redirection gérées par onAuthStateChanged
      setLoginForm({ email: '', password: '' });
    } catch (error) {
      setErrorMsg(error.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/'); // redirige vers page connexion après déconnexion
  };

  return (
    <section className="inscription-page">
      <h2>Inscription / Connexion</h2>

      {!user ? (
        <button className="open-modal-btn" onClick={() => setShowModal(true)}>
          S’inscrire / Se connecter
        </button>
      ) : (
        <div className="user-info">
          <p>Bienvenue, {userData ? userData.firstName : user.email} !</p>
          <button onClick={handleLogout}>Se déconnecter</button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-tabs">
              <button
                className={tab === 'register' ? 'active' : ''}
                onClick={() => {
                  setTab('register');
                  setErrorMsg('');
                }}
                disabled={loading}
              >
                Inscription
              </button>
              <button
                className={tab === 'login' ? 'active' : ''}
                onClick={() => {
                  setTab('login');
                  setErrorMsg('');
                }}
                disabled={loading}
              >
                Connexion
              </button>
            </div>

            {errorMsg && <p className="error-message">{errorMsg}</p>}

            {tab === 'register' ? (
              <form className="inscription-form" onSubmit={submitRegister}>
                {/* formulaire inscription (comme dans ton code) */}
                <div className="form-group">
                  <label>Profil</label>
                  <select
                    name="profileType"
                    value={profileType}
                    onChange={e => setProfileType(e.target.value)}
                    disabled={loading}
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
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label>Nom</label>
                  <input
                    name="lastName"
                    value={registerForm.lastName}
                    onChange={handleRegisterChange}
                    required
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label>Disponibilité</label>
                  <select
                    name="availability"
                    value={registerForm.availability}
                    onChange={handleRegisterChange}
                    disabled={loading}
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
                    disabled={loading}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Chargement...' : 'Valider'}
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowModal(false)}
                    disabled={loading}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Chargement...' : 'Se connecter'}
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
