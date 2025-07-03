import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import CoolTitle from '../../../components/CoolTitle/CoolTitle';
// Import PlanesCard3d component
import Card3D from '../../../components/PlanesCard3d/3dCard';
import styles from './Landing.module.css';
import { FaChevronDown, FaGlobe, FaCog, FaHeadset, FaPlus, FaMinus } from 'react-icons/fa';
import { useIsMobile } from '../../../hooks/useMediaQuery';

// Import CMS images
import cmsShowImage from '../assets/cms_show.png';
import cmsStockImage from '../assets/cms_stock.png';
import catalogoCmsImage from '../assets/catalogo_cms.png';
import mediosPagoImage from '../assets/medios de pago.png';
import paginasImage from '../assets/paginas.png';
import soporteImage from '../assets/soporte.png';

const Landing = () => {
  const isMobile = useIsMobile();
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  // Effect to start loading the CMS image early
  useEffect(() => {
    const img = new Image();
    img.src = cmsShowImage;
  }, []);

  // FAQ data
  const faqData = [
    {
      question: "¿Necesito tener conocimientos técnicos para usar la plataforma o crear mi web?",
      answer: "¡Absolutamente no! Nos encargamos de construir tu página web exclusiva desde cero, a tu gusto y sin que tengas que mover un dedo. El panel de gestión está diseñado para ser súper intuitivo y fácil de usar, sin necesidad de conocimientos de programación. Además, contarás con tutoriales y mi soporte personal para guiarte en cada paso."
    },
    {
      question: "¿Cuánto tiempo tarda en estar lista mi página web?",
      answer: "Tu nueva página web estará lista y funcionando para recibir pedidos en un plazo de 1 a 2 semanas desde que tengamos toda la información inicial de tu negocio (menú/productos, logos, etc.). Nos enfocamos en la eficiencia sin comprometer la calidad del diseño exclusivo."
    },
    {
      question: "¿Hay costos ocultos o comisiones sobre mis ventas, además de la mensualidad?",
      answer: "¡No hay costos ocultos! La única comisión por ventas es la que cobra directamente Mercado Pago (actualmente alrededor del 5%), y esta se aplica únicamente cuando tus clientes te pagan a través de su plataforma (con tarjeta de crédito, débito, u otros medios de pago online de Mercado Pago). Si tus clientes eligen pagar en efectivo al retirar o mediante transferencia bancaria, no se cobra ningún tipo de comisión. Todos estos métodos de pago se registran en tu panel de gestión para que lleves un control total de tus pedidos, confirmes pagos y actualices tu stock sin problemas. Nosotros NO cobramos ninguna comisión sobre tus ventas, ¡tu facturación es 100% tuya!"
    },
    {
      question: "¿Puedo probar el sistema de gestión antes de comprometerme?",
      answer: "¡Sí, claro! Te ofrecemos una primera semana GRATIS de acceso a nuestro panel de gestión para que puedas explorarlo sin compromiso, cargar tus productos y experimentar lo fácil que es manejar tu negocio online."
    },
    {
      question: "¿Qué métodos de pago puedo ofrecer a mis clientes?",
      answer: "Tu página web contará con la integración directa de Mercado Pago, permitiendo pagos rápidos y seguros con tarjeta de crédito, débito y otros medios. Además, podrás configurar opciones para que tus clientes paguen en efectivo al retirar o con transferencia bancaria. Todos estos métodos se gestionan fácilmente desde tu panel para un control total."
    },
    {
      question: "¿Qué tipo de soporte ofrecen si tengo un problema o una duda?",
      answer: "Tendrás acceso a mi soporte prioritario y cercano. Soy tu aliado personal y estoy disponible para resolver cualquier duda o ayudarte con lo que necesites, garantizando que tu negocio siempre funcione al 100%. Además, el sistema incluye tutoriales paso a paso para que aprendas a manejar todo a tu ritmo."
    },
    {
      question: "¿Qué pasa con la seguridad de mis datos y los de mis clientes?",
      answer: "La seguridad es nuestra prioridad. Toda la información de tu negocio (productos, pedidos, clientes) se guarda de forma súper segura en los servidores de Google (con tecnología Firebase). Respecto a los pagos, Mercado Pago es una empresa líder en seguridad de transacciones, y ellos son los únicos responsables de procesar y proteger los datos de pago con los más altos estándares. Es como tener un banco de alta seguridad cuidando tus datos y transacciones."
    },
    {
      question: "¿Qué sucede si dejo de pagar la cuota mensual del sistema de gestión?",
      answer: "Tu página web, una vez construida y entregada, es tuya para siempre. Sin embargo, la cuota mensual cubre el acceso a tu panel de gestión, el mantenimiento y el soporte. Si la cuota mensual no es abonada, el acceso a tu panel de gestión se suspenderá. Esto significa que no podrás gestionar tus productos, pedidos o stock. Además, si el pago no se regulariza pasado un mes desde la fecha de vencimiento, el contenido que hayas cargado en el panel (productos, imágenes, configuraciones) será eliminado de nuestros servidores debido a los costos de almacenamiento y mantenimiento. Una vez regularizada la situación, se restablecerá el acceso al panel, pero deberás cargar nuevamente el contenido si este fue eliminado."
    }
  ];

  // Toggle FAQ expansion
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Define plans data based on the pasted image
  const planesData = [
    {
      nombre: "Tu página web a medida, para siempre",
      precio: "$300.000",
      descripcion: "precio base",
      beneficios: [
        "Precio Inicial. Desde $300.000 (precio base optimizado)",
        "El precio se ajusta si buscás un diseño 100% a medida con funciones avanzadas y personalizaciones extra",
        "Es tu página para siempre, dueño al 100% del sitio cuando lo pagues en su totalidad",
        "Plan a partir de 3 meses en tres cuotas fijas para ayudarte a empezar"
      ]
    },
    {
      nombre: "Acceso total al sistema de gestión",
      precio: "$25.000",
      descripcion: "/por mes",
      beneficios: [
        "Control de stock inteligente y automático",
        "Gestión de productos, categorías y precios",
        "Manejo de pedidos y clientes",
        "Integración con Mercado Pago y otras opciones de pago",
        "Mantenimiento constante y actualizaciones de sistema",
        "JM soporte prioritario y cercano, tu aliado personal",
        "Primera semana GRATIS! Te damos 7 días para que pruebes el sistema sin compromiso"
      ]
    }
  ];

  return (
    <div className={styles.landing}>
      <div className={styles.container}>
        {/* Header Content */}
        <div className={styles.content}>
          {/* Main content */}
          <div className={styles.mainContent}>
            <h1 className={styles.mainTitle}>
              <span className={styles.titlePurple}>Tu negocio en automático.</span>
              <br />
              <span className={styles.titleWhite}>Nosotros gestionamos, vos vendés.</span>
            </h1>

            <p className={styles.description}>
              <strong>Olvídate del estrés</strong> de los pedidos por WhatsApp, comprobantes de pago y el control manual de stock.
              <br />
              Te ofrecemos una solución a medida, adaptada a los requerimientos únicos de tu <strong>restaurante o tienda</strong>,
              <br />
              con tu propia página web y un sistema inteligente para operar con total tranquilidad y eficiencia
            </p>

            <div className={styles.ctaSection}>
              <a href="https://wa.me/5491173677628?text=Hola,%20vi%20tu%20página%20y%20estoy%20interesado%20en%20el%20servicio%20de%20e-commerce.%20Me%20gustaría%20saber%20más%20sobre%20cómo%20pueden%20ayudar%20a%20mi%20negocio%20a%20crecer.%20¡Gracias!" target="_blank" rel="noopener noreferrer">
                <Button 
                  label="¡Quiero modernizar mi negocio!"
                  effect="primary"
                  size="large"
                  className={styles.ctaButton}
                />
              </a>
              
              <div className={styles.saberMas}>
                <span className={styles.saberMasText}>Saber más</span>
                <FaChevronDown className={styles.arrowDown} />
              </div>
            </div>
          </div>

          {/* Image section */}
          <div className={styles.imageSection}>
            <img 
              src={cmsShowImage} 
              alt="Dashboard del sistema CMS" 
              className={styles.dashboardImage}
            />
          </div>
        </div>

        {/* Resumen Content */}
        <div className={styles.titleSection}>
          <div className={styles.titleLeft}>
            <CoolTitle 
              className={styles.resumenTitle}
              animation="slide"
              fontTransition="0.4s"
            >
              Nosotros te ayudamos a construir<br />
              la web que siempre soñaste
            </CoolTitle>
          </div>
          <div className={styles.titleRight}>
            <p className={styles.subtitle}>
              <strong>JMCDEV ECOMMERCE PANEL</strong> es la solución completa para tu presencia 
              digital: una página web única y personalizada para tu negocio, y un 
              potente sistema de gestión propio que simplifica el control de tu stock, 
              pedidos y pagos. <strong>¡Tu negocio en internet, bajo tu control y a tu medida!</strong>
            </p>
          </div>
        </div>

        <div className={styles.cardsGrid}>
          {/* Card 1: Web Única y Profesional */}
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}>
              <FaGlobe />
            </div>
            <h3 className={styles.cardTitle}>Web única y profesional</h3>
            <p className={styles.cardDescription}>
              Diseño exclusivo que refleja la personalidad de tu marca con funcionalidades modernas
            </p>
          </div>

          {/* Card 2: Gestión Sin Estrés */}
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}>
              <FaCog />
            </div>
            <h3 className={styles.cardTitle}>Gestión sin estres</h3>
            <p className={styles.cardDescription}>
              Sistema automatizado que maneja pedidos, stock y pagos mientras vos te enfocás en vender
            </p>
          </div>

          {/* Card 3: Soporte Personalizado */}
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}>
              <FaHeadset />
            </div>
            <h3 className={styles.cardTitle}>Soporte Personalizado</h3>
            <p className={styles.cardDescription}>
              Acompañamiento continuo con nuestro equipo especializado para que nunca estés solo
            </p>
          </div>
        </div>

        {/* Características Content */}
        <div className={styles.caracteristicasSection} id="caracteristicas">
          <div className={styles.caracteristicasHeader}>
            <CoolTitle 
              className={styles.caracteristicasTitle}
              animation="slide"
              fontTransition="0.4s"
            >
              JMCDEV: tu plataforma<br />
              <span className={styles.titlePurple}>Todo en uno.</span>
            </CoolTitle>
            <p className={styles.caracteristicasSubtitle}>
              Eficiencia total para tu negocio. Una web moderna y un sistema 
              de gestión intuitivo para vender tu catálogo sin esfuerzo con 
              nuestro E-commerce Panel:
            </p>
          </div>
        </div>

        <div className={styles.caracteristicasGrid}>
          {/* Card 1: Control de Stock Automático */}
          <div className={styles.caracteristicaCard}>
            <div className={styles.cardImageContainer}>
              <img 
                src={cmsStockImage} 
                alt="Control de Stock Automático" 
                className={styles.cardImage}
              />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Control de Stock Automático</h3>
              <p className={styles.cardDescription}>
