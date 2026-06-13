import { SlideHeader, Card, Evidence } from '../components/SlideShell.jsx'
import { Box, Arrow, Defs } from '../components/diagrams.jsx'
import { motion } from 'framer-motion'

export default function ClientServerSlide() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-[4vw]">
      <SlideHeader
        section="Arquitectura · Comunicación"
        title="Modelo cliente — servidor"
        subtitle="El cliente Android se comunica con el backend mediante REST y WebSocket, y delega la autenticación en Supabase."
      />
      <div className="flex gap-[2vw] w-full items-center z-10 flex-1 min-h-0 max-h-[56vh]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex-[1.6] h-full min-h-0">
          <svg viewBox="0 0 800 400" className="w-full h-full">
            <Defs />
            <Box x={30} y={120} w={200} h={160} rx={20} fill="url(#tealGrad)" stroke="#008F8F" label="" delay={0.25} />
            <text x={130} y={158} textAnchor="middle" fill="#063D3D" fontSize="17" fontWeight="800" fontFamily="Sora, sans-serif">Aplicación Android</text>
            <text x={130} y={180} textAnchor="middle" fill="#3f6b68" fontSize="10.5" fontFamily="JetBrains Mono, monospace">com.jala.tetoca.mobile</text>
            <Box x={55} y={198} w={150} h={32} fill="#fff" stroke="#9AD9D6" label="Retrofit + OkHttp" delay={0.4} fontSize={11.5} rx={8} />
            <Box x={55} y={238} w={150} h={32} fill="#fff" stroke="#9AD9D6" label="Socket.IO client" delay={0.5} fontSize={11.5} rx={8} />

            <Box x={430} y={40} w={230} h={120} rx={20} fill="url(#yellowGrad)" stroke="#E0A800" label="" delay={0.55} />
            <text x={545} y={74} textAnchor="middle" fill="#063D3D" fontSize="16" fontWeight="800" fontFamily="Sora, sans-serif">Backend TeToca</text>
            <text x={545} y={95} textAnchor="middle" fill="#3f6b68" fontSize="10" fontFamily="JetBrains Mono, monospace">tetoca-backend.onrender.com</text>
            <text x={545} y={117} textAnchor="middle" fill="#8a6400" fontSize="11" fontFamily="JetBrains Mono, monospace">REST /api · documentación Swagger</text>
            <text x={545} y={137} textAnchor="middle" fill="#8a6400" fontSize="11" fontFamily="JetBrains Mono, monospace">WebSocket /ws/messages</text>

            <Box x={430} y={230} w={230} h={110} rx={20} fill="url(#lavGrad)" stroke="#8d9cf0" label="" delay={0.75} />
            <text x={545} y={266} textAnchor="middle" fill="#063D3D" fontSize="16" fontWeight="800" fontFamily="Sora, sans-serif">Supabase Auth</text>
            <text x={545} y={288} textAnchor="middle" fill="#3f6b68" fontSize="10" fontFamily="JetBrains Mono, monospace">auth/v1 · password · id_token</text>
            <text x={545} y={310} textAnchor="middle" fill="#4453a8" fontSize="11" fontFamily="JetBrains Mono, monospace">emite access_token (JWT)</text>

            <Box x={710} y={250} w={80} h={70} rx={16} fill="#fff" stroke="#c3cbf5" label="Google" sub="OAuth" delay={0.95} fontSize={13} />

            <Arrow d="M 230 170 C 320 150, 340 120, 428 100" delay={0.6} label="HTTPS · Bearer JWT" lx={312} ly={108} />
            <Arrow d="M 230 253 C 310 260, 330 280, 428 285" delay={0.8} label="login / signup" lx={318} ly={292} />
            <Arrow d="M 230 220 C 330 215, 350 160, 428 140" delay={0.7} color="#E0A800" dash label="eventos de chat" lx={330} ly={186} />
            <Arrow d="M 708 285 L 664 285" delay={1.05} dash />
          </svg>
        </motion.div>
        <div className="flex-[0.6] flex flex-col gap-[1.3vh]">
          <Card delay={0.65} x={40} y={0} className="p-[1.1vw]">
            <h4 className="text-[1vw] font-bold font-display text-teal-deepest mb-[0.4vh]">Autenticación delegada</h4>
            <p className="text-[0.88vw] text-slate-600 leading-relaxed">
              El inicio de sesión (correo o Google) se realiza contra Supabase; el JWT obtenido se adjunta a
              cada petición REST mediante <code className="font-mono text-teal-dark">BearerTokenInterceptor</code>.
            </p>
          </Card>
          <Card delay={0.8} x={40} y={0} className="p-[1.1vw]">
            <h4 className="text-[1vw] font-bold font-display text-teal-deepest mb-[0.4vh]">Comunicación en tiempo real</h4>
            <p className="text-[0.88vw] text-slate-600 leading-relaxed">
              La mensajería utiliza Socket.IO sobre <code className="font-mono text-teal-dark">/ws/messages</code> con
              los eventos <code className="font-mono text-teal-dark">message:new</code>, <code className="font-mono text-teal-dark">message:read</code> y{' '}
              <code className="font-mono text-teal-dark">conversation:update</code>.
            </p>
          </Card>
          <Card delay={0.95} x={40} y={0} className="p-[1.1vw]">
            <h4 className="text-[1vw] font-bold font-display text-teal-deepest mb-[0.4vh]">Configuración por entorno</h4>
            <p className="text-[0.88vw] text-slate-600 leading-relaxed">
              Las URL y claves se definen en <code className="font-mono text-teal-dark">local.properties</code> y se
              inyectan en compilación a través de <code className="font-mono text-teal-dark">BuildConfig</code>.
            </p>
          </Card>
          <Evidence delay={1.15}>data/remote/ApiClient.kt · MessagesSocketDataSource.kt</Evidence>
        </div>
      </div>
    </div>
  )
}
