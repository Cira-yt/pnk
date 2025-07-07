import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { authAPI } from '../services/api';

const Recuperar = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validarEmail = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validarEmail(email)) {
      setError('Ingresa un correo electrónico válido');
      return;
    }
    setLoading(true);
    try {
      const response = await authAPI.recuperarPassword({ correo: email });
      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: '¡Correo enviado!',
          text: 'Revisa tu bandeja de entrada para restablecer tu contraseña.'
        });
        setEmail('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.message || 'No se pudo enviar el correo de recuperación.'
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo conectar con el servidor.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-contenedor">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="correo">Correo electrónico:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          {error && <div className="error-message">{error}</div>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
        </button>
      </form>
      <div className="button" style={{ marginTop: 20 }}>
        <a href="/login">Volver al login</a>
      </div>
    </div>
  );
};

export default Recuperar; 