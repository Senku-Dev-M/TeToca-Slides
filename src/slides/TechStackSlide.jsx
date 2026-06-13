import { SlideHeader, Card, Evidence } from '../components/SlideShell.jsx'
import { Smartphone, Network, Image, ShieldCheck } from 'lucide-react'

// Stack declarado en gradle/libs.versions.toml y app/build.gradle.kts.
const GROUPS = [
  {
    Icon: Smartphone,
    title: 'Lenguaje y UI',
    accent: 'border-teal text-teal-dark',
    items: [
      ['Kotlin', 'Coroutines · Flow'],
      ['Android SDK 36', 'minSdk 31'],
      ['XML + Material 1.12', 'vistas clásicas'],
      ['ConstraintLayout', 'RecyclerView'],
    ],
  },
  {
    Icon: Network,
    title: 'Red y datos',
    accent: 'border-amber-400 text-amber-700',
    items: [
      ['Retrofit 3 + Gson', 'REST tipado'],
      ['OkHttp 4', 'interceptores'],
      ['Socket.IO 2.1', 'chat en tiempo real'],
      ['Room 2.8', 'persistencia SQLite'],
      ['DataStore', 'preferencias'],
      ['Supabase', 'autenticación JWT'],
    ],
  },
  {
    Icon: Image,
    title: 'Multimedia',
    accent: 'border-indigo-400 text-indigo-700',
    items: [
      ['CameraX 1.6', 'fotografía de perfil'],
      ['Coil 2.7', 'carga de imágenes'],
      ['Glide 4.16', 'carga de imágenes'],
    ],
  },
  {
    Icon: ShieldCheck,
    title: 'Calidad y DevOps',
    accent: 'border-emerald-500 text-emerald-700',
    items: [
      ['GitLab CI/CD', 'build · test · quality'],
      ['ktlint + detekt', 'análisis estático'],
      ['Android Lint', 'abortOnError = true'],
      ['JUnit + MockK', 'pruebas unitarias'],
      ['Gradle 9.4', 'version catalogs'],
    ],
  },
]

export default function TechStackSlide() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-[4vw]">
      <SlideHeader
        section="Stack tecnológico"
        title="Tecnologías utilizadas"
        subtitle="Conjunto de dependencias identificado en el catálogo de versiones de Gradle del repositorio."
      />
      <div className="grid grid-cols-4 gap-[1.2vw] w-full z-10">
        {GROUPS.map(({ Icon, title, accent, items }, gi) => (
          <Card key={title} delay={0.25 + gi * 0.12} className="p-[1.1vw] flex flex-col">
            <div className={`flex items-center gap-[0.6vw] pb-[1vh] mb-[1.2vh] border-b ${accent}`}>
              <Icon className="w-[1.4vw] h-[1.4vw]" />
              <h4 className="text-[1.05vw] font-black font-display">{title}</h4>
            </div>
            <div className="flex flex-col gap-[0.8vh]">
              {items.map(([name, detail]) => (
                <div key={name} className="flex items-baseline justify-between gap-[0.6vw] bg-brand-mint rounded-lg px-[0.8vw] py-[0.6vh]">
                  <span className="text-[0.88vw] font-bold text-slate-800 whitespace-nowrap">{name}</span>
                  <span className="text-[0.72vw] text-slate-500 text-right leading-tight">{detail}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <Evidence delay={1} className="mt-[2vh] z-10">gradle/libs.versions.toml · app/build.gradle.kts</Evidence>
    </div>
  )
}
