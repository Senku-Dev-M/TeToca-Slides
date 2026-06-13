# Te Toca — Presentación del Proyecto

Presentación profesional en React del cliente móvil Android **Te Toca**, generada a partir de la evidencia del repositorio `tetoca-mobile-client` y su wiki.

## Ejecutar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/ para publicar
```

## Navegación

- `→` / `Espacio` / `PageDown`: siguiente diapositiva
- `←` / `PageUp`: anterior
- `Home` / `End`: primera / última
- Botones en pantalla (esquina inferior derecha)

## Stack

- React 18 + Vite 6
- Framer Motion (transiciones, stagger, elementos flotantes)
- Diagramas SVG animados propios (arquitectura, auth, flujo de datos)
- Resaltado de sintaxis Kotlin sin dependencias externas

## Estructura

```
src/
├── App.jsx                  # Deck: orden de slides, navegación y progreso
├── components/
│   ├── Slide.jsx            # Contenedor con transición de entrada/salida
│   ├── Background.jsx       # Fondos animados con la paleta de la marca
│   ├── FeatureSlide.jsx     # Layout reutilizable para funcionalidades
│   ├── CodeBlock.jsx        # Bloque de código con resaltado Kotlin
│   ├── diagrams.jsx         # Primitivas SVG (Box, Arrow) animadas
│   └── shared.jsx           # SlideHeader, Reveal, StaggerGrid
└── slides/                  # 23 diapositivas en español
```

## Identidad visual

Paleta tomada de `res/values/colors.xml` y `DOCS_DARK_MODE.md` del proyecto:
teal `#008F8F`, amarillo `#FFC42A`, mint `#F0F9F9`. La mascota **Tuki** 🐧 y el
logo provienen de los drawables de la app; los mockups, de la wiki de GitLab.

> Nota: la diapositiva **Estrategia de pruebas** está marcada "En desarrollo"
> a pedido del equipo; se completará cuando la estrategia esté finalizada.
