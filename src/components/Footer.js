import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-izquierda">
          <img src="/img/Logo.png" alt="Logo PNK" className="logo-footer" />
          <div className="titulo-footer">PNK INMOBILIARIA</div>
        </div>

        <nav className="footer-centro">
          <Link to="/registro-propietario" className="enlace-footer">
            Registro Propietario
          </Link>
          <Link to="/registro-gestor" className="enlace-footer">
            Registro Gestor
          </Link>
        </nav>

        <nav className="footer-derecha">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src="/img/logo-insta.png" alt="Logo instagram" className="logo-footer" />
          </a>
          <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">
            <img src="/img/linkedin.png" alt="Logo Linkedin" className="logo-footer" />
          </a>
        </nav>
      </footer>

      <div className="copyright">
        &copy; 2025 Todos los derechos Reservados PNK Inmobiliaria
      </div>
    </>
  );
};

export default Footer; 