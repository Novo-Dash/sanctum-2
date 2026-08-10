import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** Two documents, one project: the main site and the Back to School campaign
 *  route (/back-to-school). A separate HTML entry keeps the campaign's CSS and
 *  bundle out of the home page, and gives the campaign real <meta og:*> tags —
 *  Meta's scraper runs no JavaScript, so a route inside the SPA would share the
 *  home's share card. The booking module is imported by both. */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        'back-to-school': 'back-to-school.html',
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          gsap: ['gsap'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  resolve: {
    alias: { '@': '/src' },
  },
})
