import React from 'react';
import Logo from '../../components/Logo/Logo';
import IconLink from '../../components/IconLink/IconLink';
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { BsBriefcase } from 'react-icons/bs';
import styles from './Footer.module.css';
import { useLanguageTranslation } from '../../utils/languageUtils'; // Import the translation hook


const Footer = () => {
    const { t } = useLanguageTranslation(); // Get the translation function
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.footerSection}>
                <p className={styles.copyright}>
                    <span>{currentYear}</span> | © JMCdev {t('footer.copyright')}
                </p>
            </div>
            
            <div className={`${styles.footerSection} ${styles.centerSection}`}>
                <Logo />
            </div>
            
            <div className={`${styles.footerSection} ${styles.socialLinks}`}>
                <IconLink 
                    icon={FaWhatsapp}
                    to="https://wa.me/+5491173677628"
                    label="WhatsApp"
                    effect="scale"
                    color="#25D366"
                    external
                />
                <IconLink 
                    icon={FaInstagram}
                    to="https://www.instagram.com/jmcdev_"
                    label="Instagram"
                    effect="scale"
                    color="#E4405F"
                    external
                />
                
                <IconLink 
                    icon={BsBriefcase}
                    to="https://juanmaacampos.github.io/juanmacampos-portfolio/"
                    label="Portfolio"
                    effect="scale"
                    external
                />
            </div>
        </footer>
    );
};

export default Footer;