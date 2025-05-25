import React, { useState } from 'react';
import './InscriptionModal.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const skillsList = [
  'Cybersécurité',
  'IA et Machine Learning',
  'Technologies Cloud',
  'UX/UI',
  'Développement de logiciels',
  'Gestion de projet Agile',
  'Analyse de données',
  'Pratiques DevOps',
  'Langages et Frameworks Front-End',
  'Langages et Frameworks Back-End',
  'CI/CD et Automatisation',
  'Compétences en communication',
  'Esprit critique',
  'Adaptabilité rapide',
  'Compréhension globale du développement'
];

const InscriptionModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('inscription');

  // États inscription
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [emailInscription, setEmailInscription] = useState('');
  const [passwordInscription, setPasswordInscription] = useState('');
  const [metier, setMetier] = useState('Freelance');
  const [selectedSkills, setSelectedSkills] = useState([]);

  // États connexion
  const [emailConnexion, setEmailConnexion] = useState('');
  const [passwordConnexion, setPasswordConnexion] = useState('');

  // États messages & loading
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleInscription = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, emailInscription, passwordInscription);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        nom,
        prenom,
        email: emailInscription,
        metier,
        competences: selectedSkills,
        dateInscription: new Date()
      });

      setSuccessMessage("Inscription réussie !");
      // reset form
      setNom('');
      setPrenom('');
      setEmailInscription('');
      setPasswordInscription('');
      setMetier('Freelance');
      setSelectedSkills([]);

      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 1500);

    } catch (error) {
      setErrorMessage("Erreur d'inscription : " + error.message);
    }

    setLoading(false);
  };

  const handleConnexion = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, emailConnexion, passwordConnexion);
      setSuccessMessage("Connexion réussie !");
      // reset form
      setEmailConnexion('');
      setPasswordConnexion('');

      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 1500);

    } catch (error) {
      setErrorMessage("Erreur de connexion : " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-tabs">
          <button
            className={activeTab === 'inscription' ? 'active' : ''}
            onClick={() => { setActiveTab('inscription'); setErrorMessage(''); setSuccessMessage(''); }}
            disabled={loading}
          >
            Inscription
          </button>
          <button
            className={activeTab === 'connexion' ? 'active' : ''}
            onClick={() => { setActiveTab('connexion'); setErrorMessage(''); setSuccessMessage(''); }}
            disabled={loading}
          >
            Connexion
          </button>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {activeTab === 'inscription' && (
          <form className="inscription-form" onSubmit={handleInscription}>
            <div className="form-group">
              <label>Nom :</label>
              <input
                type="text"
                placeholder="Votre nom"
                value={nom}
                onChange={e => setNom(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Prénom :</label>
              <input
                type="text"
                placeholder="Votre prénom"
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Email :</label>
              <input
                type="email"
                placeholder="Votre email"
                value={emailInscription}
                onChange={e => setEmailInscription(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Mot de passe :</label>
              <input
                type="password"
                placeholder="Mot de passe"
                value={passwordInscription}
                onChange={e => setPasswordInscription(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Type de profil :</label>
              <select
                value={metier}
                onChange={e => setMetier(e.target.value)}
                disabled={loading}
              >
                <option>Freelance</option>
                <option>CDI</option>
                <option>Recruteur</option>
              </select>
            </div>
            <div className="form-group">
              <label>Compétences :</label>
              <div className="skills-options">
                {skillsList.map(skill => (
                  <label key={skill} className="skill-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => toggleSkill(skill)}
                      disabled={loading}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>
            <div className="modal-actions">
              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? 'Patientez...' : "S'inscrire"}
              </button>
              <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>
                Annuler
              </button>
            </div>
          </form>
        )}

        {activeTab === 'connexion' && (
          <form className="inscription-form" onSubmit={handleConnexion}>
            <div className="form-group">
              <label>Email :</label>
              <input
                type="email"
                placeholder="Votre email"
                value={emailConnexion}
                onChange={e => setEmailConnexion(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Mot de passe :</label>
              <input
                type="password"
                placeholder="Mot de passe"
                value={passwordConnexion}
                onChange={e => setPasswordConnexion(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="modal-actions">
              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? 'Patientez...' : "Se connecter"}
              </button>
              <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default InscriptionModal;
