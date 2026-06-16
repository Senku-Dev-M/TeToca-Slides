/**
 * generate-background-video.js
 * 
 * Genera un video .mp4 con el fondo animado de las slides de TeToca.
 * Usa node-canvas para renderizar frames y ffmpeg para compilar el video.
 * 
 * Uso:
 *   npm install canvas
 *   node generate-background-video.js [opciones]
 * 
 * Opciones:
 *   --duration=15     Duración en segundos (default: 15)
 *   --fps=30          Frames por segundo (default: 30)
 *   --width=1920      Ancho en px (default: 1920)
 *   --height=1080     Alto en px (default: 1080)
 *   --output=bg.mp4   Archivo de salida (default: tetoca-background.mp4)
 *   --loop            Hace el video seamless-loop friendly
 */

const { createCanvas, loadImage } = require('canvas');
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// ─── Parse CLI args ──────────────────────────────────────────────
function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, val] = arg.substring(2).split('=');
      args[key] = val !== undefined ? val : true;
    }
  });
  return {
    duration: parseInt(args.duration) || 15,
    fps: parseInt(args.fps) || 30,
    width: parseInt(args.width) || 1920,
    height: parseInt(args.height) || 1080,
    output: args.output || 'tetoca-background.mp4',
    loop: !!args.loop,
  };
}

// ─── Configuración de colores TeToca ─────────────────────────────
const BG_COLOR = '#F0F9F9';
const ICON_COLORS = [
  [0, 143, 143, 0.18],    // teal/20
  [255, 196, 42, 0.22],   // brand-yellow/25
  [23, 181, 182, 0.13],   // teal-bright/15
  [0, 107, 107, 0.09],    // teal-dark/10
];

