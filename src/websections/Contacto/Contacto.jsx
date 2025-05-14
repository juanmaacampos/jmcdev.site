import React, { useState, useEffect, useRef } from "react";
import styles from "./Contacto.module.css";
import CoolTitle from "../../components/CoolTitle/CoolTitle";
import Button from "../../components/Button/Button";
import IconLink from "../../components/IconLink/IconLink";
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
// Import ADICIONALES_DATA
import { ADICIONALES_DATA } from "../../components/AdicionalesCard/AdicionalesCard";

const initialFormData = {
  nombreCompleto: "",
  email: "",
  tipoConsulta: "",
  tipoWeb: "",
  mensaje: "",
  comoConociste: "",
  honeypot: "", // Honeypot field
  selectedAdicionales: [], // New field for selected adicionales
};

export default function Contacto() {
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(""); 
  const [fieldToFocusOnError, setFieldToFocusOnError] = useState(null); // New state for scrolling
  const [showAdicionalesPicker, setShowAdicionalesPicker] = useState(false); // State for picker visibility

  const adicionalesPickerRef = useRef(null); // Ref for the dropdown container
  const adicionalesButtonRef = useRef(null); // Ref for the toggle button

  const handleTipoConsultaChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      // Reset tipoWeb if tipoConsulta is not paginaWeb
      tipoWeb: value !== "paginaWeb" ? "" : prevData.tipoWeb,
      selectedAdicionales: value !== "paginaWeb" ? [] : prevData.selectedAdicionales, // Reset adicionales
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    if (name === "tipoConsulta" && value !== "paginaWeb") {
      setFormErrors((prevErrors) => ({ ...prevErrors, tipoWeb: "" }));
    }
  };
  
  const handleChange = (event) => {
    const { name, value, type, options } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleAdicionalToggle = (adicionalName) => {
    setFormData((prevData) => {
      const newSelectedAdicionales = prevData.selectedAdicionales.includes(adicionalName)
        ? prevData.selectedAdicionales.filter(name => name !== adicionalName)
        : [...prevData.selectedAdicionales, adicionalName];
      return { ...prevData, selectedAdicionales: newSelectedAdicionales };
    });
  };

  // Effect to read plan from URL hash
  useEffect(() => {
    const getPlanFromHash = () => {
      const hash = window.location.hash; // Example: #contacto?plan=Web%20Básica%20%2F%20Landing%20Page
      if (hash.includes('?plan=')) {
        const planValueEncoded = hash.split('?plan=')[1];
        if (planValueEncoded) {
          const decodedPlanFullName = decodeURIComponent(planValueEncoded);
          
          let planShortValue = "";
          if (decodedPlanFullName === "Web Básica / Landing Page") {
            planShortValue = "basica";
          } else if (decodedPlanFullName === "Web Estándar / Multi-página") {
            planShortValue = "estandar";
          } else if (decodedPlanFullName === "Web Premium / Avanzada") {
            planShortValue = "premium";
          }

          if (planShortValue) {
            setSelectedPlan(planShortValue);
            setFormData((prevData) => ({ ...prevData, tipoConsulta: "paginaWeb" }));
          } else {
            setSelectedPlan(""); // Reset if the plan name from hash is not recognized
          }
        }
      } else {
        // If no plan in hash, or if it was removed, reset selectedPlan
        // This part might be optional depending on desired behavior when hash is cleared
        // setSelectedPlan(""); 
      }
    };

    getPlanFromHash(); // Run on component mount
    window.addEventListener('hashchange', getPlanFromHash, false);
    return () => {
      window.removeEventListener('hashchange', getPlanFromHash, false);
    };
  }, []); // Empty dependency array
  
  // useEffect to scroll to the field with error
  useEffect(() => {
    if (fieldToFocusOnError) {
      const errorFieldElement = document.getElementById(fieldToFocusOnError);
      if (errorFieldElement) {
        errorFieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // errorFieldElement.focus({ preventScroll: true }); // Optionally focus
      }
      setFieldToFocusOnError(null); // Reset after scrolling/focusing
    }
  }, [fieldToFocusOnError]);

  // Effect to handle clicks outside the adicionales picker
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        adicionalesPickerRef.current &&
        !adicionalesPickerRef.current.contains(event.target) &&
        adicionalesButtonRef.current &&
        !adicionalesButtonRef.current.contains(event.target)
      ) {
        setShowAdicionalesPicker(false);
      }
    }

    if (showAdicionalesPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAdicionalesPicker]);

  const validateForm = () => {
    const errors = {};
    if (!formData.nombreCompleto.trim() || formData.nombreCompleto.trim().length < 2) {
      errors.nombreCompleto = "El nombre debe tener al menos 2 caracteres.";
    }
    if (!formData.email.trim()) {
      errors.email = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "El formato del correo electrónico no es válido.";
    }
    if (!formData.tipoConsulta) {
      errors.tipoConsulta = "Selecciona un tipo de consulta.";
    }
    if (formData.tipoConsulta === "paginaWeb" && !formData.tipoWeb) {
      errors.tipoWeb = "Selecciona el rubro de la web.";
    }
    if (!formData.mensaje.trim()) {
      errors.mensaje = "El mensaje no puede estar vacío.";
    }
    // Return the errors object directly
    return errors;
  };

  const handleDropdownWheelScroll = (event) => {
    const element = event.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = element;
    const deltaY = event.deltaY; // How much the user is trying to scroll

    // Check if the element is scrollable
    if (scrollHeight > clientHeight) {
      // If scrolling up and at the top, or scrolling down and at the bottom,
      // allow default behavior (page scroll).
      if ((scrollTop === 0 && deltaY < 0) || (scrollTop + clientHeight === scrollHeight && deltaY > 0)) {
        return; // Allow page scroll
      }
      // Otherwise, prevent page scroll and scroll the dropdown
      event.preventDefault();
      element.scrollTop += deltaY;
    }
    // If not scrollable, do nothing, allow page scroll
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFieldToFocusOnError(null); // Reset focus state on new submission attempt

    if (formData.honeypot) {
      console.log("Honeypot field filled. Likely a bot.");
      setFormSuccess(false);
      return;
    }

    const currentErrors = validateForm();
    setFormErrors(currentErrors); // This updates the state that the JSX uses for error display

    if (Object.keys(currentErrors).length === 0) {
      // setFormSuccess(true); // Set success after successful fetch
      const netlifyForm = event.target;
      const netlifyFormData = new FormData(netlifyForm);
      
      // Add selectedPlan if applicable
      if (formData.tipoConsulta === "paginaWeb" && selectedPlan) {
        netlifyFormData.set('tipoPlan', selectedPlan);
      }

      // Add selectedAdicionales
      // Netlify handles multiple values for the same field name if appended individually
      // Or, ensure the select name is "selectedAdicionales[]" for PHP-style array handling by Netlify.
      // For simplicity with FormData, we can append each or join.
      // Let's ensure the name attribute on the select is just "selectedAdicionales"
      // and Netlify should pick them up if they are submitted.
      // If using FormData, we need to explicitly add them if the select name doesn't automatically get picked up for all selected options.
      // A common way is to remove any existing 'selectedAdicionales' and then append.
      netlifyFormData.delete('selectedAdicionales'); // Clear if already set by default select
      formData.selectedAdicionales.forEach(adicional => {
        netlifyFormData.append('selectedAdicionales', adicional);
      });


      try {
        await fetch("/", {
          method: "POST",
          // headers: { "Content-Type": "application/x-www-form-urlencoded" }, // Not needed when sending FormData
          body: netlifyFormData, // Send FormData directly
        });
        setFormSuccess(true); // Actual success
        setFormData(initialFormData);
        setSelectedPlan("");
        // setFormErrors({}); // Errors are already empty
        const successMessageElement = document.querySelector(`.${styles.successMessage}`);
        if (successMessageElement) {
            successMessageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } catch (error) {
        console.error("Error submitting form to Netlify:", error);
        // Preserve existing field errors and add/update the submit error
        setFormErrors(prevErrors => ({ ...prevErrors, submit: "Hubo un error al enviar el mensaje. Intenta de nuevo." }));
        setFormSuccess(false); // Set to false on error
      }
    } else {
      setFormSuccess(false);
      const fieldOrder = ['nombreCompleto', 'email', 'tipoConsulta', 'tipoWeb', 'mensaje'];
      let firstErrorFieldId = null;
      for (const fieldName of fieldOrder) {
        if (currentErrors[fieldName]) {
          firstErrorFieldId = fieldName;
          break;
        }
      }
      if (firstErrorFieldId) {
        setFieldToFocusOnError(firstErrorFieldId); // Trigger useEffect for scrolling
      }
    }
  };

  return (
    <section className={styles.contactoNuevaSection} id="contacto">
      <div className={styles.container}>
        <CoolTitle className={styles.titulo}>Hablemos de tu Proyecto</CoolTitle>
        <p className={styles.subtitulo}>
          Completa el formulario o contáctame directamente. ¡Estoy listo para ayudarte a convertir tu idea en realidad!
        </p>
        <div className={styles.contenidoGrid}>
          <div className={styles.formularioWrapper}>
            {formSuccess ? (
              <div className={styles.successMessage}>
                <h3>¡Mensaje Enviado!</h3>
                <p>Gracias por contactarnos. Te responderé a la brevedad.</p>
              </div>
            ) : (
              <>
                <h3 className={styles.formTitle}>Envíame un mensaje</h3>
                <form 
                  className={styles.formulario} 
                  autoComplete="off" 
                  name="contact" 
                  method="POST" 
                  data-netlify="true"
                  data-netlify-honeypot="bot-field" // Connect to Netlify's honeypot
                  onSubmit={handleSubmit}
                >
                  {/* Netlify hidden field for form name */}
                  <input type="hidden" name="form-name" value="contact" />
                  {/* Honeypot field, visually hidden */}
                  <p className={styles.hiddenHoneypot} style={{ display: 'none' }}>
                    <label>
                      Don’t fill this out if you’re human: <input name="bot-field" value={formData.honeypot} onChange={handleChange} />
                    </label>
                  </p>

                  <div className={styles.formGroup}>
                    <label htmlFor="nombreCompleto" className={styles.label}>Nombre completo *</label>
                    <input
                      type="text"
                      id="nombreCompleto"
                      name="nombreCompleto"
                      // This line applies the error class if formErrors.nombreCompleto exists
                      className={`${styles.input} ${formErrors.nombreCompleto ? styles.inputError : ''}`}
                      value={formData.nombreCompleto}
                      onChange={handleChange}
                      required // Keep for basic browser validation
                    />
                    {/* This line displays the error message if formErrors.nombreCompleto exists */}
                    {formErrors.nombreCompleto && <p className={styles.errorMessage}>{formErrors.nombreCompleto}</p>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Correo electrónico *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      // This line applies the error class if formErrors.email exists
                      className={`${styles.input} ${formErrors.email ? styles.inputError : ''}`}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {/* This line displays the error message if formErrors.email exists */}
                    {formErrors.email && <p className={styles.errorMessage}>{formErrors.email}</p>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="tipoConsulta" className={styles.label}>Tipo de consulta *</label>
                    <select
                      id="tipoConsulta"
                      name="tipoConsulta"
                      // This line applies the error class if formErrors.tipoConsulta exists
                      className={`${styles.select} ${formErrors.tipoConsulta ? styles.inputError : ''}`}
                      value={formData.tipoConsulta} // Controlled component
                      onChange={handleTipoConsultaChange} // Use specific handler
                      required
                    >
                      <option value="" disabled>Selecciona una opción</option>
                      <option value="paginaWeb">Página web</option>
                      <option value="soporteTecnico">Soporte técnico (Especificar problema en mensaje)</option>
                      <option value="redesSociales">Redes sociales</option>
                      <option value="otro">Otro</option>
                    </select>
                    {/* This line displays the error message if formErrors.tipoConsulta exists */}
                    {formErrors.tipoConsulta && <p className={styles.errorMessage}>{formErrors.tipoConsulta}</p>}
                  </div>
                  {formData.tipoConsulta === "paginaWeb" && (
                    <div className={styles.formGroup}> {/* Ensure this div wraps the following elements */}
                      <label htmlFor="tipoWeb" className={styles.label}>¿A qué rubro va orientada? *</label>
                      <select
                        id="tipoWeb"
                        name="tipoWeb"
                        // This line applies the error class if formErrors.tipoWeb exists
                        className={`${styles.select} ${formErrors.tipoWeb ? styles.inputError : ''}`}
                        value={formData.tipoWeb}
                        onChange={handleChange}
                        required={formData.tipoConsulta === "paginaWeb"}
                      >
                        <option value="" disabled>Selecciona el rubro</option>
                        <option value="restaurantes">Restaurantes</option>
                        <option value="marcas">Marcas</option>
                        <option value="paginaPersonal">Página personal</option>
                        <option value="otroWeb">Otros (especificar luego)</option>
                      </select>
                      {/* This line displays the error message if formErrors.tipoWeb exists */}
                      {formErrors.tipoWeb && <p className={styles.errorMessage}>{formErrors.tipoWeb}</p>}
                    </div>
                  )}
                  {formData.tipoConsulta === "paginaWeb" && ( 
                    <div className={styles.formGroup}>
                      <label htmlFor="tipoPlan" className={styles.label}>
                        <a href="#planes" className={styles.planLink}>Tipo de Plan (para referencia)</a>
                      </label>
                      <select
                        id="tipoPlan"
                        name="tipoPlan" // This name must match what Netlify expects
                        className={styles.select}
                        value={selectedPlan} // Value from its own state
                        onChange={(e) => setSelectedPlan(e.target.value)} 
                      >
                        <option value="" disabled>Selecciona un plan</option>
                        <option value="basica">Web Básica / Landing Page</option>
                        <option value="estandar">Web Estandar/ Multi-pagina</option>
                        <option value="premium">Web Premium/ Avanzada</option>
                      </select>
                      {/* No specific error for tipoPlan as it's for reference */}
                    </div>
                  )}
                  {formData.tipoConsulta === "paginaWeb" && (
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Adicionales (opcional)</label>
                      <div className={styles.adicionalesPickerContainer}>
                        <button
                          type="button"
                          className={styles.adicionalesPickerButton}
                          onClick={() => setShowAdicionalesPicker(!showAdicionalesPicker)}
                          ref={adicionalesButtonRef} // Assign ref to the button
                        >
                          {showAdicionalesPicker ? "Cerrar Selección" : "Seleccionar Adicionales..."}
                        </button>
                        {showAdicionalesPicker && (
                          <div 
                            className={styles.adicionalesDropdown} 
                            ref={adicionalesPickerRef} 
                            onWheel={handleDropdownWheelScroll} // Add wheel event handler
                          >
                            {ADICIONALES_DATA.map(adicional => (
                              <div
                                key={adicional.id}
                                className={`${styles.adicionalDropdownItem} ${formData.selectedAdicionales.includes(adicional.name) ? styles.adicionalDropdownItemSelected : ''}`}
                                onClick={() => handleAdicionalToggle(adicional.name)}
                              >
                                <input
                                  type="checkbox"
                                  readOnly
                                  checked={formData.selectedAdicionales.includes(adicional.name)}
                                  className={styles.adicionalCheckbox}
                                />
                                {adicional.name}
                              </div>
                            ))}
                          </div>
                        )}
                        {formData.selectedAdicionales.length > 0 && (
                          <div className={styles.adicionalesPillsContainer}>
                            {formData.selectedAdicionales.map(adicionalName => (
                              <div key={adicionalName} className={styles.adicionalPill}>
                                {adicionalName}
                                <button
                                  type="button"
                                  className={styles.removePillButton}
                                  onClick={() => handleAdicionalToggle(adicionalName)}
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* Hidden inputs for Netlify submission for selectedAdicionales */}
                      {formData.selectedAdicionales.map(adicionalName => (
                        <input type="hidden" name="selectedAdicionales" value={adicionalName} key={`hidden-${adicionalName}`} />
                      ))}
                    </div>
                  )}
                  <div className={styles.formGroup}> {/* Ensure this div wraps the following elements */}
                    <label htmlFor="mensaje" className={styles.label}>Mensaje *</label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={5}
                      // This line applies the error class if formErrors.mensaje exists
                      className={`${styles.textarea} ${formErrors.mensaje ? styles.inputError : ''}`}
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                    />
                    {/* This line displays the error message if formErrors.mensaje exists */}
                    {formErrors.mensaje && <p className={styles.errorMessage}>{formErrors.mensaje}</p>}
                  </div> {/* Remove one of the two closing divs that was here */}
                  <div className={styles.formGroup}>
                    <label htmlFor="comoConociste" className={styles.label}>¿Cómo nos conociste? *</label>
                    <select
                      id="comoConociste"
                      name="comoConociste"
                      className={styles.select}
                      value={formData.comoConociste}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Selecciona una opción</option>
                      <option value="busqueda">Búsqueda en internet</option>
                      <option value="redesSociales">Redes sociales</option>
                      <option value="recomendacion">Recomendación</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  {formErrors.submit && <p className={styles.errorMessage}>{formErrors.submit}</p>}
                  <Button label="Enviar Mensaje Ahora" effect="primary" size="big" type="submit" className={styles.submitButton} />
                </form>
              </>
            )}
          </div>
          <div className={styles.infoDirectaWrapper}>
            <h3 className={styles.infoTitle}>Información de Contacto</h3>
            <p className={styles.infoText}>
              Si preferís un contacto más directo o tenés una consulta rápida, no dudes en utilizar estos canales:
            </p>
            <div className={styles.infoItem}>
              <IconLink 
                icon={MdEmail}
                to="jmcdevdigital@gmail.com" 
                label="Email"
                effect="scale"
                color="#55d3c4"
                className={styles.infoIcon}
                external
                size="medium"
                showColorAlways={true}
              />
              <div>
                <strong>Email:</strong>
                <a href="mailto:jmcdevdigital@gmail.com" className={styles.infoLink}>jmcdevdigital@gmail.com</a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <IconLink 
                icon={FaWhatsapp}
                to="https://wa.me/5491123867041" 
                label="WhatsApp"
                effect="scale"
                color="#25D366"
                className={styles.infoIcon}
                external
                size="medium"
                showColorAlways={true}
              />
              <div>
                <strong>WhatsApp:</strong>
                <a href="https://wa.me/5491123867041" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                  +54 9 11 2386-7041
                </a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <IconLink 
                icon={FaInstagram}
                to="https://instagram.com/jmcdev_" 
                label="Instagram"
                effect="scale"
                color="#E4405F"
                className={styles.infoIcon}
                external
                size="medium"
                showColorAlways={true}
              />
              <div>
                <strong>Instagram:</strong>
                <a href="https://instagram.com/jmcdev_" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                  @jmcdev_
                </a>
              </div>
            </div>
            <p className={styles.availabilityInfo}>
              Disponible todos los días, no dudes en consultar!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
