import { motion } from 'framer-motion'
import { SlideHeader, Card, Evidence } from '../components/SlideShell.jsx'

/*
 * Icon sources:
 *  - Devicon CDN:  https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{name}/{name}-{variant}.svg
 *  - Simple Icons: https://cdn.simpleicons.org/{slug}/{color}
 *
 * For libraries without a dedicated icon (Coil, Glide, Room, DataStore, CameraX, ktlint, detekt)
 * we use the closest real brand icon (Kotlin, Android, Jetpack Compose, etc.).
 */

const DV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const SI = 'https://cdn.simpleicons.org'

const GROUPS = [
  {
    title: 'Lenguaje y UI',
    accent: 'border-teal',
    accentColor: '#008F8F',
    items: [
      { name: 'Kotlin',            sub: 'Coroutines · Flow',      icon: `${DV}/kotlin/kotlin-original.svg` },
      { name: 'Android SDK 36',    sub: 'minSdk 31',              icon: `${DV}/android/android-original.svg` },
      { name: 'Material Design',   sub: 'Material 1.12 · vistas', icon: `${DV}/materialui/materialui-original.svg` },
      { name: 'XML Layouts',       sub: 'ConstraintLayout · RV',  icon: `${DV}/xml/xml-original.svg` },
    ],
  },
  {
    title: 'Red y datos',
    accent: 'border-amber-400',
    accentColor: '#F59E0B',
    items: [
      { name: 'Retrofit 3',    sub: 'REST tipado + Gson',    icon: `${SI}/square/3299CC` },
      { name: 'OkHttp 4',      sub: 'Interceptores',         icon: `${SI}/square/3E993E` },
      { name: 'Socket.IO 2.1', sub: 'Chat en tiempo real',   icon: `${DV}/socketio/socketio-original.svg` },
      { name: 'Room 2.8',      sub: 'Persistencia SQLite',   icon: `${DV}/sqlite/sqlite-original.svg` },
      { name: 'DataStore',     sub: 'Preferencias clave–valor', icon: `${SI}/jetpackcompose/4285F4` },
      { name: 'Supabase',      sub: 'Auth JWT · Google OAuth',  icon: `${DV}/supabase/supabase-original.svg` },
    ],
  },
  {
    title: 'Multimedia',
    accent: 'border-indigo-400',
    accentColor: '#818CF8',
    items: [
      { name: 'CameraX 1.6', sub: 'Fotografía de perfil', icon: `${SI}/jetpackcompose/4285F4` },
      { name: 'Coil 2.7',    sub: 'Carga de imágenes',    icon: `${DV}/kotlin/kotlin-original.svg` },
      { name: 'Glide 4.16',  sub: 'Carga de imágenes',    icon: `${DV}/java/java-original.svg` },
    ],
  },
  {
    title: 'Calidad y DevOps',
    accent: 'border-emerald-500',
    accentColor: '#10B981',
    items: [
      { name: 'GitLab CI/CD',   sub: 'Build · Test · Quality', icon: `${DV}/gitlab/gitlab-original.svg` },
      { name: 'ktlint + detekt', sub: 'Análisis estático',     icon: `${DV}/kotlin/kotlin-original.svg` },
      { name: 'Android Lint',    sub: 'abortOnError = true',   icon: `${DV}/android/android-original.svg` },
      { name: 'JUnit + MockK',  sub: 'Pruebas unitarias',     icon: `${DV}/junit/junit-original.svg` },
      { name: 'Gradle 9.4',     sub: 'Version catalogs',      icon: `${DV}/gradle/gradle-original.svg` },
    ],
  },
]

/* ───────── Small helper component ───────── */
function TechIcon({ src, name }) {
  return (
    <img
      src={src}
      alt={name}
      className="w-[1.5vw] h-[1.5vw] object-contain select-none"
      draggable={false}
      loading="lazy"
      onError={(e) => {
        // If the icon fails to load, show the first letter as fallback
        const parent = e.target.parentNode
        if (parent) {
          e.target.style.display = 'none'
          const span = document.createElement('span')
          span.textContent = name.charAt(0)
          span.className = 'text-[1vw] font-black text-slate-400'
          parent.appendChild(span)
        }
      }}
    />
  )
}

/* ────────── Slide component ────────── */
export default function TechStackSlide() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-[4vw]">
      <SlideHeader
        section="Stack tecnológico"
        title="Tecnologías utilizadas"
        subtitle="Conjunto de dependencias del catálogo de versiones de Gradle."
      />

      <div className="grid grid-cols-4 gap-[1.2vw] w-full z-10">
        {GROUPS.map(({ title, accent, accentColor, items }, gi) => (
          <Card key={title} delay={0.2 + gi * 0.12} className="p-[1.1vw] flex flex-col">
            {/* ── Section header ── */}
            <div className={`flex items-center gap-[0.5vw] pb-[0.8vh] mb-[1vh] border-b-2 ${accent}`}>
              <div
                className="w-[0.55vw] h-[0.55vw] rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <h4 className="text-[1vw] font-black font-display text-teal-deepest">
                {title}
              </h4>
            </div>

            {/* ── Tech list with icons ── */}
            <div className="flex flex-col gap-[0.65vh]">
              {items.map(({ name, sub, icon }, ti) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + gi * 0.12 + ti * 0.06, duration: 0.35 }}
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-[0.55vw] rounded-xl px-[0.6vw] py-[0.45vh] bg-brand-mint/60 hover:bg-brand-mint transition-colors duration-200"
                >
                  {/* Icon */}
                  <div className="w-[2vw] h-[2vw] rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 p-[0.2vw]">
                    <TechIcon src={icon} name={name} />
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.82vw] font-bold text-slate-800 leading-tight truncate">
                      {name}
                    </p>
                    <p className="text-[0.62vw] text-slate-500 leading-tight truncate">
                      {sub}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Evidence delay={1} className="mt-[1.8vh] z-10">
        gradle/libs.versions.toml · app/build.gradle.kts
      </Evidence>
    </div>
  )
}
