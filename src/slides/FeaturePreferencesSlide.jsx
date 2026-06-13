import FeatureSlide from '../components/FeatureSlide.jsx'
import { Star, Moon, Database } from 'lucide-react'

export default function FeaturePreferencesSlide() {
  return (
    <FeatureSlide
      section="Funcionalidad 07"
      title="Favoritos con persistencia local y tema oscuro"
      subtitle="Preferencias del usuario almacenadas en el dispositivo mediante Room y DataStore."
      phones={[
        { src: '/shots/favorites.png', alt: 'Listado de servicios favoritos', caption: 'Favoritos' },
        { src: '/shots/theme_selector.png', alt: 'Selector de tema de la aplicación', caption: 'Selector de tema' },
        { src: '/shots/explore_dark.png', alt: 'Pantalla Explorar en tema oscuro', caption: 'Tema oscuro' },
      ]}
      points={[
        {
          Icon: Star,
          title: 'Favoritos almacenados con Room',
          text: 'Los servicios guardados persisten en SQLite (tetoca.db) mediante SavedServiceEntity y SavedServiceDao. El repositorio expone los identificadores como Flow, por lo que el estado del ícono se actualiza de forma reactiva.',
        },
        {
          Icon: Moon,
          title: 'Tema claro, oscuro o del sistema',
          text: 'La preferencia se guarda en DataStore y ThemeController la aplica con AppCompatDelegate. El documento DOCS_DARK_MODE.md define la correspondencia entre colores semánticos y sus variantes nocturnas.',
        },
        {
          Icon: Database,
          title: 'Colores semánticos en lugar de valores fijos',
          text: 'Los layouts referencian nombres semánticos (tetoca_teal, screen_background); values-night/colors.xml redefine cada nombre para el tema oscuro sin modificar las vistas.',
        },
      ]}
      evidence="data/local/TeTocaDatabase.java · data/preferences/ThemePreferencesRepository.kt · ui/theme/ThemeController.kt"
    />
  )
}
