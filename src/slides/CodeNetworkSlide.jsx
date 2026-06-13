import { motion } from 'framer-motion'
import { SlideHeader, Card, Evidence } from '../components/SlideShell.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

const code = `object ApiClient {
    val service: TeTocaApiService by lazy {
        createRetrofit(ApiConstants.BASE_URL, sessionManager)
            .create(TeTocaApiService::class.java)
    }

    private fun createRetrofit(baseUrl: String, tokenProvider: AuthTokenProvider): Retrofit {
        val client = OkHttpClient.Builder()
            .addInterceptor(BearerTokenInterceptor(tokenProvider))
            .addInterceptor(logging)
            .build()

        return Retrofit.Builder()
            .baseUrl(sanitizedUrl)
            .client(client)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
}`

export default function CodeNetworkSlide() {
  return (
    <div className="relative w-full h-full flex flex-col px-[4vw] pt-[4vh] pb-[3vh]">
      <SlideHeader
        section="Implementación técnica 01"
        title="Capa de red: Retrofit con interceptor de autorización"
        subtitle="Punto único de construcción del cliente HTTP; el token de sesión se adjunta automáticamente en cada petición."
      />
      <div className="flex-1 flex gap-[2vw] min-h-0 z-10 items-center">
        <CodeBlock file="data/remote/ApiClient.kt" code={code} className="flex-[1.45] max-h-full self-center" />
        <div className="flex-[0.62] flex flex-col gap-[1.4vh]">
          <Card delay={0.45} x={40} y={0} className="p-[1.2vw]">
            <h4 className="text-[1.02vw] font-bold font-display text-teal-deepest mb-[0.4vh]">Función</h4>
            <p className="text-[0.88vw] text-slate-600 leading-relaxed">
              Construye la instancia de Retrofit con conversor Gson y dos interceptores OkHttp:
              autorización Bearer y registro de tráfico para depuración.
            </p>
          </Card>
          <Card delay={0.6} x={40} y={0} className="p-[1.2vw]">
            <h4 className="text-[1.02vw] font-bold font-display text-teal-deepest mb-[0.4vh]">Relevancia</h4>
            <p className="text-[0.88vw] text-slate-600 leading-relaxed">
              Los repositorios no gestionan tokens: <code className="font-mono text-teal-dark">BearerTokenInterceptor</code>{' '}
              firma todas las peticiones, lo que centraliza la autenticación y elimina código repetido.
            </p>
          </Card>
          <Card delay={0.75} x={40} y={0} className="p-[1.2vw]">
            <h4 className="text-[1.02vw] font-bold font-display text-teal-deepest mb-[0.4vh]">Definición de la API</h4>
            <p className="text-[0.88vw] text-slate-600 leading-relaxed">
              <code className="font-mono text-teal-dark">TeTocaApiService</code> declara más de 25 endpoints como
              funciones <code className="font-mono text-teal-dark">suspend</code> con DTOs tipados y un envoltorio
              genérico para respuestas paginadas.
            </p>
          </Card>
          <Evidence delay={0.95}>data/remote/ApiClient.kt · BearerTokenInterceptor.kt · TeTocaApiService.kt</Evidence>
        </div>
      </div>
      <motion.img
        src="/assets/mascot/attention.png"
        alt=""
        className="absolute w-[7vw] right-[1.5vw] bottom-[2vh] opacity-90 pointer-events-none"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ delay: 1.1 }}
      />
    </div>
  )
}
