/**
 * Generates JSON-LD schema markup as a string
 * @param {string} type - Schema.org type (e.g., 'Service', 'Product')
 * @param {object} data - Schema data object
 * @returns {string} - Stringified JSON-LD
 */
export function generateSchemaMarkup(type, data) {
  if (!type || !data) {
    return '';
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };

  return JSON.stringify(schema);
}

/**
 * Injects schema markup into document head
 * @param {string} id - Unique ID for the schema element
 * @param {string} schemaData - Stringified JSON-LD data
 * @returns {Function} - Cleanup function to remove the schema
 */
export function injectSchemaMarkup(id, schemaData) {
  // Check if it already exists
  const existingScript = document.getElementById(id);
  if (existingScript) {
    document.head.removeChild(existingScript);
  }
  
  // Create new script element
  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = schemaData;
  document.head.appendChild(script);
  
  // Return cleanup function
  return () => {
    const scriptToRemove = document.getElementById(id);
    if (scriptToRemove) {
      document.head.removeChild(scriptToRemove);
    }
  };
}

export const generateMetaTags = (title, description) => {
  return {
    title: `${title} | JMCdev`,
    meta: [
      {
        name: 'description',
        content: description
      },
      {
        property: 'og:title',
        content: title
      },
      {
        property: 'og:description',
        content: description
      }
    ]
  };
};
