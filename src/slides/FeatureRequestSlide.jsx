import FeatureSlide from '../components/FeatureSlide.jsx'
import { FileText, BadgeCheck, Paperclip } from 'lucide-react'

export default function FeatureRequestSlide() {
  return (
    <FeatureSlide
      section="Funcionalidad 03"
      title="Solicitud de un servicio"
      subtitle="El flujo registra la solicitud, descuenta el crédito correspondiente y notifica al proveedor."
      phones={[
        { src: '/shots/request_form.png', alt: 'Formulario de solicitud', caption: 'Formulario' },
        { src: '/shots/request_confirm.png', alt: 'Confirmación de descuento de créditos', caption: 'Confirmación' },
        { src: '/shots/request_success.png', alt: 'Solicitud enviada', caption: 'Solicitud enviada' },
      ]}
      points={[
        {
          Icon: FileText,
          title: 'Mensaje y contexto',
          text: 'El solicitante describe su necesidad y puede adjuntar hasta 3 imágenes de referencia; el envío se realiza como multipart a POST /requests.',
        },
        {
          Icon: BadgeCheck,
          title: 'Confirmación explícita del costo',
          text: 'Antes de enviar, un diálogo informa el descuento de créditos del balance y solicita confirmación del usuario.',
        },
        {
          Icon: Paperclip,
          title: 'Disponibilidad verificada',
          text: 'La aplicación consulta GET /requests/availability para validar que el servicio admite nuevas solicitudes antes de habilitar el flujo.',
        },
      ]}
      evidence="ui/requests/RequestServiceFormFragment.kt · CreateServiceRequestUseCase.kt"
    />
  )
}
