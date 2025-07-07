import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, formatCurrency }) => {
  const formatUF = (uf) => {
    return new Intl.NumberFormat('es-CL', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(uf);
  };

  return (
    <div className="propiedad">
      <img 
        src={property.foto} 
        alt={property.titulo} 
        onError={(e) => {
          e.target.src = '/img/casa.jpg'; // Imagen por defecto
        }}
      />
      <div className="info-propiedad">
        <h3>{property.titulo}</h3>
        <div className="precios">
          <span className="uf">UF {formatUF(property.precio_uf)}</span>
          <span className="clp">{formatCurrency(property.precio_pesos)}</span>
          <Link 
            to={`/vermas/${property.num_propiedad}`} 
            className="btn-ver-mas"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard; 