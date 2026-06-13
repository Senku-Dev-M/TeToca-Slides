import { motion } from 'framer-motion'
import { Cpu, CheckSquare } from 'lucide-react'
import { SlideHeader, Card, Evidence } from '../components/SlideShell.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

const testCode = `class LoginUseCaseTest {
    private val repository: AuthRepository = mockk()
    private val useCase = LoginUseCase(repository)

    @Test
    fun \`invoke delega el login en el repositorio\`() = runTest {
        coEvery {
            repository.login("a@b.com", "123")
        } returns Result.success(AuthStatus.NavigateToExplore)

        val result = useCase("a@b.com", "123")

        assertEquals(Result.success(AuthStatus.NavigateToExplore), result)
        coVerify(exactly = 1) { 
            repository.login("a@b.com", "123") 
        }
    }
}`

export default function UnitTestSlide() {
  return (
    <div className="relative w-full h-full flex flex-col px-[4vw] pt-[4vh] pb-[3vh]">
      <SlideHeader
        section="Aseguramiento de Calidad · Unit Tests"
        title="Pruebas unitarias y cobertura real"
        subtitle="Verificación aislada de casos de uso y estados de la interfaz en la JVM, medida oficialmente con JaCoCo."
      />
      
      <div className="flex-1 flex gap-[2vw] min-h-0 z-10 items-center">
        {/* Código de ejemplo de prueba unitaria */}
        <CodeBlock file="domain/usecase/LoginUseCaseTest.kt" code={testCode} className="flex-[1.4] max-h-[52vh] self-center" />
        
        {/* Descripción de las pruebas unitarias */}
        <div className="flex-[0.7] flex flex-col gap-[1.4vh]">
          <Card delay={0.4} x={40} className="p-[1.2vw] border-l-4 border-teal">
            <div className="flex items-center gap-[0.6vw] mb-[0.6vh]">
              <Cpu className="w-[1.4vw] h-[1.4vw] text-teal" />
              <h4 className="text-[1.05vw] font-black font-display text-teal-deepest">Cobertura del 92% (Líneas)</h4>
            </div>
            <p className="text-[0.82vw] text-slate-600 leading-relaxed">
              <strong className="font-bold text-slate-900">1,059 de 1,148 líneas</strong> cubiertas en total. La capa de negocio (<code className="text-[0.75vw] font-mono bg-slate-100 px-1 rounded">domain/usecase</code>) cuenta con un <strong className="font-bold text-slate-900">88%</strong> de cobertura, garantizando la lógica del sistema.
            </p>
          </Card>
          
          <Card delay={0.55} x={40} className="p-[1.2vw] border-l-4 border-teal">
            <div className="flex items-center gap-[0.6vw] mb-[0.6vh]">
              <CheckSquare className="w-[1.4vw] h-[1.4vw] text-teal" />
              <h4 className="text-[1.05vw] font-black font-display text-teal-deepest">Alta Cobertura en Presentación</h4>
            </div>
            <p className="text-[0.82vw] text-slate-600 leading-relaxed">
              Excelente control en ViewModels: <strong className="font-bold text-slate-900">100%</strong> de líneas en <code className="text-[0.75vw] font-mono bg-slate-100 px-1 rounded">ui.auth</code> y <code className="text-[0.75vw] font-mono bg-slate-100 px-1 rounded">ui.favorites</code>, <strong className="font-bold text-slate-900">99%</strong> en <code className="text-[0.75vw] font-mono bg-slate-100 px-1 rounded">ui.profile</code> y <strong className="font-bold text-slate-900">94%</strong> en <code className="text-[0.75vw] font-mono bg-slate-100 px-1 rounded">ui.services.create</code>.
            </p>
          </Card>
          
          <Card delay={0.7} x={40} className="p-[1.2vw] border-l-4 border-teal">
            <div className="flex items-center gap-[0.6vw] mb-[0.6vh]">
              <CheckSquare className="w-[1.4vw] h-[1.4vw] text-teal" />
              <h4 className="text-[1.05vw] font-black font-display text-teal-deepest">Aislamiento Total con MockK</h4>
            </div>
            <p className="text-[0.82vw] text-slate-600 leading-relaxed">
              Respeto a la arquitectura MVVM. Mockeo riguroso de repositorios mediante <code className="text-[0.75vw] font-mono bg-slate-100 px-1 rounded">coEvery</code> de <strong className="font-bold text-slate-900">MockK</strong>, evitando llamadas a base de datos (Room) o APIs reales.
            </p>
          </Card>
          
          <Evidence delay={0.9} className="mt-[0.5vh]">
            app/src/test/java/com/jala/tetoca/mobile · JaCoCo Report
          </Evidence>
        </div>
      </div>
      
      {/* Mascota Tuki */}
      <motion.img
        src="/assets/mascot/thumbs_up.png"
        alt="Tuki Thumbs Up"
        className="absolute w-[7vw] right-[1.5vw] bottom-[2vh] opacity-90 pointer-events-none z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ delay: 1.1 }}
      />
    </div>
  )
}
