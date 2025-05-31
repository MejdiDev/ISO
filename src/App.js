import React, { useEffect, useState } from 'react';
// import App from './App'; // ❌ Supprimé car provoquait une boucle
import AnimatedLoginRegister from "views/auth/AnimatedLoginRegister";

function App() {
  const [backendData, setBackendData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Test de connexion au backend
    fetch('http://localhost:5000/api/test')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then(data => {
        console.log('Réponse du backend:', data);
        setBackendData(data);
      })
      .catch(err => {
        console.error('Erreur:', err);
        setError(err.message);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Connexion Frontend-Backend</h1>

      {error ? (
        <div style={{ color: 'red' }}>
          <h2>Erreur de connexion</h2>
          <p>{error}</p>
          <p>Vérifiez que :</p>
          <ul>
            <li>Le serveur backend est en cours d'exécution</li>
            <li>L'URL est correcte</li>
            <li>Il n'y a pas de problème CORS</li>
          </ul>
        </div>
      ) : backendData ? (
        <div style={{ color: 'green' }}>
          <h2>Connexion réussie !</h2>
          <pre>{JSON.stringify(backendData, null, 2)}</pre>
          <p>Status MongoDB: {backendData.data.dbStatus}</p>
        </div>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

export default App;