Control de stock inteligente y automático.
Vendé sin miedos, el sistema descuenta solo 
y te alerta stock en tiempo real.
              </p>
            </div>
          </div>

          {/* Card 2: Tu Menú/Productos al Instante */}
          <div className={styles.caracteristicaCard}>
            <div className={styles.cardImageContainer}>
              <img 
                src={catalogoCmsImage} 
                alt="Tu Menú/Productos al Instante" 
                className={styles.cardImage}
              />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Tu Menú/Productos al Instante</h3>
              <p className={styles.cardDescription}>
                Actualizá vos mismo precios, imagenes
o agregá productos en segundos desde el 
panel. ¡Vos tenés el control total y al momento!
              </p>
            </div>
          </div>

          {/* Card 3: Cobros con Mercado Pago Checkout */}
          <div className={styles.caracteristicaCard}>
            <div className={styles.cardImageContainer}>
              <img 
                src={mediosPagoImage} 
                alt="Cobros con Mercado Pago Checkout" 
                className={styles.cardImage}
              />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Cobros con Mercado Pago Checkout</h3>
              <p className={styles.cardDescription}>
              MercadoPago integrado para pagos rápidos y
seguros. Además de pagos por transferencia
y efectivo con validación manual en el panel.
                <br />
                <strong>NO COBRAMOS COMISIONES POR VENTAS.</strong>
              </p>
            </div>
          </div>

          {/* Card 4: Tu Web ÚNICA, sin plantillas genéricas */}
          {isMobile ? (
            // Versión móvil: Card normal
            <div className={styles.caracteristicaCard}>
              <div className={styles.cardImageContainer}>
                <img 
                  src={paginasImage} 
                  alt="Tu Web ÚNICA, sin plantillas genéricas" 
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Tu Web ÚNICA, sin plantillas genéricas</h3>
                <p className={styles.cardDescription}>
                  Nos encargamos de crear una página web exclusiva y 100% personalizada para tu negocio, 
                  que refleje tu estilo y tu marca. Vos solo nos lo pedís, ¡y nosotros construimos toda tu página 
                  a tu gusto! <strong>(¡Olvidate de los diseños repetidos de Tienda Nube!)</strong>
                </p>
              </div>
            </div>
          ) : (
            // Versión desktop/tablet: Card doble
            <div className={styles.caracteristicaCardDoble}>
              <div className={styles.cardImageContainer}>
                <img 
                  src={paginasImage} 
                  alt="Tu Web ÚNICA, sin plantillas genéricas" 
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Tu Web ÚNICA, sin plantillas genéricas</h3>
                <p className={styles.cardDescription}>
                  Nos encargamos de crear una página web exclusiva y 100% personalizada para tu negocio, 
que refleje tu estilo y tu marca. Vos solo nos lo pedís, ¡y nosotros construimos toda tu página 
a tu gusto! <strong>(¡Olvidate de los diseños repetidos de Tienda Nube!)</strong>
                </p>
              </div>
            </div>
          )}

          {/* Card 6: Soporte Personal y Seguridad Total */}
          <div className={styles.caracteristicaCard}>
            <div className={styles.cardImageContainer}>
              <img 
                src={soporteImage} 
                alt="Soporte Personal y Seguridad Total" 
                className={styles.cardImage}
              />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Soporte Personal y Seguridad Total</h3>
              <p className={styles.cardDescription}>
