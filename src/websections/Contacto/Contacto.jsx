import React, { useState, useEffect, useRef } from "react";
import styles from "./Contacto.module.css";
import CoolTitle from "../../components/CoolTitle/CoolTitle";
import Button from "../../components/Button/Button";
import IconLink from "../../components/IconLink/IconLink";
import { FaWhatsapp, FaInstagram, FaUser, FaQuestionCircle, FaShareAlt, FaTools, FaStore, FaListAlt, FaPlusCircle, FaCommentDots, FaSearch, FaBuilding, FaTag, FaLink } from 'react-icons/fa'; // Added FaLink
import { MdEmail } from 'react-icons/md'; // Corrected import path
// Import ADICIONALES_DATA
import { ADICIONALES_DATA } from "../../components/AdicionalesCard/AdicionalesCard"; // Import ADICIONALES_DATA
import { useLanguageTranslation } from "../../utils/languageUtils"; // Added

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
  selectedAdicionales: [], // Will store adicional IDs
};

export default function Contacto() {
  const { t } = useLanguageTranslation(); // Added
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
      selectedAdicionales: value !== "paginaWeb" ? [] : prevData.selectedAdicionales, // Stays as [] or current IDs
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

  const handleAdicionalToggle = (adicionalId) => {
    setFormData((prevData) => {
      const newSelectedAdicionales = prevData.selectedAdicionales.includes(adicionalId)
        ? prevData.selectedAdicionales.filter(id => id !== adicionalId)
        : [...prevData.selectedAdicionales, adicionalId];
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
      errors.nombreCompleto = t('contacto.form.errors.nombreCompletoMin');
    }
    if (!formData.email.trim()) {
      errors.email = t('contacto.form.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t('contacto.form.errors.emailInvalid');
    }
    if (!formData.tipoConsulta) {
      errors.tipoConsulta = t('contacto.form.errors.tipoConsultaRequired');
    }
    if (formData.tipoConsulta === "paginaWeb" && !formData.tipoWeb) {
      errors.tipoWeb = t('contacto.form.errors.tipoWebRequired');
    }
    if (
      formData.tipoConsulta === "paginaWeb" &&
      (formData.tipoWeb === "restaurantes" || formData.tipoWeb === "marcas") &&
      !formData.nombreNegocio.trim()
    ) {
      errors.nombreNegocio = t('contacto.form.errors.nombreNegocioRequired');
    }
    if (formData.tipoConsulta === "redesSociales" && !formData.redSocialEspecifica) {
      errors.redSocialEspecifica = t('contacto.form.errors.redSocialEspecificaRequired');
    }
    if (formData.tipoConsulta === "soporteTecnico" && !formData.servicioContratado) {
      errors.servicioContratado = t('contacto.form.errors.servicioContratadoRequired');
    }
    if (!formData.mensaje.trim()) {
      if (formData.tipoConsulta === "soporteTecnico") {
        errors.mensaje = t('contacto.form.errors.mensajeSoporteRequired');
      } else if (formData.tipoConsulta === "otro") {
        errors.mensaje = t('contacto.form.errors.mensajeOtroRequired');
      } else {
        errors.mensaje = t('contacto.form.errors.mensajeProyectoRequired');
      }
    }
    if (!formData.comoConociste) {
        errors.comoConociste = t('contacto.form.errors.comoConocisteRequired');
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
        let message = t('contacto.whatsapp.greeting') + "\n\n";
        message += `👤 *${t('contacto.whatsapp.myNameLabel')}:* ${formData.nombreCompleto}\n\n`; 
        message += `📧 *${t('contacto.whatsapp.myEmailLabel')}:* ${formData.email}\n\n`; 
        message += `🤔 *${t('contacto.whatsapp.consultationTypeLabel')}:* ${t(`contacto.form.options.consultationTypes.${formData.tipoConsulta === 'paginaWeb' ? 'webPage' : formData.tipoConsulta === 'soporteTecnico' ? 'techSupport' : formData.tipoConsulta === 'redesSociales' ? 'socialMedia' : 'other'}`)}\n\n`;

        if (formData.tipoConsulta === "paginaWeb") {
          if (formData.tipoWeb) {
            message += `🌐 *${t('contacto.whatsapp.webTypeLabel')}:* ${t(`contacto.form.options.webTypes.${formData.tipoWeb === 'restaurantes' ? 'restaurants' : formData.tipoWeb === 'marcas' ? 'brands' : formData.tipoWeb === 'paginaPersonal' ? 'personal' : 'otherWeb'}`)}\n\n`;
            if ((formData.tipoWeb === "restaurantes" || formData.tipoWeb === "marcas") && formData.nombreNegocio) {
              message += `🏢 *${formData.tipoWeb === "restaurantes" ? t('contacto.whatsapp.restaurantNameLabel') : t('contacto.whatsapp.brandNameLabel')}:* ${formData.nombreNegocio}\n\n`;
            }
          }
          if (selectedPlan) {
            let planFullName = "";
            if (selectedPlan === "basica") planFullName = t('contacto.form.options.plans.basic');
            else if (selectedPlan === "estandar") planFullName = t('contacto.form.options.plans.standard');
            else if (selectedPlan === "premium") planFullName = t('contacto.form.options.plans.premium');
            message += `📄 *${t('contacto.whatsapp.planReferenceLabel')}:* ${planFullName || selectedPlan}\n\n`; 
          }
          if (formData.selectedAdicionales.length > 0) {
            const translatedAdicionales = formData.selectedAdicionales.map(adicionalId => {
                const adicionalDataItem = ADICIONALES_DATA.find(item => item.id === adicionalId);
                return adicionalDataItem && adicionalDataItem.tKey ? t(adicionalDataItem.tKey) : adicionalId;
            }).join(', ');
            message += `✨ *${t('contacto.whatsapp.additionalServicesLabel')}:* ${translatedAdicionales}\n\n`; 
          }
        } else if (formData.tipoConsulta === "redesSociales") {
          if (formData.redSocialEspecifica) {
            // Ensure the key matches, e.g., 'instagram', 'facebook', 'other'
            const socialKey = formData.redSocialEspecifica.toLowerCase() === 'otra' ? 'other' : formData.redSocialEspecifica.toLowerCase();
            message += `📱 *${t('contacto.whatsapp.socialNetworkInterestLabel')}:* ${t(`contacto.form.options.socialNetworks.${socialKey}`)}\n\n`;
          }
        } else if (formData.tipoConsulta === "soporteTecnico") {
          if (formData.servicioContratado) {
            // Ensure the key matches, e.g., 'webPage', 'socialMedia'
            const serviceKey = formData.servicioContratado === 'Página web' ? 'webPage' : formData.servicioContratado === 'Redes sociales' ? 'socialMedia' : 'other';
            message += `🛠️ *${t('contacto.whatsapp.supportForServiceLabel')}:* ${t(`contacto.form.options.services.${serviceKey}`)}\n\n`;
          }
        }
        message += `📝 *${t('contacto.whatsapp.aboutMyProjectLabel')}:*\n${formData.mensaje}\n\n`;
        // Ensure the key matches, e.g., 'search', 'socialMedia', 'recommendation', 'other'
        const hearAboutKey = formData.comoConociste === 'busqueda' ? 'search' : 
                             formData.comoConociste === 'redesSociales' ? 'socialMedia' :
                             formData.comoConociste === 'recomendacion' ? 'recommendation' : 'other';
        message += `💡 *${t('contacto.whatsapp.howYouKnewMeLabel')}:* ${t(`contacto.form.options.hearAbout.${hearAboutKey}`)}\n\n`;
        message += t('contacto.whatsapp.waitingForReply');


        const whatsappNumber = "5491173677628";
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
        setFormErrors(prevErrors => ({ ...prevErrors, submit: t('contacto.form.errors.submitError') }));
        setFormSuccess(false); // Set to false on error
      }
    } else {
      setFormSuccess(false);
      const fieldOrder = ['nombreCompleto', 'email', 'tipoConsulta', 'redSocialEspecifica', 'servicioContratado', 'tipoWeb', 'nombreNegocio', 'mensaje', 'comoConociste']; // Added comoConociste
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
        <CoolTitle className={styles.titulo}>{t('contacto.title')}</CoolTitle>
        <p className={styles.subtitulo}>
          {t('contacto.subtitle')}
        </p>
        <div className={styles.contenidoGrid}>
          <div className={styles.formularioWrapper}>
            {formSuccess ? (
              <div className={styles.successMessage}>
                <h3>{t('contacto.form.success.title')}</h3>
                <p>{t('contacto.form.success.message')}</p>
                <Button 
                  label={t('contacto.form.buttons.sendAnother')}
                  onClick={handleSendAnotherMessage} 
                  effect="neon" 
                  size="small" 
                  className={styles.sendAnotherButton} 
                />
              </div>
            ) : (
              <>
                <h3 className={styles.formTitle}>{t('contacto.form.title')}</h3>
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
                    <label htmlFor="nombreCompleto" className={styles.label}><FaUser className={styles.labelIcon} /> {t('contacto.form.fields.name')}</label>
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
                    <label htmlFor="email" className={styles.label}><MdEmail className={styles.labelIcon} /> {t('contacto.form.fields.email')}</label>
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
                    <label htmlFor="tipoConsulta" className={styles.label}><FaQuestionCircle className={styles.labelIcon} /> {t('contacto.form.fields.consultationType')}</label>
                    <select
                      id="tipoConsulta"
                      name="tipoConsulta"
                      // This line applies the error class if formErrors.tipoConsulta exists
                      className={`${styles.select} ${formErrors.tipoConsulta ? styles.inputError : ''}`}
                      value={formData.tipoConsulta} // Controlled component
                      onChange={handleTipoConsultaChange} // Use specific handler
                      required
                    >
                      <option value="" disabled>{t('contacto.form.options.selectOption')}</option>
                      <option value="paginaWeb">{t('contacto.form.options.consultationTypes.webPage')}</option>
                      <option value="soporteTecnico">{t('contacto.form.options.consultationTypes.techSupport')}</option> {/* Updated text */}
                      <option value="redesSociales">{t('contacto.form.options.consultationTypes.socialMedia')}</option>
                      <option value="otro">{t('contacto.form.options.consultationTypes.other')}</option>
                    </select>
                    {/* This line displays the error message if formErrors.tipoConsulta exists */}
                    {formErrors.tipoConsulta && <p className={styles.errorMessage}>{formErrors.tipoConsulta}</p>}
                  </div>
                  {formData.tipoConsulta === "redesSociales" && (
                    <div className={styles.formGroup}>
                      <label htmlFor="redSocialEspecifica" className={styles.label}><FaShareAlt className={styles.labelIcon} /> {t('contacto.form.fields.socialNetwork')}</label>
                      <select
                        id="redSocialEspecifica"
                        name="redSocialEspecifica"
                        className={`${styles.select} ${formErrors.redSocialEspecifica ? styles.inputError : ''}`}
                        value={formData.redSocialEspecifica}
                        onChange={handleChange}
                        required={formData.tipoConsulta === "redesSociales"}
                      >
                        <option value="" disabled>{t('contacto.form.options.selectSocialNetwork')}</option>
                        <option value="Instagram">{t('contacto.form.options.socialNetworks.instagram')}</option>
                        <option value="Facebook">{t('contacto.form.options.socialNetworks.facebook')}</option>
                        <option value="Otra">{t('contacto.form.options.socialNetworks.other')}</option>
                      </select>
                      {formErrors.redSocialEspecifica && <p className={styles.errorMessage}>{formErrors.redSocialEspecifica}</p>}
                    </div>
                  )}
                  {formData.tipoConsulta === "soporteTecnico" && (
                    <div className={styles.formGroup}>
                      <label htmlFor="servicioContratado" className={styles.label}><FaTools className={styles.labelIcon} /> {t('contacto.form.fields.service')}</label>
                      <select
                        id="servicioContratado"
                        name="servicioContratado"
                        className={`${styles.select} ${formErrors.servicioContratado ? styles.inputError : ''}`}
                        value={formData.servicioContratado}
                        onChange={handleChange}
                        required={formData.tipoConsulta === "soporteTecnico"}
                      >
                        <option value="" disabled>{t('contacto.form.options.selectService')}</option>
                        <option value="Página web">{t('contacto.form.options.services.webPage')}</option>
                        <option value="Redes sociales">{t('contacto.form.options.services.socialMedia')}</option>
                      </select>
                      {formErrors.servicioContratado && <p className={styles.errorMessage}>{formErrors.servicioContratado}</p>}
                    </div>
                  )}
                  {formData.tipoConsulta === "paginaWeb" && (
                    <div className={styles.formGroup}> {/* Ensure this div wraps the following elements */}
                      <label htmlFor="tipoWeb" className={styles.label}><FaStore className={styles.labelIcon} /> {t('contacto.form.fields.webType')}</label>
                      <select
                        id="tipoWeb"
                        name="tipoWeb"
                        // This line applies the error class if formErrors.tipoWeb exists
                        className={`${styles.select} ${formErrors.tipoWeb ? styles.inputError : ''}`}
                        value={formData.tipoWeb}
                        onChange={handleChange}
                        required={formData.tipoConsulta === "paginaWeb"}
                      >
                        <option value="" disabled>{t('contacto.form.options.selectWebType')}</option>
                        <option value="restaurantes">{t('contacto.form.options.webTypes.restaurants')}</option>
                        <option value="marcas">{t('contacto.form.options.webTypes.brands')}</option>
                        <option value="paginaPersonal">{t('contacto.form.options.webTypes.personal')}</option>
                        <option value="otroWeb">{t('contacto.form.options.webTypes.otherWeb')}</option> {/* Corrected line */}
                      </select>
                      {/* This line displays the error message if formErrors.tipoWeb exists */}
                      {formErrors.tipoWeb && <p className={styles.errorMessage}>{formErrors.tipoWeb}</p>}
                    </div>
                  )}
                  {formData.tipoConsulta === "paginaWeb" && (formData.tipoWeb === "restaurantes" || formData.tipoWeb === "marcas") && (
                    <div className={styles.formGroup}>
                      <label htmlFor="nombreNegocio" className={styles.label}>
                        {formData.tipoWeb === "restaurantes" ? <FaBuilding className={styles.labelIcon} /> : <FaTag className={styles.labelIcon} />}
                        {formData.tipoWeb === "restaurantes" ? t('contacto.form.fields.businessName') : t('contacto.form.fields.brandName')}
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
                        <FaListAlt className={styles.labelIcon} /> <a href="#planes" className={styles.planLink}>{t('contacto.form.fields.plan')} <FaLink className={styles.internalLinkIcon} /></a>
                      </label>
                      <select
                        id="tipoPlan"
                        name="tipoPlan"
                        className={styles.select}
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e.target.value)} 
                      >
                        <option value="" disabled>{t('contacto.form.options.selectPlan')}</option>
                        <option value="basica">{t('contacto.form.options.plans.basic')}</option>
                        <option value="estandar">{t('contacto.form.options.plans.standard')}</option>
                        <option value="premium">{t('contacto.form.options.plans.premium')}</option>
                        <option value="ecommerce">E-commerce Webpage</option>
                      </select>
                      {/* No specific error for tipoPlan as it's for reference */}
                    </div>
                  )}
                  {formData.tipoConsulta === "paginaWeb" && (
                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        <FaPlusCircle className={styles.labelIcon} /> <a href="#adicionales" className={styles.planLink}>{t('contacto.form.fields.adicionales')} <FaLink className={styles.internalLinkIcon} /></a>
                      </label>
                      <div className={styles.adicionalesPickerContainer}>
                        <button
                          type="button"
                          className={styles.adicionalesPickerButton}
                          onClick={() => setShowAdicionalesPicker(!showAdicionalesPicker)}
                          ref={adicionalesButtonRef} // Assign ref to the button
                        >
                          {showAdicionalesPicker ? t('contacto.form.buttons.closeSelection') : t('contacto.form.buttons.selectAdditionals')}
                        </button>
                        {showAdicionalesPicker && (
                          <div 
                            className={styles.adicionalesDropdown} 
                            ref={adicionalesPickerRef} 
                            onWheel={handleDropdownWheelScroll} // Add wheel event handler
                          >
                            {ADICIONALES_DATA.filter(adicional => !adicional.disabled && adicional.id).map(adicional => (
                              <div
                                key={`adicional-${adicional.id}`}
                                className={`${styles.adicionalDropdownItem} ${formData.selectedAdicionales.includes(adicional.id) ? styles.adicionalDropdownItemSelected : ''}`}
                                onClick={() => handleAdicionalToggle(adicional.id)}
                              >
                                <input
                                  type="checkbox"
                                  readOnly
                                  checked={formData.selectedAdicionales.includes(adicional.id)}
                                  className={styles.adicionalCheckbox}
                                />
                                {t(`planesSection.adicionalesDetails.${adicional.id}.name`)}
                              </div>
                            ))}
                          </div>
                        )}
                        {formData.selectedAdicionales.length > 0 && (
                          <div className={styles.adicionalesPillsContainer}>
                            {formData.selectedAdicionales.map(adicionalId => (
                              <div key={adicionalId} className={styles.adicionalPill}>
                                {t(`planesSection.adicionalesDetails.${adicionalId}.name`)}
                                <button
                                  type="button"
                                  className={styles.removePillButton}
                                  onClick={() => handleAdicionalToggle(adicionalId)}
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* Hidden inputs for Netlify submission for selectedAdicionales */}
                      {formData.selectedAdicionales.map(adicionalId => (
                        <input type="hidden" name="selectedAdicionales" value={t(`planesSection.adicionalesDetails.${adicionalId}.name`)} key={`hidden-${adicionalId}`} />
                      ))}
                    </div>
                  )}
                  {(() => {
                    let mensajeLabelKey = 'contacto.form.fields.message';
                    let mensajePlaceholderKey = 'contacto.form.placeholders.default';

                    if (formData.tipoConsulta === "soporteTecnico") {
                      mensajeLabelKey = 'contacto.form.fields.messageSupport';
                      mensajePlaceholderKey = 'contacto.form.placeholders.support';
                    } else if (formData.tipoConsulta === "otro") {
                      mensajeLabelKey = 'contacto.form.fields.messageOther';
                      mensajePlaceholderKey = 'contacto.form.placeholders.other';
                    } else if (formData.tipoConsulta === "redesSociales") {
                      mensajeLabelKey = 'contacto.form.fields.messageSocial';
                      // Placeholder can remain default or be specific if a key 'contacto.form.placeholders.social' is added
                      // mensajePlaceholderKey = 'contacto.form.placeholders.social'; 
                    }
                    // For "paginaWeb", the default "Hablanos más sobre tu proyecto *" is appropriate.

                    return (
                      <div className={styles.formGroup}>
                        <label htmlFor="mensaje" className={styles.label}><FaCommentDots className={styles.labelIcon} /> {t(mensajeLabelKey)}</label>
                        <textarea
                          id="mensaje"
                          name="mensaje"
                          rows={5}
                          className={`${styles.textarea} ${formErrors.mensaje ? styles.inputError : ''}`}
                          value={formData.mensaje}
                          onChange={handleChange}
                          placeholder={t(mensajePlaceholderKey)}
                          required
                        />
                        {formErrors.mensaje && <p className={styles.errorMessage}>{formErrors.mensaje}</p>}
                      </div>
                    );
                  })()}
                  <div className={styles.formGroup}>
                    <label htmlFor="comoConociste" className={styles.label}><FaSearch className={styles.labelIcon} /> {t('contacto.form.fields.howDidYouHear')}</label>
                    <select
                      id="comoConociste"
                      name="comoConociste"
                      className={`${styles.select} ${formErrors.comoConociste ? styles.inputError : ''}`}
                      value={formData.comoConociste}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>{t('contacto.form.options.selectOption')}</option>
                      <option value="busqueda">{t('contacto.form.options.hearAbout.search')}</option>
                      <option value="redesSociales">{t('contacto.form.options.hearAbout.socialMedia')}</option>
                      <option value="recomendacion">{t('contacto.form.options.hearAbout.recommendation')}</option>
                      <option value="otro">{t('contacto.form.options.hearAbout.other')}</option>
                    </select>
                    {formErrors.comoConociste && <p className={styles.errorMessage}>{formErrors.comoConociste}</p>}
                  </div>
                  {formErrors.submit && <p className={styles.errorMessage}>{formErrors.submit}</p>}
                  <Button 
                    label={t('contacto.form.buttons.submit')}
                    icon={<FaWhatsapp color="black" />} /* Apply WhatsApp green color directly to the icon */
                    effect="primary" 
                    size="medium" 
                    type="submit" 
                    color="#a842fb81"
                    className={styles.submitButton} 
                  />
                </form>
              </>
            )}
          </div>
          <div className={styles.infoDirectaWrapper}>
            <h3 className={styles.infoTitle}>{t('contacto.info.title')}</h3>
            <p className={styles.infoText}>
              {t('contacto.info.description')}
            </p>
            <div className={styles.infoItem}>
              <IconLink 
                icon={MdEmail}
                to="jmcdevdigital@gmail.com" 
                label="Email" // This label is for accessibility, might not need translation if not visible
                effect="scale"
                color="#55d3c4"
                className={styles.infoIcon}
                external
                size="medium"
                showColorAlways={true}
              />
              <div>
                <strong>{t('contacto.info.email')}</strong>
                <a href="mailto:jmcdevdigital@gmail.com" className={styles.infoLink}>jmcdevdigital@gmail.com</a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <IconLink 
                icon={FaWhatsapp}
                to="https://wa.me/5491173677628" 
                label="WhatsApp" // Accessibility label
                effect="scale"
                color="#25D366"
                className={styles.infoIcon}
                external
                size="medium"
                showColorAlways={true}
              />
              <div>
                <strong>{t('contacto.info.whatsapp')}</strong>
                <a href="https://wa.me/5491173677628" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                +54 9 11 7367-7628
                </a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <IconLink 
                icon={FaInstagram}
                to="https://instagram.com/jmcdev_" 
                label="Instagram" // Accessibility label
                effect="scale"
                color="#E4405F"
                className={styles.infoIcon}
                external
                size="medium"
                showColorAlways={true}
              />
              <div>
                <strong>{t('contacto.info.instagram')}</strong>
                <a href="https://instagram.com/jmcdev_" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                  @jmcdev_
                </a>
              </div>
            </div>
            <p className={styles.availabilityInfo}>
              {t('contacto.info.availability')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
