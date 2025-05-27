# JMCdev - Portfolio & Business Website

## 📋 Descripción del Proyecto

JMCdev es una página web profesional de servicios de desarrollo web, fotografía y redes sociales. El proyecto está construido con **React** y **Vite**, optimizado para rendimiento y SEO, con soporte multiidioma automático y efectos visuales avanzados.

## 🚀 Características Principales

- **Multi-idioma automático** (Español, Inglés, Holandés)
- **Diseño responsivo** con efectos 3D interactivos
- **Optimización SEO** avanzada con Schema.org
- **Lazy loading** y preload inteligente
- **Efectos visuales** con GSAP y Framer Motion
- **Formulario de contacto** integrado con WhatsApp
- **Galería de proyectos** con navegación fluida
- **Sistema de planes** con visualización 3D

## 🛠️ Tecnologías Utilizadas

### Frontend Core
- **React 18** - Biblioteca principal
- **Vite** - Build tool y bundler
- **React Router DOM** - Navegación SPA
- **React Context** - Manejo de estado global

### Animaciones y Efectos
- **GSAP** - Animaciones complejas y ScrollTrigger
- **Framer Motion** - Animaciones de componentes React
- **Lenis** - Smooth scrolling
- **AOS** - Animate On Scroll

### UI/UX Enhancements
- **Swiper** - Carruseles y sliders
- **React Icons** - Iconografía
- **Lottie React** - Animaciones vectoriales
- **React Intersection Observer** - Detección de visibilidad

### Optimización
- **Lazy Loading** - Carga diferida de componentes
- **Image Optimization** - Compresión y preload
- **Code Splitting** - División automática del código

## 📁 Estructura del Proyecto

```
src/
├── components/                  # Componentes reutilizables
│   ├── AnimatedBackgroundSvg/  # Fondo animado con SVGs
│   ├── Card3D/                 # Tarjetas interactivas 3D
│   ├── LanguageSelector/       # Selector de idiomas
│   ├── PageWrapper/            # Wrapper con efectos globales
│   ├── ParticleBackground/     # Fondo de partículas
│   ├── TopButton/              # Botón scroll to top
│   ├── VideoMaskEffect/        # Efecto máscara de video
│   └── VideoGallery/           # Galería de videos
│
├── websections/                # Secciones principales
│   ├── Header/                 # Cabecera con hero section
│   ├── Navbar/                 # Navegación principal
│   ├── Servicios/              # Grid de servicios
│   ├── Proceso/                # Proceso de trabajo
│   ├── Portafolio/             # Galería de proyectos
│   ├── Planes/                 # Planes y precios
│   ├── Testimonios/            # Testimonios de clientes
│   ├── Contacto/               # Formulario de contacto
│   └── Footer/                 # Pie de página
│
├── pages/                      # Páginas completas
│   ├── BianDemoPage/           # Página demo para cliente
│   └── NotFoundPage/           # Página 404
│
├── context/                    # Contextos de React
│   └── LanguageContext.jsx     # Manejo de idiomas
│
├── translations/               # Sistema de traducciones
│   └── index.js                # Diccionario multi-idioma
│
├── utils/                      # Utilidades
│   └── seo.js                  # Funciones SEO y Schema.org
│
└── assets/                     # Recursos estáticos
    ├── images/                 # Imágenes optimizadas
    ├── videos/                 # Videos y animaciones
    └── fonts/                  # Fuentes personalizadas
```

## 🎯 Componentes Principales

### 1. **PageWrapper** (`src/components/PageWrapper/`)
Componente que envuelve toda la aplicación proporcionando:
- Inicialización de GSAP y Lenis
- Manejo de estado de visibilidad de contenido
- Efectos globales y smooth scrolling

### 2. **LanguageContext** (`src/context/LanguageContext.jsx`)
Sistema de internacionalización que:
- Detecta automáticamente el idioma del navegador
- Permite cambio manual de idioma
- Persiste preferencias en localStorage
- Soporta español, inglés y holandés

### 3. **Card3D** (`src/components/Card3D/`)
Tarjetas interactivas con efectos 3D que:
- Responden al movimiento del mouse/device motion
- Muestran diferentes contenidos (planes, servicios)
- Incluyen animaciones fluidas y parallax

### 4. **VideoMaskEffect** (`src/components/VideoMaskEffect/`)
Efecto visual avanzado que:
- Combina videos con máscaras CSS
- Revela contenido mediante scroll
- Optimizado para rendimiento

### 5. **Sistema de Traducciones** (`src/translations/`)
Diccionario completo que incluye:
- Todas las secciones de la web
- Formularios dinámicos
- Mensajes de error y éxito
- Metadatos SEO por idioma

## 🔧 Sistema de Formularios

### Formulario de Contacto Dinámico
El formulario en `src/websections/Contacto/` incluye:

