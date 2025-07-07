import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import Swal from 'sweetalert2';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      logout();
      navigate('/');
      Swal.fire({
        icon: 'success',
        title: 'Sesión cerrada',
        text: 'Has cerrado sesión exitosamente'
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Aún así, limpiar el estado local
      logout();
      navigate('/');
    }
  };

  return (
    <header className="header">
      <div className="header-izquierda">
        <Link to="/">
          <img src="/img/Logo.png" alt="Logo PNK" className="logo" />
        </Link>
        <div className="titulo">PNK INMOBILIARIA</div>
      </div>

      <nav className="header-derecha">
        {user ? (
          <>
            <span className="bienvenida">
              Bienvenido, {user.nombre || user.usuario}
            </span>
            {user.tipo === 'propietario' && (
              <Link to="/dashboard-propietario" className="header-botones">
                Mi Panel
              </Link>
            )}
            <button onClick={handleLogout} className="header-botones">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/registro-propietario" className="header-botones">
              Crear Propietario
            </Link>
            <Link to="/registro-gestor" className="header-botones">
              Crear Gestor
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header; 