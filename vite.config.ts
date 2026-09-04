/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, loadEnv } from 'vite'

/**
 * Vite needs a base with exactly one leading and one trailing slash. This accepts
 * anything the deploy environment might supply — "", "/", "moristack",
 * "/moristack", "/moristack/" — because actions/configure-pages emits
 * "/<repo>" for a project page but "/" for a user page or custom domain.
 */
export function normalizeBasePath(value: string | undefined) {
  const inner = (value ?? '').trim().replace(/^\/+/, '').replace(/\/+$/, '')
  return inner === '' ? '/' : `/${inner}/`
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // VITE_BASE_PATH: "/<repo-name>/" for a project page, "/" for a custom domain
    // or user page. See README "Deploying to GitHub Pages".
    base: normalizeBasePath(env.VITE_BASE_PATH),
    plugins: [
      react(),
      tailwindcss(),
      // Opt-in only: the treemap is ~1MB and must not ship to the live site.
      // Generate it with `npm run analyze`.
      env.ANALYZE === '1' &&
        visualizer({ filename: 'dist/stats.html', gzipSize: true, brotliSize: true }),
    ].filter(Boolean),
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: {
      target: 'es2022',
      cssCodeSplit: true,
      reportCompressedSize: false,
      // three.js is deliberately large and deliberately off the critical path:
      // it is only fetched after idle, on capable devices.
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            if (/three|@react-three/.test(id)) return 'three'
            if (/framer-motion|motion-dom|motion-utils/.test(id)) return 'motion'
            if (/react-hook-form|@hookform|zod/.test(id)) return 'forms'
            if (/react-router/.test(id)) return 'router'
            if (/react-dom|scheduler|[\\/]react[\\/]/.test(id)) return 'react'
          },
        },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
      css: false,
      include: ['src/**/*.test.{ts,tsx}'],
      coverage: { provider: 'v8', reporter: ['text', 'html'] },
    },
  }
})
