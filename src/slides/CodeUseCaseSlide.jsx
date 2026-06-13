import { SlideHeader, Card, Evidence } from '../components/SlideShell.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

const code = `// Caso de uso con responsabilidad única, invocable como función
class ToggleFavoriteServiceUseCase(private val repository: FavoriteServicesRepository) {
    suspend operator fun invoke(service: ServiceListItem): Boolean =
        repository.toggleFavorite(service)
}

// Decisión de navegación posterior al inicio de sesión (AuthRepositoryImpl)
private suspend fun verifyProfileStatus(): Result<AuthStatus> {
    val userData = teTocaApi.getAuthenticatedUserProfile().body()?.data
    val phone = userData?.get("phone")?.takeIf { !it.isJsonNull }?.asString
    val bio = userData?.get("bio")?.takeIf { !it.isJsonNull }?.asString

    return if (phone.isNullOrEmpty() || bio.isNullOrEmpty()) {
        Result.success(AuthStatus.NavigateToOnboarding)
    } else {
        Result.success(AuthStatus.NavigateToExplore)
    }
}`

export default function CodeUseCaseSlide() {
  return (
    <div className="relative w-full h-full flex flex-col px-[4vw] pt-[4vh] pb-[3vh]">
      <SlideHeader
        section="Implementación técnica 03"
        title="Casos de uso del dominio"
        subtitle="Más de 35 clases en domain/usecase encapsulan cada operación del negocio detrás de contratos de repositorio."
      />
      <div className="flex-1 flex gap-[2vw] min-h-0 z-10 items-center">
        <CodeBlock file="domain/usecase · data/repository" code={code} className="flex-[1.5] max-h-full self-center" />
        <div className="flex-[0.58] flex flex-col gap-[1.4vh]">
          <Card delay={0.45} x={40} y={0} className="p-[1.2vw]">
            <h4 className="text-[1.02vw] font-bold font-display text-teal-deepest mb-[0.4vh]">Invocación directa</h4>
            <p className="text-[0.88vw] text-slate-600 leading-relaxed">
              La convención <code className="font-mono text-teal-dark">operator fun invoke</code> permite llamar al caso
              de uso como una función, lo que reduce el código en los ViewModels.
            </p>
          </Card>
          <Card delay={0.6} x={40} y={0} className="p-[1.2vw]">
            <h4 className="text-[1.02vw] font-bold font-display text-teal-deepest mb-[0.4vh]">Errores como valores</h4>
            <p className="text-[0.88vw] text-slate-600 leading-relaxed">
              Los repositorios devuelven <code className="font-mono text-teal-dark">Result&lt;T&gt;</code> y estados
              sellados como <code className="font-mono text-teal-dark">AuthStatus</code>; la capa de presentación decide
              la navegación sin bloques try/catch dispersos.
            </p>
          </Card>
          <Card delay={0.75} x={40} y={0} className="p-[1.2vw]">
            <h4 className="text-[1.02vw] font-bold font-display text-teal-deepest mb-[0.4vh]">Cobertura del negocio</h4>
            <p className="text-[0.88vw] text-slate-600 leading-relaxed">
              Autenticación, búsqueda, favoritos, créditos, solicitudes (aceptar, rechazar, cancelar, completar),
              mensajes, reseñas y perfil cuentan con su propio caso de uso.
            </p>
          </Card>
          <Evidence delay={0.95}>domain/usecase/ (35 archivos) · data/repository/AuthRepositoryImpl.kt</Evidence>
        </div>
      </div>
    </div>
  )
}
