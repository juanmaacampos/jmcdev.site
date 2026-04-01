import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import CoolTitle from '../../../components/CoolTitle/CoolTitle';
import styles from './Landing.module.css';
import { FaChevronDown, FaMobileAlt, FaCog, FaHeadset, FaPlus, FaMinus, FaLaptop, FaBolt, FaCloud, FaTabletAlt, FaPaintBrush, FaPuzzlePiece, FaUserCheck, FaBoxOpen, FaGlobe, FaUtensils, FaBuilding, FaHotel } from 'react-icons/fa';
import TopButton from '../../../components/TopButton/TopButton';

// Import images (placeholders)
import cmsShowImage from '../assets/cms_show.png';
import catalogoCmsImage from '../assets/catalogo_cms.png';
import paginasImage from '../assets/paginas.png';

const RestaurantArt = () => (
  <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%', background: 'transparent', display: 'block' }} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="restBaseFill" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#110d1a" />
        <stop offset="100%" stopColor="#08050a" />
      </linearGradient>
      <linearGradient id="glass1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b45ff" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#55d3c4" stopOpacity="0.05"/>
      </linearGradient>
      <linearGradient id="glass2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b45ff" stopOpacity="0.08"/>
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02"/>
      </linearGradient>
      {/* Glow for the fork and knife */}
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Lines pointing to sub-nodes */}
    <line x1="200" y1="200" x2="100" y2="240" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    <line x1="200" y1="200" x2="120" y2="140" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    <line x1="200" y1="200" x2="300" y2="250" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

    {/* Bottom Base (The Plate) */}
    <g transform="translate(200, 200) scale(1, 0.5) rotate(45)">
      {/* Outer plate border */}
      <circle cx="0" cy="0" r="110" fill="url(#restBaseFill)" stroke="#8b45ff" strokeWidth="2" />
      {/* Inner plate circle */}
      <circle cx="0" cy="0" r="80" fill="none" stroke="rgba(85, 211, 196, 0.4)" strokeWidth="1" strokeDasharray="5,5" />
      
      {/* Glowing center */}
      <circle cx="0" cy="0" r="40" fill="#8b45ff" opacity="0.15" filter="blur(8px)" />
      
      {/* Abstract Food/Burger layer in center */}
      <rect x="-25" y="-15" width="50" height="30" rx="15" fill="#55d3c4" opacity="0.9" />
      <rect x="-20" y="-5" width="40" height="10" rx="5" fill="#8b45ff" />
    </g>

    {/* Middle Glass Layer */}
    <g transform="translate(200, 130) scale(1, 0.5) rotate(45)">
      <rect x="-90" y="-90" width="180" height="180" rx="20" fill="url(#glass1)" />
      <rect x="-90" y="-90" width="180" height="180" rx="20" fill="none" stroke="#8b45ff" strokeWidth="1.5" />
      
      {/* Digital Menu Items dots */}
      <circle cx="-50" cy="-50" r="8" fill="#55d3c4" />
      <rect x="-30" y="-53" width="60" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
      
      <circle cx="-50" cy="-20" r="8" fill="#8b45ff" />
      <rect x="-30" y="-23" width="40" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
      
      <circle cx="-50" cy="10" r="8" fill="#55d3c4" />
      <rect x="-30" y="7" width="70" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
    </g>

    {/* Top Glass Layer (Cutlery) */}
    <g transform="translate(200, 60) scale(1, 0.5) rotate(45)">
      <rect x="-100" y="-100" width="200" height="200" rx="24" fill="url(#glass2)" />
      <rect x="-100" y="-100" width="200" height="200" rx="24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      
      {/* Fork */}
      <g transform="translate(-20, 0)">
        <rect x="-4" y="-30" width="8" height="60" rx="4" fill="#a742fb" filter="url(#glow)" />
        {/* Prongs */}
        <rect x="-12" y="-50" width="4" height="25" rx="2" fill="#a742fb" />
        <rect x="-4" y="-50" width="8" height="30" rx="3" fill="#a742fb" />
        <rect x="8" y="-50" width="4" height="25" rx="2" fill="#a742fb" />
      </g>

      {/* Knife */}
      <g transform="translate(20, 0)">
        <rect x="-4" y="-30" width="8" height="60" rx="4" fill="#55d3c4" filter="url(#glow)" />
        <path d="M -4 -30 L 4 -30 L 4 -60 C -4 -50 -4 -40 -4 -30 Z" fill="#55d3c4" filter="url(#glow)" />
      </g>
    </g>

    {/* Sub-node 1 (Top Left) - QR */}
    <g transform="translate(120, 140) scale(1, 0.5) rotate(45)">
      <rect x="-25" y="-25" width="50" height="50" rx="10" fill="#110d1a" />
      <rect x="-25" y="-25" width="50" height="50" rx="10" fill="none" stroke="#8b45ff" strokeWidth="2" />
      <rect x="-10" y="-10" width="6" height="6" fill="#fff" />
      <rect x="4" y="-10" width="6" height="6" fill="#fff" />
      <rect x="-10" y="4" width="6" height="6" fill="#fff" />
      <rect x="4" y="4" width="6" height="6" fill="#55d3c4" />
    </g>

    {/* Sub-node 2 (Bottom Left) - Ticket/Receipt */}
    <g transform="translate(100, 240) scale(1, 0.5) rotate(45)">
      <rect x="-25" y="-25" width="50" height="50" rx="10" fill="#110d1a" />
      <rect x="-25" y="-25" width="50" height="50" rx="10" fill="none" stroke="#55d3c4" strokeWidth="2" />
      <rect x="-12" y="-15" width="24" height="30" fill="rgba(255,255,255,0.8)" />
      <rect x="-8" y="-10" width="16" height="2" fill="#110d1a" />
      <rect x="-8" y="-4" width="16" height="2" fill="#110d1a" />
      <rect x="-8" y="2" width="10" height="2" fill="#110d1a" />
    </g>

    {/* Sub-node 3 (Bottom Right) - Chef Hat */}
    <g transform="translate(300, 250) scale(1, 0.5) rotate(45)">
      <rect x="-25" y="-25" width="50" height="50" rx="10" fill="#110d1a" />
      <rect x="-25" y="-25" width="50" height="50" rx="10" fill="none" stroke="#8b45ff" strokeWidth="2" />
      <path d="M -12 10 L 12 10 L 10 -5 C 15 -10 10 -15 5 -12 C 0 -18 -5 -12 -10 -15 C -15 -10 -10 -5 -12 10 Z" fill="#fff" />
    </g>
  </svg>
);