**Campos Dinámicos:**
- Tipo de consulta (Web, Soporte, Redes Sociales, Otro)
- Campos condicionales según el tipo seleccionado
- Validación en tiempo real
- Integración directa con WhatsApp

**Tipos de Consulta:**
```javascript
// Ejemplo de estructura del formulario
const tiposConsulta = {
  webPage: "Página web",
  techSupport: "Soporte técnico",
  socialMedia: "Redes sociales", 
  other: "Otro"
};
```

**Validaciones:**
- Email con regex
- Campos obligatorios
- Longitud mínima de texto
- Selecciones requeridas

## 🎨 Sistema de Efectos Visuales

### GSAP Animations
Utilizadas en:
- Scroll-triggered animations
- Loading sequences
- Page transitions
- SVG morphing

### Framer Motion
Para:
- Component enter/exit animations
- Hover effects
- Layout animations
- Gesture handling

### CSS 3D Transforms
En tarjetas interactivas:
```css
transform: perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg);
```

## 📱 Optimización Móvil

### Device Motion API
Para efectos 3D en móviles:
```javascript
useEffect(() => {
  const handleDeviceMotion = (event) => {
    const { beta, gamma } = event;
    setRotateX(beta * 0.1);
    setRotateY(gamma * 0.1);
  };
  
  window.addEventListener('devicemotion', handleDeviceMotion);
}, []);
```

### Responsive Design
- Breakpoints optimizados
- Componentes adaptativos
- Touch gestures
- Performance optimizado para móvil

## 🔍 SEO y Performance

### SEO Features
- **Meta tags dinámicos** por página/idioma
- **Schema.org** structured data
- **Open Graph** para redes sociales
- **Sitemap** automático
- **Robots.txt** optimizado

### Performance Optimizations
- **Code splitting** automático
- **Lazy loading** de componentes pesados
- **Image optimization** con preload
- **Critical CSS** inlined
- **Bundle analysis** y tree shaking

### Implementación SEO:
```javascript
// Ejemplo de uso del utils/seo.js
import { generateSchemaMarkup, injectSchemaMarkup } from './utils/seo';

const schemaData = generateSchemaMarkup('Service', {
  name: 'Desarrollo Web',
  description: 'Servicios de desarrollo web profesional'
});

injectSchemaMarkup('service-schema', schemaData);
```

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 16+
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>

# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

### Scripts Disponibles
```json
{
  "dev": "vite",                    // Servidor de desarrollo
  "build": "vite build",            // Build de producción
  "preview": "vite preview",        // Preview del build
  "lint": "eslint . --ext js,jsx",  // Linting
  "deploy": "gh-pages -d dist"      // Deploy a GitHub Pages
}
```

## 🌐 Deployment

### Configuración para Producción
- **Base path** configurado en `vite.config.js`
- **404.html** generado automáticamente
- **Assets optimization** habilitada
- **Custom domain** ready

### Variables de Entorno
```env
# Ejemplo de .env.production
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_API_BASE_URL=https://api.domain.com
```

## 🎯 Páginas Especiales

### BianDemoPage (`/bian_demo`)
Página demo específica para cliente que:
- Usa su propio LanguageProvider
- Implementa navegación móvil custom
- Muestra mejoras propuestas
- Mantiene branding del cliente

### NotFoundPage (`/*`)
Página 404 personalizada con:
- Animaciones Lottie
- Navegación de regreso
- SEO optimizado

## 🔧 Personalización

### Añadir Nuevos Idiomas
1. Extender `translations/index.js`:
```javascript
export const translations = {
  // ...idiomas existentes
  fr: {
    navbar: {
      services: "Services",
      // ...resto de traducciones
    }
  }
};
```

2. Actualizar `LanguageContext.jsx`:
```javascript
availableLanguages: [
  // ...idiomas existentes
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
]
```

### Añadir Nuevos Servicios
1. Actualizar `translations/index.js` en `services.cards`
2. Crear componente visual en `websections/Servicios/`
3. Añadir lógica modal correspondiente

### Modificar Planes
1. Editar `translations/index.js` en `planes.plans`
2. Actualizar componente `Card3D` si es necesario
3. Modificar formulario de contacto para nuevos tipos

## 📊 Analytics y Tracking

### Google Analytics 4
Configurado con:
- Pageviews automáticos
- Event tracking
- Conversions setup
- Privacy compliance

### Performance Monitoring
- Core Web Vitals tracking
- Loading time analysis
- User interaction metrics

## 🤝 Contribución

### Estructura de Commits
```
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
style: estilos
refactor: refactorización
perf: optimización
test: pruebas
```

### Guidelines
- Usar componentes funcionales con hooks
- Implementar lazy loading para componentes pesados
- Mantener traducciones actualizadas
- Optimizar imágenes antes de commit
- Documentar nuevos componentes

## 📄 Licencia

Este proyecto es privado y pertenece a JMCdev. Todos los derechos reservados.

