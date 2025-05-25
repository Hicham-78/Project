import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import './Formatheque.css';

const allProfiles = [
  { name: 'Alice Dupont', role: 'QA Engineer', skills: ['Selenium','Cypress'], location: 'Paris', availability: 'Disponible', type: 'QA' },
  { name: 'Bob Martin', role: 'React Developer', skills: ['React','Node.js'], location: 'Lyon', availability: '2 semaines', type: 'DEV' },
  { name: 'Claire Leroy', role: 'Product Owner', skills: ['Agile','Jira'], location: 'Remote', availability: 'Disponible', type: 'PO' },
  { name: 'David Petit', role: 'Scrum Master', skills: ['Scrum','Leadership'], location: 'Marseille', availability: '1 mois', type: 'Scrum' },
  { name: 'Eva Bernard', role: 'Data Analyst', skills: ['Python','SQL'], location: 'Toulouse', availability: 'Disponible', type: 'Data' },
  // ... autres profils
];

const types = ['Tous', 'QA', 'DEV', 'PO', 'Scrum', 'Data'];

export default function Formatheque() {
  const [filter, setFilter] = useState('Tous');
  const filtered = filter === 'Tous' ? allProfiles : allProfiles.filter(p => p.type === filter);

  return (
    <section className="formatheque-page">
      <h2>Formathèque</h2>

      <div className="filters">
        {types.map(t => (
          <button
            key={t}
            className={`filter-btn ${filter === t ? 'active' : ''}`}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="profiles-grid">
        {filtered.map((p,i) => (
          <ProfileCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
}
