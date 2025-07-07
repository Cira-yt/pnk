import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const RegisterGestor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rut: '',
    nombre_completo: '',
    fecha_nacimiento: '',
    correo: '',
    password: '',
    password2: '',
    sexo: '',
    telefono: '',
    certificado: null
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Establecer la fecha máxima como hoy
    const fechaInput = document.getElementById('fecha_nacimiento');
    if (fechaInput) {
      const hoy = new Date();
      const formatoFecha = hoy.toISOString().split('T')[0];
      fechaInput.max = formatoFecha;
    }
  }, []);

  // Función para validar RUT chileno
  const validarRut = (rut) => {
    if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) return false;
    const tmp = rut.split('-');
    const digv = tmp[1].toLowerCase();
    const rutNum = tmp[0];
    return String(dv(rutNum)).toLowerCase() === digv;
  };

  const dv = (T) => {
    let M = 0, S = 1;
    for (; T; T = Math.floor(T/10))
      S = (S + T % 10 * (9 - M++ % 6)) % 11;
    const res = S ? S - 1 : 'k';
    return String(res);
  };

  // Función para validar contraseña
  const validarPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  // Función para validar email
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Función para validar teléfono
  const validarTelefono = (telefono) => {
    const regex = /^\+569\d{8}$/;
    return regex.test(telefono);
  };

  // Función para validar fecha de nacimiento
  const validarFechaNacimiento = (fecha) => {
    const fechaSeleccionada = new Date(fecha);
    const hoy = new Date();
    return fechaSeleccionada <= hoy;
  };

  // Función para validar archivo
  const validarArchivo = (file) => {
    if (!file) return false;
    const tiposPermitidos = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const tamanoMaximo = 5 * 1024 * 1024; // 5MB
    return tiposPermitidos.includes(file.type) && file.size <= tamanoMaximo;
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar campos vacíos
    Object.keys(formData).forEach(key => {
      if (key !== 'certificado' && !formData[key]) {
        newErrors[key] = 'Este campo es obligatorio';
      }
    });

    // Validar certificado
    if (!formData.certificado) {
      newErrors.certificado = 'Debe subir un certificado de antecedentes';
    } else if (!validarArchivo(formData.certificado)) {
      newErrors.certificado = 'El archivo debe ser PDF, JPG, JPEG o PNG y no mayor a 5MB';
    }

    // Validar RUT
    if (formData.rut && !validarRut(formData.rut)) {
      newErrors.rut = 'El RUT ingresado no es válido';
    }

    // Validar email
    if (formData.correo && !validarEmail(formData.correo)) {
      newErrors.correo = 'El correo electrónico no es válido';
    }

    // Validar contraseña
    if (formData.password && !validarPassword(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un carácter especial';
    }

    // Validar que las contraseñas coincidan
    if (formData.password && formData.password2 && formData.password !== formData.password2) {
      newErrors.password2 = 'Las contraseñas no coinciden';
    }

    // Validar teléfono
    if (formData.telefono && !validarTelefono(formData.telefono)) {
      newErrors.telefono = 'El teléfono debe tener el formato +569XXXXXXXX';
    }

    // Validar fecha de nacimiento
    if (formData.fecha_nacimiento && !validarFechaNacimiento(formData.fecha_nacimiento)) {
      newErrors.fecha_nacimiento = 'La fecha de nacimiento no puede ser una fecha futura';
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
      const response = await authAPI.registerGestor(formData);
      if (response.success) {
        alert('¡Registro exitoso! Tu cuenta de gestor ha sido creada correctamente');
        navigate('/');
      } else {
        alert('Error en el registro: ' + (response.message || 'Hubo un error al registrar el usuario'));
      }
    } catch (error) {
      console.error('Error en registro:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert('Error: ' + error.response.data.error);
      } else {
        alert('Error: ' + (error.message || 'Error al conectar con el servidor'));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'certificado') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="registro-forma">
      <h2>Registro de Gestor Inmobiliario Free</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="rut">RUN:</label>
          <input
            type="text"
            name="rut"
            id="rut"
            placeholder="12345678-9"
            value={formData.rut}
            onChange={handleChange}
          />
          {errors.rut && <div className="error-message">{errors.rut}</div>}
        </div>

        <div className="input-group">
          <label htmlFor="nombre_completo">Nombre Completo:</label>
          <input
            type="text"
            name="nombre_completo"
            id="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleChange}
          />
          {errors.nombre_completo && <div className="error-message">{errors.nombre_completo}</div>}
        </div>

        <div className="input-group">
          <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
          <input
            type="date"
            name="fecha_nacimiento"
            id="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
          />
          {errors.fecha_nacimiento && <div className="error-message">{errors.fecha_nacimiento}</div>}
        </div>

        <div className="input-group">
          <label htmlFor="correo">Correo Electrónico:</label>
          <input
            type="email"
            name="correo"
            id="correo"
            value={formData.correo}
            onChange={handleChange}
          />
          {errors.correo && <div className="error-message">{errors.correo}</div>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Ingrese Contraseña:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <small>Mínimo 8 caracteres, una mayúscula, una minúscula y un carácter especial</small>
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        <div className="input-group">
          <label htmlFor="password2">Ingrese Contraseña Nuevamente:</label>
          <input
            type="password"
            name="password2"
            id="password2"
            value={formData.password2}
            onChange={handleChange}
          />
          {errors.password2 && <div className="error-message">{errors.password2}</div>}
        </div>

        <div className="input-group">
          <label htmlFor="sexo">Ingrese Sexo:</label>
          <select
            name="sexo"
            id="sexo"
            value={formData.sexo}
            onChange={handleChange}
          >
            <option value="">Seleccione...</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>
          {errors.sexo && <div className="error-message">{errors.sexo}</div>}
        </div>

        <div className="input-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="text"
            name="telefono"
            id="telefono"
            placeholder="+56912345678"
            value={formData.telefono}
            onChange={handleChange}
          />
          {errors.telefono && <div className="error-message">{errors.telefono}</div>}
        </div>

        <div className="input-group">
          <label htmlFor="certificado">Certificado de Antecedentes:</label>
          <input
            type="file"
            name="certificado"
            id="certificado"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
          />
          <small>Formatos permitidos: PDF, JPG, JPEG, PNG (máximo 5MB)</small>
          {errors.certificado && <div className="error-message">{errors.certificado}</div>}
        </div>

        <button type="submit">Registrarse</button>
      </form>

      <div className="button">
        <a href="/">Volver</a>
      </div>
    </div>
  );
};

export default RegisterGestor;