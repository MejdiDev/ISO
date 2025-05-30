// src/views/AppTest.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AppTest() {
  const [backendData, setBackendData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/test')
      .then(response => {
        console.log('Réponse du backend:', response.data);
        setBackendData(response.data);
      })
      .catch(err => {
        console.error('Erreur:', err);
        setError(err.message);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test de Connexion Frontend-Backend avec Axios</h1>

      {error ? (
        <div style={{ color: 'red' }}>
          <h2>Erreur de connexion</h2>
          <p>{error}</p>
          <ul>
            <li>Serveur backend actif ?</li>
            <li>Pas de blocage CORS ?</li>
            <li>URL correcte ?</li>
          </ul>
        </div>
      ) : backendData ? (
        <div style={{ color: 'green' }}>
          <h2>Connexion réussie 🎉</h2>
          <p>Status MongoDB : <strong>{backendData.data.dbStatus}</strong></p>
          <pre>{JSON.stringify(backendData, null, 2)}</pre>
        </div>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

export default AppTest;
