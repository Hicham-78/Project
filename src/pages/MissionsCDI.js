import React from 'react';
import MissionCard from '../components/MissionCard';

const missions = [
  {
    title: 'Product Owner',
    type: 'CDI',
    skills: ['Agile', 'Jira', 'Communication'],
    location: 'Paris',
    budget: '€60k/an',
  },
  {
    title: 'Scrum Master',
    type: 'CDI',
    skills: ['Scrum', 'Leadership', 'Coaching'],
    location: 'Remote',
    budget: '€55k/an',
  },
];

export default function MissionsCDI() {
  return (
    <section className="missions-page">
      <h2>Missions CDI Disponibles</h2>
      <div className="missions-grid">
        {missions.map((m, i) => (
          <MissionCard key={i} {...m} />
        ))}
      </div>
    </section>
  );
}
