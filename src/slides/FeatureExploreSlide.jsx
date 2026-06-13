import FeatureSlide from '../components/FeatureSlide.jsx'
import { Search, Coins, LayoutGrid } from 'lucide-react'

export default function FeatureExploreSlide() {
  return (
    <FeatureSlide
      section="Funcionalidad 02"
      title="Exploración y descubrimiento de servicios"
      subtitle="Pantalla principal de la aplicación: búsqueda, categorías, servicios recientes y balance del usuario."
      phones={[
        { src: '/shots/explore.png', alt: 'Pantalla Explorar', caption: 'Explorar' },
        { src: '/shots/service_detail.png', alt: 'Detalle de servicio', caption: 'Detalle de servicio' },
      ]}
      points={[
        {
          Icon: Search,
          title: 'Búsqueda con filtros y paginación',
          text: 'GET /services admite parámetros de texto, categoría y paginación. Las categorías provienen de la API y filtran el listado al seleccionarlas.',
        },
        {
          Icon: Coins,
          title: 'Balance de créditos visible',
          text: 'El saldo se consulta en GET /users/me/credits y se muestra de forma permanente junto al acceso directo para publicar un servicio.',
        },
        {
          Icon: LayoutGrid,
          title: 'Detalle completo del servicio',
          text: 'Título, costo en créditos, categoría, ubicación, proveedor con calificación, días disponibles, descripción, galería y reseñas.',
        },
      ]}
      evidence="ui/home/explore · ui/services/ServiceDetailFragment.kt · SearchServicesUseCase.kt"
    />
  )
}
