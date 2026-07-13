import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const pixelId = env.VITE_META_PIXEL_ID?.trim()

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
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
    ],
  }
})
