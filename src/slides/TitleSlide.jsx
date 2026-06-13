import { motion } from 'framer-motion'
import { Users } from 'lucide-react'

const TEAM = ['Rebeca Guerra', 'Shaiel Vargas', 'Sebastián Humerez', 'Rodrigo Machaca']

export default function TitleSlide() {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-[2vw]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <div className="flex items-center justify-center gap-[2vw] mb-[2vh]">
          <motion.img
            src="/assets/tetoca_logo.png"
            alt="Logotipo de TeToca"
            className="w-[8vw] rounded-[1.6vw] shadow-2xl"
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.img
            src="/assets/tuki.png"
            alt="Tuki, mascota oficial de TeToca"
            className="w-[11vw] drop-shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[5.5vw] font-black font-display text-teal-deepest leading-none"
        >
          Te<span className="text-teal">Toca</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-[1.6vw] text-teal-dark font-semibold mt-[1.2vh]"
        >
          Cliente móvil Android para el intercambio de servicios mediante créditos de tiempo
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-[0.8vw] mt-[2.4vh] flex-wrap"
        >
          {['Kotlin', 'MVVM · Clean Architecture', 'REST API', 'Socket.IO', 'Supabase Auth'].map((t) => (
            <span key={t} className="bg-white/90 border border-teal/30 text-teal-dark text-[0.9vw] font-semibold px-[1.1vw] py-[0.5vh] rounded-full shadow">
              {t}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="bg-white/90 backdrop-blur-sm px-[2.5vw] py-[2vh] rounded-2xl shadow-xl inline-block mt-[3.5vh]"
        >
          <div className="flex justify-center items-center gap-[0.8vw] mb-[1.6vh]">
            <Users className="w-[1.5vw] h-[1.5vw] text-teal" />
            <p className="text-[1.1vw] font-black font-display text-teal-deepest">Equipo de desarrollo</p>
          </div>
          <div className="grid grid-cols-4 gap-[1vw]">
            {TEAM.map((name) => (
              <div key={name} className="bg-brand-mint border border-teal/15 px-[1.2vw] py-[0.7vh] rounded-lg">
                <p className="text-[0.95vw] font-semibold text-slate-800 whitespace-nowrap">{name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
