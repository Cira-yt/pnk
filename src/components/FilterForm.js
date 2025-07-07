import React, { useState, useEffect } from 'react';
import { propertiesAPI } from '../services/api';

const FilterForm = ({ filters, onFilterChange }) => {
  const [ubicaciones, setUbicaciones] = useState({
    regiones: [],
    provincias: [],
    comunas: [],
    sectores: []
  });

  useEffect(() => {
    loadUbicaciones();
  }, []);

  const loadUbicaciones = async () => {
    try {
      const data = await propertiesAPI.getUbicaciones();
      setUbicaciones(data);
    } catch (error) {
      console.error('Error cargando ubicaciones:', error);
    }
  };

  const handleFilterChange = (filterName, value) => {
    onFilterChange(filterName, value);
  };

  return (
    <div className="caja-buscador">
      <h2 className="titulo-buscador mb-4">Buscador de Propiedades</h2>
      <div className="row g-3">
        <div className="col-md-6 col-lg-3">
          <div className="filtro-grupo">
            <label htmlFor="tipo_propiedad" className="form-label">Tipo</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-house"></i>
              </span>
              <select
                id="tipo_propiedad"
                name="tipo_propiedad"
                className="form-select"
                value={filters.tipo_propiedad}
                onChange={(e) => handleFilterChange('tipo_propiedad', e.target.value)}
              >
                <option value="">Seleccione tipo</option>
                <option value="1">Casas</option>
                <option value="2">Departamentos</option>
                <option value="3">Terrenos</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="filtro-grupo">
            <label htmlFor="region" className="form-label">Región</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-geo-alt"></i>
              </span>
              <select
                id="region"
                name="region"
                className="form-select"
                value={filters.region}
                onChange={(e) => handleFilterChange('region', e.target.value)}
              >
                <option value="">Seleccione región</option>
                {ubicaciones.regiones?.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="filtro-grupo">
            <label htmlFor="provincia" className="form-label">Provincia</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-geo"></i>
              </span>
              <select
                id="provincia"
                name="provincia"
                className="form-select"
                value={filters.provincia}
                onChange={(e) => handleFilterChange('provincia', e.target.value)}
              >
                <option value="">Seleccione provincia</option>
                {ubicaciones.provincias?.map((provincia) => (
                  <option key={provincia.id} value={provincia.id}>
                    {provincia.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="filtro-grupo">
            <label htmlFor="comuna" className="form-label">Comuna</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-geo"></i>
              </span>
              <select
                id="comuna"
                name="comuna"
                className="form-select"
                value={filters.comuna}
                onChange={(e) => handleFilterChange('comuna', e.target.value)}
              >
                <option value="">Seleccione comuna</option>
                {ubicaciones.comunas?.map((comuna) => (
                  <option key={comuna.id} value={comuna.id}>
                    {comuna.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="filtro-grupo">
            <label htmlFor="sector" className="form-label">Sector</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-pin-map"></i>
              </span>
              <select
                id="sector"
                name="sector"
                className="form-select"
                value={filters.sector}
                onChange={(e) => handleFilterChange('sector', e.target.value)}
              >
                <option value="">Seleccione sector</option>
                {ubicaciones.sectores?.map((sector) => (
                  <option key={sector.id} value={sector.id}>
                    {sector.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterForm; 