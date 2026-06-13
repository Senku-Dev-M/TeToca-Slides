import { motion } from 'framer-motion'
import {
  Paintbrush,
  Bell,
  Globe,
  MapPin,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import { SlideHeader, Card } from '../components/SlideShell.jsx'

const NEXT_STEPS = [
  {
    Icon: Paintbrush,
    title: 'Refinamiento de la UI',
    text: 'Ajustes de contrastes en modo oscuro, estados vacíos, mejoras de accesibilidad (a11y) y micro-animaciones para transiciones entre pantallas.',
    priority: 'Alta',
    priorityColor: 'bg-red-100 text-red-700',
  },
  {
    Icon: Bell,
    title: 'Notificaciones push',
    text: 'Integración con Firebase Cloud Messaging para avisar al usuario de nuevas solicitudes, mensajes de chat y cambios de estado en sus intercambios.',
    priority: 'Alta',
    priorityColor: 'bg-red-100 text-red-700',
  },
  {
    Icon: MapPin,
    title: 'Geolocalización de servicios',
    text: 'Mostrar servicios cercanos con Google Maps SDK, filtros por radio de distancia y ubicación preferida del usuario.',
    priority: 'Media',
    priorityColor: 'bg-amber-100 text-amber-700',
  },
  {
    Icon: Globe,
    title: 'Soporte multilenguaje',
    text: 'Internacionalización (i18n) con archivos de recursos strings.xml para español, inglés y portugués como idiomas iniciales.',
    priority: 'Media',
    priorityColor: 'bg-amber-100 text-amber-700',
  },
  {
    Icon: ShieldCheck,
    title: 'Verificación de identidad',
    text: 'Flujo de verificación de identidad con validación de documento de identificación para aumentar la confianza entre usuarios.',
    priority: 'Media',
    priorityColor: 'bg-amber-100 text-amber-700',
  },
  {
    Icon: TrendingUp,
    title: 'Analítica y métricas',
    text: 'Integración de Firebase Analytics y Crashlytics para monitorear uso real, detectar errores en producción y medir retención de usuarios.',
    priority: 'Baja',
    priorityColor: 'bg-emerald-100 text-emerald-700',
  },
]

export default function NextStepsSlide() {
  return (
    <div className="relative w-full h-full flex flex-col px-[4vw] pt-[4vh] pb-[3vh]">
      <SlideHeader
        section="Visión futura"
        title="Próximos pasos"
        subtitle="Mejoras planificadas para las siguientes iteraciones del proyecto."
      />

      <div className="flex-1 flex gap-[2.5vw] min-h-0 z-10 items-center">
        {/* Grid de próximos pasos */}
        <div className="flex-[1.7] grid grid-cols-3 gap-[1.2vw]">
          {NEXT_STEPS.map(({ Icon, title, text, priority, priorityColor }, i) => (
            <Card key={title} delay={0.25 + i * 0.1} className="p-[1.1vw] flex flex-col">
              <div className="flex items-center justify-between mb-[0.8vh]">
                <div className="bg-teal/10 rounded-xl p-[0.55vw] w-fit">
                  <Icon className="w-[1.4vw] h-[1.4vw] text-teal" />
                </div>
                <span className={`text-[0.6vw] font-bold px-[0.5vw] py-[0.25vh] rounded-full ${priorityColor}`}>
                  {priority}
                </span>
              </div>
              <h4 className="text-[0.95vw] font-bold font-display text-teal-deepest mb-[0.4vh]">{title}</h4>
              <p className="text-[0.78vw] text-slate-600 leading-relaxed flex-1">{text}</p>
            </Card>
          ))}
        </div>

        {/* Lateral con mascota y roadmap visual */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.85 }}
          className="flex-[0.5] flex flex-col items-center gap-[1.5vh]"
        >
          <motion.img
            src="/assets/mascot/star.png"
            alt="Mascota del proyecto"
            className="w-[10vw] drop-shadow-2xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Mini roadmap visual */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl px-[1.4vw] py-[1.4vh] w-full">
            <p className="text-[0.8vw] font-black font-display uppercase tracking-widest text-teal-dark mb-[1vh]">
              Roadmap
            </p>
            {['Sprint 9–10', 'Sprint 11–12', 'Sprint 13+'].map((phase, i) => (
              <motion.div
                key={phase}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + i * 0.15 }}
                className="flex items-center gap-[0.4vw] py-[0.4vh]"
              >
                <div className={`w-[0.5vw] h-[0.5vw] rounded-full ${
                  i === 0 ? 'bg-teal' : i === 1 ? 'bg-amber-400' : 'bg-slate-300'
                }`} />
                <span className="text-[0.75vw] font-bold text-slate-700">{phase}</span>
                <ArrowRight className="w-[0.7vw] h-[0.7vw] text-slate-300" />
                <span className="text-[0.65vw] text-slate-500">
                  {i === 0 ? 'UI + Push' : i === 1 ? 'Geo + i18n' : 'Analytics + ID'}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
