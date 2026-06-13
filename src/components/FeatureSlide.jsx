import { SlideHeader, Card, Evidence } from './SlideShell.jsx'
import PhoneFrame from './PhoneFrame.jsx'

// Plantilla de funcionalidad: capturas reales del dispositivo + descripción técnica.
export default function FeatureSlide({ section, title, subtitle, phones, points, evidence }) {
  return (
    <div className="relative w-full h-full flex flex-col px-[4vw] pt-[4vh] pb-[3vh]">
      <SlideHeader section={section} title={title} subtitle={subtitle} />
      <div className="flex-1 flex gap-[2.5vw] min-h-0 z-10 items-center">
        <div className="flex-[1.05] flex flex-col gap-[1.4vh] justify-center">
          {points.map(({ Icon, title: t, text }, i) => (
            <Card key={t} delay={0.3 + i * 0.15} x={-40} y={0} className="p-[1.1vw] flex gap-[1vw] items-start">
              <div className="bg-teal/10 rounded-xl p-[0.6vw] shrink-0">
                <Icon className="w-[1.5vw] h-[1.5vw] text-teal" />
              </div>
              <div>
                <h4 className="text-[1.02vw] font-bold font-display text-teal-deepest">{t}</h4>
                <p className="text-[0.88vw] text-slate-600 leading-relaxed mt-[0.3vh]">{text}</p>
              </div>
            </Card>
          ))}
          {evidence && <Evidence delay={0.9}>{evidence}</Evidence>}
        </div>
        <div className="flex-[1.1] h-full min-h-0 flex items-stretch justify-center gap-[1.2vw] py-[2vh]">
          {phones.map((p, i) => (
            <PhoneFrame key={p.src} {...p} delay={0.4 + i * 0.18} className="flex-1 h-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
