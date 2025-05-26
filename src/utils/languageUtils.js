import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';

/**
 * Helper hook to get both language context and translation function in one call
 * @returns {Object} An object containing currentLanguage, changeLanguage, and t functions
 */
export const useLanguageTranslation = () => {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const { t } = useTranslation(currentLanguage);
  
  return {
    currentLanguage,
    changeLanguage,
    availableLanguages,
    t
  };
};

/**
 * Get language name from language code
 * @param {String} code - Language code (e.g., 'es', 'en', 'nl')
 * @returns {String} Language name in its native form
 */
export const getLanguageName = (code) => {
  const languages = {
    'es': 'Español',
    'en': 'English',
    'nl': 'Nederlands'
  };
  
  return languages[code] || code;
};
