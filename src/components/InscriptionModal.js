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

  // States inscription
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [emailInscription, setEmailInscription] = useState('');
  const [passwordInscription, setPasswordInscription] = useState('');
  const [metier, setMetier] = useState('Freelance');
  const [selectedSkills, setSelectedSkills] = useState([]);

  // States connexion
  const [emailConnexion, setEmailConnexion] = useState('');
  const [passwordConnexion, setPasswordConnexion] = useState('');

  if (!isOpen) return null;

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleInscription = async (e) => {
    e.preventDefault();
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

      alert("Inscription réussie !");
      onClose();
      // reset form
      setNom('');
      setPrenom('');
      setEmailInscription('');
      setPasswordInscription('');
      setMetier('Freelance');
      setSelectedSkills([]);
    } catch (error) {
      alert("Erreur d'inscription : " + error.message);
    }
  };

  const handleConnexion = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, emailConnexion, passwordConnexion);
      alert("Connecté !");
      onClose();
      // reset form
      setEmailConnexion('');
      setPasswordConnexion('');
    } catch (error) {
      alert("Erreur de connexion : " + error.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-tabs">
          <button
            className={activeTab === 'inscription' ? 'active' : ''}
            onClick={() => setActiveTab('inscription')}
          >
            Inscription
          </button>
          <button
            className={activeTab === 'connexion' ? 'active' : ''}
            onClick={() => setActiveTab('connexion')}
          >
            Connexion
          </button>
        </div>

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
              />
            </div>
            <div className="form-group">
              <label>Type de profil :</label>
              <select
                value={metier}
                onChange={e => setMetier(e.target.value)}
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
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>
            <div className="modal-actions">
              <button type="submit" className="submit-btn">S'inscrire</button>
              <button type="button" className="cancel-btn" onClick={onClose}>Annuler</button>
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
              />
            </div>
            <div className="modal-actions">
              <button type="submit" className="submit-btn">Se connecter</button>
              <button type="button" className="cancel-btn" onClick={onClose}>Annuler</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default InscriptionModal;
