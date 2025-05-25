import React, { useEffect, useState } from "react";
import axios from "axios";

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const API_URL = "https://www.thesportsdb.com/api/v1/json/1/eventsday.php?l=English%20Premier%20League&d=2024-02-15"; // Remplace par une vraie API dynamique

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(API_URL);
        setMatches(response.data.events || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des matchs", error);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Matchs en Direct ⚽</h1>
      {matches.length > 0 ? (
        <ul className="space-y-4">
          {matches.map((match) => (
            <li key={match.idEvent} className="p-3 border rounded-lg shadow">
              <p className="text-lg font-semibold">{match.strEvent}</p>
              <p className="text-sm">{match.dateEvent} - {match.strTime}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun match en cours...</p>
      )}
    </div>
  );
};

export default LiveMatches;
