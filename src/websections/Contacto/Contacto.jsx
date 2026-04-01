import React, { useState } from "react";
import styles from "./Contacto.module.css";
import CoolTitle from "../../components/CoolTitle/CoolTitle";
import Button from "../../components/Button/Button";
import IconLink from "../../components/IconLink/IconLink";
import { FaWhatsapp, FaInstagram, FaUser, FaQuestionCircle, FaCommentDots } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useLanguageTranslation } from "../../utils/languageUtils";

const initialFormData = {
  nombreCompleto: "",
  email: "",
  tipoConsulta: "",
  mensaje: "",
  honeypot: "",
};

export default function Contacto() {
  const { t } = useLanguageTranslation();
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSendAnotherMessage = () => {
    setFormData(initialFormData);
    setFormErrors({});
    setFormSuccess(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

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
    if (!formData.mensaje.trim()) {
      errors.mensaje = t('contacto.form.errors.mensajeProyectoRequired');
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.honeypot) return;

    const currentErrors = validateForm();
    setFormErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      try {
        setFormSuccess(true);

        const consultaLabel = t(`contacto.form.options.consultationTypes.${
          formData.tipoConsulta === 'paginaWeb' ? 'webPage' :
          formData.tipoConsulta === 'soporteTecnico' ? 'techSupport' : 'other'
        }`);

        let message = t('contacto.whatsapp.greeting') + "\n\n";
        message += `👤 *${t('contacto.whatsapp.myNameLabel')}:* ${formData.nombreCompleto}\n\n`;
        message += `📧 *${t('contacto.whatsapp.myEmailLabel')}:* ${formData.email}\n\n`;
        message += `🤔 *${t('contacto.whatsapp.consultationTypeLabel')}:* ${consultaLabel}\n\n`;
        message += `📝 *${t('contacto.whatsapp.aboutMyProjectLabel')}:*\n${formData.mensaje}\n\n`;
        message += t('contacto.whatsapp.waitingForReply');

        const whatsappNumber = "5491173677628";
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

        const whatsappWindow = window.open(whatsappUrl, '_blank');
        if (!whatsappWindow || whatsappWindow.closed || typeof whatsappWindow.closed === 'undefined') {
          window.location.href = whatsappUrl;
        }

        setFormData(initialFormData);
      } catch (error) {
        setFormErrors(prevErrors => ({ ...prevErrors, submit: t('contacto.form.errors.submitError') }));
        setFormSuccess(false);
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
                  onSubmit={handleSubmit}
                >
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
                      className={`${styles.input} ${formErrors.nombreCompleto ? styles.inputError : ''}`}
                      value={formData.nombreCompleto}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.nombreCompleto && <p className={styles.errorMessage}>{formErrors.nombreCompleto}</p>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}><MdEmail className={styles.labelIcon} /> {t('contacto.form.fields.email')}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`${styles.input} ${formErrors.email ? styles.inputError : ''}`}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.email && <p className={styles.errorMessage}>{formErrors.email}</p>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="tipoConsulta" className={styles.label}><FaQuestionCircle className={styles.labelIcon} /> {t('contacto.form.fields.consultationType')}</label>
                    <select
                      id="tipoConsulta"
                      name="tipoConsulta"
                      className={`${styles.select} ${formErrors.tipoConsulta ? styles.inputError : ''}`}
                      value={formData.tipoConsulta}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>{t('contacto.form.options.selectOption')}</option>
                      <option value="paginaWeb">{t('contacto.form.options.consultationTypes.webPage')}</option>
                      <option value="soporteTecnico">{t('contacto.form.options.consultationTypes.techSupport')}</option>
                      <option value="otro">{t('contacto.form.options.consultationTypes.other')}</option>
                    </select>
                    {formErrors.tipoConsulta && <p className={styles.errorMessage}>{formErrors.tipoConsulta}</p>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="mensaje" className={styles.label}><FaCommentDots className={styles.labelIcon} /> {t('contacto.form.fields.message')}</label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={5}
                      className={`${styles.textarea} ${formErrors.mensaje ? styles.inputError : ''}`}
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder={t('contacto.form.placeholders.default')}
                      required
                    />
                    {formErrors.mensaje && <p className={styles.errorMessage}>{formErrors.mensaje}</p>}
                  </div>

                  {formErrors.submit && <p className={styles.errorMessage}>{formErrors.submit}</p>}
                  <Button
                    label={t('contacto.form.buttons.submit')}
                    icon={<FaWhatsapp color="black" />}
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
                label="Email"
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
                label="WhatsApp"
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
                to="https://www.instagram.com/jmcdev_web/"
                label="Instagram"
                effect="scale"
                color="#E4405F"
                className={styles.infoIcon}
                external
                size="medium"
                showColorAlways={true}
              />
              <div>
                <strong>{t('contacto.info.instagram')}</strong>
                <a href="https://www.instagram.com/jmcdev_web/" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
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
