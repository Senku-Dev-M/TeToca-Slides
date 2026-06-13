import FeatureSlide from '../components/FeatureSlide.jsx'
import { Mail, KeyRound, UserCheck } from 'lucide-react'

export default function FeatureAuthSlide() {
  return (
    <FeatureSlide
      section="Funcionalidad 01"
      title="Registro, autenticación y perfil inicial"
      subtitle="Capturas tomadas en un dispositivo físico con la compilación debug del repositorio."
      phones={[
        { src: '/shots/welcome.png', alt: 'Pantalla de bienvenida', caption: 'Bienvenida' },
        { src: '/shots/register.png', alt: 'Formulario de registro', caption: 'Registro' },
        { src: '/shots/onboarding.png', alt: 'Completar perfil', caption: 'Completar perfil' },
      ]}
      points={[
        {
          Icon: Mail,
          title: 'Registro con correo y contraseña',
          text: 'El alta se realiza contra Supabase Auth. Cada cuenta nueva recibe 5 créditos de bienvenida, como indica la pantalla inicial.',
        },
        {
          Icon: KeyRound,
          title: 'Inicio de sesión con Google',
          text: 'Mediante Credential Manager de AndroidX se obtiene un id_token de Google que Supabase intercambia por un JWT de sesión.',
        },
        {
          Icon: UserCheck,
          title: 'Verificación de perfil',
          text: 'Si el perfil carece de teléfono o descripción, la aplicación dirige al usuario a completar sus datos, habilidades e intereses antes de ingresar.',
        },
      ]}
      evidence="ui/auth · ui/profile/CompleteProfileActivity.kt · AuthRepositoryImpl.kt"
    />
  )
}
