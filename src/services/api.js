import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL="http://localhost/pnk"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('procesa.php', credentials);
    return response.data;
  },
  
  registerPropietario: async (userData) => {
    const response = await api.post('procesar_propietario.php', userData);
    return response.data;
  },
  
  registerGestor: async (userData) => {
    const formData = new FormData();
    Object.keys(userData).forEach(key => {
      if (key === 'certificado' && userData[key] instanceof File) {
        formData.append(key, userData[key]);
      } else {
        formData.append(key, userData[key]);
      }
    });
    const response = await api.post('procesar_gestor.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  recuperarPassword: async (data) => {
    const response = await api.post('procesar_recuperacion.php', data);
    return response.data;
  },
};

export const propertiesAPI = {
  getAll: async () => {
    const response = await api.get('obtener_propiedades.php');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`obtener_propiedad.php?id=${id}`);
    return response.data;
  },
  
  getUbicaciones: async () => {
    const response = await api.get('obtener_ubicaciones.php');
    return response.data;
  },
};

export default api;