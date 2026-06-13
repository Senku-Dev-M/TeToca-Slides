import FeatureSlide from '../components/FeatureSlide.jsx'
import { ListChecks, CalendarDays, ImagePlus } from 'lucide-react'

export default function FeatureOfferSlide() {
  return (
    <FeatureSlide
      section="Funcionalidad 05"
      title="Publicación de un servicio"
      subtitle="Flujo de creación en dos pasos con indicador de progreso, validaciones y confirmación final."
      phones={[
        { src: '/shots/offer_step1.png', alt: 'Paso 1: información básica', caption: 'Paso 1 · Información' },
        { src: '/shots/offer_step2.png', alt: 'Paso 2: detalles y fotos', caption: 'Paso 2 · Detalles' },
        { src: '/shots/offer_success.png', alt: 'Servicio publicado', caption: 'Publicado' },
      ]}
      points={[
        {
          Icon: ListChecks,
          title: 'Información básica validada',
          text: 'Título, categoría (obtenida de la API) y descripción son obligatorios; el botón Siguiente permanece deshabilitado hasta completar el paso.',
        },
        {
          Icon: CalendarDays,
          title: 'Disponibilidad y costo',
          text: 'El proveedor define los días disponibles, la ubicación y el costo total en créditos mediante un selector incremental.',
        },
        {
          Icon: ImagePlus,
          title: 'Fotografías del servicio',
          text: 'Se admiten hasta 5 imágenes que se envían como multipart en POST /services junto con los campos del formulario.',
        },
      ]}
      evidence="ui/services/create · CreateServiceUseCase.kt · CreateServiceViewModel.kt"
    />
  )
}