// ─── Iconos simplificados ─────────────────────────────────────────
const ICON_DRAWERS = [
  // Music
  (ctx, s) => {
    ctx.beginPath();
    ctx.arc(s*0.25, s*0.75, s*0.15, 0, Math.PI*2);
    ctx.arc(s*0.7, s*0.65, s*0.15, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(s*0.4, s*0.75); ctx.lineTo(s*0.4, s*0.15);
    ctx.moveTo(s*0.85, s*0.65); ctx.lineTo(s*0.85, s*0.1);
    ctx.moveTo(s*0.4, s*0.15); ctx.lineTo(s*0.85, s*0.1);
    ctx.stroke();
  },
  // Utensils
  (ctx, s) => {
    ctx.beginPath();
    ctx.moveTo(s*0.3, s*0.1); ctx.lineTo(s*0.3, s*0.45);
    ctx.moveTo(s*0.2, s*0.1); ctx.lineTo(s*0.2, s*0.35);
    ctx.moveTo(s*0.4, s*0.1); ctx.lineTo(s*0.4, s*0.35);
    ctx.moveTo(s*0.2, s*0.35); ctx.lineTo(s*0.4, s*0.35);
    ctx.moveTo(s*0.3, s*0.45); ctx.lineTo(s*0.3, s*0.9);
    ctx.moveTo(s*0.7, s*0.1); ctx.quadraticCurveTo(s*0.85, s*0.4, s*0.7, s*0.55);
    ctx.lineTo(s*0.7, s*0.9);
    ctx.stroke();
  },
  // Hammer
  (ctx, s) => {
    ctx.beginPath();
    ctx.moveTo(s*0.35, s*0.65); ctx.lineTo(s*0.15, s*0.85);
    ctx.stroke();
    ctx.strokeRect(s*0.35, s*0.2, s*0.45, s*0.25);
    ctx.beginPath();
    ctx.moveTo(s*0.5, s*0.45); ctx.lineTo(s*0.35, s*0.65);
    ctx.stroke();
  },
  // GraduationCap
  (ctx, s) => {
    ctx.beginPath();
    ctx.moveTo(s*0.5, s*0.2); ctx.lineTo(s*0.9, s*0.4); ctx.lineTo(s*0.5, s*0.6);
    ctx.lineTo(s*0.1, s*0.4); ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(s*0.25, s*0.48); ctx.lineTo(s*0.25, s*0.7);
    ctx.quadraticCurveTo(s*0.5, s*0.85, s*0.75, s*0.7);
    ctx.lineTo(s*0.75, s*0.48);
    ctx.stroke();
  },
  // Headphones
  (ctx, s) => {
    ctx.beginPath();
    ctx.arc(s*0.5, s*0.45, s*0.3, Math.PI, 0);
    ctx.stroke();
    ctx.fillRect(s*0.12, s*0.55, s*0.14, s*0.28);
    ctx.fillRect(s*0.74, s*0.55, s*0.14, s*0.28);
  },
  // Paintbrush
  (ctx, s) => {
    ctx.beginPath();
    ctx.moveTo(s*0.7, s*0.1); ctx.lineTo(s*0.35, s*0.5);
    ctx.quadraticCurveTo(s*0.2, s*0.55, s*0.25, s*0.7);
    ctx.quadraticCurveTo(s*0.15, s*0.85, s*0.3, s*0.85);
    ctx.quadraticCurveTo(s*0.4, s*0.75, s*0.45, s*0.55);
    ctx.lineTo(s*0.8, s*0.15); ctx.closePath();
    ctx.stroke();
  },
  // Star
  (ctx, s) => {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = (i * 72 - 90) * Math.PI / 180;
      ctx.lineTo(s*0.5 + s*0.4*Math.cos(a), s*0.5 + s*0.4*Math.sin(a));
      const a2 = ((i * 72) + 36 - 90) * Math.PI / 180;
      ctx.lineTo(s*0.5 + s*0.18*Math.cos(a2), s*0.5 + s*0.18*Math.sin(a2));
    }
    ctx.closePath();
    ctx.stroke();
  },
  // Scissors
  (ctx, s) => {
    ctx.beginPath(); ctx.arc(s*0.25, s*0.7, s*0.12, 0, Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.arc(s*0.25, s*0.35, s*0.12, 0, Math.PI*2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(s*0.35, s*0.65); ctx.lineTo(s*0.8, s*0.25);
    ctx.moveTo(s*0.35, s*0.4); ctx.lineTo(s*0.8, s*0.75);
    ctx.stroke();
  },
  // Flower
  (ctx, s) => {
    for (let i = 0; i < 6; i++) {
      const a = (i * 60) * Math.PI / 180;
      ctx.beginPath();
      ctx.arc(s*0.5 + s*0.18*Math.cos(a), s*0.4 + s*0.18*Math.sin(a), s*0.1, 0, Math.PI*2);
      ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(s*0.5, s*0.4, s*0.07, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(s*0.5, s*0.55); ctx.lineTo(s*0.5, s*0.9); ctx.stroke();
  },
  // Camera
  (ctx, s) => {
    ctx.strokeRect(s*0.1, s*0.3, s*0.8, s*0.5);
    ctx.beginPath();
    ctx.moveTo(s*0.3, s*0.3); ctx.lineTo(s*0.4, s*0.15);
    ctx.lineTo(s*0.6, s*0.15); ctx.lineTo(s*0.7, s*0.3);
    ctx.stroke();
    ctx.beginPath(); ctx.arc(s*0.5, s*0.55, s*0.14, 0, Math.PI*2); ctx.stroke();
  },
  // Heart
  (ctx, s) => {
    ctx.beginPath();
    ctx.moveTo(s*0.5, s*0.85);
    ctx.bezierCurveTo(s*0.1, s*0.55, s*0.1, s*0.2, s*0.5, s*0.35);
    ctx.bezierCurveTo(s*0.9, s*0.2, s*0.9, s*0.55, s*0.5, s*0.85);
    ctx.stroke();
  },
  // Coins
  (ctx, s) => {
    ctx.beginPath(); ctx.ellipse(s*0.4, s*0.55, s*0.25, s*0.2, 0, 0, Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(s*0.6, s*0.45, s*0.25, s*0.2, 0, 0, Math.PI*2); ctx.stroke();
  },
];

// ─── Generar ítems flotantes ───────────────────────────────────────
function generateItems(count = 26) {
  const items = [];
  for (let i = 0; i < count; i++) {
    const rand1 = ((i * 7919 + 104729) % 10000) / 10000;
    const rand2 = ((i * 6271 + 73856) % 10000) / 10000;
    items.push({
      iconIndex: i % ICON_DRAWERS.length,
      color: ICON_COLORS[i % ICON_COLORS.length],
      size: 26 + rand1 * 42,
      topPercent: (i * 37) % 96,
      delay: -(i * 9 + rand2 * 14),
      duration: 70 + rand1 * 50,
      rotation: rand1 * 90 - 45,
    });
  }
  return items;
}

// ─── Dibujar un frame ────────────────────────────────────────────
function drawFrame(ctx, W, H, elapsed, items, tukiImg) {
  // Fondo
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, W, H);

  const scale = W / 1920;

  // Iconos flotantes
  for (const item of items) {
    const totalDuration = item.duration;
    const t = ((elapsed - item.delay) % totalDuration + totalDuration) % totalDuration;
    const progress = t / totalDuration;
    const xStart = -0.12 * W;
    const xEnd = 1.12 * W;
    const x = xStart + progress * (xEnd - xStart);
    const y = (item.topPercent / 100) * H;
    const size = item.size * scale;
    const rotation = item.rotation + progress * 40;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation * Math.PI / 180);

    const [r, g, b, a] = item.color;
    const colorStr = `rgba(${r},${g},${b},${a})`;
    ctx.fillStyle = colorStr;
    ctx.strokeStyle = colorStr;
    ctx.lineWidth = Math.max(1.6 * scale, 1);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ICON_DRAWERS[item.iconIndex](ctx, size);
    ctx.restore();
  }

  // Tuki watermark
  if (tukiImg) {
    const tukiW = W * 0.20;
    const tukiH = tukiW * (tukiImg.height / tukiImg.width);
    const bobY = Math.sin(elapsed * (2 * Math.PI / 9)) * 12 * scale;

    ctx.save();
    ctx.globalAlpha = 0.05;
    ctx.drawImage(
      tukiImg,
      W - tukiW + W * 0.03,
      H - tukiH + H * 0.04 + bobY,
      tukiW,
      tukiH
    );
    ctx.restore();
  }
}

// ─── Main ────────────────────────────────────────────────────────
async function main() {
  const config = parseArgs();
  const { width: W, height: H, fps, duration, output } = config;
  const totalFrames = fps * duration;

  console.log('🎬 TeToca Background Video Generator');
  console.log(`   Resolución: ${W}×${H}`);
  console.log(`   FPS: ${fps}`);
  console.log(`   Duración: ${duration}s (${totalFrames} frames)`);
  console.log(`   Salida: ${output}`);
  console.log('');

  // Verificar ffmpeg - buscar en PATH o en WinGet packages
  let ffmpegBin = 'ffmpeg';
  try {
    execSync('ffmpeg -version', { stdio: 'pipe' });
  } catch {
    // Buscar en WinGet packages (instalación reciente, PATH no actualizado)
    const wingetDir = path.join(process.env.LOCALAPPDATA || '', 'Microsoft', 'WinGet', 'Packages');
    let found = false;
    if (fs.existsSync(wingetDir)) {
      const findFfmpeg = (dir) => {
        try {
          for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) {
              const result = findFfmpeg(full);
              if (result) return result;
            } else if (entry.name === 'ffmpeg.exe') {
              return full;
            }
          }
        } catch {}
        return null;
      };
      const ffmpegPath = findFfmpeg(wingetDir);
      if (ffmpegPath) {
        ffmpegBin = `"${ffmpegPath}"`;
        found = true;
        console.log(`   ✅ ffmpeg encontrado: ${ffmpegPath}`);
      }
    }
    if (!found) {
      console.error('❌ ffmpeg no está instalado o no está en PATH.');
      console.error('   Instálalo con: winget install --id Gyan.FFmpeg');
      console.error('   Luego reinicia tu terminal.');
      process.exit(1);
    }
  }

  // Crear directorio temporal para frames
  const framesDir = path.join(__dirname, '.frames-tmp');
  if (fs.existsSync(framesDir)) fs.rmSync(framesDir, { recursive: true });
  fs.mkdirSync(framesDir, { recursive: true });

  // Cargar imagen de Tuki
  let tukiImg = null;
  const tukiPaths = [
    path.join(__dirname, 'public', 'assets', 'tuki.png'),
    path.join(__dirname, '..', 'TeToca Paquete de Imagenes', 'tetoca_mascot_penguin.png'),
  ];
  for (const p of tukiPaths) {
    if (fs.existsSync(p)) {
      try {
        tukiImg = await loadImage(p);
        console.log(`   ✅ Tuki cargado desde: ${path.basename(p)}`);
        break;
      } catch { }
    }
  }
  if (!tukiImg) {
    console.log('   ⚠️ No se encontró la imagen de Tuki, se omitirá el watermark.');
  }

  // Crear canvas y generar items
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  const items = generateItems();

  // Generar frames
  console.log('\n📐 Generando frames...');
  const startTime = Date.now();

  for (let i = 0; i < totalFrames; i++) {
    const elapsed = i / fps;
    drawFrame(ctx, W, H, elapsed, items, tukiImg);

    // Guardar frame como PNG
    const frameNum = String(i).padStart(6, '0');
    const framePath = path.join(framesDir, `frame_${frameNum}.png`);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(framePath, buffer);

    // Progress
    if (i % fps === 0 || i === totalFrames - 1) {
      const pct = ((i + 1) / totalFrames * 100).toFixed(1);
      const elapsed_s = ((Date.now() - startTime) / 1000).toFixed(1);
      process.stdout.write(`\r   Frame ${i + 1}/${totalFrames} (${pct}%) — ${elapsed_s}s`);
    }
  }
  console.log('\n   ✅ Frames generados');

  // Compilar con ffmpeg
  console.log('\n🎞️  Compilando video con ffmpeg...');
  const ffmpegCmd = [
    ffmpegBin, '-y',
    '-framerate', String(fps),
    '-i', path.join(framesDir, 'frame_%06d.png'),
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    output
  ].join(' ');

  try {
    execSync(ffmpegCmd, { stdio: 'inherit' });
    console.log(`\n✅ ¡Video generado exitosamente!`);
    console.log(`   📁 ${path.resolve(output)}`);
    
    const stats = fs.statSync(output);
    console.log(`   📦 Tamaño: ${(stats.size / 1024 / 1024).toFixed(1)} MB`);
  } catch (err) {
    console.error('❌ Error al compilar video:', err.message);
    process.exit(1);
  }

  // Limpiar frames temporales
  console.log('\n🧹 Limpiando frames temporales...');
  fs.rmSync(framesDir, { recursive: true });
  console.log('   ✅ Limpieza completada');
}

main().catch(console.error);
