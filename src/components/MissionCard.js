// src/components/MissionCard.js
import React from 'react';
import './MissionCard.css';

export default function MissionCard({ imageUrl, title, type, skills, location, budget }) {
  return (
    <div className="mission-card">
      {imageUrl && (
        <div className="mission-image-wrapper">
          <img src={imageUrl} alt={title} className="mission-image" />
        </div>
      )}
      <h3 className="mission-title">{title}</h3>
      <p className="mission-type">{type}</p>
      <p className="mission-skills">{skills.join(', ')}</p>
      <p className="mission-location">{location}</p>
      <p className="mission-budget">{budget}</p>
      <button className="apply-button">Postuler</button>
    </div>
  );
}
