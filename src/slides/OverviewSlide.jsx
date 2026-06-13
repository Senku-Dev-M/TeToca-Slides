import { SlideHeader, Card } from '../components/SlideShell.jsx'
import { Clock, RefreshCcw, Coins } from 'lucide-react'

export default function OverviewSlide() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-[6vw]">
      <SlideHeader
        section="Resumen del proyecto"
        title="¿Qué es TeToca?"
      />
      <Card delay={0.2} className="p-[1.8vw] w-full">
        <p className="text-[1.15vw] text-slate-700 leading-relaxed">
          TeToca es una aplicación móvil de intercambio de servicios en la que la unidad de valor es un
          <strong className="text-teal-dark"> crédito que representa tiempo</strong>, no dinero. Los usuarios publican
          servicios, solicitan los de otros miembros y coordinan la entrega mediante mensajería integrada,
          dentro de un mercado controlado por la plataforma.
        </p>
      </Card>
      <div className="grid grid-cols-3 gap-[1.5vw] mt-[2.5vh] w-full">
        <Card delay={0.4} x={-40} y={0} className="p-[1.4vw]">
          <Clock className="w-[2vw] h-[2vw] text-teal mb-[1vh]" />
          <h4 className="text-[1.15vw] font-bold font-display text-teal-deepest mb-[0.6vh]">Problema identificado</h4>
          <p className="text-[0.95vw] text-slate-600 leading-relaxed">
            Personas con tiempo o recursos económicos limitados enfrentan dificultades para acceder a
            servicios y asistencia en actividades cotidianas.
          </p>
        </Card>
        <Card delay={0.55} y={40} className="p-[1.4vw]">
          <RefreshCcw className="w-[2vw] h-[2vw] text-teal mb-[1vh]" />
          <h4 className="text-[1.15vw] font-bold font-display text-teal-deepest mb-[0.6vh]">Solución propuesta</h4>
          <p className="text-[0.95vw] text-slate-600 leading-relaxed">
            Una plataforma de intercambio donde habilidades y asistencia se ofrecen y solicitan entre
            usuarios, con un ciclo completo: publicación, solicitud, coordinación y calificación.
          </p>
        </Card>
        <Card delay={0.7} x={40} y={0} className="p-[1.4vw]">
          <Coins className="w-[2vw] h-[2vw] text-teal mb-[1vh]" />
          <h4 className="text-[1.15vw] font-bold font-display text-teal-deepest mb-[0.6vh]">Sistema de créditos</h4>
          <p className="text-[0.95vw] text-slate-600 leading-relaxed">
            Cada cuenta nueva recibe 5 créditos de bienvenida. Solicitar un servicio descuenta su costo
            del balance; los créditos representan participación, no pagos en efectivo.
          </p>
        </Card>
      </div>
    </div>
  )
}
