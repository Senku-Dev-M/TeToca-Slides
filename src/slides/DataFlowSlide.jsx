import { motion } from 'framer-motion'
import { SlideHeader } from '../components/SlideShell.jsx'
import { Box, Arrow, Defs } from '../components/diagrams.jsx'

const PILLS = [
  'Estado inmutable (UiState)',
  'Coroutines + Flow',
  'DTOs aislados de la presentación',
  'Patrón aplicado en los 9 repositorios',
]

export default function DataFlowSlide() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-[4vw]">
      <SlideHeader
        section="Flujo de datos"
        title="Flujo unidireccional de la acción al estado"
        subtitle="Caso de ejemplo: búsqueda de un servicio en la pantalla Explorar. La vista emite eventos y representa el estado que recibe."
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full flex-1 min-h-0 max-h-[52vh] z-10"
      >
        <svg viewBox="0 0 900 330" className="w-full h-full">
          <Defs />
          <Box x={20} y={40} w={175} h={72} fill="url(#tealGrad)" label="ExploreFragment" sub="evento de búsqueda" delay={0.25} fontSize={13.5} />
          <Box x={255} y={40} w={175} h={72} fill="url(#tealGrad)" label="ExploreViewModel" sub="ExploreUiState" delay={0.4} fontSize={13.5} />
          <Box x={490} y={40} w={190} h={72} fill="url(#yellowGrad)" stroke="#E0A800" label="SearchServicesUseCase" sub="domain" delay={0.55} fontSize={12} />
          <Box x={730} y={40} w={150} h={72} fill="url(#lavGrad)" stroke="#8d9cf0" label="ServicesRepositoryImpl" sub="DTO → modelo" delay={0.7} fontSize={10.5} />

          <Box x={730} y={215} w={150} h={66} fill="#fff" stroke="#8d9cf0" label="REST API" sub="GET /services?text=…" delay={0.85} fontSize={13} subSize={9.5} />
          <Box x={480} y={215} w={200} h={66} fill="#fff" label="PagedResult<ServiceListItem>" sub="modelo de dominio" delay={1.05} fontSize={11} subSize={9.5} />
          <Box x={140} y={215} w={260} h={66} fill="#fff" stroke="#E0A800" label="UiState → RecyclerView" sub="cargando · datos · error" delay={1.25} fontSize={13} subSize={9.5} />

          <Arrow d="M 195 76 L 253 76" delay={0.4} label="onSearch()" lx={224} ly={62} />
          <Arrow d="M 430 76 L 488 76" delay={0.55} label="invoke(text)" lx={459} ly={62} />
          <Arrow d="M 680 76 L 728 76" delay={0.7} label="contrato" lx={704} ly={62} />
          <Arrow d="M 805 112 L 805 213" delay={0.85} label="Retrofit · suspend" lx={730} ly={168} />
          <Arrow d="M 728 248 L 682 248" delay={1.0} label="Result" lx={705} ly={236} />
          <Arrow d="M 478 248 L 402 248" delay={1.2} label="emisión StateFlow" lx={440} ly={236} />
          <Arrow d="M 240 213 C 200 175, 150 150, 110 114" delay={1.4} color="#E0A800" dash label="observa y renderiza" lx={148} ly={172} />
        </svg>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="flex gap-[0.8vw] flex-wrap justify-center z-10 mt-[1vh]"
      >
        {PILLS.map((p) => (
          <span key={p} className="bg-white/90 border border-teal/25 text-teal-dark text-[0.82vw] font-semibold px-[1vw] py-[0.45vh] rounded-full shadow">
            {p}
          </span>
        ))}
      </motion.div>
      <motion.img
        src="/assets/mascot/pointing.png"
        alt=""
        className="absolute w-[8vw] left-[1.2vw] bottom-[2vh] pointer-events-none -scale-x-100"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 0.92, x: 0 }}
        transition={{ delay: 1.6 }}
      />
    </div>
  )
}
