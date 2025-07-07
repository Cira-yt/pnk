import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { propertiesAPI } from '../services/api';
import Login from './Login';
import PropertyCard from '../components/PropertyCard';
import FilterForm from '../components/FilterForm';
import Swal from 'sweetalert2';

const Home = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    tipo_propiedad: '',
    region: '',
    provincia: '',
    comuna: '',
    sector: ''
  });

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [properties, filters]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const data = await propertiesAPI.getAll();
      setProperties(data);
      setFilteredProperties(data);
    } catch (error) {
      console.error('Error cargando propiedades:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar las propiedades'
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...properties];

    if (filters.tipo_propiedad) {
      filtered = filtered.filter(prop => prop.tipo_propiedad === filters.tipo_propiedad);
    }
    if (filters.region) {
      filtered = filtered.filter(prop => prop.region === filters.region);
    }
    if (filters.provincia) {
      filtered = filtered.filter(prop => prop.provincia === filters.provincia);
    }
    if (filters.comuna) {
      filtered = filtered.filter(prop => prop.comuna === filters.comuna);
    }
    if (filters.sector) {
      filtered = filtered.filter(prop => prop.sector === filters.sector);
    }

    setFilteredProperties(filtered);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!user && <Login />}
      
      <div className="container">
        <FilterForm 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="galeria">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard 
              key={property.num_propiedad}
              property={property}
              formatCurrency={formatCurrency}
            />
          ))
        ) : (
          <div className="text-center" style={{ gridColumn: '1 / -1', padding: '40px' }}>
            <h3>No se encontraron propiedades</h3>
            <p>Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 