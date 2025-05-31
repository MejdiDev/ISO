import axios from 'axios';

const apiurl = "http://localhost:5000/api"; // âœ… CorrigÃ© ici

// ðŸ”„ Obtenir tous les utilisateurs
export async function getAllUsers() {
  return await axios.get(`${apiurl}/users`);
}

// ðŸ‘¤ Obtenir un utilisateur par ID
export async function getUserById(id) {
  return await axios.get(`${apiurl}/users/${id}`);
}

// âž• Ajouter un utilisateur
export async function addUser(userData) {
  return await axios.post(`${apiurl}/register`, userData); // âœ… pointÃ© sur /register
}

// âœï¸ Mettre Ã  jour un utilisateur
export async function updateUser(userData, idUser) {
  return await axios.put(`${apiurl}/users/${idUser}`, userData);
}

// âŒ Supprimer un utilisateur
export async function deleteUser(id) {
  return await axios.delete(`${apiurl}/users/${id}`);
}

// ðŸ” Connexion
export async function login(userData) {
  return await axios.post(`${apiurl}/login`, userData); // âœ… pointÃ© sur /login
}

// ðŸ“ Inscription
export async function registerUser(userData) {
  return await axios.post(`${apiurl}/register`, userData);
}

// ðŸ“§ Envoyer un code de vÃ©rification (non implÃ©mentÃ© cÃ´tÃ© backend)
export async function sendCode(email) {
  return await axios.post(`${apiurl}/send-code`, { email });
}

// âœ… VÃ©rifier le code
export async function verifyCode(email, code) {
  return await axios.post(`${apiurl}/verify-code`, { email, code });
}

// ðŸ”‘ RÃ©initialiser le mot de passe
export async function resetPassword(email, newPassword) {
  return await axios.post(`${apiurl}/reset-password`, { email, newPassword });
}
