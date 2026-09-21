import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const DEFAULT_PORT = 4000

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // '' as the third arg loads every var in .env, not just the VITE_-prefixed ones.
  // Only VITE_* vars reach the browser via import.meta.env; PORT stays server-side.
  const env = loadEnv(mode, process.cwd(), '')
  const port = Number(env.PORT) || DEFAULT_PORT

  return {
    plugins: [react()],
    server: {
      port,
      strictPort: true,
    },
    preview: {
      port,
      strictPort: true,
    },
  }
})
