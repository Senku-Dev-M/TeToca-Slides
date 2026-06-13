import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Music, Utensils, Hammer, GraduationCap, Headphones,
  Paintbrush, Star, Scissors, Flower2, Camera, Heart, Coins,
} from 'lucide-react'

const ICONS = [Music, Utensils, Hammer, GraduationCap, Headphones, Paintbrush, Star, Scissors, Flower2, Camera, Heart, Coins]
const COLORS = ['text-teal/20', 'text-brand-yellow/25', 'text-teal-bright/15', 'text-teal-dark/10']

// Fondo animado inspirado en la ilustración de bienvenida de TeToca:
// iconos de categorías de servicio desplazándose lentamente por la pantalla.
export default function FloatingBackground() {
  const items = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        Icon: ICONS[i % ICONS.length],
        color: COLORS[i % COLORS.length],
        size: 26 + Math.random() * 42,
        top: `${(i * 37) % 96}%`,
        delay: -(i * 9 + Math.random() * 14),
        duration: 70 + Math.random() * 50,
        rotation: Math.random() * 90 - 45,
      })),
    [],
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {items.map(({ id, Icon, color, size, top, delay, duration, rotation }) => (
        <motion.div
          key={id}
          className={`absolute ${color}`}
          style={{ top, left: 0, width: size, height: size }}
          initial={{ x: '-12vw', rotate: rotation }}
          animate={{ x: '112vw', rotate: rotation + 40 }}
          transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
        >
          <Icon className="w-full h-full" strokeWidth={1.6} />
        </motion.div>
      ))}
      {/* Marca de agua de la mascota */}
      <motion.img
        src="/assets/tuki.png"
        alt=""
        className="absolute opacity-[0.05] w-[20vw] -right-[3vw] -bottom-[4vh] grayscale"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
