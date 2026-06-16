import { motion } from 'framer-motion'
import { Download, ScanLine, MonitorPlay, GitBranch, ArrowUpRight } from 'lucide-react'
import { SlideHeader, Card } from '../components/SlideShell.jsx'

const RESOURCES = [
  {
    Icon: MonitorPlay,
    label: 'Presentación interactiva',
    desc: 'Recorre estas diapositivas en línea, desde cualquier navegador.',
    url: 'te-toca-slides.vercel.app/1',
    href: 'https://te-toca-slides.vercel.app/1',
    accent: 'from-teal to-teal-bright',
  },
  {
    Icon: GitBranch,
    label: 'Repositorio del cliente móvil',
    desc: 'Código fuente del cliente Android, alojado en GitLab.',
    url: 'gitlab.com/jala-university1/…/equipo-rocket/tetoca-mobile-client',
    href: 'https://gitlab.com/jala-university1/cohort-1/ES.CSWB-473.GA.T1.26.M3/SB/equipo-rocket/tetoca-mobile-client',
    accent: 'from-amber-400 to-brand-yellow',
  },
]

export default function AccessSlide() {
  return (
    <div className="relative w-full h-full flex flex-col px-[4vw] pt-[4vh] pb-[3vh]">
      {/* Círculos decorativos de fondo */}
      <div className="absolute top-[-12vh] left-[-8vw] w-[35vw] h-[35vw] rounded-full bg-teal/5 blur-3xl" />
      <div className="absolute bottom-[-12vh] right-[-8vw] w-[35vw] h-[35vw] rounded-full bg-brand-yellow/5 blur-3xl" />

      <SlideHeader
        section="Recursos del proyecto"
        title="Accede a Te Toca"
        subtitle="Descarga la aplicación, explora la presentación en línea y revisa el código fuente."
      />

      <div className="flex-1 flex gap-[2.5vw] min-h-0 z-10 items-center justify-center">
        {/* Tarjeta principal: descarga vía QR */}
        <Card delay={0.2} className="flex-[0.85] max-w-[26vw] p-[1.6vw] flex flex-col items-center text-center border-t-4 border-teal">
          <div className="inline-flex items-center gap-[0.5vw] bg-teal/10 text-teal-dark px-[1vw] py-[0.4vh] rounded-full text-[0.78vw] font-bold font-display uppercase tracking-widest mb-[1.4vh]">
            <Download className="w-[1vw] h-[1vw]" />
            Descarga la app
          </div>

          {/* QR con marco */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white rounded-2xl p-[0.8vw] shadow-lg ring-1 ring-teal/15"
          >
            <img
              src="/assets/qr_landing_page.png"
              alt="Código QR para descargar la aplicación Te Toca"
              className="w-[13vw] h-[13vw] object-contain"
            />
          </motion.div>

          <div className="flex items-center gap-[0.5vw] mt-[1.4vh] text-teal-dark">
            <ScanLine className="w-[1.1vw] h-[1.1vw]" />
            <span className="text-[0.9vw] font-bold font-display">Escanea el código QR</span>
          </div>
          <p className="text-[0.8vw] text-slate-500 mt-[0.5vh]">o visita directamente:</p>
          <a
            href="https://te-toca-landing.vercel.app/"
            className="mt-[0.5vh] inline-flex items-center gap-[0.4vw] font-mono text-[0.95vw] font-bold text-teal hover:text-teal-dark transition-colors"
          >
            te-toca-landing.vercel.app
            <ArrowUpRight className="w-[0.95vw] h-[0.95vw]" />
          </a>
        </Card>

        {/* Columna de recursos en línea */}
        <div className="flex-[1] max-w-[34vw] flex flex-col gap-[1.8vh] justify-center">
          {RESOURCES.map(({ Icon, label, desc, url, href, accent }, i) => (
            <Card
              key={label}
              delay={0.45 + i * 0.15}
              x={30}
              y={0}
              className="p-[1.4vw] flex items-center gap-[1.2vw] group hover:shadow-2xl transition-shadow"
            >
              <div className={`shrink-0 w-[3.2vw] h-[3.2vw] rounded-2xl bg-gradient-to-tr ${accent} flex items-center justify-center shadow-md`}>
                <Icon className="w-[1.6vw] h-[1.6vw] text-white" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[1.05vw] font-black font-display text-teal-deepest">{label}</h4>
                <p className="text-[0.8vw] text-slate-600 leading-snug mt-[0.3vh]">{desc}</p>
                <a
                  href={href}
                  className="mt-[0.8vh] inline-flex items-center gap-[0.4vw] font-mono text-[0.8vw] font-bold text-teal hover:text-teal-dark transition-colors break-all"
                >
                  {url}
                  <ArrowUpRight className="w-[0.85vw] h-[0.85vw] shrink-0" />
                </a>
              </div>
            </Card>
          ))}

          {/* Mascota guía */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-[1vw] pl-[0.5vw]"
          >
            <motion.img
              src="/assets/mascot/paper_plane.png"
              alt="Mascota del proyecto"
              className="w-[4.5vw] drop-shadow-xl"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <p className="text-[0.82vw] text-teal-dark/70 font-medium italic">
              ¡Pruébalo tú mismo! Todo el ecosistema de Te Toca, a un escaneo de distancia.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
