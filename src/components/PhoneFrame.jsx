import { motion } from 'framer-motion'

// Marco de teléfono para capturas reales tomadas en un dispositivo físico
// (realme RMX3741, Android, build debug del repositorio). El bisel se dibuja
// como borde de la propia imagen para que el conjunto respete alto y ancho
// disponibles sin recortar la captura.
export default function PhoneFrame({ src, alt, caption, delay = 0.3, className = '' }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col items-center min-h-0 min-w-0 ${className}`}
    >
      <div className="flex-1 min-h-0 w-full flex flex-col items-center justify-center gap-[1vh]">
        <img
          src={src}
          alt={alt}
          className="max-h-[88%] max-w-full w-auto h-auto object-contain rounded-[1.4vw] border-[0.3vw] border-teal-deepest bg-teal-deepest shadow-2xl"
        />
        {caption && (
          <figcaption className="text-[0.8vw] font-semibold text-teal-dark bg-white/80 px-[0.9vw] py-[0.35vh] rounded-full shadow whitespace-nowrap shrink-0">
            {caption}
          </figcaption>
        )}
      </div>
    </motion.figure>
  )
}
