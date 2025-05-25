import React from 'react';
import './ProfileCard.css';

export default function ProfileCard({ name, role, skills, location, availability }) {
  return (
    <div className="profile-card">
      <h3 className="profile-name">{name}</h3>
      <p className="profile-role">{role}</p>
      <p className="profile-skills">{skills.join(', ')}</p>
      <p className="profile-location">{location}</p>
      <p className="profile-availability">{availability}</p>
      <button className="contact-button">Contacter</button>
    </div>
  );
}
