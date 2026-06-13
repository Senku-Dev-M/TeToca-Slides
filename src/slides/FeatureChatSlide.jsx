import FeatureSlide from '../components/FeatureSlide.jsx'
import { MessagesSquare, Radio, DatabaseBackup } from 'lucide-react'

export default function FeatureChatSlide() {
  return (
    <FeatureSlide
      section="Funcionalidad 06"
      title="Mensajería en tiempo real"
      subtitle="Cada solicitud genera una conversación; los mensajes se transmiten por WebSocket y se persisten en el backend."
      phones={[
        { src: '/shots/messages_list.png', alt: 'Lista de conversaciones', caption: 'Conversaciones' },
        { src: '/shots/chat_thread.png', alt: 'Hilo de conversación con mensaje enviado', caption: 'Hilo de conversación' },
      ]}
      points={[
        {
          Icon: MessagesSquare,
          title: 'Conversación por solicitud',
          text: 'La lista muestra el servicio asociado, el último mensaje y los indicadores de no leído; el hilo presenta burbujas entrantes y salientes.',
        },
        {
          Icon: Radio,
          title: 'Socket.IO con confirmación',
          text: 'El envío usa el evento message:send con acuse de recibo (ACK) y tiempo límite de 5 segundos; message:new y message:read llegan en vivo.',
        },
        {
          Icon: DatabaseBackup,
          title: 'Historial por REST',
          text: 'Los mensajes anteriores se recuperan paginados desde GET /messages/conversations/{requestId}, lo que permite reconstruir el hilo al reabrirlo.',
        },
      ]}
      evidence="data/remote/MessagesSocketDataSource.kt · ui/messages/MessageThreadFragment.kt"
    />
  )
}
