// src/pages/MissionsFreelance.js
import React, { useState } from 'react';
import MissionCard from '../components/MissionCard';
import './MissionsFreelance.css';

export default function MissionsFreelance() {
  const [missions, setMissions] = useState([
    {
      imageUrl: '',
      title: 'Dév React Senior',
      type: 'Freelance',
      skills: ['React', 'Node.js', 'GraphQL'],
      location: 'Remote',
      budget: '€500/j',
    },
  ]);

  // Contrôle de l'affichage de la modale
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    imageFile: null,
    imagePreview: '',
    title: '',
    type: 'Freelance',
    skills: '',
    location: '',
    budget: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleImage = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm(f => ({ ...f, imageFile: file, imagePreview: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newMission = {
      imageUrl: form.imagePreview,
      title: form.title,
      type: form.type,
      skills: form.skills.split(',').map(s => s.trim()),
      location: form.location,
      budget: form.budget,
    };
    setMissions(ms => [newMission, ...ms]);
    setForm({
      imageFile: null,
      imagePreview: '',
      title: '',
      type: 'Freelance',
      skills: '',
      location: '',
      budget: '',
    });
    setShowModal(false);
  };

  return (
    <section className="missions-page">
      <h2>Missions Freelance Disponibles</h2>
      <button className="open-modal-btn" onClick={() => setShowModal(true)}>
        + Ajouter une mission
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Nouvelle Mission</h3>
            <form className="mission-form" onSubmit={handleSubmit}>
              <div className="form-group image-group">
                <label>
                  Image
                  <input type="file" accept="image/*" onChange={handleImage} />
                </label>
                {form.imagePreview && (
                  <img
                    src={form.imagePreview}
                    alt="preview"
                    className="preview-image"
                  />
                )}
              </div>
              <div className="form-group">
                <label>
                  Titre
                  <input name="title" value={form.title} onChange={handleChange} required />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Type
                  <select name="type" value={form.type} onChange={handleChange}>
                    <option>Freelance</option>
                    <option>CDI</option>
                  </select>
                </label>
              </div>
              <div className="form-group">
                <label>
                  Compétences (virgule séparées)
                  <input name="skills" value={form.skills} onChange={handleChange} required />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Localisation
                  <input name="location" value={form.location} onChange={handleChange} />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Budget
                  <input name="budget" value={form.budget} onChange={handleChange} />
                </label>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="submit-btn">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="missions-grid">
        {missions.map((m, i) => (
          <MissionCard key={i} {...m} />
        ))}
      </div>
    </section>
  );
}

