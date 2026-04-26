import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },

    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        manualChunks(id) {
          // --- Heavy editor: split jodit into its own chunk ---
          if (id.includes('jodit-react') || id.includes('jodit')) {
            return 'vendor-jodit';
          }

          // --- Image compression lib ---
          if (id.includes('browser-image-compression')) {
            return 'vendor-image-compression';
          }

          // --- Framer Motion ---
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer-motion';
          }

          // --- React core ---
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'vendor-react';
          }

          // --- React Router ---
          if (id.includes('node_modules/react-router') ||
              id.includes('node_modules/@remix-run')) {
            return 'vendor-router';
          }

          // --- Icons ---
          if (id.includes('node_modules/react-icons')) {
            return 'vendor-icons';
          }

          // --- HTTP / helmet ---
          if (id.includes('node_modules/axios') ||
              id.includes('node_modules/react-helmet-async') ||
              id.includes('node_modules/helmet')) {
            return 'vendor-utils';
          }

          // --- Admin pages (jodit already split above, so this stays small) ---
          if (id.includes('/src/admin/')) {
            return 'admin-pages';
          }

          // NOTE: Do NOT manually chunk page/component files here.
          // App.jsx already uses React.lazy() for those — Vite handles
          // splitting automatically and adding them to manualChunks
          // causes the "static + dynamic import" conflict warning.
        },

        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/chunks/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split('.').pop();
          if (/png|jpe?g|gif|svg/.test(ext))   return 'images/[name]-[hash][extname]';
          if (/woff2?|eot|ttf|otf/.test(ext))  return 'fonts/[name]-[hash][extname]';
          if (ext === 'css')                    return 'css/[name]-[hash][extname]';
          return '[name]-[hash][extname]';
        }
      }
    },

    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: true
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      'react-icons',
      'react-helmet-async'
    ],
    exclude: ['node_modules']
  },

  server: {
    port: 5173,
    strictPort: false,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path
      }
    }
  }
});