const InmobiliariaArt = () => (
  <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%', background: 'transparent', display: 'block' }} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="inmoBaseFill" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0d111a" />
        <stop offset="100%" stopColor="#05080a" />
      </linearGradient>
      <linearGradient id="glassInmo" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#55d3c4" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#8b45ff" stopOpacity="0.05"/>
      </linearGradient>
      <filter id="glowInmo" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <line x1="200" y1="200" x2="100" y2="240" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    <line x1="200" y1="200" x2="120" y2="140" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    <line x1="200" y1="200" x2="300" y2="250" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

    {/* Bottom Base (Blueprint / Map layer) */}
    <g transform="translate(200, 200) scale(1, 0.5) rotate(45)">
      <rect x="-90" y="-90" width="180" height="180" rx="4" fill="url(#inmoBaseFill)" stroke="#55d3c4" strokeWidth="2" />
      {/* Blueprint grid lines */}
      <line x1="-90" y1="-45" x2="90" y2="-45" stroke="rgba(85, 211, 196, 0.2)" strokeWidth="1" />
      <line x1="-90" y1="0" x2="90" y2="0" stroke="rgba(85, 211, 196, 0.2)" strokeWidth="1" />
      <line x1="-90" y1="45" x2="90" y2="45" stroke="rgba(85, 211, 196, 0.2)" strokeWidth="1" />
      <line x1="-45" y1="-90" x2="-45" y2="90" stroke="rgba(85, 211, 196, 0.2)" strokeWidth="1" />
      <line x1="0" y1="-90" x2="0" y2="90" stroke="rgba(85, 211, 196, 0.2)" strokeWidth="1" />
      <line x1="45" y1="-90" x2="45" y2="90" stroke="rgba(85, 211, 196, 0.2)" strokeWidth="1" />
    </g>

    {/* Middle Glass Layer */}
    <g transform="translate(200, 130) scale(1, 0.5) rotate(45)">
      <rect x="-90" y="-90" width="180" height="180" rx="10" fill="url(#glassInmo)" />
      <rect x="-90" y="-90" width="180" height="180" rx="10" fill="none" stroke="#55d3c4" strokeWidth="1.5" />
      
      {/* Map location pins */}
      <circle cx="-30" cy="-30" r="15" fill="#8b45ff" opacity="0.3" filter="blur(4px)" />
      <path d="M -30 -40 C -38 -40 -38 -30 -30 -25 L -30 -20 L -30 -25 C -22 -30 -22 -40 -30 -40 Z" fill="#8b45ff" />
      <circle cx="-30" cy="-35" r="3" fill="#fff" />
      
      <circle cx="20" cy="10" r="15" fill="#55d3c4" opacity="0.3" filter="blur(4px)" />
      <path d="M 20 0 C 12 0 12 10 20 15 L 20 20 L 20 15 C 28 10 28 0 20 0 Z" fill="#55d3c4" />
      <circle cx="20" cy="5" r="3" fill="#fff" />
    </g>

    {/* Top Layer (House/Keys) */}
    <g transform="translate(200, 60) scale(1, 0.5) rotate(45)">
      {/* Glowing base for house */}
      <circle cx="0" cy="0" r="40" fill="#55d3c4" opacity="0.2" filter="blur(15px)" />
      
      {/* House outline */}
      <path d="M -40 0 L 0 -40 L 40 0 L 30 0 L 30 40 L -30 40 L -30 0 Z" fill="none" stroke="#55d3c4" strokeWidth="4" filter="url(#glowInmo)" />
      <rect x="-10" y="10" width="20" height="30" fill="#a742fb" filter="url(#glowInmo)" />
      <rect x="-20" y="-10" width="10" height="10" fill="rgba(85, 211, 196, 0.5)" />
      <rect x="10" y="-10" width="10" height="10" fill="rgba(85, 211, 196, 0.5)" />
    </g>

    {/* Sub-node 1 (Top Left) - Key */}
    <g transform="translate(120, 140) scale(1, 0.5) rotate(45)">
      <rect x="-25" y="-25" width="50" height="50" rx="10" fill="#110d1a" />
      <rect x="-25" y="-25" width="50" height="50" rx="10" fill="none" stroke="#55d3c4" strokeWidth="2" />
      <circle cx="-8" cy="0" r="6" fill="none" stroke="#fff" strokeWidth="2" />
      <line x1="-2" y1="0" x2="12" y2="0" stroke="#fff" strokeWidth="2" />
      <line x1="8" y1="0" x2="8" y2="6" stroke="#fff" strokeWidth="2" />
      <line x1="12" y1="0" x2="12" y2="6" stroke="#fff" strokeWidth="2" />
    </g>

    {/* Sub-node 2 (Bottom Left) - Catalog/List */}
    <g transform="translate(100, 240) scale(1, 0.5) rotate(45)">
      <rect x="-25" y="-25" width="50" height="50" rx="10" fill="#110d1a" />
      <rect x="-25" y="-25" width="50" height="50" rx="10" fill="none" stroke="#8b45ff" strokeWidth="2" />
      <rect x="-12" y="-12" width="10" height="8" rx="1" fill="#55d3c4" />
      <rect x="2" y="-10" width="12" height="4" rx="1" fill="#fff" />
      <rect x="-12" y="0" width="10" height="8" rx="1" fill="#55d3c4" />
      <rect x="2" y="2" width="12" height="4" rx="1" fill="#fff" />
    </g>

    {/* Sub-node 3 (Bottom Right) - Sold/Tag */}
    <g transform="translate(300, 250) scale(1, 0.5) rotate(45)">
      <rect x="-25" y="-25" width="50" height="50" rx="10" fill="#110d1a" />
      <rect x="-25" y="-25" width="50" height="50" rx="10" fill="none" stroke="#55d3c4" strokeWidth="2" />
      <path d="M -10 -10 L 10 -10 L 15 0 L 10 10 L -10 10 Z" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="-2" cy="0" r="2" fill="#8b45ff" />
    </g>
  </svg>
);

