import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Recruteur from './pages/Recruteur';
import MissionsFreelance from './pages/MissionsFreelance';
import MissionsCDI from './pages/MissionsCDI';
import Formatheque from './pages/Formatheque';
import InscriptionModal from './components/InscriptionModal'; // ✅ import modale.

function App() {
  const [showModal, setShowModal] = useState(false); // ✅ état pour gérer la modale

  return (
    <Router>
      {/* on passe la fonction d'ouverture au Header */}
      <Header onOpenModal={() => setShowModal(true)} /> 

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/recruteur" replace />} />
          <Route path="/recruteur" element={<Recruteur />} />
          <Route path="/missions/freelance" element={<MissionsFreelance />} />
          <Route path="/missions/cdi" element={<MissionsCDI />} />
          <Route path="/formatheque" element={<Formatheque />} />
          <Route path="*" element={<h2>404 - Page non trouvée</h2>} />
        </Routes>
      </main>

      {/* Affichage conditionnel de la modale */}
      <InscriptionModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </Router>
  );
}

export default App;
