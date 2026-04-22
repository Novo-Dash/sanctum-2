/**
 * optimize-images.mjs
 * Converte todas as imagens do projeto para WebP otimizado.
 *
 * Como usar:
 *   npm install sharp
 *   node optimize-images.mjs
 *
 * Os arquivos originais são mantidos. Os .webp são gerados ao lado deles.
 */

import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, 'public')

const JOBS = [
  // Hero — maior prioridade, redimensiona para 1440px
  {
    input:   'imagem/foto 1.png',
    output:  'imagem/foto 1.webp',
    width:   1440,
    quality: 82,
  },
  // Professor — 600×750
  {
    input:   'professor.png',
    output:  'professor.webp',
    width:   600,
    height:  750,
    quality: 82,
  },
  // Fotos extras
  { input: 'imagem/foto 3.png', output: 'imagem/foto 3.webp', width: 800, quality: 80 },
  { input: 'imagem/foto 4.png', output: 'imagem/foto 4.webp', width: 800, quality: 80 },
  { input: 'imagem/foto 5.png', output: 'imagem/foto 5.webp', width: 800, quality: 80 },
  { input: 'imagem/foto 6.png', output: 'imagem/foto 6.webp', width: 800, quality: 80 },
]

// Galeria — todos os JPGs/JPEGs
async function getGalleryJobs() {
  const galleryDir = join(PUBLIC, 'imagens/gallery')
  const files = await readdir(galleryDir)
  return files
    .filter(f => /\.(jpe?g|JPG|JPEG)$/i.test(f))
    .map(f => ({
      input:   `imagens/gallery/${f}`,
      output:  `imagens/gallery/${basename(f, extname(f))}.webp`,
      width:   800,
      quality: 80,
    }))
}

async function convert({ input, output, width, height, quality }) {
  const src  = join(PUBLIC, input)
  const dest = join(PUBLIC, output)

  let pipeline = sharp(src).webp({ quality })

  if (width || height) {
    pipeline = pipeline.resize(width, height, { fit: 'inside', withoutEnlargement: true })
  }

  await pipeline.toFile(dest)

  const before = (await stat(src)).size
  const after  = (await stat(dest)).size
  const saving = Math.round((1 - after / before) * 100)

  console.log(`✓ ${input}`)
  console.log(`  ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB  (−${saving}%)`)
}

async function main() {
  const galleryJobs = await getGalleryJobs()
  const allJobs = [...JOBS, ...galleryJobs]

  console.log(`\n🔧 Convertendo ${allJobs.length} imagens para WebP...\n`)

  for (const job of allJobs) {
    try {
      await convert(job)
    } catch (err) {
      console.error(`✗ Erro em ${job.input}: ${err.message}`)
    }
  }

  console.log('\n✅ Concluído! Agora atualize os src= nas imagens para .webp e use <picture> com fallback.')
}

main()