const HotelArt = () => (
  <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%', background: 'transparent', display: 'block' }} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hotelBaseFill" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a0d17" />
        <stop offset="100%" stopColor="#0a0508" />
      </linearGradient>
      <linearGradient id="glassHotel" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff4582" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#8b45ff" stopOpacity="0.05"/>
      </linearGradient>
      <filter id="glowHotel" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <line x1="200" y1="200" x2="100" y2="240" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    <line x1="200" y1="200" x2="120" y2="140" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    <line x1="200" y1="200" x2="300" y2="250" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

    {/* Bottom Base (Pool / Platform) */}
    <g transform="translate(200, 200) scale(1, 0.5) rotate(45)">
      <rect x="-90" y="-90" width="180" height="180" rx="16" fill="url(#hotelBaseFill)" stroke="#8b45ff" strokeWidth="2" />
      {/* Pool area */}
      <rect x="-70" y="10" width="60" height="60" rx="8" fill="#55d3c4" opacity="0.3" />
      <path d="M-60 20 Q -40 30 -20 20 T 0 30" fill="none" stroke="#55d3c4" strokeWidth="1" opacity="0.5" />
      <path d="M-60 40 Q -40 50 -20 40 T 0 50" fill="none" stroke="#55d3c4" strokeWidth="1" opacity="0.5" />
    </g>

    {/* Middle Glass Layer */}
    <g transform="translate(200, 130) scale(1, 0.5) rotate(45)">
      <rect x="-90" y="-90" width="180" height="180" rx="16" fill="url(#glassHotel)" />
      <rect x="-90" y="-90" width="180" height="180" rx="16" fill="none" stroke="#8b45ff" strokeWidth="1.5" />
      
      {/* Room doors representation */}
      <rect x="-60" y="-60" width="30" height="40" rx="2" fill="rgba(255,255,255,0.1)" />
      <circle cx="-55" cy="-40" r="1.5" fill="#fff" />
      
      <rect x="-20" y="-60" width="30" height="40" rx="2" fill="rgba(255,255,255,0.1)" />
      <circle cx="-15" cy="-40" r="1.5" fill="#fff" />
      
      <rect x="20" y="-60" width="30" height="40" rx="2" fill="rgba(85, 211, 196, 0.3)" />
      <circle cx="25" cy="-40" r="1.5" fill="#55d3c4" />
    </g>

    {/* Top Layer (Hotel Building / Bed) */}
    <g transform="translate(200, 60) scale(1, 0.5) rotate(45)">
      {/* Glowing base for bed */}
      <circle cx="0" cy="0" r="45" fill="#8b45ff" opacity="0.2" filter="blur(15px)" />
      
      {/* Bed representation */}
      <rect x="-30" y="-40" width="60" height="80" rx="6" fill="none" stroke="#8b45ff" strokeWidth="3" filter="url(#glowHotel)" />
      {/* Pillows */}
      <rect x="-25" y="-35" width="22" height="15" rx="4" fill="#55d3c4" filter="url(#glowHotel)" />
      <rect x="3" y="-35" width="22" height="15" rx="4" fill="#a742fb" filter="url(#glowHotel)" />
      {/* Blanket */}
      <path d="M -30 -10 L 30 -10 L 30 40 Q 0 45 -30 40 Z" fill="rgba(139, 69, 255, 0.4)" stroke="#8b45ff" strokeWidth="2" />
    </g>

    {/* Sub-node 1 (Top Left) - Calendar/Booking */}
    <g transform="translate(120, 140) scale(1, 0.5) rotate(45)">
      <rect x="-25" y="-25" width="50" height="50" rx="10" fill="#110d1a" />
      <rect x="-25" y="-25" width="50" height="50" rx="10" fill="none" stroke="#8b45ff" strokeWidth="2" />
      <rect x="-12" y="-10" width="24" height="22" rx="2" fill="none" stroke="#fff" strokeWidth="2" />
      <line x1="-15" y1="-2" x2="15" y2="-2" stroke="#fff" strokeWidth="2" />
      <rect x="-6" y="-14" width="2" height="4" fill="#55d3c4" />
      <rect x="4" y="-14" width="2" height="4" fill="#55d3c4" />
      <circle cx="-6" cy="4" r="2" fill="#55d3c4" />
    </g>

    {/* Sub-node 2 (Bottom Left) - Bell/Concierge */}
    <g transform="translate(100, 240) scale(1, 0.5) rotate(45)">
      <rect x="-25" y="-25" width="50" height="50" rx="10" fill="#110d1a" />
      <rect x="-25" y="-25" width="50" height="50" rx="10" fill="none" stroke="#55d3c4" strokeWidth="2" />
      <path d="M -12 8 C -12 -5 12 -5 12 8 Z" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="0" cy="-6" r="2" fill="#fff" />
      <rect x="-15" y="8" width="30" height="2" fill="#fff" />
    </g>

    {/* Sub-node 3 (Bottom Right) - Sun/Vacation */}
    <g transform="translate(300, 250) scale(1, 0.5) rotate(45)">
      <rect x="-25" y="-25" width="50" height="50" rx="10" fill="#110d1a" />
      <rect x="-25" y="-25" width="50" height="50" rx="10" fill="none" stroke="#8b45ff" strokeWidth="2" />
      <circle cx="0" cy="0" r="6" fill="#55d3c4" />
      <line x1="0" y1="-12" x2="0" y2="-8" stroke="#55d3c4" strokeWidth="2" />
      <line x1="0" y1="8" x2="0" y2="12" stroke="#55d3c4" strokeWidth="2" />
      <line x1="-12" y1="0" x2="-8" y2="0" stroke="#55d3c4" strokeWidth="2" />
      <line x1="8" y1="0" x2="12" y2="0" stroke="#55d3c4" strokeWidth="2" />
      <line x1="-8" y1="-8" x2="-5" y2="-5" stroke="#55d3c4" strokeWidth="2" />
      <line x1="5" y1="5" x2="8" y2="8" stroke="#55d3c4" strokeWidth="2" />
    </g>
  </svg>
);

