import { motion } from 'framer-motion'

const KEYWORDS = new Set([
  'package', 'import', 'class', 'interface', 'object', 'fun', 'val', 'var',
  'private', 'public', 'override', 'suspend', 'return', 'if', 'else', 'when',
  'try', 'catch', 'data', 'sealed', 'enum', 'operator', 'companion', 'const',
  'lateinit', 'by', 'lazy', 'null', 'true', 'false', 'this', 'it', 'in', 'is',
])

// Resaltado de sintaxis Kotlin basado en tokens, sin dependencias externas.
function tokenize(line) {
  const pattern = /(\/\/.*$)|("(?:[^"\\]|\\.)*")|(@\w+)|(\b\d[\d_]*L?\b)|(\b[A-Z][A-Za-z0-9]*\b)|(\b[a-z][A-Za-z0-9]*\b(?=\s*\())|(\w+)|(\s+|[^\w\s]+)/g
  const out = []
  let m
  while ((m = pattern.exec(line)) !== null) {
    const [, comment, str, ann, num, type, fn, word] = m
    const text = m[0]
    if (comment) out.push({ t: 'cm', text })
    else if (str) out.push({ t: 'str', text })
    else if (ann) out.push({ t: 'ann', text })
    else if (num) out.push({ t: 'num', text })
    else if (type) out.push({ t: 'type', text })
    else if (fn) out.push({ t: KEYWORDS.has(fn) ? 'kw' : 'fn', text })
    else if (word) out.push({ t: KEYWORDS.has(word) ? 'kw' : '', text })
    else out.push({ t: '', text })
  }
  return out
}

export default function CodeBlock({ file, code, delay = 0.2, className = '' }) {
  const lines = code.replace(/^\n/, '').trimEnd().split('\n')
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-teal-deepest rounded-2xl shadow-2xl overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-[0.5vw] px-[1vw] py-[0.8vh] bg-white/5 border-b border-white/10">
        <span className="w-[0.6vw] h-[0.6vw] rounded-full bg-[#ff5f57]" />
        <span className="w-[0.6vw] h-[0.6vw] rounded-full bg-[#febc2e]" />
        <span className="w-[0.6vw] h-[0.6vw] rounded-full bg-[#28c840]" />
        <span className="ml-[0.5vw] font-mono text-[0.75vw] text-teal-soft">{file}</span>
      </div>
      <pre className="px-[1.2vw] py-[1.2vh] font-mono text-[0.78vw] leading-[1.7] text-[#cfe9e7] overflow-auto">
        {lines.map((line, i) => (
          <div key={i}>
            {tokenize(line).map((tok, j) =>
              tok.t ? (
                <span key={j} className={`tok-${tok.t}`}>{tok.text}</span>
              ) : (
                <span key={j}>{tok.text}</span>
              ),
            )}
            {line === '' ? ' ' : ''}
          </div>
        ))}
      </pre>
    </motion.div>
  )
}
