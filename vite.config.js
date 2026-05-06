import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const publicRollupOutput = {
  manualChunks(id) {
    if (id.includes('jodit-react') || id.includes('jodit')) return 'vendor-jodit';
    if (id.includes('browser-image-compression')) return 'vendor-image-compression';
    if (id.includes('node_modules/framer-motion')) return 'vendor-framer-motion';
    if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/scheduler/')) return 'vendor-react';
    if (id.includes('node_modules/react-router') || id.includes('node_modules/@remix-run')) return 'vendor-router';
    if (id.includes('node_modules/react-icons')) return 'vendor-icons';
    if (id.includes('node_modules/axios') || id.includes('node_modules/react-helmet-async')) return 'vendor-utils';
    if (id.includes('/src/admin/')) return 'admin-pages';
  },
  entryFileNames: 'js/[name]-[hash].js',
  chunkFileNames: 'js/chunks/[name]-[hash].js',
  assetFileNames: (a) => {
    const ext = a.name.split('.').pop();
    if (/png|jpe?g|gif|svg/.test(ext)) return 'images/[name]-[hash][extname]';
    if (/woff2?|eot|ttf|otf/.test(ext)) return 'fonts/[name]-[hash][extname]';
    if (ext === 'css') return 'css/[name]-[hash][extname]';
    return '[name]-[hash][extname]';
  },
};

const adminRollupOutput = {
  entryFileNames: 'js/[name]-[hash].js',
  chunkFileNames: 'js/chunks/[name]-[hash].js',
  assetFileNames: (a) => {
    const ext = a.name.split('.').pop();
    if (/png|jpe?g|gif|svg/.test(ext)) return 'images/[name]-[hash][extname]';
    if (/woff2?|eot|ttf|otf/.test(ext)) return 'fonts/[name]-[hash][extname]';
    if (ext === 'css') return 'css/[name]-[hash][extname]';
    return '[name]-[hash][extname]';
  },
};

export default defineConfig(() => {
  const isAdmin = process.env.BUILD_TARGET === 'admin';

  return {
    plugins: [react(), tailwindcss()],
    base: '/',

    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },

    build: {
      outDir: isAdmin ? 'dist-admin' : 'dist',
      target: 'esnext',
      minify: 'terser',
      terserOptions: { compress: { drop_console: true, drop_debugger: true } },
      chunkSizeWarningLimit: 600,
      cssCodeSplit: true,
      sourcemap: false,
      reportCompressedSize: true,

      rollupOptions: isAdmin
        ? {
            input: path.resolve(__dirname, 'admin.html'),
            output: adminRollupOutput,
          }
        : {
            output: publicRollupOutput,
          },
    },

    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'axios', 'react-icons', 'react-helmet-async'],
      exclude: ['node_modules'],
    },

    server: {
      port: isAdmin ? 5174 : 5173,
      strictPort: false,
      open: false,
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          rewrite: (p) => p,
        },
      },
    },
  };
});
