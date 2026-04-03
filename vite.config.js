import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // Build optimization
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
      },
    },

    // Chunk size optimization
    chunkSizeWarningLimit: 600,

    // Rollup options for advanced chunk splitting
    rollupOptions: {
      output: {
        // Manual chunk configuration for optimal bundle splitting
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['react-icons'],
          'vendor-form': ['axios'],
          
          // Feature-based chunks (lazy loaded)
          'admin-pages': [
            './src/admin/Dashboard.jsx',
            './src/admin/ManageCourses.jsx',
            './src/admin/ManageUpdates.jsx',
            './src/admin/ManageResults.jsx',
            './src/admin/ManageCurrentAffairs.jsx',
            './src/admin/ManageDemoRequests.jsx'
          ],
          
          // Course pages chunk
          'course-pages': [
            './src/pages/CoursePage.jsx',
            './src/pages/CourseDetailpage.jsx'
          ],

          // Content pages chunk
          'content-pages': [
            './src/pages/Updates.jsx',
            './src/pages/Notification.jsx',
            './src/pages/CurrentAffairsPage.jsx',
            './src/pages/CurrentAffairDetailPage.jsx'
          ]
        },

        // Optimize entry point naming
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/chunks/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|gif|svg/.test(ext)) {
            return `images/[name]-[hash][extname]`;
          } else if (/woff|woff2|eot|ttf|otf/.test(ext)) {
            return `fonts/[name]-[hash][extname]`;
          } else if (ext === 'css') {
            return `css/[name]-[hash][extname]`;
          }
          return `[name]-[hash][extname]`;
        }
      }
    },

    // CSS code splitting
    cssCodeSplit: true,

    // Source maps only in development
    sourcemap: false,

    // Report compressed size
    reportCompressedSize: true
  },

  // Optimization for development
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

  // Server configuration for development
  server: {
    port: 5173,
    strictPort: false,
    open: false,

    // Proxy API calls
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path
      }
    }
  }
});
