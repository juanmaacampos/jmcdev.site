# JMCdev Webpage

Sitio web profesional para servicios de desarrollo web, realizado en React con Vite y CSS Modules.

---

## Índice

- [Estructura del Proyecto](#estructura-del-proyecto)
- [Flujo y Orden de las Secciones](#flujo-y-orden-de-las-secciones)
- [Componentes Globales](#componentes-globales)
  - [CoolTitle](#cooltitle)
  - [MachineTypeTitle](#machinetypetitle)
  - [Button](#button)
  - [ServicioCard](#serviciocard)
  - [CardModal](#cardmodal)
  - [Svg](#svg)
  - [IconLink](#iconlink)
  - [LoaderDiagonal](#loaderdiagonal)
  - [Logo](#logo)
  - [ParallaxMouseImage](#parallaxmouseimage)
  - [ProyectoCard](#proyectocard)
  - [ParticleBackground](#particlebackground)
  - [PageWrapper](#pagewrapper)
  - [VideoMaskEffect](#videomaskeffect)
  - [TopButton](#topbutton)
  - [AnimatedBackgroundSvg](#animatedbackgroundsvg)
  - [VideoGallery](#videogallery)
  - [Timeline](#timeline)
  - [PlanesCard3d](#planescard3d)
  - [AdicionalesCard](#adicionalescard)
- [Secciones Principales](#secciones-principales)
  - [Navbar](#navbar)
  - [Header](#header)
  - [Servicios](#servicios)
  - [Proceso](#proceso)
  - [Planes](#planes)
  - [Portafolio](#portafolio)
  - [Testimonios](#testimonios)
  - [Contacto](#contacto)
  - [Footer](#footer)
- [Páginas](#páginas)
  - [NotFoundPage](#notfoundpage)
- [Estilos y Responsividad](#estilos-y-responsividad)
- [Animaciones](#animaciones)
- [Recursos y Assets](#recursos-y-assets)
- [Enrutamiento](#enrutamiento)
- [Bibliotecas NPM Utilizadas](#bibliotecas-npm-utilizadas)
- [Cómo Usar el Proyecto](#cómo-usar-el-proyecto)
- [Ejemplo de Uso en App.jsx](#ejemplo-de-uso-en-appjsx)
- [Notas Finales](#notas-finales)

---

## Estructura del Proyecto

```
src/
  components/
    AdicionalesCard/
    AnimatedBackgroundSvg/
    Button/
    CardModal/
    CoolTitle/
    IconLink/
    Loader/
    Logo/
    MachineTypeTitle/
    PageWrapper/
    ParallaxMouseImage/
    ParticleBackground/
    PlanesCard3d/
    ProyectoCard/
    ServicioCard/
    Svg/
    Timeline/
    TopButton/
    VideoGallery/
    VideoMaskEffect/
  pages/
    NotFoundPage/
  websections/
    Contacto/
    Header/
    Navbar/
    Planes/
    Portafolio/
    Proceso/
    Servicios/
    Testimonios/
    VideoSection/
    footer/
  assets/
    images/
    videos/
  App.jsx
  App.css
  main.jsx
  index.css
```

---

## Flujo y Orden de las Secciones

El orden de renderizado en `App.jsx` es:

1. **PageWrapper** (gestiona la carga con LoaderDiagonal y el smooth scroll)
2. **Navbar** (barra de navegación fija)
3. **Header** (hero principal, pantalla completa)
4. **Servicios** (parallax con cards y modales)
5. **VideoMaskEffect** (efecto de máscara de video con animaciones)
6. **Proceso** (timeline de pasos de trabajo)
7. **Portafolio** (proyectos recientes con VideoGallery)
8. **Planes** (tarjetas 3D de planes)
9. **Testimonios** (opiniones de clientes)
10. **Contacto** (formulario y datos)
11. **Footer** (pie de página)
12. **TopButton** (botón para volver arriba)
13. **AnimatedBackgroundSvg** (SVGs animados en el fondo durante scroll)

---

## Componentes Globales

### CoolTitle

**Función:**  
Título grande con gradiente y animaciones de fuente al hacer hover o scroll.

**Props:**
- `children`: string | ReactNode. Contenido del título.
- `className`: string. Clases CSS adicionales.
- `animation`: string. Tipo de animación (`'none'`, `'glitch'`, `'neon'`, `'slide'`, `'bounce'`, `'fade'`, `'typewriter'`).
- `hoverFonts`: array de string. Fuentes a alternar en hover/scroll.
- `fontTransition`: string. Duración de la transición de fuente.

**Uso:**
```jsx
<CoolTitle
  animation="glitch"
  hoverFonts={["'Orbitron', sans-serif", "'Rajdhani', sans-serif"]}
>
  ¡Bienvenido!
</CoolTitle>
```

---

### MachineTypeTitle

**Función:**  
Animación de máquina de escribir para palabras clave.

**Props:**
- `words`: array de string. Palabras a animar.
- `typingSpeed`: number. ms por letra (default 90).
- `deletingSpeed`: number. ms por letra (default 40).
- `pause`: number. ms de pausa entre palabras (default 1200).
- `className`: string.
- `color`: string. Gradiente o color CSS.
- `fonts`: array de string. Fuentes a alternar.

**Uso:**
```jsx
<MachineTypeTitle
  words={['conectan', 'sorprenden']}
  color="#B687F7"
/>
```

---

### Button

**Función:**  
Botón reutilizable con variantes de color, tamaño, forma, icono y efectos.

**Props:**
- `label`: string. Texto del botón.
- `onClick`: función.
- `to`: string. Link interno o externo.
- `color`: string. Color principal.
- `effect`: string. `'normal'`, `'neon'`, `'primary'`.
- `size`: string. `'small'`, `'medium'`, `'big'`.
- `shape`: string. `'normal'`, `'square'`.
- `icon`: ReactNode. Icono opcional.
- `scrollTarget`: string. ID de sección para scroll suave.

**Uso:**
```jsx
<Button label="Ver más" effect="neon" size="big" icon={<FaEye />} />
<Button label="Contacto" to="#contacto" effect="primary" />
```

---

### ServicioCard

**Función:**  
Tarjeta de servicio con icono, título, descripción y modal detallado.

**Props:**
- `icon`: ReactNode. Icono o animación.
- `svg`: ReactNode. Alternativa a icon.
- `titulo`: string.
- `descripcion`: string.
- `modalData`: objeto con datos del modal (ver CardModal).

**Uso:**
```jsx
<ServicioCard
  icon={<Svg route="src/assets/images/modals_assets/world.json" />}
  titulo="Desarrollo Web"
  descripcion="Sitios web modernos, rápidos y personalizados."
  modalData={{ ... }}
/>
```

---

### CardModal

**Función:**  
Modal informativo con tabs, imagen, título, descripción y animaciones.

**Props:**
- `open`: boolean. Si el modal está abierto.
- `onClose`: función. Cierra el modal.
- `title`: string.
- `subtitle`: string.
- `description`: string.
- `image`: objeto `{src, alt}`.
- `tabs`: array de `{label, icon, content}`.
- `headerAnimation`, `contentAnimation`, `tabsAnimation`: string. Animaciones AOS.
- `animationDelay`: number.

**Uso:**
```jsx
<CardModal
  open={open}
  onClose={() => setOpen(false)}
  title="Desarrollo Web"
  description="Creamos sitios web modernos..."
  image={{ src: "...", alt: "..." }}
  tabs={[
    { label: "¿Qué incluye?", content: <ul>...</ul> },
    { label: "Tecnologías", content: <div>...</div> }
  ]}
/>
```

---

### Svg

**Función:**  
Carga y muestra animaciones Lottie desde un archivo `.json`.

**Props:**
- `route`: string. Ruta al archivo Lottie.

**Uso:**
```jsx
<Svg route="src/assets/images/modals_assets/world.json" />
```

---

### IconLink

**Función:**  
Enlace con icono, efectos de hover y soporte para links internos/externos.

**Props:**
- `icon`: componente de react-icons.
- `to`: string. URL o ruta interna.
- `label`: string. Descripción accesible.
- `size`: string. `'small'`, `'medium'`, `'large'`.
- `effect`: string. `'fade'`, `'scale'`, `'pulse'`.
- `color`: string.
- `external`: boolean.

**Uso:**
```jsx
<IconLink icon={FaGithub} to="https://github.com" label="GitHub" external />
```

---

### LoaderDiagonal

**Función:**  
Pantalla de carga animada con franjas diagonales.

**Props:**
- `isVisible`: boolean.

**Uso:**
```jsx
<LoaderDiagonal isVisible={loading} />
```

---

### Logo

**Función:**  
Logo de la marca, clickeable.

**Props:**
- `onClick`: función.

**Uso:**
```jsx
<Logo onClick={() => window.scrollTo(0,0)} />
```

---

### ParallaxMouseImage

**Función:**  
Componente que aplica un efecto de parallax al movimiento del mouse sobre una imagen.

**Props:**
- `src`: string. Ruta de la imagen.
- `alt`: string. Texto alternativo de la imagen.
- `className`: string. Clases CSS adicionales.
- `draggable`: boolean. Indica si la imagen es arrastrable.

**Uso:**
```jsx
<ParallaxMouseImage
  src="/src/assets/images/header_img.png"
  alt="Desarrollo web"
  className={styles.headerImage}
  draggable={false}
/>
```

---

### ProyectoCard

**Función:**  
Tarjeta para mostrar un proyecto en el portafolio.

**Props:**
- `imagen`: string. Ruta de la imagen del proyecto.
- `titulo`: string. Título del proyecto.
- `descripcion`: string. Breve descripción del proyecto.
- `tecnologias`: array de string. Tecnologías utilizadas.
- `projectLink`: string. Enlace al proyecto desplegado o repositorio.

**Uso:**
```jsx
<ProyectoCard
  imagen="ruta/a/imagen.jpg"
  titulo="Nombre del Proyecto"
  descripcion="Este es un proyecto increíble."
  tecnologias={['React', 'Node.js', 'CSS']}
  projectLink="https://ejemplo.com/proyecto"
/>
```

---

### ParticleBackground

**Función:**  
Componente para renderizar un fondo de partículas animadas. Usualmente configurado para ser sutil y no interferir con el contenido principal.

**Props:**
- `className`: string. Clases CSS adicionales para el contenedor del canvas de partículas.

**Uso:**
```jsx
<ParticleBackground className={styles.particleCanvas} />
```

---

### PageWrapper

**Función:**  
Componente contenedor que gestiona la carga inicial, las transiciones de contenido y configura el smooth scroll con Lenis.

**Props:**
- `children`: Función que recibe el estado de visibilidad del contenido y devuelve los componentes a renderizar.

**Uso:**
```jsx
<PageWrapper>
  {(contentIsVisible) => (
    <>
      <Navbar />
      <Header />
      {/* Otros componentes que usan contentIsVisible */}
    </>
  )}
</PageWrapper>
```

---

### VideoMaskEffect

**Función:**  
Crea un efecto de máscara SVG sobre una sección de video, revelándola gradualmente durante el scroll.

**Props:**
- `videoSectionRef`: Referencia al contenedor del video.
- `videoOverlayRef`: Referencia al overlay del video que tendrá la máscara.
- `contentVisible`: Boolean que indica si el contenido está listo para mostrarse.

**Uso:**
```jsx
<VideoMaskEffect
  videoSectionRef={videoSectionRef}
  videoOverlayRef={videoOverlayRef}
  contentVisible={contentIsVisible}
/>
```

---

### TopButton

**Función:**  
Botón para volver al inicio de la página que aparece después de scrollear y se ajusta dinámicamente para no solaparse con el footer.

**Props:** No requiere props directamente.

**Uso:**
```jsx
<TopButton />
```

---

### AnimatedBackgroundSvg

**Función:**  
Añade SVGs animados que se desplazan en el fondo durante el scroll entre secciones específicas.

**Props:**
- `svgPaths`: Array de rutas a los SVGs a animar.
- `startTriggerId`: ID del elemento donde comienza la animación.
- `endTriggerId`: ID del elemento donde termina la animación.
- `contentIsVisible`: Boolean para controlar cuándo inicializar las animaciones.

**Uso:**
```jsx
<AnimatedBackgroundSvg
  svgPaths={[logoSvg1, logoSvg2, logoSvg3]}
  startTriggerId="planes"
  endTriggerId="contacto"
  contentIsVisible={contentIsVisible}
/>
```

---

### VideoGallery

**Función:**  
Galería interactiva de proyectos que muestra videos o imágenes con efectos al hover.

**Props:**
- `projects`: Array de objetos con datos de los proyectos.
- `title`: String opcional para el título de la galería.
- `description`: String opcional para la descripción de la galería.

**Uso:**
```jsx
<VideoGallery
  projects={proyectosData}
  title="Nuestros Proyectos"
  description="Explora algunos de nuestros trabajos más recientes"
/>
```

---

### Timeline

**Función:**  
Componente que crea una línea de tiempo visual animada, ideal para mostrar procesos o pasos.

**Props:**
- `items`: Array de objetos con datos para cada paso (título, descripción, icono).

**Uso:**
```jsx
<Timeline
  items={[
    { titulo: "Paso 1", desc: "Análisis inicial", icon: <FaSearch /> },
    { titulo: "Paso 2", desc: "Diseño y planificación", icon: <FaPencilRuler /> }
  ]}
/>
```

---

### PlanesCard3d

**Función:**  
Tarjetas de planes con efecto 3D que responden al movimiento del mouse o a la orientación del dispositivo.

**Props:**
- `plan`: Objeto con datos del plan (nombre, precio, descripción, beneficios).
- `destacado`: Boolean para marcar un plan como destacado.
- `motionActive`: Boolean para habilitar efectos de movimiento.

**Uso:**
```jsx
<PlanesCard3d
  plan={{
    nombre: "Plan Profesional",
    precio: "$299",
    descripcion: "Plan completo para empresas",
    beneficios: ["Hosting incluido", "SEO optimizado"]
  }}
  destacado={true}
  motionActive={true}
/>
```

---

### AdicionalesCard

**Función:**  
Componente interactivo que muestra servicios adicionales con una lista seleccionable y contenido dinámico.

**Props:** No requiere props directamente, utiliza datos internos.

**Uso:**
```jsx
<AdicionalesCard />
```

---

## Secciones Principales

### Navbar

- Barra de navegación fija superior.
- Botones para scroll a secciones: Servicios, Planes, Proyectos, Contacto.
- Menú hamburguesa en mobile.

### Header

- Hero principal, ocupa toda la pantalla.
- Título animado (`CoolTitle` + `MachineTypeTitle`).
- Imagen ilustrativa.
- Descripción y posibles botones de acción.

### Servicios

- Fondo parallax (video en desktop, imagen en mobile).
- Cards de servicios (`ServicioCard`), cada una abre un `CardModal` con detalles.
- Efecto especial: el cursor revela el video de fondo en un círculo (desktop).

### Proceso

- Explica los pasos de trabajo.
- Grid de pasos con título y descripción.

### Planes

- Tarjetas de planes de servicio.
- Destaca el plan recomendado.
- Botón para contactar.

### Portafolio

- Muestra proyectos recientes.
- Imagen, título, subtítulo, descripción y acciones.

### Testimonios

- Opiniones de clientes.
- Grid de tarjetas con nombre y texto.

### Contacto

- Formulario de contacto.
- Datos de contacto directo (email, WhatsApp).

### Footer

- Pie de página con información legal, links y redes.

---

## Páginas

### NotFoundPage

- Página 404 personalizada con animación interactiva.
- Efecto de seguimiento al cursor con elementos numerados.
- Botón para regresar a la página principal.

---

## Estilos y Responsividad

- **CSS Modules**: Cada componente/sección tiene su propio archivo de estilos.
- **Breakpoints**: Adaptado para desktop, tablet y mobile.
- **Parallax y efectos**: El fondo de Servicios usa video solo en desktop, imagen en mobile.
- **Animaciones**: Uso de AOS para animaciones de entrada, transiciones suaves y efectos visuales.

### Manejo de Imágenes y SVGs

- **Fondo Parallax**: 
  - Desktop: Video con efecto reveal en hover
  - Mobile: Imagen estática como fallback
  - Implementación con `videoRevealMask` y `parallaxImage`

- **SVGs y Lottie**:
  - Tamaño controlado: 48x48px para iconos de servicios
  - Contenedor con dimensiones fijas
  - Prevención de desbordamiento con `overflow: hidden`
  - Centrado con flexbox en `.iconSvgWrapper`

### Media Queries Clave

```css
@media (max-width: 900px) {
  .parallaxVideo { display: none; }
  .parallaxImage { display: block; }
  .videoRevealMask {
    -webkit-mask-image: none !important;
    mask-image: none !important;
  }
}
```

---

## Animaciones

- **AOS**: Animaciones de entrada en cards, modales y secciones.
- **CoolTitle**: Animaciones de fuente y gradiente.
- **MachineTypeTitle**: Efecto máquina de escribir.
- **LoaderDiagonal**: Franjas animadas en pantalla de carga.
- **GSAP y ScrollTrigger**: Controlan animaciones complejas basadas en scroll.
- **Lenis**: Proporciona scroll suave para una mejor experiencia de usuario.
- **VideoMaskEffect**: Efecto de revelado con máscara SVG durante el scroll.
- **PlanesCard3d**: Efectos tridimensionales que responden al movimiento.
- **Timeline**: Animación de línea de tiempo con aparición progresiva.
- **AnimatedBackgroundSvg**: SVGs flotantes animados durante el scroll.
- **NotFoundPage**: Animación de seguimiento al cursor con GSAP.

---

## Recursos y Assets

- **Imágenes**: `/src/assets/images/`
- **Videos**: `/src/assets/videos/`
- **Lottie JSON**: Animaciones para iconos y cards.
- **Fuentes**: Google Fonts (`Geologica`, `DM Sans`, `Orbitron`, etc).

---

## Enrutamiento

- **React Router DOM**: Gestiona la navegación entre páginas.
- **Estructura de rutas**:
  - `/`: Página principal con todas las secciones
  - `/*`: NotFoundPage (404)

---

## Bibliotecas NPM Utilizadas

Este proyecto utiliza varias bibliotecas NPM para su funcionamiento y características:

- **React (`react`)**: Biblioteca principal para construir la interfaz de usuario.
- **React DOM (`react-dom`)**: Para renderizar React en el DOM.
- **React Router DOM (`react-router-dom`)**: Para la gestión de rutas y navegación en la aplicación.
- **GSAP (`gsap`)**: Para animaciones avanzadas y ScrollTrigger.
- **Lenis (`@studio-freight/lenis`)**: Para un scrolling suave y personalizable.
- **Framer Motion (`framer-motion`)**: Para animaciones y gestos de alta calidad.
- **AOS (`aos`)**: Para animaciones al hacer scroll (Animate On Scroll).
- **Lottie React (`lottie-react`)**: Para renderizar animaciones Lottie (archivos JSON).
- **React Icons (`react-icons`)**: Para una amplia variedad de iconos SVG.
- **React tsParticles (`react-tsparticles`)**: Para fondos con partículas interactivas.
- **Vite (`vite`)**: Herramienta de frontend para un desarrollo rápido y optimizado.

---

## Cómo Usar el Proyecto

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

1.  **Clonar el Repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO_DEL_PROYECTO>
    cd nombre-del-directorio-del-proyecto
    ```

2.  **Instalar Dependencias:**
    Asegúrate de tener Node.js y npm (o Yarn) instalados.
    ```bash
    npm install
    ```
    O si usas Yarn:
    ```bash
    yarn install
    ```

3.  **Ejecutar el Servidor de Desarrollo:**
    Esto iniciará la aplicación en modo de desarrollo, generalmente en `http://localhost:5173` (Vite por defecto).
    ```bash
    npm run dev
    ```
    O si usas Yarn:
    ```bash
    yarn dev
    ```

4.  **Construir para Producción:**
    Para generar una versión optimizada para producción:
    ```bash
    npm run build
    ```
    O si usas Yarn:
    ```bash
    yarn build
    ```
    Los archivos de la compilación se encontrarán en el directorio `dist/`.

---

## Ejemplo de Uso en App.jsx

```jsx
import { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import PageWrapper from "./components/PageWrapper/PageWrapper";
import VideoMaskEffect from "./components/VideoMaskEffect/VideoMaskEffect";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import TopButton from "./components/TopButton/TopButton";
import AnimatedBackgroundSvg from "./components/AnimatedBackgroundSvg/AnimatedBackgroundSvg";
import logoAnimatedSvg from './assets/images/logoanimated.svg';

// Define el MainLayout para la página principal
const MainLayout = ({ contentIsVisible, videoSectionRef, videoOverlayRef }) => (
  <>
    <Navbar />
    <Header />
    <Servicios id="servicios" />
    <VideoMaskEffect
      videoSectionRef={videoSectionRef}
      videoOverlayRef={videoOverlayRef}
      contentVisible={contentIsVisible}
    />
    <Proceso />
    <Portafolio />
    <Planes />
    <Testimonios />
    <Contacto />
    <Footer />
    <TopButton />
    <AnimatedBackgroundSvg
      svgPaths={[logoAnimatedSvg, logoAnimatedSvg, logoAnimatedSvg]}
      startTriggerId="planes"
      endTriggerId="contacto"
      contentIsVisible={contentIsVisible}
    />
  </>
);

function App() {
  const videoSectionRef = useRef(null);
  const videoOverlayRef = useRef(null);

  return (
    <PageWrapper>
      {(contentIsVisible) => (
        <Routes>
          <Route 
            path="/" 
            element={
              <MainLayout 
                contentIsVisible={contentIsVisible} 
                videoSectionRef={videoSectionRef} 
                videoOverlayRef={videoOverlayRef} 
              />
            } 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </PageWrapper>
  );
}
```

---

## Notas Finales

- **Personalización**: Puedes modificar los assets, colores y textos fácilmente.
- **Extensibilidad**: Agrega más servicios, proyectos o testimonios editando los arrays correspondientes.
- **Accesibilidad**: Se recomienda revisar los textos alternativos y roles para mejorar la accesibilidad.

---

¿Dudas o sugerencias?  
Contacta a [hola@jmcdev.com](mailto:hola@jmcdev.com)

