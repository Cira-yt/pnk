import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.usuario) {
      newErrors.usuario = 'Debe ingresar un usuario';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.usuario)) {
        newErrors.usuario = 'Debe ingresar un email válido';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Debe ingresar una contraseña';
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password = 'Debe ingresar una contraseña válida';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await authAPI.login(formData);
      
      if (response.success) {
        login(response.user);
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: 'Has iniciado sesión exitosamente'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: response.message || 'Credenciales incorrectas'
        });
      }
    } catch (error) {
      console.error('Error en login:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al conectar con el servidor'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="login-contenedor">
      <h2>Autenticación</h2>
      <img src="/img/key.png" alt="imagen" className="img-login" />
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="usuario">Usuario:</label>
          <input
            type="email"
            name="usuario"
            id="usuario"
            placeholder="ingrese email"
            value={formData.usuario}
            onChange={handleChange}
            required
          />
          {errors.usuario && <div className="error-message">{errors.usuario}</div>}
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="ingrese contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        
        <button type="submit">Ingresar</button>
      </form>
      
      <br />
      <div>
        <Link to="/recuperar" className="recuperar">Recuperar Contraseña</Link>
      </div>
    </div>
  );
};

export default Login; 