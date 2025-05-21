import React, { useState } from 'react';
import './Contacto.css';
import { FaUser, FaPhone, FaCalendarAlt, FaUsers, FaUtensils, FaComments, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    fecha: '',
    hora: '',
    personas: '2',
    tipoConsulta: 'reserva',
    mensaje: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Por favor, ingresa tu nombre';
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'Por favor, ingresa tu teléfono';
    } else if (!/^[0-9+-\s]+$/.test(formData.telefono)) {
      newErrors.telefono = 'Formato de teléfono inválido';
    }
    
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (formData.tipoConsulta === 'reserva' && !formData.fecha) {
      newErrors.fecha = 'Selecciona una fecha';
    }
    
    if (formData.tipoConsulta === 'reserva' && !formData.hora) {
      newErrors.hora = 'Selecciona una hora';
    }
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Build WhatsApp message
    let message = `*Contacto desde Web - Bian Sushi*\n\n`;
    message += `*Nombre:* ${formData.nombre}\n`;
    message += `*Teléfono:* ${formData.telefono}\n`;
    
    if (formData.email) {
      message += `*Email:* ${formData.email}\n`;
    }
    
    message += `*Tipo de Consulta:* ${formData.tipoConsulta === 'reserva' ? 'Reserva' : 'Consulta General'}\n`;
    
    if (formData.tipoConsulta === 'reserva') {
      message += `*Fecha:* ${formData.fecha}\n`;
      message += `*Hora:* ${formData.hora}\n`;
      message += `*Cantidad de Personas:* ${formData.personas}\n`;
    }
    
    if (formData.mensaje) {
      message += `\n*Mensaje:*\n${formData.mensaje}\n`;
    }
    
    // Phone number for Bian Sushi (using the one from LocationSection)
    const phoneNumber = "5493489436924"; // Format for WhatsApp: country code + number without the first 0
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Mark as submitted for feedback
    setSubmitted(true);
    
    // Reset form after delay
    setTimeout(() => {
      setFormData({
        nombre: '',
        telefono: '',
        email: '',
        fecha: '',
        hora: '',
        personas: '2',
        tipoConsulta: 'reserva',
        mensaje: ''
      });
      setSubmitted(false);
    }, 3000);
  };
  
  // Get today's date for min date attribute
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <section className="contacto-section" id="contacto">
      <div className="contacto-background-design">
        <div className="contacto-pattern-left"></div>
        <div className="contacto-pattern-right"></div>
      </div>
      
      <div className="menu-title-wrapper">
        <h2 className="menu-title">Contáctanos</h2>
        <p className="menu-description">Reservas y consultas</p>
      </div>
      
      <div className="contacto-content">
        <div className="contacto-form-container">
          <form className="contacto-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="tipoConsulta" className="form-label">
                <span className="form-icon"><FaUtensils /></span>
                Tipo de consulta
              </label>
              <div className="tipo-consulta-selector">
                <label className={`tipo-option ${formData.tipoConsulta === 'reserva' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="tipoConsulta"
                    value="reserva"
                    checked={formData.tipoConsulta === 'reserva'}
                    onChange={handleChange}
                  />
                  <span>Reserva</span>
                </label>
                <label className={`tipo-option ${formData.tipoConsulta === 'consulta' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="tipoConsulta"
                    value="consulta"
                    checked={formData.tipoConsulta === 'consulta'}
                    onChange={handleChange}
                  />
                  <span>Consulta</span>
                </label>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre" className="form-label">
                  <span className="form-icon"><FaUser /></span>
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={errors.nombre ? 'form-input error' : 'form-input'}
                  placeholder="Tu nombre"
                />
                {errors.nombre && <div className="error-message">{errors.nombre}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="telefono" className="form-label">
                  <span className="form-icon"><FaPhone /></span>
                  Teléfono *
                </label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={errors.telefono ? 'form-input error' : 'form-input'}
                  placeholder="Tu número de contacto"
                />
                {errors.telefono && <div className="error-message">{errors.telefono}</div>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <span className="form-icon"><MdEmail /></span>
                Email (opcional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'form-input error' : 'form-input'}
                placeholder="tu@email.com"
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            
            {formData.tipoConsulta === 'reserva' && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fecha" className="form-label">
                      <span className="form-icon"><FaCalendarAlt /></span>
                      Fecha *
                    </label>
                    <input
                      type="date"
                      id="fecha"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleChange}
                      min={today}
                      className={errors.fecha ? 'form-input error' : 'form-input'}
                    />
                    {errors.fecha && <div className="error-message">{errors.fecha}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="hora" className="form-label">
                      <span className="form-icon"><FaCalendarAlt /></span>
                      Hora *
                    </label>
                    <select
                      id="hora"
                      name="hora"
                      value={formData.hora}
                      onChange={handleChange}
                      className={errors.hora ? 'form-input error' : 'form-input'}
                    >
                      <option value="">Selecciona</option>
                      <option value="12:00">12:00</option>
                      <option value="12:30">12:30</option>
                      <option value="13:00">13:00</option>
                      <option value="19:00">19:00</option>
                      <option value="19:30">19:30</option>
                      <option value="20:00">20:00</option>
                      <option value="20:30">20:30</option>
                      <option value="21:00">21:00</option>
                      <option value="21:30">21:30</option>
                      <option value="22:00">22:00</option>
                    </select>
                    {errors.hora && <div className="error-message">{errors.hora}</div>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="personas" className="form-label">
                    <span className="form-icon"><FaUsers /></span>
                    Cantidad de personas
                  </label>
                  <select
                    id="personas"
                    name="personas"
                    value={formData.personas}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="1">1 persona</option>
                    <option value="2">2 personas</option>
                    <option value="3">3 personas</option>
                    <option value="4">4 personas</option>
                    <option value="5">5 personas</option>
                    <option value="6">6 personas</option>
                    <option value="7">7 personas</option>
                    <option value="8">8 personas</option>
                    <option value="9+">9 o más personas</option>
                  </select>
                </div>
              </>
            )}
            
            <div className="form-group">
              <label htmlFor="mensaje" className="form-label">
                <span className="form-icon"><FaComments /></span>
                Mensaje (opcional)
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                className="form-input"
                placeholder={formData.tipoConsulta === 'reserva' 
                  ? "¿Algún requerimiento especial para tu reserva?" 
                  : "¿En qué podemos ayudarte?"}
                rows="4"
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">
              <FaWhatsapp className="whatsapp-icon" />
              {formData.tipoConsulta === 'reserva' 
                ? 'Reservar por WhatsApp' 
                : 'Enviar Consulta por WhatsApp'}
            </button>
            
            {submitted && (
              <div className="success-message">
                ¡Gracias! Se abrirá WhatsApp para completar tu {formData.tipoConsulta === 'reserva' ? 'reserva' : 'consulta'}.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
