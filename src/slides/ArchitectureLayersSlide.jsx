import { SlideHeader, Card, Evidence } from '../components/SlideShell.jsx'
import { Box, Arrow, Defs } from '../components/diagrams.jsx'
import { motion } from 'framer-motion'

export default function ArchitectureLayersSlide() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-[4vw]">
      <SlideHeader
        section="Arquitectura"
        title="Clean Architecture con patrón MVVM"
        subtitle="Tres capas con dependencias en una sola dirección: la capa de presentación y la de datos dependen del dominio, nunca a la inversa."
      />
      <div className="flex gap-[2vw] w-full items-center z-10 min-h-0 flex-1 max-h-[58vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-[1.6] h-full min-h-0"
        >
          <svg viewBox="0 0 760 430" className="w-full h-full">
            <Defs />
            <Box x={40} y={16} w={680} h={112} rx={18} fill="url(#tealGrad)" stroke="#008F8F" label="" delay={0.25} />
            <text x={70} y={48} fill="#006B6B" fontSize="16" fontWeight="800" fontFamily="Sora, sans-serif">ui — Presentación (MVVM, XML)</text>
            <Box x={70} y={62} w={140} h={48} fill="#fff" stroke="#9AD9D6" label="Activities" sub="Fragments" delay={0.4} fontSize={13} subSize={9.5} />
            <Box x={230} y={62} w={155} h={48} fill="#fff" stroke="#9AD9D6" label="ViewModels" sub="UiState · StateFlow" delay={0.48} fontSize={13} subSize={9.5} />
            <Box x={405} y={62} w={150} h={48} fill="#fff" stroke="#9AD9D6" label="Adapters" sub="RecyclerView" delay={0.56} fontSize={13} subSize={9.5} />
            <Box x={575} y={62} w={115} h={48} fill="#fff" stroke="#9AD9D6" label="Factories" sub="inyección VM" delay={0.64} fontSize={13} subSize={9.5} />

            <Box x={40} y={158} w={680} h={112} rx={18} fill="url(#yellowGrad)" stroke="#E0A800" label="" delay={0.6} />
            <text x={70} y={190} fill="#8a6400" fontSize="16" fontWeight="800" fontFamily="Sora, sans-serif">domain — Reglas de negocio (Kotlin puro, sin Android)</text>
            <Box x={70} y={204} w={195} h={48} fill="#fff" stroke="#eed9a0" label="Casos de uso (35+)" sub="LoginUseCase, AcceptRequest…" delay={0.72} fontSize={12.5} subSize={9} />
            <Box x={285} y={204} w={190} h={48} fill="#fff" stroke="#eed9a0" label="Modelos" sub="ServiceDetail, ChatMessage…" delay={0.8} fontSize={13} subSize={9} />
            <Box x={495} y={204} w={195} h={48} fill="#fff" stroke="#eed9a0" label="Contratos (interfaces)" sub="ServicesRepository…" delay={0.88} fontSize={12.5} subSize={9} />

            <Box x={40} y={300} w={680} h={112} rx={18} fill="url(#lavGrad)" stroke="#8d9cf0" label="" delay={0.9} />
            <text x={70} y={332} fill="#4453a8" fontSize="16" fontWeight="800" fontFamily="Sora, sans-serif">data — Acceso a datos</text>
            <Box x={70} y={346} w={150} h={48} fill="#fff" stroke="#c3cbf5" label="remote" sub="Retrofit · Socket.IO" delay={1.0} fontSize={13} subSize={9} />
            <Box x={240} y={346} w={150} h={48} fill="#fff" stroke="#c3cbf5" label="local" sub="Room · DataStore" delay={1.08} fontSize={13} subSize={9} />
            <Box x={410} y={346} w={160} h={48} fill="#fff" stroke="#c3cbf5" label="repository" sub="implementaciones" delay={1.16} fontSize={13} subSize={9} />
            <Box x={590} y={346} w={100} h={48} fill="#fff" stroke="#c3cbf5" label="dto" sub="Gson" delay={1.24} fontSize={13} subSize={9} />

            <Arrow d="M 380 128 L 380 156" delay={0.95} label="invoca" lx={424} ly={146} />
            <Arrow d="M 380 270 L 380 298" delay={1.15} label="implementa" lx={436} ly={288} />
          </svg>
        </motion.div>
        <div className="flex-[0.55] flex flex-col gap-[1.4vh]">
          <Card delay={0.7} x={40} y={0} className="p-[1.2vw]">
            <h4 className="text-[1.05vw] font-bold font-display text-teal-deepest mb-[0.5vh]">Regla de dependencia</h4>
            <p className="text-[0.9vw] text-slate-600 leading-relaxed">
              El paquete <code className="font-mono text-teal-dark">domain</code> no contiene referencias al
              framework Android; define modelos, contratos y casos de uso que las otras capas consumen.
            </p>
          </Card>
          <Card delay={0.85} x={40} y={0} className="p-[1.2vw]">
            <h4 className="text-[1.05vw] font-bold font-display text-teal-deepest mb-[0.5vh]">Patrón MVVM</h4>
            <p className="text-[0.9vw] text-slate-600 leading-relaxed">
              Cada pantalla expone un <code className="font-mono text-teal-dark">UiState</code> inmutable desde su
              ViewModel; la vista lo observa y se redibuja ante cada emisión.
            </p>
          </Card>
          <Evidence delay={1.1}>app/src/main/java/com/jala/tetoca/mobile/{'{ui, domain, data}'}</Evidence>
        </div>
      </div>
    </div>
  )
}
