import { useEffect } from 'react';

const EPanelRedirect = () => {
  useEffect(() => {
    // Use replace so user can't easily go back to the redirect page
    window.location.replace('https://cms-menu-7b4a4.web.app/login');
  }, []);

  // Fallback UI for very slow connections or if JS is disabled
  return (
    <div style={{padding: '2rem', textAlign: 'center'}}>
      <p>Redirigiendo al panel...</p>
      <p>
        Si la redirección no funciona, abre este enlace:
        <br />
        <a href="https://cms-menu-7b4a4.web.app/login">https://cms-menu-7b4a4.web.app/login</a>
      </p>
    </div>
  );
};

export default EPanelRedirect;
