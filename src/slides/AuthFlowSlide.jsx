import { SlideHeader, Card, Evidence } from '../components/SlideShell.jsx'
import { Box, Arrow, Defs } from '../components/diagrams.jsx'
import { motion } from 'framer-motion'

export default function AuthFlowSlide() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-[4vw]">
      <SlideHeader
        section="Arquitectura · Autenticación"
        title="Flujo de autenticación y verificación de perfil"
        subtitle="Después de obtener el token, la aplicación consulta el perfil del usuario y decide la pantalla de destino según los datos faltantes."
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="w-full flex-1 min-h-0 max-h-[52vh] z-10">
        <svg viewBox="0 0 900 330" className="w-full h-full">
          <Defs />
          <Box x={20} y={30} w={165} h={66} fill="url(#tealGrad)" stroke="#008F8F" label="LoginActivity" sub="correo · Google" delay={0.25} fontSize={14} />
          <Box x={245} y={30} w={175} h={66} fill="url(#tealGrad)" stroke="#008F8F" label="LoginViewModel" sub="LoginUseCase" delay={0.4} fontSize={14} />
          <Box x={480} y={30} w={185} h={66} fill="url(#lavGrad)" stroke="#8d9cf0" label="Supabase Auth" sub="password | id_token" delay={0.55} fontSize={14} subSize={9.5} />
          <Box x={725} y={30} w={155} h={66} fill="url(#yellowGrad)" stroke="#E0A800" label="SessionManager" sub="persiste access_token" delay={0.7} fontSize={13} subSize={9} />

          <Box x={480} y={160} w={185} h={66} fill="url(#yellowGrad)" stroke="#E0A800" label="GET /users/me" sub="¿phone y bio presentes?" delay={0.95} fontSize={14} subSize={9.5} />

          <Box x={185} y={255} w={230} h={58} fill="#fff" stroke="#E0A800" label="CompleteProfileActivity" sub="AuthStatus.NavigateToOnboarding" delay={1.25} fontSize={12.5} subSize={8.5} />
          <Box x={545} y={255} w={230} h={58} fill="#fff" stroke="#008F8F" label="HomeActivity (Explorar)" sub="AuthStatus.NavigateToExplore" delay={1.35} fontSize={12.5} subSize={8.5} />

          <Arrow d="M 185 63 L 243 63" delay={0.45} label="credenciales" lx={214} ly={50} />
          <Arrow d="M 420 63 L 478 63" delay={0.6} label="login" lx={449} ly={50} />
          <Arrow d="M 665 63 L 723 63" delay={0.75} label="JWT" lx={694} ly={50} />
          <Arrow d="M 572 96 L 572 158" delay={0.95} label="verifyProfileStatus()" lx={672} ly={130} />
          <Arrow d="M 480 200 C 390 215, 340 230, 310 253" delay={1.2} color="#E0A800" label="perfil incompleto" lx={350} ly={222} />
          <Arrow d="M 615 226 L 645 253" delay={1.3} label="perfil completo" lx={702} ly={244} />
        </svg>
      </motion.div>
      <div className="flex items-center gap-[1vw] z-10 mt-[1vh] flex-wrap justify-center">
        {['Correo y contraseña', 'Google Sign-In (Credential Manager)', 'Registro con confirmación por correo'].map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 + i * 0.1 }}
            className="bg-white/90 border border-teal/30 text-teal-dark text-[0.85vw] font-semibold px-[1vw] py-[0.45vh] rounded-full shadow"
          >
            {t}
          </motion.span>
        ))}
      </div>
      <Evidence delay={1.7} className="mt-[1.2vh] z-10">
        data/repository/AuthRepositoryImpl.kt · data/remote/SupabaseAuthService.kt · data/remote/SessionManager.kt
      </Evidence>
    </div>
  )
}
