import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Mail } from 'lucide-react'

/* ── Confetti system ── */
const CONFETTI_COLORS = [
  '#008F8F', // teal
  '#F5C242', // brand-yellow
  '#3DDC84', // android green
  '#FC6D26', // gitlab orange
  '#7F52FF', // kotlin purple
  '#E44332', // red accent
  '#4285F4', // blue
  '#10B981', // emerald
]

function createConfettiPiece(canvasW, canvasH) {
  return {
    x: Math.random() * canvasW,
    y: Math.random() * -canvasH,
    w: 4 + Math.random() * 6,
    h: 8 + Math.random() * 10,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 8,
    velocityX: (Math.random() - 0.5) * 2.5,
    velocityY: 1.5 + Math.random() * 3,
    oscillationAmp: Math.random() * 2,
    oscillationSpeed: 0.02 + Math.random() * 0.03,
    phase: Math.random() * Math.PI * 2,
    opacity: 0.85 + Math.random() * 0.15,
    shape: Math.random() > 0.4 ? 'rect' : 'circle', // mix of shapes
  }
}

function ConfettiCanvas() {
  const canvasRef = useRef(null)
  const piecesRef = useRef([])
  const frameRef = useRef(0)
  const tickRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const W = canvas.offsetWidth
    const H = canvas.offsetHeight

    // Initial burst
    for (let i = 0; i < 80; i++) {
      piecesRef.current.push(createConfettiPiece(W, H))
    }

    let running = true
    const animate = () => {
      if (!running) return
      tickRef.current++

      // Continuously spawn new pieces (steady stream)
      if (tickRef.current % 4 === 0 && piecesRef.current.length < 120) {
        piecesRef.current.push(createConfettiPiece(W, H))
      }

      ctx.clearRect(0, 0, W, H)

      piecesRef.current.forEach((p) => {
        p.x += p.velocityX + Math.sin(tickRef.current * p.oscillationSpeed + p.phase) * p.oscillationAmp
        p.y += p.velocityY
        p.rotation += p.rotationSpeed

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = p.opacity

        if (p.shape === 'rect') {
          ctx.fillStyle = p.color
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()
        }

        ctx.restore()
      })

      // Recycle offscreen pieces back to the top
      piecesRef.current.forEach((p) => {
        if (p.y > H + 20) {
          p.y = -20
          p.x = Math.random() * W
          p.velocityX = (Math.random() - 0.5) * 2.5
          p.velocityY = 1.5 + Math.random() * 3
          p.rotation = Math.random() * 360
          p.color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]
        }
      })

      frameRef.current = requestAnimationFrame(animate)
    }

    // Small delay before confetti starts
    const timeout = setTimeout(() => {
      frameRef.current = requestAnimationFrame(animate)
    }, 600)

    return () => {
      running = false
      cancelAnimationFrame(frameRef.current)
      clearTimeout(timeout)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
    />
  )
}

/* ── Slide ── */
export default function ThankYouSlide() {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-[6vw] overflow-hidden">
      {/* Confetti animation */}
      <ConfettiCanvas />

      {/* Background decorative circles */}
      <div className="absolute top-[-12vh] left-[-8vw] w-[35vw] h-[35vw] rounded-full bg-teal/5 blur-3xl" />
      <div className="absolute bottom-[-12vh] right-[-8vw] w-[35vw] h-[35vw] rounded-full bg-brand-yellow/5 blur-3xl" />

      <div className="flex flex-col items-center gap-[3vh] z-10">
        {/* Mascota animada */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 w-[18vw] h-[18vw] rounded-full bg-gradient-to-tr from-teal/10 to-brand-yellow/15 blur-2xl -translate-x-[1vw] -translate-y-[1vh]" />

          <motion.img
            src="/assets/mascot/waving.png"
            alt="Tuki, Mascota de TeToca"
            className="w-[16vw] drop-shadow-[0_15px_25px_rgba(0,143,143,0.2)] relative z-10"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-[4vw] font-black font-display text-teal-deepest leading-none">
            ¡Gracias!
          </h2>
          <p className="text-[1.4vw] text-teal-dark/70 font-medium mt-[1vh]">
            por su atención
          </p>
        </motion.div>

        {/* Divider decorativo */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
          className="w-[12vw] h-[0.35vh] bg-gradient-to-r from-teal to-brand-yellow rounded-full origin-center"
        />

        {/* Card de preguntas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-teal/10 px-[3vw] py-[2.5vh] flex items-center gap-[2vw]"
        >
          <div className="flex flex-col items-center gap-[0.5vh]">
            <div className="bg-teal/10 rounded-xl p-[0.6vw]">
              <MessageCircle className="w-[1.6vw] h-[1.6vw] text-teal" />
            </div>
            <span className="text-[0.7vw] font-bold text-slate-500">Preguntas</span>
          </div>

          <div className="w-px h-[4vh] bg-slate-200" />

          <div className="flex flex-col items-center gap-[0.5vh]">
            <div className="bg-teal/10 rounded-xl p-[0.6vw]">
              <Mail className="w-[1.6vw] h-[1.6vw] text-teal" />
            </div>
            <span className="text-[0.7vw] font-bold text-slate-500">Comentarios</span>
          </div>
        </motion.div>

        {/* Nombre del equipo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-[0.85vw] font-display font-bold text-teal-dark/50 tracking-widest uppercase"
        >
          Equipo Rocket · 2026
        </motion.p>
      </div>
    </div>
  )
}
