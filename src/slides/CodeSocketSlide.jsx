import { motion } from 'framer-motion'
import { SlideHeader, Card, Evidence } from '../components/SlideShell.jsx'
import CodeBlock from '../components/CodeBlock.jsx'

const code = `suspend fun sendMessage(requestId: String, content: String): Result<ChatMessage> {
    val payload = JSONObject()
        .put("requestId", requestId)
        .put("content", content)
    return emitForAck(EVENT_MESSAGE_SEND, payload, MessageDto::class.java)
        .map { it.toDomainMessage() }
}

private suspend fun <T> emitForAck(event: String, payload: JSONObject, clazz: Class<T>): Result<T> {
    val result = withTimeoutOrNull(SOCKET_ACK_TIMEOUT_MS) {
        suspendCancellableCoroutine { continuation ->
            activeSocket.emit(event, payload, Ack { args ->
                continuation.resume(parse(args, clazz))
            })
        }
    }
    return result ?: Result.failure(Exception(SOCKET_TIMEOUT_ERROR))
}`

export default function CodeSocketSlide() {
  return (
    <div className="relative w-full h-full flex flex-col px-[4vw] pt-[4vh] pb-[3vh]">
      <SlideHeader
        section="Implementación técnica 02"
        title="Integración de Socket.IO con corrutinas"
        subtitle="La API de callbacks del cliente Socket.IO se adapta a funciones suspend con confirmación del servidor y tiempo límite."
      />
      <div className="flex-1 flex gap-[2vw] min-h-0 z-10 items-center">
        <CodeBlock file="data/remote/MessagesSocketDataSource.kt" code={code} className="flex-[1.5] max-h-full self-center" />
        <div className="flex-[0.58] flex flex-col gap-[1.4vh]">
          <Card delay={0.45} x={40} y={0} className="p-[1.2vw]">
            <h4 className="text-[1.02vw] font-bold font-display text-teal-deepest mb-[0.4vh]">Adaptación a corrutinas</h4>
            <p className="text-[0.88vw] text-slate-600 leading-relaxed">
              <code className="font-mono text-teal-dark">suspendCancellableCoroutine</code> espera el ACK del servidor;
              si no llega en 5 segundos, <code className="font-mono text-teal-dark">withTimeoutOrNull</code> devuelve
              un error controlado.
            </p>
          </Card>
          <Card delay={0.6} x={40} y={0} className="p-[1.2vw]">
            <h4 className="text-[1.02vw] font-bold font-display text-teal-deepest mb-[0.4vh]">Eventos como flujos</h4>
            <p className="text-[0.88vw] text-slate-600 leading-relaxed">
              Los mensajes entrantes se publican en un <code className="font-mono text-teal-dark">SharedFlow</code> y el
              estado de conexión en un <code className="font-mono text-teal-dark">StateFlow</code>, observados por los
              ViewModels de mensajería.
            </p>
          </Card>
          <Card delay={0.75} x={40} y={0} className="p-[1.2vw]">
            <h4 className="text-[1.02vw] font-bold font-display text-teal-deepest mb-[0.4vh]">Reconexión</h4>
            <p className="text-[0.88vw] text-slate-600 leading-relaxed">
              Al restablecerse la conexión, el data source vuelve a emitir{' '}
              <code className="font-mono text-teal-dark">conversation:join</code> por cada conversación registrada,
              de modo que la sesión de chat continúa sin intervención del usuario.
            </p>
          </Card>
          <Evidence delay={0.95}>data/remote/MessagesSocketDataSource.kt · MessagesRepositoryImpl.kt</Evidence>
        </div>
      </div>
    </div>
  )
}
