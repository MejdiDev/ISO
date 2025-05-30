import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// 📋 AUDIT API FUNCTIONS
export const fetchAudits = async () => {
  return await api.get('/audits');
};

export const createAudit = async (data) => {
  return await api.post('/audits', data);
};

export const updateAudit = async (id, data) => {
  return await api.put(`/audits/${id}`, data);
};

export const deleteAudit = async (id) => {
  return await api.delete(`/audits/${id}`);
};


export default api;
