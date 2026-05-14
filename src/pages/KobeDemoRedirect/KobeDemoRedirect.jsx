import { useEffect } from 'react';

const KobeDemoRedirect = () => {
  useEffect(() => {
    window.location.replace('https://juanmaacampos.github.io/kobe_web');
  }, []);

  return (
    <div style={{padding: '2rem', textAlign: 'center'}}>
      <p>Redirigiendo a la demo...</p>
      <p>
        Si la redirección no funciona, abre este enlace:
        <br />
        <a href="https://juanmaacampos.github.io/kobe_web">https://juanmaacampos.github.io/kobe_web</a>
      </p>
    </div>
  );
};

export default KobeDemoRedirect;
