import { motion } from 'framer-motion'
import { Smartphone, Activity } from 'lucide-react'
import { SlideHeader, Card, Evidence } from '../components/SlideShell.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

const testCode = `@RunWith(AndroidJUnit4::class)
@LargeTest
class CreateServiceFlowTest {
    @Test
    fun testCreateServiceFlow_Success() {
        // Rellenar información básica
        onView(withId(R.id.etServiceTitle))
            .perform(typeText("Fix Pipes"), closeSoftKeyboard())

        // Seleccionar categoría
        onView(withId(R.id.spinnerCategory)).perform(click())
        onView(withText("Cocina")).perform(click())
        onView(withId(R.id.btnNext)).perform(click())

        // Paso 2: Disponibilidad y Ubicación
        onView(withId(R.id.tvDayLU)).perform(click())
        onView(withId(R.id.etLocation))
            .perform(typeText("Central District"), closeSoftKeyboard())

        // Publicar e ir a pantalla de éxito
        onView(withId(R.id.btnPublish)).perform(click())
        onView(withId(R.id.btnGoToProfile)).check(matches(isDisplayed()))
    }
}`

export default function InstrumentedTestSlide() {
  return (
    <div className="relative w-full h-full flex flex-col px-[4vw] pt-[4vh] pb-[3vh]">
      <SlideHeader
        section="Aseguramiento de Calidad · Instrumented Tests"
        title="Pruebas de interfaz e integración"
        subtitle="Simulación automatizada del comportamiento del usuario y validación del flujo completo entre capas del sistema."
      />
      
      <div className="flex-1 flex gap-[2vw] min-h-0 z-10 items-center">
        {/* Código de ejemplo de prueba instrumentada */}
        <CodeBlock file="androidTest/java/.../CreateServiceFlowTest.kt" code={testCode} className="flex-[1.4] max-h-[52vh] self-center" />
        
        {/* Descripción de las pruebas instrumentadas */}
        <div className="flex-[0.7] flex flex-col gap-[1.4vh]">
          <Card delay={0.4} x={40} className="p-[1.2vw] border-l-4 border-brand-yellow">
            <div className="flex items-center gap-[0.6vw] mb-[0.6vh]">
              <Smartphone className="w-[1.4vw] h-[1.4vw] text-amber-600" />
              <h4 className="text-[1.05vw] font-black font-display text-teal-deepest">Integración Multi-Capa (E2E)</h4>
            </div>
            <p className="text-[0.82vw] text-slate-600 leading-relaxed">
              Verifican la sincronización real entre la interfaz de usuario, ViewModels, Casos de Uso, la base de datos local SQLite (<strong className="font-bold text-slate-900">Room</strong>) y las llamadas controladas de red.
            </p>
          </Card>
          
          <Card delay={0.55} x={40} className="p-[1.2vw] border-l-4 border-brand-yellow">
            <div className="flex items-center gap-[0.6vw] mb-[0.6vh]">
              <Activity className="w-[1.4vw] h-[1.4vw] text-amber-600" />
              <h4 className="text-[1.05vw] font-black font-display text-teal-deepest">Espresso & Vistas Clásicas</h4>
            </div>
            <p className="text-[0.82vw] text-slate-600 leading-relaxed">
              Interacción directa con la UI usando <code className="text-[0.75vw] font-mono bg-slate-100 px-1 rounded">withId</code>, <code className="text-[0.75vw] font-mono bg-slate-100 px-1 rounded">click()</code> y <code className="text-[0.75vw] font-mono bg-slate-100 px-1 rounded">typeText()</code> para emular con precisión las acciones del usuario final.
            </p>
          </Card>
          
          <Card delay={0.7} x={40} className="p-[1.2vw] border-l-4 border-brand-yellow">
            <div className="flex items-center gap-[0.6vw] mb-[0.6vh]">
              <Activity className="w-[1.4vw] h-[1.4vw] text-amber-600" />
              <h4 className="text-[1.05vw] font-black font-display text-teal-deepest">Aislamiento de API (Mocks)</h4>
            </div>
            <p className="text-[0.82vw] text-slate-600 leading-relaxed">
              Utilización de factorías de ViewModels inyectadas e interceptores de red para simular el comportamiento de Supabase de manera controlada sin depender del servidor real.
            </p>
          </Card>
          
          <Evidence delay={0.9} className="mt-[0.5vh]">
            app/src/androidTest/java/com/jala/tetoca/mobile
          </Evidence>
        </div>
      </div>
      
      {/* Mascota Tuki */}
      <motion.img
        src="/assets/mascot/star.png"
        alt="Tuki Star"
        className="absolute w-[7vw] right-[1.5vw] bottom-[2vh] opacity-90 pointer-events-none z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ delay: 1.1 }}
      />
    </div>
  )
}
