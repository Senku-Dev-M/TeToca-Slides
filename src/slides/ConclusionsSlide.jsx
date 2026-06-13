import { motion } from 'framer-motion'
import { Layers, Repeat, Zap, Palette, Workflow, BookOpen } from 'lucide-react'
import { SlideHeader, Card } from '../components/SlideShell.jsx'

const HIGHLIGHTS = [
  {
    Icon: Layers,
    title: 'Arquitectura mantenible',
    text: 'Clean Architecture con MVVM: dominio independiente de Android y más de 35 casos de uso.',
  },
  {
    Icon: Repeat,
    title: 'Ciclo funcional completo',
    text: 'Registro, exploración, solicitud, aceptación, coordinación por chat, finalización y reseña.',
  },
  {
    Icon: Zap,
    title: 'Comunicación en tiempo real',
    text: 'Mensajería con Socket.IO integrada a corrutinas, con reconexión y confirmaciones del servidor.',
  },
  {
    Icon: Palette,
    title: 'Sistema de diseño propio',
    text: 'UI kit con tokens de diseño, colores semánticos y soporte documentado de tema oscuro.',
  },
  {
    Icon: Workflow,
    title: 'Calidad automatizada',
    text: 'Pipeline de GitLab CI con compilación, pruebas y tres herramientas de análisis estático.',
  },
  {
    Icon: BookOpen,
    title: 'Proceso documentado',
    text: 'Scrum semanal, Git Flow, Conventional Commits y wiki técnica del proyecto.',
  },
]

export default function ConclusionsSlide() {
  return (
    <div className="relative w-full h-full flex flex-col px-[4vw] pt-[4vh] pb-[3vh]">
      <SlideHeader
        section="Conclusiones"
        title="Resultados del proyecto"
        subtitle="TeToca implementa el ciclo completo de intercambio de servicios sobre una base técnica verificable en el repositorio."
      />
      <div className="flex-1 flex gap-[2.5vw] min-h-0 z-10 items-center">
        <div className="flex-[1.7] grid grid-cols-3 gap-[1.2vw]">
          {HIGHLIGHTS.map(({ Icon, title, text }, i) => (
            <Card key={title} delay={0.3 + i * 0.1} className="p-[1.1vw]">
              <div className="bg-teal/10 rounded-xl p-[0.55vw] w-fit mb-[0.8vh]">
                <Icon className="w-[1.4vw] h-[1.4vw] text-teal" />
              </div>
              <h4 className="text-[0.95vw] font-bold font-display text-teal-deepest mb-[0.4vh]">{title}</h4>
              <p className="text-[0.8vw] text-slate-600 leading-relaxed">{text}</p>
            </Card>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          className="flex-[0.5] flex flex-col items-center gap-[2vh]"
        >
          <motion.img
            src="/assets/mascot/waving.png"
            alt="Mascota del proyecto"
            className="w-[12vw] drop-shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl px-[1.8vw] py-[1.6vh] text-center">
            <p className="text-[1.25vw] font-black font-display text-teal-deepest">Gracias por su atención</p>
            <p className="text-[0.9vw] text-slate-600 mt-[0.4vh]">Preguntas y comentarios</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
