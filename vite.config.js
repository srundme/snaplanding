import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv, createServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

function seoPrerenderPlugin() {
  return {
    name: 'seo-prerender',
    apply: 'build',
    async closeBundle() {
      const server = await createServer({
        configFile: false,
        root: rootDir,
        server: { middlewareMode: true },
        appType: 'custom',
        resolve: {
          alias: {
            '@': path.resolve(rootDir, './src'),
          },
        },
      })
      try {
        const mod = await server.ssrLoadModule('/scripts/seo-prerender.mjs')
        const result = mod.prerenderSeoShells({
          distDir: path.resolve(rootDir, 'dist'),
          publicDir: path.resolve(rootDir, 'public'),
        })
        console.log(`[seo-prerender] wrote ${result.routes} route shells + sitemap.xml`)
      } finally {
        await server.close()
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, '')
  const pixelId = env.VITE_META_PIXEL_ID?.trim()

  return {
    resolve: {
      alias: {
        '@': path.resolve(rootDir, './src'),
      },
    },
    server: {
      host: true,
      port: 5173,
      strictPort: false,
      // Allow ngrok / cloudflare tunnel hostnames when sharing dev previews
      allowedHosts: [".ngrok-free.dev", ".ngrok.io", ".trycloudflare.com"],
    },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'meta-pixel-noscript',
        transformIndexHtml(html) {
          if (!pixelId) return html
          const noscript = `<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" alt="" /></noscript>`
          return html.replace('</head>', `    ${noscript}\n  </head>`)
        },
      },
      seoPrerenderPlugin(),
    ],
  }
})
