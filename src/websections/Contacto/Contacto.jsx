import React, { useState, useEffect, useRef } from "react";
import styles from "./Contacto.module.css";
import CoolTitle from "../../components/CoolTitle/CoolTitle";
import Button from "../../components/Button/Button";
import IconLink from "../../components/IconLink/IconLink";
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md'; // Corrected import path
// Import ADICIONALES_DATA
import { ADICIONALES_DATA } from "../../components/AdicionalesCard/AdicionalesCard";

const initialFormData = {
  nombreCompleto: "",
  email: "",
  tipoConsulta: "",
  tipoWeb: "",
  nombreNegocio: "", // Added for restaurant/brand name
  redSocialEspecifica: "", // Added for specific social network
  servicioContratado: "", // Added for service related to support
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

  const handleSendAnotherMessage = () => {
    setFormData(initialFormData);
    setSelectedPlan("");
    setFormErrors({});
    setFormSuccess(false);
    // Optionally, scroll back to the top of the form or a specific field
    const formTitleElement = document.querySelector(`.${styles.formTitle}`);
    if (formTitleElement) {
      formTitleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleTipoConsultaChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      tipoWeb: value !== "paginaWeb" ? "" : prevData.tipoWeb,
      nombreNegocio: value !== "paginaWeb" ? "" : prevData.nombreNegocio, // Reset nombreNegocio
      selectedAdicionales: value !== "paginaWeb" ? [] : prevData.selectedAdicionales,
      redSocialEspecifica: value !== "redesSociales" ? "" : prevData.redSocialEspecifica, // Reset if not redesSociales
      servicioContratado: value !== "soporteTecnico" ? "" : prevData.servicioContratado, // Reset if not soporteTecnico
    }));
    setFormErrors((prevErrors) => ({ 
      ...prevErrors, 
      [name]: "",
      tipoWeb: value !== "paginaWeb" ? "" : prevErrors.tipoWeb,
      nombreNegocio: value !== "paginaWeb" ? "" : prevErrors.nombreNegocio, // Clear error
      redSocialEspecifica: value !== "redesSociales" ? "" : prevErrors.redSocialEspecifica, // Clear error
      servicioContratado: value !== "soporteTecnico" ? "" : prevErrors.servicioContratado, // Clear error
    }));
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      if (name === "tipoWeb" && value !== "restaurantes" && value !== "marcas") {
        newData.nombreNegocio = ""; // Reset if tipoWeb is not restaurante or marcas
      }
      return newData;
    });
    setFormErrors((prevErrors) => ({ 
      ...prevErrors, 
      [name]: "",
      ...(name === "tipoWeb" && value !== "restaurantes" && value !== "marcas" && { nombreNegocio: "" }) // Clear error
    }));
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
    if (
      formData.tipoConsulta === "paginaWeb" &&
      (formData.tipoWeb === "restaurantes" || formData.tipoWeb === "marcas") &&
      !formData.nombreNegocio.trim()
    ) {
      errors.nombreNegocio = "El nombre del negocio es obligatorio para este rubro.";
    }
    if (formData.tipoConsulta === "redesSociales" && !formData.redSocialEspecifica) {
      errors.redSocialEspecifica = "Selecciona una red social.";
    }
    if (formData.tipoConsulta === "soporteTecnico" && !formData.servicioContratado) {
      errors.servicioContratado = "Selecciona el servicio para el cual necesitas soporte.";
    }
    if (!formData.mensaje.trim()) {
      // Dynamic error message based on context could be added here if needed,
      // but "Debes contarnos sobre tu proyecto." is general enough.
      // For example:
      if (formData.tipoConsulta === "soporteTecnico") {
        errors.mensaje = "Debes describir el problema técnico.";
      } else if (formData.tipoConsulta === "otro") {
        errors.mensaje = "Debes redactar tu mensaje.";
      } else {
        errors.mensaje = "Debes contarnos sobre tu proyecto.";
      }
    }
    // Return the errors object directly
    return errors;
  };

  const handleDropdownWheelScroll = (event) => {
    const element = event.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = element;
    const deltaY = event.deltaY;
    const scrollSpeedFactor = 0.5; // Adjust this value to control speed (e.g., 0.5 for half speed)

    // If the element is not scrollable (e.g., content fits within clientHeight),
    // or if there's no vertical scroll attempt, let the default behavior occur.
    if (scrollHeight <= clientHeight || deltaY === 0) {
      return;
    }

    const isScrollingUp = deltaY < 0;
    const isScrollingDown = deltaY > 0;

    const atTop = scrollTop === 0;
    // Consider it at the bottom if the scrollable content's end is reached or very slightly exceeded.
    // Using >= handles potential floating point issues better than ===.
    const atBottom = scrollTop + clientHeight >= scrollHeight;

    if ((isScrollingUp && atTop) || (isScrollingDown && atBottom)) {
      // If scrolling up when at the top, or scrolling down when at the bottom,
      // allow the default page scroll.
      return;
    }

    // Otherwise, we are scrolling within the bounds of the dropdown.
    // Prevent the default page scroll.
    event.preventDefault();
    // Stop the event from bubbling up to parent elements, which might also try to scroll.
    event.stopPropagation();
    // Manually scroll the dropdown element.
    element.scrollTop += deltaY * scrollSpeedFactor;
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
      // const netlifyForm = event.target; // Not needed if not using Netlify directly via JS
      // const netlifyFormData = new FormData(netlifyForm); // Or use formData directly if constructing manually

      // If using a different backend, prepare your data here:
      // For example, if your backend expects JSON:
      // const submissionData = { ...formData };
      // delete submissionData.honeypot; // Don't send honeypot
      // if (selectedPlan) {
      //  submissionData.tipoPlan = selectedPlan;
      // }
      // submissionData.selectedAdicionales = formData.selectedAdicionales;


      try {
        // IMPORTANT: If not using Netlify, replace this fetch call
        // with your own backend submission logic.
        // For example, if you have an API endpoint:
        // const response = await fetch("YOUR_BACKEND_ENDPOINT_URL", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(submissionData),
        // });
        // if (!response.ok) {
        //   const errorText = await response.text();
        //   throw new Error(`Form submission failed: ${response.status} ${response.statusText}. Details: ${errorText}`);
        // }
        
        // Assuming submission is successful if you implement your backend call above
        // For now, we'll proceed as if it was successful to allow WhatsApp redirection.
        // Remove or adjust this if your backend call fails.
        console.log("Form data that would be submitted:", formData);
        if (selectedPlan) console.log("Selected plan:", selectedPlan);


        setFormSuccess(true); // Actual success (or assumed success for now)

        // Construct WhatsApp message from the user's perspective
        let message = "¡Hola! 👋 Te escribo desde tu formulario web con los siguientes datos:\n\n";
        message += `👤 *Mi Nombre:* ${formData.nombreCompleto}\n`;
        message += `📧 *Mi Email:* ${formData.email}\n`;
        message += `🤔 *Tipo de Consulta:* ${formData.tipoConsulta}\n`;

        if (formData.tipoConsulta === "paginaWeb") {
          if (formData.tipoWeb) {
            message += `🌐 *El rubro de la web que me interesa es:* ${formData.tipoWeb}\n`;
            if ((formData.tipoWeb === "restaurantes" || formData.tipoWeb === "marcas") && formData.nombreNegocio) {
              message += `🏢 *Nombre del Negocio:* ${formData.nombreNegocio}\n`;
            }
          }
          if (selectedPlan) {
            let planFullName = "";
            if (selectedPlan === "basica") planFullName = "Web Básica / Landing Page";
            else if (selectedPlan === "estandar") planFullName = "Web Estándar / Multi-página";
            else if (selectedPlan === "premium") planFullName = "Web Premium / Avanzada";
            message += `📄 *Tomo como referencia el plan:* ${planFullName || selectedPlan}\n`;
          }
          if (formData.selectedAdicionales.length > 0) {
            message += `✨ *Adicionales que me interesan:* ${formData.selectedAdicionales.join(', ')}\n`;
          }
        } else if (formData.tipoConsulta === "redesSociales") {
          if (formData.redSocialEspecifica) {
            message += `📱 *Red Social de Interés:* ${formData.redSocialEspecifica}\n`;
          }
        } else if (formData.tipoConsulta === "soporteTecnico") {
          if (formData.servicioContratado) {
            message += `🛠️ *Soporte para el Servicio:* ${formData.servicioContratado}\n`;
          }
        }
        message += `\n📝 *Sobre mi proyecto:*\n${formData.mensaje}\n\n`;
        message += `💡 *Te conocí por:* ${formData.comoConociste}\n\n`;
        message += "¡Aguardo tu respuesta!";


        const whatsappNumber = "5491123867041";
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
        
        // Try opening WhatsApp using window.open
        const whatsappWindow = window.open(whatsappUrl, '_blank');
        if (!whatsappWindow || whatsappWindow.closed || typeof whatsappWindow.closed === 'undefined') {
          // This block can be used if window.open is blocked by a popup blocker
          // For now, we'll rely on the user seeing the success message on the page
          // and potentially manually copying the info if redirection fails.
          // Alternatively, you could fall back to window.location.href here,
          // or the anchor click method, as a last resort.
          console.warn("WhatsApp window might have been blocked. Trying location.href as fallback.");
          window.location.href = whatsappUrl;
        }

        setFormData(initialFormData);
        setSelectedPlan("");
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
      const fieldOrder = ['nombreCompleto', 'email', 'tipoConsulta', 'redSocialEspecifica', 'servicioContratado', 'tipoWeb', 'nombreNegocio', 'mensaje']; // Added servicioContratado
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
                <Button 
                  label="Enviar otro mensaje" 
                  onClick={handleSendAnotherMessage} 
                  effect="neon" 
                  size="small" 
                  className={styles.sendAnotherButton} 
                />
              </div>
            ) : (
              <>
                <h3 className={styles.formTitle}>Envíame un mensaje</h3>
                <form 
                  className={styles.formulario} 
                  autoComplete="off" 
                  name="contact" 
                  method="POST" 
                  // Removed data-netlify="true" and data-netlify-honeypot
                  // If you are not using Netlify, you might want to set your own 'action' URL
                  // or handle submission entirely via JavaScript (as started above).
                  // action="YOUR_SERVER_SIDE_ENDPOINT" // Example if you have a server endpoint
                  onSubmit={handleSubmit}
                >
                  {/* Netlify hidden field for form name - remove if not using Netlify */}
                  {/* <input type="hidden" name="form-name" value="contact" /> */}
                  
                  {/* Honeypot field, visually hidden. Keep this for bot prevention. */}
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
                      <option value="soporteTecnico">Soporte técnico</option> {/* Updated text */}
                      <option value="redesSociales">Redes sociales</option>
                      <option value="otro">Otro</option>
                    </select>
                    {/* This line displays the error message if formErrors.tipoConsulta exists */}
                    {formErrors.tipoConsulta && <p className={styles.errorMessage}>{formErrors.tipoConsulta}</p>}
                  </div>
                  {formData.tipoConsulta === "redesSociales" && (
                    <div className={styles.formGroup}>
                      <label htmlFor="redSocialEspecifica" className={styles.label}>¿Qué red social? *</label>
                      <select
                        id="redSocialEspecifica"
                        name="redSocialEspecifica"
                        className={`${styles.select} ${formErrors.redSocialEspecifica ? styles.inputError : ''}`}
                        value={formData.redSocialEspecifica}
                        onChange={handleChange}
                        required={formData.tipoConsulta === "redesSociales"}
                      >
                        <option value="" disabled>Selecciona una red social</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Otra">Otra (especificar en mensaje)</option>
                      </select>
                      {formErrors.redSocialEspecifica && <p className={styles.errorMessage}>{formErrors.redSocialEspecifica}</p>}
                    </div>
                  )}
                  {formData.tipoConsulta === "soporteTecnico" && (
                    <div className={styles.formGroup}>
                      <label htmlFor="servicioContratado" className={styles.label}>Servicio contratado (para soporte) *</label>
                      <select
                        id="servicioContratado"
                        name="servicioContratado"
                        className={`${styles.select} ${formErrors.servicioContratado ? styles.inputError : ''}`}
                        value={formData.servicioContratado}
                        onChange={handleChange}
                        required={formData.tipoConsulta === "soporteTecnico"}
                      >
                        <option value="" disabled>Selecciona un servicio</option>
                        <option value="Página web">Página web</option>
                        <option value="Redes sociales">Redes sociales</option>
                      </select>
                      {formErrors.servicioContratado && <p className={styles.errorMessage}>{formErrors.servicioContratado}</p>}
                    </div>
                  )}
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
                        <option value="otroWeb">Otros (especificar luego)</option> {/* Corrected line */}
                      </select>
                      {/* This line displays the error message if formErrors.tipoWeb exists */}
                      {formErrors.tipoWeb && <p className={styles.errorMessage}>{formErrors.tipoWeb}</p>}
                    </div>
                  )}
                  {formData.tipoConsulta === "paginaWeb" && (formData.tipoWeb === "restaurantes" || formData.tipoWeb === "marcas") && (
                    <div className={styles.formGroup}>
                      <label htmlFor="nombreNegocio" className={styles.label}>
                        Nombre {formData.tipoWeb === "restaurantes" ? "del Restaurante" : "de la Marca"} *
                      </label>
                      <input
                        type="text"
                        id="nombreNegocio"
                        name="nombreNegocio"
                        className={`${styles.input} ${formErrors.nombreNegocio ? styles.inputError : ''}`}
                        value={formData.nombreNegocio}
                        onChange={handleChange}
                        required={formData.tipoWeb === "restaurantes" || formData.tipoWeb === "marcas"}
                      />
                      {formErrors.nombreNegocio && <p className={styles.errorMessage}>{formErrors.nombreNegocio}</p>}
                    </div>
                  )}
                  {formData.tipoConsulta === "paginaWeb" && ( 
                    <div className={styles.formGroup}>
                      <label htmlFor="tipoPlan" className={styles.label}>
                        <a href="#planes" className={styles.planLink}>Tipo de Plan (para referencia) *</a>
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
                      <label className={styles.label}>
                        <a href="#adicionales" className={styles.planLink}>Adicionales (opcional)</a>
                      </label>
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
                            {ADICIONALES_DATA.filter(adicional => !adicional.disabled).map(adicional => (
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
                  {(() => {
                    let mensajeLabel = "Hablanos más sobre tu proyecto *";
                    let mensajePlaceholder = "Contame los detalles de tu idea, objetivos, o qué necesitas...";

                    if (formData.tipoConsulta === "soporteTecnico") {
                      mensajeLabel = "Hablanos sobre tu problema técnico *";
                      mensajePlaceholder = "Describe el problema técnico que estás experimentando detalladamente...";
                    } else if (formData.tipoConsulta === "otro") {
                      mensajeLabel = "Redacta tu mensaje *";
                      mensajePlaceholder = "Escribe aquí tu consulta o el motivo de tu contacto...";
                    } else if (formData.tipoConsulta === "redesSociales") {
                      mensajeLabel = "Detalla tu consulta sobre redes sociales *";
                      mensajePlaceholder = "Contame los detalles de tu idea, objetivos, o qué necesitas...";
                    }
                    // For "paginaWeb", the default "Hablanos más sobre tu proyecto *" is appropriate.

                    return (
                      <div className={styles.formGroup}>
                        <label htmlFor="mensaje" className={styles.label}>{mensajeLabel}</label>
                        <textarea
                          id="mensaje"
                          name="mensaje"
                          rows={5}
                          className={`${styles.textarea} ${formErrors.mensaje ? styles.inputError : ''}`}
                          value={formData.mensaje}
                          onChange={handleChange}
                          placeholder={mensajePlaceholder}
                          required
                        />
                        {formErrors.mensaje && <p className={styles.errorMessage}>{formErrors.mensaje}</p>}
                      </div>
                    );
                  })()}
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
                  <Button 
                    label="Enviar Mensaje por WhatsApp" 
                    icon={FaWhatsapp} 
                    effect="primary" 
                    size="medium" 
                    type="submit" 
                    color="black"
                    className={styles.submitButton} 
                  />
                </form>
              </>
            )}
          </div>
          <div className={styles.infoDirectaWrapper}>
            <h3 className={styles.infoTitle}>Información de Contacto</h3>
            <p className={styles.infoText}>
              Si tenes una consulta rápida, no dudes en utilizar estos canales:
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
