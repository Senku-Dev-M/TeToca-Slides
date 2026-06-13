import { motion } from 'framer-motion'
import { Play, Smartphone } from 'lucide-react'
import { Card } from '../components/SlideShell.jsx'

export default function DemoSlide() {
  const steps = [
    { num: '1', title: 'Registro y Onboarding', desc: 'Creación de cuenta, asignación de créditos y perfil inicial' },
    { num: '2', title: 'Publicación de Servicios', desc: 'Creación rápida con categorías, disponibilidad y costos' },
    { num: '3', title: 'Solicitud e Intercambio', desc: 'Exploración de la oferta, control de créditos y flujo de aceptación' },
    { num: '4', title: 'Coordinación en Vivo', desc: 'Chat en tiempo real mediante WebSockets con confirmaciones' },
  ]

  return (
    <div className="relative w-full h-full flex items-center justify-center px-[6vw]">
      {/* Círculos decorativos de fondo */}
      <div className="absolute top-[-10vh] left-[-10vh] w-[35vw] h-[35vw] rounded-full bg-teal/5 blur-3xl" />
      <div className="absolute bottom-[-10vh] right-[-10vh] w-[35vw] h-[35vw] rounded-full bg-brand-yellow/5 blur-3xl" />

      <div className="flex w-full max-w-[80vw] items-center justify-between gap-[4vw] z-10">
        
        {/* Contenido Izquierdo */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-[0.6vw] bg-brand-yellow/20 border border-brand-yellow/30 text-amber-700 px-[1.2vw] py-[0.5vh] rounded-full text-[0.85vw] font-bold font-display uppercase tracking-widest w-fit mb-[1.5vh]"
          >
            <Smartphone className="w-[1.1vw] h-[1.1vw]" />
            Interacción en vivo
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[4.5vw] font-black font-display text-teal-deepest leading-none mb-[1vh]"
          >
            DEMO
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[1.25vw] text-teal-dark font-medium leading-relaxed mb-[3vh]"
          >
            A continuación, pasaremos a la demostración en tiempo real de la aplicación en el dispositivo.
          </motion.p>
          
          {/* Pasos de la demo en Cards */}
          <div className="flex flex-col gap-[1.2vh]">
            {steps.map((step, idx) => (
              <Card
                key={step.num}
                delay={0.3 + idx * 0.12}
                x={-30}
                y={0}
                className="p-[1vw] border-l-4 border-teal hover:border-brand-yellow transition-colors duration-300"
              >
                <div className="flex items-center gap-[0.8vw]">
                  <div className="w-[1.8vw] h-[1.8vw] bg-teal/10 rounded-lg flex items-center justify-center font-bold text-teal text-[0.9vw]">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="text-[0.95vw] font-black font-display text-teal-deepest">{step.title}</h4>
                    <p className="text-[0.78vw] text-slate-500 leading-snug mt-[0.1vh]">{step.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Contenido Derecho: Mascota Tuki */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative w-[30vw] h-[35vw] flex items-center justify-center"
          >
            {/* Círculo de fondo para destacar a la mascota */}
            <div className="absolute w-[22vw] h-[22vw] rounded-full bg-gradient-to-tr from-teal/10 to-brand-yellow/15 blur-md" />
            
            {/* Mascot paper plane */}
            <motion.img
              src="/assets/mascot/paper_plane.png"
              alt="Tuki, Mascota de TeToca"
              className="absolute w-[20vw] drop-shadow-[0_15px_15px_rgba(0,143,143,0.18)] z-10"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Play overlay button (visually indicates transition to demo) */}
            <motion.div
              className="absolute bottom-[2vh] bg-white text-teal-dark border border-teal/20 px-[1.5vw] py-[1vh] rounded-2xl shadow-2xl z-20 flex items-center gap-[0.6vw] hover:bg-teal hover:text-white transition-colors duration-300 cursor-pointer font-display font-black text-[1vw]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-[1.2vw] h-[1.2vw] fill-current" />
              Iniciar Demo
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
