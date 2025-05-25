import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Inscription from './pages/Inscription';
import Offres from './pages/Offres';
import Header from './components/Header';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <Router>
      <Header user={user} />
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/offres" /> : <Inscription />} 
        />
        <Route 
          path="/offres" 
          element={user ? <Offres /> : <Navigate to="/" />} 
        />
        {/* Ajoute d’autres routes si besoin */}
      </Routes>
    </Router>
  );
}

export default App;
