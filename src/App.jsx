import { useEffect, useCallback } from 'react'
import { useNavigate, useParams, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import FloatingBackground from './components/FloatingBackground.jsx'

import TitleSlide from './slides/TitleSlide.jsx'
import OverviewSlide from './slides/OverviewSlide.jsx'
import ModulesSlide from './slides/ModulesSlide.jsx'
import ArchitectureLayersSlide from './slides/ArchitectureLayersSlide.jsx'
import ClientServerSlide from './slides/ClientServerSlide.jsx'
import TechStackSlide from './slides/TechStackSlide.jsx'
import AuthFlowSlide from './slides/AuthFlowSlide.jsx'
import FeatureAuthSlide from './slides/FeatureAuthSlide.jsx'
import FeatureExploreSlide from './slides/FeatureExploreSlide.jsx'
import FeatureRequestSlide from './slides/FeatureRequestSlide.jsx'
import FeatureActivitySlide from './slides/FeatureActivitySlide.jsx'
import FeatureOfferSlide from './slides/FeatureOfferSlide.jsx'
import FeatureChatSlide from './slides/FeatureChatSlide.jsx'
import FeaturePreferencesSlide from './slides/FeaturePreferencesSlide.jsx'
import CodeNetworkSlide from './slides/CodeNetworkSlide.jsx'
import CodeSocketSlide from './slides/CodeSocketSlide.jsx'
import CodeUseCaseSlide from './slides/CodeUseCaseSlide.jsx'
import DataFlowSlide from './slides/DataFlowSlide.jsx'
import UnitTestSlide from './slides/UnitTestSlide.jsx'
import InstrumentedTestSlide from './slides/InstrumentedTestSlide.jsx'
import ProcessSlide from './slides/ProcessSlide.jsx'
import DemoSlide from './slides/DemoSlide.jsx'
import ConclusionsSlide from './slides/ConclusionsSlide.jsx'
import NextStepsSlide from './slides/NextStepsSlide.jsx'
import ThankYouSlide from './slides/ThankYouSlide.jsx'

const SLIDES = [
  { id: 'portada', component: TitleSlide },
  { id: 'resumen', component: OverviewSlide },
  { id: 'modulos', component: ModulesSlide },
  { id: 'arquitectura', component: ArchitectureLayersSlide },
  { id: 'cliente-servidor', component: ClientServerSlide },
  { id: 'tecnologias', component: TechStackSlide },
  { id: 'autenticacion', component: AuthFlowSlide },
  { id: 'f01-auth', component: FeatureAuthSlide },
  { id: 'f02-explorar', component: FeatureExploreSlide },
  { id: 'f03-solicitud', component: FeatureRequestSlide },
  { id: 'f04-actividad', component: FeatureActivitySlide },
  { id: 'f05-publicar', component: FeatureOfferSlide },
  { id: 'f06-chat', component: FeatureChatSlide },
  { id: 'f07-preferencias', component: FeaturePreferencesSlide },
  { id: 'codigo-red', component: CodeNetworkSlide },
  { id: 'codigo-socket', component: CodeSocketSlide },
  { id: 'codigo-usecase', component: CodeUseCaseSlide },
  { id: 'flujo-datos', component: DataFlowSlide },
  { id: 'pruebas-unitarias', component: UnitTestSlide },
  { id: 'pruebas-instrumentadas', component: InstrumentedTestSlide },
  { id: 'proceso', component: ProcessSlide },
  { id: 'demo', component: DemoSlide },
  { id: 'conclusiones', component: ConclusionsSlide },
  { id: 'proximos-pasos', component: NextStepsSlide },
  { id: 'gracias', component: ThankYouSlide },
]

const variants = {
  enter: { opacity: 0, x: 90, scale: 0.985 },
  center: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -90, scale: 0.985 },
}

function Deck() {
  const navigate = useNavigate()
  const { n } = useParams()
  const index = Math.min(Math.max(parseInt(n ?? '1', 10) - 1 || 0, 0), SLIDES.length - 1)

  const go = useCallback(
    (dir) => {
      const next = Math.min(Math.max(index + dir, 0), SLIDES.length - 1)
      if (next !== index) navigate(`/${next + 1}`)
    },
    [index, navigate],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') go(1)
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(-1)
      if (e.key === 'Home') navigate('/1')
      if (e.key === 'End') navigate(`/${SLIDES.length}`)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, navigate])

  const Current = SLIDES[index].component

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-brand-mint">
      <FloatingBackground />

      {/* Barra de progreso */}
      <div className="fixed top-0 inset-x-0 h-[0.5vh] bg-teal/10 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-teal to-brand-yellow rounded-r-full"
          animate={{ width: `${((index + 1) / SLIDES.length) * 100}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.main
          key={SLIDES[index].id}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0.24, 1] }}
          className="absolute inset-0"
        >
          <Current />
        </motion.main>
      </AnimatePresence>

      {/* Barra de navegación inferior */}
      <div className="fixed bottom-0 inset-x-0 z-50 flex items-center justify-between px-[1.6vw] py-[1.2vh] pointer-events-none">
        <div className="flex items-center gap-[0.6vw]">
          <img src="/assets/tetoca_logo.png" alt="" className="w-[1.8vw] rounded-md shadow" />
          <span className="text-[0.85vw] font-bold font-display text-teal-dark/80">
            TeToca · Presentación del proyecto
          </span>
        </div>
        <div className="flex items-center gap-[0.35vw]">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => navigate(`/${i + 1}`)}
              aria-label={`Ir a la diapositiva ${i + 1}`}
              className={`pointer-events-auto rounded-full transition-all duration-300 ${
                i === index ? 'w-[1.6vw] h-[0.55vw] bg-teal' : 'w-[0.55vw] h-[0.55vw] bg-teal/25 hover:bg-teal/50'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-[0.6vw] pointer-events-auto">
          <span className="font-mono text-[0.8vw] text-teal-dark/70">
            {String(index + 1).padStart(2, '0')} / {SLIDES.length}
          </span>
          <button
            onClick={() => go(-1)}
            aria-label="Diapositiva anterior"
            className="w-[2.2vw] h-[2.2vw] rounded-xl bg-white/90 border border-teal/20 shadow text-teal-dark hover:bg-teal hover:text-white transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="w-[1.2vw] h-[1.2vw]" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Diapositiva siguiente"
            className="w-[2.2vw] h-[2.2vw] rounded-xl bg-white/90 border border-teal/20 shadow text-teal-dark hover:bg-teal hover:text-white transition-colors flex items-center justify-center"
          >
            <ChevronRight className="w-[1.2vw] h-[1.2vw]" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/:n" element={<Deck />} />
      <Route path="*" element={<Navigate to="/1" replace />} />
    </Routes>
  )
}
