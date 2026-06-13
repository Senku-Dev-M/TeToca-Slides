import { motion } from 'framer-motion'

// Encabezado estándar de diapositiva: etiqueta de sección, título y descripción.
export function SlideHeader({ section, title, subtitle }) {
  return (
    <div className="text-center mb-[2.5vh] z-10">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-[0.6vw] bg-teal/10 border border-teal/25 text-teal-dark px-[1.2vw] py-[0.5vh] rounded-full text-[0.85vw] font-bold font-display uppercase tracking-widest"
      >
        {section}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: -22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-[2.6vw] font-black font-display text-teal-deepest mt-[1vh] leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-[1.05vw] text-slate-600 max-w-[62vw] mx-auto mt-[0.8vh] leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export function Card({ children, className = '', delay = 0, x = 0, y = 24 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function Evidence({ children, className = '', delay = 0.8 }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className={`font-mono text-[0.72vw] text-teal-dark/70 ${className}`}
    >
      {children}
    </motion.p>
  )
}
