import React, { useState } from 'react';

export default function Offres() {
  const [filter, setFilter] = useState('CDI');

  return (
    <section>
      <h1>Offres {filter}</h1>
      <div>
        <button onClick={() => setFilter('CDI')}>CDI</button>
        <button onClick={() => setFilter('Freelance')}>Freelance</button>
      </div>

      {/* Ici ta barre de filtres et liste d’offres */}
      <div>
        {/* Exemple: affichage filtré */}
        <p>Liste des offres {filter}...</p>
      </div>
    </section>
  );
}
