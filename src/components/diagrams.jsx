import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// Primitivas SVG para diagramas técnicos sobre fondo claro.
export function Box({ x, y, w, h, fill = '#ffffff', stroke = '#008F8F', label, sub, delay = 0, rx = 14, labelFill = '#063D3D', subFill = '#3f6b68', fontSize = 15, subSize = 10.5 }) {
  return (
    <motion.g initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay, ease }}>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} strokeWidth="1.8" />
      <text x={x + w / 2} y={y + h / 2 + (sub ? -5 : 5)} textAnchor="middle" fill={labelFill} fontSize={fontSize} fontWeight="700" fontFamily="Sora, sans-serif">
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" fill={subFill} fontSize={subSize} fontFamily="JetBrains Mono, monospace">
          {sub}
        </text>
      )}
    </motion.g>
  )
}

export function Arrow({ d, delay = 0, color = '#008F8F', dash = false, label, lx, ly }) {
  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeDasharray={dash ? '7 6' : undefined}
        markerEnd="url(#arrowhead)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay, ease }}
      />
      {label && (
        <motion.text
          x={lx}
          y={ly}
          textAnchor="middle"
          fill="#155e5b"
          fontSize="11"
          fontWeight="600"
          fontFamily="JetBrains Mono, monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
        >
          {label}
        </motion.text>
      )}
    </g>
  )
}

export function Defs() {
  return (
    <defs>
      <marker id="arrowhead" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
        <polygon points="0 0, 9 3.5, 0 7" fill="#008F8F" />
      </marker>
      <linearGradient id="tealGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e2f4f3" />
        <stop offset="100%" stopColor="#ffffff" />
      </linearGradient>
      <linearGradient id="yellowGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fff3d4" />
        <stop offset="100%" stopColor="#ffffff" />
      </linearGradient>
      <linearGradient id="lavGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e9ecff" />
        <stop offset="100%" stopColor="#ffffff" />
      </linearGradient>
    </defs>
  )
}