Contacto directo conmigo para soporte completo. Tus datos
protegidos con tecnologia de Google y pagos con tarjetas 
directamente por Mercado Pago. <strong>Seguridad 100% garantizada.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Planes Content */}
        <div className={styles.titleSection} id="planes">
          <CoolTitle 
            className={styles.planesTitle}
            animation="slide"
            fontTransition="0.4s"
          >
            Nuestros Planes:<br />
            <span className={styles.titlePurple}>Inversión Inteligente para tu Negocio</span>
          </CoolTitle>
        </div>

        <div className={styles.planesGrid}>
          {planesData.map((plan, index) => (
            <Card3D
              key={index}
              plan={plan}
              destacado={index === 1} // Destacar el segundo plan (sistema de gestión)
              motionActive={true} // Activar efectos de movimiento
            />
          ))}
        </div>

        {/* FAQ Content */}
        <div className={styles.faqTitleSection} id="faq">
          <CoolTitle 
            className={styles.faqTitle}
            animation="slide"
            fontTransition="0.4s"
          >
            Preguntas Frecuentes<br />
            <span className={styles.titlePurple}>Resolvemos tus dudas</span>
          </CoolTitle>
          <p className={styles.subtitle}>
            Encuentra respuestas a las preguntas más comunes sobre nuestros servicios.
            Si no encuentras lo que buscas, ¡contáctanos directamente!
          </p>
        </div>

        <div className={styles.faqContainer}>
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${expandedFaq === index ? styles.expanded : ''}`}
            >
              <div 
                className={styles.faqQuestion}
                onClick={() => toggleFaq(index)}
              >
                <h3 className={styles.questionText}>{faq.question}</h3>
                <div className={styles.faqIcon}>
                  {expandedFaq === index ? <FaMinus /> : <FaPlus />}
                </div>
              </div>
              <div className={styles.faqAnswer}>
                <p className={styles.answerText}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA Content */}
        <div className={styles.finalCtaContent} id="contacto">
          <h2 className={styles.finalCtaTitle}>
            Es Hora de Impulsar tu Negocio Online.
          </h2>
          <p className={styles.finalCtaSubtitle}>
            No esperes más.
            Unite a los emprendedores que transformaron su negocio con nuestra plataforma.
          </p>
          <div className={styles.finalCtaButtonContainer}>
            <a href="https://wa.me/5491173677628?text=Hola,%20vi%20tu%20página%20y%20estoy%20interesado%20en%20el%20servicio%20de%20e-commerce.%20Me%20gustaría%20saber%20más%20sobre%20cómo%20pueden%20ayudar%20a%20mi%20negocio%20a%20crecer.%20¡Gracias!" target="_blank" rel="noopener noreferrer">
              <Button 
                label="¡Empezar Ahora!"
                effect="primary"
                size="large"
                className={styles.finalCtaButton}
              />
            </a>
            <p className={styles.finalCtaNote}>
              Primera semana GRATIS - Sin compromiso
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
