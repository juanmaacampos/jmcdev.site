import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import CoolTitle from '../../../components/CoolTitle/CoolTitle';
// Import PlanesCard3d component
import Card3D from '../../../components/PlanesCard3d/3dCard';
import styles from './Landing.module.css';
import { FaChevronDown, FaGlobe, FaCog, FaHeadset, FaPlus, FaMinus } from 'react-icons/fa';
import { useIsMobile } from '../../../hooks/useMediaQuery';
import TopButton from '../../../components/TopButton/TopButton';

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
  const [selectedImage, setSelectedImage] = useState(null);
  
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
      answer: "Tendrás acceso a mi soporte prioritario y cercano. Estoy disponible para resolver cualquier duda o ayudarte con lo que necesites, garantizando que tu negocio siempre funcione al 100%. Además, el sistema incluye tutoriales paso a paso para que aprendas a manejar todo a tu ritmo."
    },
    {
      question: "¿Qué pasa con la seguridad de mis datos y los de mis clientes?",
      answer: "La seguridad es nuestra prioridad. Toda la información de tu negocio (productos, pedidos, clientes) se guarda de forma súper segura en los servidores de Google (con tecnología Firebase). Respecto a los pagos, Mercado Pago es una empresa líder en seguridad de transacciones, y ellos son los únicos responsables de procesar y proteger los datos de pago con los más altos estándares. Es como tener un banco de alta seguridad cuidando tus datos y transacciones."
    },
    {
      question: "¿Qué sucede si dejo de pagar la cuota mensual del sistema de gestión?",
      answer: "Tu página web, una vez construida y entregada, es tuya para siempre. Sin embargo, la cuota mensual cubre el acceso a tu panel de gestión, el mantenimiento y el soporte. Si la cuota mensual no es abonada, el acceso a tu panel de gestión se suspenderá. Esto significa que no podrás gestionar tus productos, pedidos o stock (PERO TU WEB NO SE VA A ELIMINAR NUNCA, ES TUYA). Si el abono mensual se retrasa mas de un mes, los datos del catalogo seran borrados por temas de mantenimiento y servidores"
    }
  ];

  // Toggle FAQ expansion
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Define plans data based on the pasted image
  const planesData = [
    {
      nombre: "Tu web, la que van a ver tus clientes",
      precio: "Precio a medida",
      beneficios: [
        "PAGO UNICO, la web es tuya para siempre",
        "El precio depende de la calidad que quieras para tu web.",
        "Branding de tu marca y mucho más",
        "Tu inversión: hasta en 3 cuotas sin interes (solo transferencia)"
      ]
    },
    {
      nombre: "Acceso total al sistema de gestión",
      precio: "$25.000",
      descripcion: "precio base",
      beneficios: [
        "PAGO MENSUAL PARA MANTENER EL SISTEMA DE GESTIÓN. EL PRECIO SE AJUSTA AL VOLUMEN DEL NEGOCIO",
        "Gestión de productos, categorías y precios (SE REFLEJAN EN TU WEB DIRECTAMENTE)",
        "Control de stock inteligente y automático",
        "Manejo de pedidos y clientes",
        "Integración con Mercado Pago y otras opciones de pago",
        "Soporte, Mantenimiento constante y actualizaciones de sistema",
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
              Te ofrecemos una solución web a medida, adaptada a los requerimientos únicos de tu <strong>negocio</strong>,
              <br />
              con <strong>tu propia página web y un sistema inteligente</strong> para operar con total tranquilidad y eficiencia <strong>(¡SIN COMISIONES!)</strong>
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
              <strong>JMCDEV ECOMMERCE</strong> es la solución completa para tu presencia 
              digital: una página web única y personalizada para tu negocio, y un 
              potente sistema de gestión propio que simplifica el control de tu stock, 
              pedidos y pagos. <strong>¡Tu negocio en internet, bajo tu control y a tu medida!</strong>
            </p>
          </div>
        </div>

        <div className={styles.cardsGrid}>
          {/* Card 1: Web Única y Profesional */}
          <div className={styles.featureCard} onClick={() => openImageModal(cmsShowImage)}>
            <div className={styles.cardIcon}>
              <FaGlobe />
            </div>
            <h3 className={styles.cardTitle}>Web única y profesional</h3>
            <p className={styles.cardDescription}>
              Diseño exclusivo que refleja la personalidad de tu marca y donde tus clientes compran
            </p>
          </div>

          {/* Card 2: Gestión Sin Estrés */}
          <div className={styles.featureCard} onClick={() => openImageModal(cmsShowImage)}>
            <div className={styles.cardIcon}>
              <FaCog />
            </div>
            <h3 className={styles.cardTitle}>Gestión sin estres</h3>
            <p className={styles.cardDescription}>
              Sistema automatizado que maneja pedidos, stock y pagos mientras vos te enfocás en vender. SIN COMISIONES
            </p>
          </div>

          {/* Card 3: Soporte Personalizado */}
          <div className={styles.featureCard} onClick={() => openImageModal(cmsShowImage)}>
            <div className={styles.cardIcon}>
              <FaHeadset />
            </div>
            <h3 className={styles.cardTitle}>Soporte Personalizado</h3>
            <p className={styles.cardDescription}>
              No tenes que hacer nada, nos ocupamos nosotros de crear tu web. Además siempre vamos a estar por cualquier duda que tengas
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
          <div className={styles.caracteristicaCard} onClick={() => openImageModal(cmsStockImage)}>
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
          <div className={styles.caracteristicaCard} onClick={() => openImageModal(catalogoCmsImage)}>
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
          <div className={styles.caracteristicaCard} onClick={() => openImageModal(mediosPagoImage)}>
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
            <div className={styles.caracteristicaCard} onClick={() => openImageModal(paginasImage)}>
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
            <div className={styles.caracteristicaCardDoble} onClick={() => openImageModal(paginasImage)}>
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
          <div className={styles.caracteristicaCard} onClick={() => openImageModal(soporteImage)}>
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
            Tu web y sistema de gestión<br />
            <span className={styles.titlePurple}>No necesitas nada más.</span>
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

      {selectedImage && (
        <div className={styles.imageModalOverlay} onClick={closeImageModal}>
          <div className={styles.imageModalContent}>
            <img src={selectedImage} alt="Vista ampliada" />
            <button className={styles.closeModalButton} onClick={closeImageModal}>×</button>
          </div>
        </div>
      )}

      <TopButton />
    </div>
  );
};

export default Landing;
