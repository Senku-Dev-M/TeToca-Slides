import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Mail } from 'lucide-react'

/* ── Confetti system with interactive sweeping mascot ── */
const CONFETTI_COLORS = [
  '#008F8F', '#F5C242', '#3DDC84', '#FC6D26',
  '#7F52FF', '#E44332', '#4285F4', '#10B981',
]

function createPiece(W, H) {
  return {
    x: Math.random() * W,
    y: Math.random() * -H * 0.5,
    w: 4 + Math.random() * 6,
    h: 8 + Math.random() * 10,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    rot: Math.random() * 360,
    rotSpd: (Math.random() - 0.5) * 8,
    vx: (Math.random() - 0.5) * 2.5,
    vy: 1.5 + Math.random() * 3,
    oscAmp: Math.random() * 2,
    oscSpd: 0.02 + Math.random() * 0.03,
    phase: Math.random() * Math.PI * 2,
    opacity: 0.85 + Math.random() * 0.15,
    shape: Math.random() > 0.4 ? 'rect' : 'circle',
  }
}

function ConfettiWithWindBlowers() {
  const canvasRef = useRef(null)
  const fallingRef = useRef([])
  const landedRef = useRef([])
  const flingRef = useRef([])       // pieces blown by the wind
  const windStreamsRef = useRef([])  // wind stream particles
  const frameRef = useRef(0)
  const tickRef = useRef(0)

  // Turbines state
  const turbinesState = useRef({
    left: { active: false, speed: 0.02, angle: 0 },
    right: { active: false, speed: 0.02, angle: 0 },
  })

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
    const FLOOR = H * 0.88

    // Initial burst of confetti
    for (let i = 0; i < 70; i++) {
      fallingRef.current.push(createPiece(W, H))
    }

    let running = true

    const drawPiece = (p) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rot * Math.PI) / 180)
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
    }

    // Helper to spawn a wind stream line
    const createWindStream = (isLeft) => {
      return {
        x: isLeft ? W * 0.05 : W * 0.95,
        y: FLOOR - 30 + Math.random() * 40,
        vx: isLeft ? 8 + Math.random() * 6 : -(8 + Math.random() * 6),
        vy: (Math.random() - 0.5) * 0.5,
        alpha: 0.8 + Math.random() * 0.2,
        color: isLeft ? 'rgba(0, 210, 210, ' : 'rgba(245, 194, 66, ',
      }
    }

    // Helper to draw a sleek turbine blower on canvas
    const drawTurbine = (x, y, isLeft, turbineState) => {
      ctx.save()
      ctx.translate(x, y)
      
      // Base / Mount
      ctx.fillStyle = '#1e293b' // slate-800
      ctx.beginPath()
      ctx.ellipse(0, 15, 20, 8, 0, 0, Math.PI * 2)
      ctx.fill()
      
      // Stand
      ctx.strokeStyle = '#334155' // slate-700
      ctx.lineWidth = 6
      ctx.beginPath()
      ctx.moveTo(0, 15)
      ctx.lineTo(0, 0)
      ctx.stroke()
      
      // Turbine body / outer ring
      ctx.lineWidth = 3
      ctx.strokeStyle = '#475569' // slate-600
      ctx.fillStyle = '#0f172a' // slate-900
      ctx.beginPath()
      ctx.arc(0, 0, 18, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      
      // Glowing ring inside housing
      ctx.strokeStyle = turbineState.active 
        ? (isLeft ? '#00cccc' : '#f5c242') 
        : '#1e293b'
      ctx.shadowColor = turbineState.active 
        ? (isLeft ? '#00f2f2' : '#f5c242') 
        : 'transparent'
      ctx.shadowBlur = turbineState.active ? 8 : 0
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(0, 0, 14, 0, Math.PI * 2)
      ctx.stroke()
      ctx.shadowBlur = 0 // reset shadow
      
      // Spinning blades
      ctx.strokeStyle = turbineState.active ? '#64748b' : '#475569'
      ctx.lineWidth = 2.5
      for (let i = 0; i < 3; i++) {
        const angle = turbineState.angle + (i * Math.PI * 2) / 3
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(Math.cos(angle) * 12, Math.sin(angle) * 12)
        ctx.stroke()
      }

      // Stationary center hub: TeToca brand badge (with a stylized "T")
      ctx.save()
      // Green rounded square box (TeToca brand green/teal)
      ctx.fillStyle = '#008F8F'
      const badgeSize = 14
      ctx.beginPath()
      // Draw rounded rectangle manually to ensure maximum compatibility
      const r = 3 // radius
      const x_offset = -badgeSize / 2
      const y_offset = -badgeSize / 2
      ctx.moveTo(x_offset + r, y_offset)
      ctx.lineTo(x_offset + badgeSize - r, y_offset)
      ctx.arcTo(x_offset + badgeSize, y_offset, x_offset + badgeSize, y_offset + r, r)
      ctx.lineTo(x_offset + badgeSize, y_offset + badgeSize - r)
      ctx.arcTo(x_offset + badgeSize, y_offset + badgeSize, x_offset + badgeSize - r, y_offset + badgeSize, r)
      ctx.lineTo(x_offset + r, y_offset + badgeSize)
      ctx.arcTo(x_offset, y_offset + badgeSize, x_offset, y_offset + badgeSize - r, r)
      ctx.lineTo(x_offset, y_offset + r)
      ctx.arcTo(x_offset, y_offset, x_offset + r, y_offset, r)
      ctx.closePath()
      ctx.fill()

      // Stylized yellow "T" (brand yellow)
      ctx.fillStyle = '#F5C242'
      // T horizontal bar
      ctx.fillRect(-4.5, -4.5, 9, 2.4)
      // T vertical stem
      ctx.fillRect(-1.4, -2.1, 2.8, 6.6)
      
      // Draw the diagonal slice/cutout characteristic of the TeToca logo
      ctx.strokeStyle = '#008F8F'
      ctx.lineWidth = 1.0
      ctx.beginPath()
      ctx.moveTo(-1.6, 1.2)
      ctx.lineTo(1.6, -1.0)
      ctx.stroke()
      
      ctx.restore()
      
      // Directional nozzle indicator (pointing inward)
      ctx.fillStyle = '#475569'
      ctx.beginPath()
      const nozzleAngle = isLeft ? 0 : Math.PI
      ctx.translate(Math.cos(nozzleAngle) * 18, Math.sin(nozzleAngle) * 18)
      ctx.rotate(nozzleAngle)
      ctx.moveTo(0, -4)
      ctx.lineTo(6, 0)
      ctx.lineTo(0, 4)
      ctx.closePath()
      ctx.fill()
      
      ctx.restore()
    }

    const animate = () => {
      if (!running) return
      const tick = ++tickRef.current

      // Spawn new falling pieces
      if (tick % 5 === 0 && fallingRef.current.length < 80) {
        fallingRef.current.push(createPiece(W, H))
      }

      // ── Alternating Wind Turbine Cycle ──
      // Cycle lasts 1200 frames (~20 seconds)
      const cycle = tick % 1200
      // Turbines remain idle for ~15 seconds to let confetti accumulate
      const leftActive = cycle >= 900 && cycle < 1020    // left blows for 2 seconds
      const rightActive = cycle >= 1060 && cycle < 1180 // right blows for 2 seconds after a brief pause

      const t = turbinesState.current
      t.left.active = leftActive
      t.right.active = rightActive

      // Blade speeds: spin up when active, slow down when idle
      t.left.speed = leftActive ? 0.35 : t.left.speed * 0.95 + 0.02 * 0.05
      t.right.speed = rightActive ? 0.35 : t.right.speed * 0.95 + 0.02 * 0.05

      t.left.angle += t.left.speed
      t.right.angle += t.right.speed

      // Calculate pile height and floor level
      const pileH = Math.min(landedRef.current.length * 0.03, H * 0.1)
      const currentFloorY = FLOOR - pileH

      ctx.clearRect(0, 0, W, H)

      // ── Spawn wind streams ──
      if (leftActive && tick % 2 === 0) {
        windStreamsRef.current.push(createWindStream(true))
      }
      if (rightActive && tick % 2 === 0) {
        windStreamsRef.current.push(createWindStream(false))
      }

      // ── Update and draw wind streams ──
      ctx.lineWidth = 1.5
      windStreamsRef.current = windStreamsRef.current.filter((ws) => {
        ws.x += ws.vx
        ws.y += ws.vy
        ws.alpha -= 0.015
        
        ctx.strokeStyle = ws.color + ws.alpha + ')'
        ctx.beginPath()
        ctx.moveTo(ws.x, ws.y)
        ctx.lineTo(ws.x - ws.vx * 1.5, ws.y - ws.vy * 1.5)
        ctx.stroke()
        
        return ws.alpha > 0.01 && ws.x > 0 && ws.x < W
      })

      // ── Draw landed pieces ──
      landedRef.current.forEach(drawPiece)

      // ── Update & draw flung/blown pieces ──
      flingRef.current = flingRef.current.filter((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.12  // gravity
        p.rot += p.rotSpd
        p.opacity -= 0.008
        drawPiece(p)
        return p.opacity > 0.01 && p.y < H + 30
      })

      // ── Update & draw falling pieces ──
      const stillFalling = []
      fallingRef.current.forEach((p) => {
        p.x += p.vx + Math.sin(tick * p.oscSpd + p.phase) * p.oscAmp
        p.y += p.vy
        p.rot += p.rotSpd

        const floorY = currentFloorY + Math.random() * 4

        if (p.y >= floorY) {
          landedRef.current.push({
            ...p,
            y: floorY + Math.random() * 3,
            rot: p.rot + (Math.random() - 0.5) * 30,
            vx: 0, vy: 0,
          })
          stillFalling.push(createPiece(W, H))
        } else {
          stillFalling.push(p)
        }
        drawPiece(p)
      })
      fallingRef.current = stillFalling

      // ── Apply wind force to landed pieces (plow/blow away) ──
      const remaining = []
      landedRef.current.forEach((p) => {
        let swept = false
        if (leftActive) {
          const dist = p.x - W * 0.05
          if (dist > 0 && dist < W * 0.8 && p.y > currentFloorY - 15) {
            const force = 1 - dist / (W * 0.8)
            if (Math.random() < force * 0.25) {
              flingRef.current.push({
                ...p,
                vx: 2.5 + Math.random() * 4.5 * force,
                vy: -(2.5 + Math.random() * 3.5 * force),
                rotSpd: (Math.random() - 0.5) * 20,
                opacity: 0.9,
              })
              swept = true
            }
          }
        } else if (rightActive) {
          const dist = W * 0.95 - p.x
          if (dist > 0 && dist < W * 0.8 && p.y > currentFloorY - 15) {
            const force = 1 - dist / (W * 0.8)
            if (Math.random() < force * 0.25) {
              flingRef.current.push({
                ...p,
                vx: -(2.5 + Math.random() * 4.5 * force),
                vy: -(2.5 + Math.random() * 3.5 * force),
                rotSpd: (Math.random() - 0.5) * 20,
                opacity: 0.9,
              })
              swept = true
            }
          }
        }
        if (!swept) {
          remaining.push(p)
        }
      })
      landedRef.current = remaining

      // ── Draw Turbine units at the bottom corners ──
      drawTurbine(W * 0.05, FLOOR, true, t.left)
      drawTurbine(W * 0.95, FLOOR, false, t.right)

      frameRef.current = requestAnimationFrame(animate)
    }

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
      {/* Confetti + interactive wind blowers */}
      <ConfettiWithWindBlowers />

      {/* Background decorative circles */}
      <div className="absolute top-[-12vh] left-[-8vw] w-[35vw] h-[35vw] rounded-full bg-teal/5 blur-3xl" />
      <div className="absolute bottom-[-12vh] right-[-8vw] w-[35vw] h-[35vw] rounded-full bg-brand-yellow/5 blur-3xl" />

      <div className="flex flex-col items-center gap-[2.5vh] z-10 -mt-[6vh]">
        {/* Marca central con el logotipo de TeToca */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 w-[14vw] h-[14vw] rounded-full bg-gradient-to-tr from-teal/10 to-brand-yellow/15 blur-2xl -translate-x-[1vw] -translate-y-[1vh]" />
          <motion.img
            src="/assets/tetoca_logo.png"
            alt="TeToca Logo"
            className="w-[9vw] drop-shadow-[0_12px_20px_rgba(0,143,143,0.15)] relative z-10"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-[3.5vw] font-black font-display text-teal-deepest leading-none">
            ¡Gracias!
          </h2>
          <p className="text-[1.2vw] text-teal-dark/70 font-medium mt-[0.8vh]">
            por su atención
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
          className="w-[10vw] h-[0.3vh] bg-gradient-to-r from-teal to-brand-yellow rounded-full origin-center"
        />

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-teal/10 px-[2.5vw] py-[2vh] flex items-center gap-[2vw]"
        >
          <div className="flex flex-col items-center gap-[0.4vh]">
            <div className="bg-teal/10 rounded-xl p-[0.5vw]">
              <MessageCircle className="w-[1.4vw] h-[1.4vw] text-teal" />
            </div>
            <span className="text-[0.65vw] font-bold text-slate-500">Preguntas</span>
          </div>
          <div className="w-px h-[3.5vh] bg-slate-200" />
          <div className="flex flex-col items-center gap-[0.4vh]">
            <div className="bg-teal/10 rounded-xl p-[0.5vw]">
              <Mail className="w-[1.4vw] h-[1.4vw] text-teal" />
            </div>
            <span className="text-[0.65vw] font-bold text-slate-500">Comentarios</span>
          </div>
        </motion.div>

        {/* Equipo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-[0.8vw] font-display font-bold text-teal-dark/50 tracking-widest uppercase"
        >
          Equipo Rocket · 2026
        </motion.p>
      </div>
    </div>
  )
}