const Landing = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = cmsShowImage;
  }, []);

  // FAQ data
  const faqData = [
    {
      question: "¿Necesito saber programar para usar JMCPanel?",
      answer: "No. El panel está diseñado para que cualquier persona pueda usarlo sin conocimientos técnicos. Subís fotos, cambiás precios, activás o desactivás productos — todo desde una interfaz simple e intuitiva."
    },
    {
      question: "¿Cuánto tarda en estar listo mi sitio?",
      answer: "Dependiendo de la complejidad, entre 1 y 3 semanas. Te entregamos tu web funcionando y tu panel configurado, listo para que empieces a cargar contenido."
    },
    {
      question: "¿Puedo actualizar mi web desde el celular?",
      answer: "Sí. JMCPanel funciona desde cualquier navegador: celular, tablet o computadora. No necesitás instalar nada."
    },
    {
      question: "¿Qué pasa si necesito una función que no viene incluida?",
      answer: "Se desarrolla a medida. El sistema es flexible y crece con tu negocio. Si necesitás algo nuevo, lo analizamos y lo agregamos."
    },
    {
      question: "¿Mi web es solo para restaurantes o inmobiliarias?",
      answer: "No. JMCPanel se adapta a cualquier negocio que necesite mostrar productos, servicios o contenido actualizado: tiendas, estudios, consultorios, catálogos y más."
    },
    {
      question: "¿Los cambios que hago se ven al instante?",
      answer: "Sí. Cualquier modificación que hagas desde el panel se refleja en tu web en segundos. No hay que esperar aprobaciones ni procesos intermedios."
    },
    {
      question: "¿Qué pasa con la seguridad de mis datos?",
      answer: "Tu información se almacena de forma segura en servidores de Google (Firebase). Los datos están protegidos con tecnología de primer nivel, la misma que usan grandes empresas."
    },
    {
      question: "¿Y si necesito soporte o tengo una duda?",
      answer: "Tenés contacto directo conmigo para cualquier consulta. No hay tickets ni esperas eternas — soporte real y personalizado."
    }
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };



  return (
    <div className={styles.landing}>
      <div className={styles.container}>
        {/* Hero */}
        <div className={styles.content}>
          <div className={styles.mainContent}>
            <h1 className={styles.mainTitle}>
              <span className={styles.titlePurple}>Tu negocio online,</span>
              <br />
              <span className={styles.titleWhite}>sin complicaciones.</span>
            </h1>

            <p className={styles.description}>
              <strong>Gestioná tu menú, catálogo o portafolio de propiedades</strong> desde el celular o la compu
              <br />
              — sin saber programación, sin llamar a nadie.
              <br />
              Con <strong>JMCPanel</strong>, vos controlás todo y tu cliente lo ve al instante.
            </p>

            <div className={styles.ctaSection}>
              <a href="https://wa.me/5491173677628?text=Hola,%20vi%20tu%20página%20y%20estoy%20interesado%20en%20JMCPanel.%20Me%20gustaría%20saber%20más%20sobre%20cómo%20puede%20ayudar%20a%20mi%20negocio.%20¡Gracias!" target="_blank" rel="noopener noreferrer">
                <Button 
                  label="¡Quiero mi panel!"
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

          <div className={styles.imageSection}>
            <img 
              src={cmsShowImage} 
              alt="Dashboard de JMCPanel" 
              className={styles.dashboardImage}
            />
          </div>
        </div>

        {/* ¿Qué es JMCPanel? */}
        <div className={styles.titleSection}>
          <div className={styles.titleLeft}>
            <CoolTitle 
              className={styles.resumenTitle}
              animation="slide"
              fontTransition="0.4s"
            >
              ¿Qué es JMCPanel?
            </CoolTitle>
          </div>
          <div className={styles.titleRight}>
            <p className={styles.subtitle}>
              Es un sistema que le da a tu negocio una <strong>presencia digital profesional y actualizada en tiempo real</strong>. 
              Vos controlás todo: subís una foto, cambiás un precio, activás o desactivás un producto 
              — y en segundos tu cliente lo ve reflejado en tu sitio web. 
              <strong> Sin esperar. Sin pedirle nada a un desarrollador.</strong>
            </p>
          </div>
        </div>

        <div className={styles.cardsGrid}>
          <div className={styles.featureCard} onClick={() => openImageModal(cmsShowImage)}>
            <div className={styles.cardIcon}>
              <FaMobileAlt />
            </div>
            <h3 className={styles.cardTitle}>Control total desde tu celular</h3>
            <p className={styles.cardDescription}>
              Subí fotos, cambiá precios, activá o desactivá productos — todo desde cualquier dispositivo, en cualquier momento.
            </p>
          </div>

          <div className={styles.featureCard} onClick={() => openImageModal(cmsShowImage)}>
            <div className={styles.cardIcon}>
              <FaCog />
            </div>
            <h3 className={styles.cardTitle}>Cambios en tiempo real</h3>
            <p className={styles.cardDescription}>
              Lo que modificás en el panel se refleja al instante en tu web. Sin esperas, sin intermediarios.
            </p>
          </div>

          <div className={styles.featureCard} onClick={() => openImageModal(cmsShowImage)}>
            <div className={styles.cardIcon}>
              <FaHeadset />
            </div>
            <h3 className={styles.cardTitle}>Soporte personalizado</h3>
            <p className={styles.cardDescription}>
              Nos encargamos de crear tu web. Y si tenés alguna duda con el panel, estamos para ayudarte.
            </p>
          </div>
        </div>

        {/* Verticales: Restaurantes e Inmobiliarias */}
        <div className={styles.caracteristicasSection} id="caracteristicas">
          <div className={styles.caracteristicasHeader}>
            <CoolTitle 
              className={styles.caracteristicasTitle}
              animation="slide"
              fontTransition="0.4s"
            >
              Adaptado a tu<br />
              <span className={styles.titlePurple}>tipo de negocio.</span>
            </CoolTitle>
            <p className={styles.caracteristicasSubtitle}>
              JMCPanel se adapta a las necesidades específicas de tu rubro. 
              Así funciona para algunos de los sectores más demandados:
            </p>
          </div>
        </div>

        <div className={styles.caracteristicasGrid}>
          {/* Restaurantes */}
          <div className={styles.caracteristicaCard}>
            <div className={styles.cardImageContainer}>
              <RestaurantArt />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}><FaUtensils className={styles.cardTitleIcon} /> Para restaurantes</h3>
              <p className={styles.cardDescription}>
                ¿Cambiaste el menú del día? ¿Se terminó un plato? <strong>Actualizalo en segundos desde tu celular.</strong>
              </p>
              <ul className={styles.cardList}>
                <li>Tu carta siempre actualizada, con fotos y precios reales</li>
                <li>Múltiples cartas: menú del día, carta principal, bebidas</li>
                <li>Si se agota un producto, se bloquea solo</li>
                <li>Notificación en tu celular con cada pedido</li>
              </ul>
            </div>
          </div>

          {/* Inmobiliarias */}
          <div className={styles.caracteristicaCard}>
            <div className={styles.cardImageContainer}>
              <InmobiliariaArt />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}><FaBuilding className={styles.cardTitleIcon} /> Para inmobiliarias</h3>
              <p className={styles.cardDescription}>
                ¿Vendiste una propiedad? ¿Cambiaron las condiciones? <strong>Dos clicks y listo.</strong>
              </p>
              <ul className={styles.cardList}>
                <li>Cargás propiedades con fotos, descripción, ambientes y más</li>
                <li>Organizás por tipo: casas, deptos, locales, terrenos</li>
                <li>Filtrás por operación: venta, alquiler, temporario</li>
                <li>Siempre con la información correcta y actualizada</li>
              </ul>
            </div>
          </div>

          {/* Hoteles y cabañas */}
          <div className={styles.caracteristicaCard}>
            <div className={styles.cardImageContainer}>
              <HotelArt />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}><FaHotel className={styles.cardTitleIcon} /> Para hoteles, cabañas y complejos</h3>
              <p className={styles.cardDescription}>
                ¿Tenés un complejo de cabañas, un hotel boutique o una unidad de alquiler temporario? <strong>Manejá todo desde un solo lugar.</strong>
              </p>
              <ul className={styles.cardList}>
                <li>Seguimiento de reservas y ocupación en tiempo real</li>
                <li>Gestión de calendario, check-in y check-out</li>
                <li>Administrás cada unidad o tipo de alojamiento por separado</li>
                <li>Control de ingresos estimados y disponibilidad</li>
                <li>Publicás anuncios y novedades directamente en tu web</li>
              </ul>
            </div>
          </div>

        </div>

        {/* ¿Por qué es diferente? */}
        <div className={styles.caracteristicasSection}>
          <div className={styles.caracteristicasHeader}>
            <CoolTitle 
              className={styles.caracteristicasTitle}
              animation="slide"
              fontTransition="0.4s"
            >
              ¿Por qué es<br />
              <span className={styles.titlePurple}>diferente?</span>
            </CoolTitle>
            <p className={styles.caracteristicasSubtitle}>
              La mayoría de los negocios depende de un desarrollador para cambiar 
              hasta el precio de un producto. Con JMCPanel, eso se acabó.
            </p>
          </div>
        </div>

        <div className={styles.cardsGrid}>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}><FaLaptop /></div>
            <h3 className={styles.cardTitle}>Panel propio</h3>
            <p className={styles.cardDescription}>Entrás desde el navegador, sin instalar nada</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}><FaBolt /></div>
            <h3 className={styles.cardTitle}>Cambios al instante</h3>
            <p className={styles.cardDescription}>Lo que modificás se ve de inmediato en tu web</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}><FaCloud /></div>
            <h3 className={styles.cardTitle}>Siempre disponible</h3>
            <p className={styles.cardDescription}>Funciona en la nube, 24/7, sin servidores que cuidar</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}><FaTabletAlt /></div>
            <h3 className={styles.cardTitle}>Cualquier dispositivo</h3>
            <p className={styles.cardDescription}>Lo manejás desde la compu, la tablet o el celular</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}><FaPaintBrush /></div>
            <h3 className={styles.cardTitle}>Tu web, tu imagen</h3>
            <p className={styles.cardDescription}>Se integra con el diseño que ya tenés</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}><FaPuzzlePiece /></div>
            <h3 className={styles.cardTitle}>Funciones a medida</h3>
            <p className={styles.cardDescription}>Si necesitás algo nuevo, se desarrolla — el sistema crece con tu negocio</p>
          </div>
        </div>

        {/* Así funciona */}
        <div className={styles.titleSection} id="planes">
          <CoolTitle 
            className={styles.planesTitle}
            animation="slide"
            fontTransition="0.4s"
          >
            Así funciona<br />
            <span className={styles.titlePurple}>Simple. Rápido. Tuyo.</span>
          </CoolTitle>
        </div>

        <div className={styles.cardsGrid}>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}><FaUserCheck /></div>
            <h3 className={styles.cardTitle}>1. Te entregamos tu panel listo</h3>
            <p className={styles.cardDescription}>Entrás con usuario y contraseña. Todo configurado para tu negocio. Sin instalaciones.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}><FaBoxOpen /></div>
            <h3 className={styles.cardTitle}>2. Cargás tu contenido vos mismo</h3>
            <p className={styles.cardDescription}>Fotos, precios, descripciones, categorías — todo desde una interfaz simple e intuitiva.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}><FaGlobe /></div>
            <h3 className={styles.cardTitle}>3. Tus clientes lo ven en tu web</h3>
            <p className={styles.cardDescription}>Actualizado, prolijo y profesional. Sin que toques una línea de código.</p>
          </div>
        </div>

        {/* Diseñado para durar */}
        <div className={styles.titleSection}>
          <div className={styles.titleLeft}>
            <CoolTitle 
              className={styles.resumenTitle}
              animation="slide"
              fontTransition="0.4s"
            >
              Diseñado para<br />
              <span className={styles.titlePurple}>durar.</span>
            </CoolTitle>
          </div>
          <div className={styles.titleRight}>
            <p className={styles.subtitle}>
              Por detrás corre tecnología de primer nivel usada por empresas como Google y Netflix 
              — lo que significa que <strong>tu sistema escala con vos</strong>, no te frena cuando crecés. 
              Y si en algún momento necesitás algo nuevo o diferente, <strong>se puede desarrollar a pedido</strong>. 
              No estás comprando algo cerrado. Estás invirtiendo en una plataforma que se adapta a lo que vos necesitás.
            </p>
          </div>
        </div>

        {/* FAQ */}
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
            Encontrá respuestas a las preguntas más comunes sobre JMCPanel.
            Si no encontrás lo que buscás, ¡contactanos directamente!
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

        {/* CTA Final */}
        <div className={styles.finalCtaContent} id="contacto">
          <h2 className={styles.finalCtaTitle}>
            ¿Tenés un negocio con productos o servicios para mostrar?
          </h2>
          <p className={styles.finalCtaSubtitle}>
            Restaurantes, inmobiliarias, tiendas, estudios — si necesitás que tus clientes 
            vean lo que ofrecés, actualizado y profesional, JMCPanel es para vos.
          </p>
          <div className={styles.finalCtaButtonContainer}>
            <a href="https://wa.me/5491173677628?text=Hola,%20vi%20tu%20página%20y%20estoy%20interesado%20en%20JMCPanel.%20Me%20gustaría%20saber%20más%20sobre%20cómo%20puede%20ayudar%20a%20mi%20negocio.%20¡Gracias!" target="_blank" rel="noopener noreferrer">
              <Button 
                label="Hablemos"
                effect="primary"
                size="large"
                className={styles.finalCtaButton}
              />
            </a>
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
