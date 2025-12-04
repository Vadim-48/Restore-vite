import { defineConfig } from 'vite'
import path from 'path'
import { resolve } from 'path'
import handlebars from 'vite-plugin-handlebars'
import autoprefixer from 'autoprefixer'
import viteImagemin from 'vite-plugin-imagemin'

// import { optimizeImages } from "./imageOptimizer";

const pages = {
  index:  resolve(__dirname, 'index.html'),
  about:  resolve(__dirname, 'about.html'),
  solutions:  resolve(__dirname, 'solutions.html'),
}

export default defineConfig({
  base: '/Restore-vite/',  // name project in github
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  css: {
    postcss: {
      plugins:
        [ autoprefixer(),],
    },
  },

  plugins: [

      handlebars({
      partialDirectory: path.resolve(__dirname, 'src/html'),
    }),

    viteImagemin({ //  WebP
      gifsicle: {},
      optipng: { optimizationLevel: 5 },
      mozjpeg: { quality: 85 },
    }),

    {
      name: 'handlebars-full-reload',
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.html')) {
          server.ws.send({
            type: 'full-reload',
            path: '*',
          })
        }
      },
    },
  ],

  server: {
    watch: {
      // include: ['src/html/**/*.html', 'src/**/*.html'],
      ignored: ['**/*.webp']
    },
  },

  build: {
    sourcemap: false,
    rollupOptions: {
      input: {
        ...pages,
      },
    },
  },
})