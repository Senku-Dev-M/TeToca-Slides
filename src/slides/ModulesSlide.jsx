import { motion } from 'framer-motion'
import { SlideHeader, Card, Evidence } from '../components/SlideShell.jsx'
import { Search, ClipboardList, PlusSquare, MessageSquare, User, ArrowRight } from 'lucide-react'

// Los cinco módulos corresponden a las cinco pestañas de navegación de la app
// (drawables ic_tab_explore, ic_tab_activity, ic_tab_offer, ic_tab_messages, ic_tab_profile).
const MODULES = [
  { Icon: Search, name: 'Explorar', desc: 'Búsqueda, categorías, servicios recientes y balance de créditos', pkg: 'ui/home/explore' },
  { Icon: ClipboardList, name: 'Actividad', desc: 'Solicitudes recibidas, enviadas e historial de intercambios', pkg: 'ui/home/activity' },
  { Icon: PlusSquare, name: 'Ofrecer', desc: 'Publicación de servicios en dos pasos con fotografías', pkg: 'ui/services/create' },
  { Icon: MessageSquare, name: 'Mensajes', desc: 'Conversaciones en tiempo real entre solicitante y proveedor', pkg: 'ui/messages' },
  { Icon: User, name: 'Perfil', desc: 'Datos personales, servicios propios, favoritos y configuración', pkg: 'ui/profile' },
]

const CYCLE = ['Registro', 'Exploración', 'Solicitud', 'Aceptación y chat', 'Entrega y reseña']

export default function ModulesSlide() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-[4vw]">
      <SlideHeader
        section="Visión general del sistema"
        title="Cinco módulos para el ciclo completo del servicio"
        subtitle="La navegación principal de la aplicación cubre cada etapa del intercambio, desde la publicación hasta la calificación."
      />
      <div className="grid grid-cols-5 gap-[1vw] w-full z-10">
        {MODULES.map(({ Icon, name, desc, pkg }, i) => (
          <Card key={name} delay={0.25 + i * 0.1} className="p-[1.1vw] text-center flex flex-col">
            <div className="mx-auto bg-teal/10 rounded-xl p-[0.7vw] mb-[1vh]">
              <Icon className="w-[1.8vw] h-[1.8vw] text-teal" />
            </div>
            <h4 className="text-[1.05vw] font-bold font-display text-teal-deepest">{name}</h4>
            <p className="text-[0.82vw] text-slate-600 leading-snug mt-[0.5vh] flex-1">{desc}</p>
            <Evidence delay={0.9} className="mt-[1vh]">{pkg}</Evidence>
          </Card>
        ))}
      </div>
      <Card delay={0.85} className="mt-[3vh] px-[2vw] py-[1.6vh] w-full">
        <p className="text-[0.85vw] font-bold font-display text-teal-dark uppercase tracking-widest mb-[1.2vh]">
          Ciclo de vida de un intercambio
        </p>
        <div className="flex items-center justify-between">
          {CYCLE.map((step, i) => (
            <div key={step} className="flex items-center gap-[0.6vw]">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.0 + i * 0.12 }}
                className={`px-[1.1vw] py-[0.7vh] rounded-xl font-display font-bold text-[0.95vw] border ${
                  i === CYCLE.length - 1
                    ? 'bg-brand-yellow/20 border-brand-yellow text-amber-700'
                    : 'bg-teal/10 border-teal/30 text-teal-dark'
                }`}
              >
                {step}
              </motion.div>
              {i < CYCLE.length - 1 && <ArrowRight className="w-[1.1vw] h-[1.1vw] text-teal" />}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
