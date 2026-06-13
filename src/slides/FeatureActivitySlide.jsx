import FeatureSlide from '../components/FeatureSlide.jsx'
import { Inbox, Send, History } from 'lucide-react'

export default function FeatureActivitySlide() {
  return (
    <FeatureSlide
      section="Funcionalidad 04"
      title="Gestión de la actividad del usuario"
      subtitle="Tres pestañas concentran el estado de los intercambios: recibidas, enviadas e historial."
      phones={[
        { src: '/shots/activity_sent.png', alt: 'Solicitudes enviadas', caption: 'Enviadas' },
        { src: '/shots/activity_history.png', alt: 'Historial con movimiento de créditos', caption: 'Historial' },
      ]}
      points={[
        {
          Icon: Inbox,
          title: 'Solicitudes recibidas',
          text: 'El proveedor puede aceptar o rechazar cada solicitud mediante diálogos de confirmación; la aceptación crea la conversación de chat.',
        },
        {
          Icon: Send,
          title: 'Solicitudes enviadas',
          text: 'Cada tarjeta muestra el estado de la solicitud (en espera, aceptada, rechazada) y permite cancelarla mediante PUT /requests/{id}/cancel.',
        },
        {
          Icon: History,
          title: 'Historial con movimientos de créditos',
          text: 'Los intercambios concluidos o en curso se listan con su efecto en el balance; al completar un servicio el usuario puede registrar una reseña.',
        },
      ]}
      evidence="ui/home/activity · usecase/{Accept,Reject,Cancel,Complete}RequestUseCase.kt · SubmitReviewUseCase.kt"
    />
  )
}
