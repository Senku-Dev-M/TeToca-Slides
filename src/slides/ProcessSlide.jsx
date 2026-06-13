import { motion } from 'framer-motion'
import { GitBranch, RefreshCw, CheckSquare, ArrowRight } from 'lucide-react'
import { SlideHeader, Card, Evidence } from '../components/SlideShell.jsx'

const STAGES = [
  { name: '1 · build', jobs: 'assembleDebug → APK como artefacto' },
  { name: '2 · test', jobs: './gradlew test' },
  { name: '3 · quality', jobs: 'Android Lint · ktlintCheck · detekt' },
]

const PRACTICES = [
  {
    Icon: RefreshCw,
    title: 'Scrum con sprints de una semana',
    text: 'Roles definidos (Scrum Master, Product Owner, Developers), plannings y retrospectivas registradas por sprint, y backlog gestionado en GitLab Issues con estimación mediante Poker Planning.',
  },
  {
    Icon: GitBranch,
    title: 'Git Flow y Conventional Commits',
    text: 'Ramas main y develop con ramas de soporte feature/*, fix/*, hotfix/* y release/*. Los commits siguen el formato tipo(scope): mensaje según la especificación Conventional Commits.',
  },
  {
    Icon: CheckSquare,
    title: 'Definition of Ready / Done',
    text: 'Un incremento se considera terminado cuando cumple los criterios de aceptación, la revisión de código fue aprobada, los defectos fueron resueltos y la documentación está actualizada.',
  },
]

export default function ProcessSlide() {
  return (
    <div className="relative w-full h-full flex flex-col px-[4vw] pt-[4vh] pb-[3vh]">
      <SlideHeader
        section="Proceso y calidad"
        title="Metodología de trabajo e integración continua"
        subtitle="El proceso está documentado en la wiki del repositorio y automatizado mediante GitLab CI/CD."
      />
      <div className="flex-1 flex flex-col gap-[2vh] min-h-0 z-10 justify-center">
        <Card delay={0.25} className="p-[1.4vw]">
          <p className="text-[0.85vw] font-bold font-display uppercase tracking-widest text-teal-dark mb-[1.2vh]">
            Pipeline · .gitlab-ci.yml
          </p>
          <div className="flex items-center gap-[1vw]">
            {STAGES.map((s, i) => (
              <div key={s.name} className="flex items-center gap-[1vw] flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className="flex-1 bg-brand-mint border border-teal/30 rounded-xl px-[1.2vw] py-[1.2vh]"
                >
                  <p className="text-[1vw] font-black font-display text-teal-dark">{s.name}</p>
                  <p className="font-mono text-[0.75vw] text-slate-600 mt-[0.3vh]">{s.jobs}</p>
                </motion.div>
                {i < STAGES.length - 1 && <ArrowRight className="w-[1.4vw] h-[1.4vw] text-teal shrink-0" />}
              </div>
            ))}
          </div>
        </Card>
        <div className="grid grid-cols-3 gap-[1.4vw]">
          {PRACTICES.map(({ Icon, title, text }, i) => (
            <Card key={title} delay={0.75 + i * 0.15} className="p-[1.3vw]">
              <div className="bg-teal/10 rounded-xl p-[0.6vw] w-fit mb-[1vh]">
                <Icon className="w-[1.5vw] h-[1.5vw] text-teal" />
              </div>
              <h4 className="text-[1vw] font-bold font-display text-teal-deepest mb-[0.5vh]">{title}</h4>
              <p className="text-[0.85vw] text-slate-600 leading-relaxed">{text}</p>
            </Card>
          ))}
        </div>
        <Evidence delay={1.3} className="text-center">
          wiki/Conventions · wiki/4P/Process.md · .gitlab-ci.yml · lint con abortOnError = true
        </Evidence>
      </div>
      <motion.img
        src="/assets/mascot/briefcase.png"
        alt=""
        className="absolute w-[7vw] right-[1.5vw] bottom-[2vh] opacity-90 pointer-events-none"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ delay: 1.4 }}
      />
    </div>
  )
}
