/**
 * GitHub Pages serves 404.html for any path it cannot resolve. Serving the app
 * shell there keeps a hard refresh working even on a non-hash URL.
 */
import { copyFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
await copyFile(resolve(dist, 'index.html'), resolve(dist, '404.html'))
console.log('wrote dist/404.html')
