import { defineConfig } from 'vite'
import path from 'path'
import { resolve } from 'path'
// import { viteStaticCopy } from 'vite-plugin-static-copy'
import handlebars from 'vite-plugin-handlebars'
import autoprefixer from 'autoprefixer'
import viteImagemin from 'vite-plugin-imagemin'
// import { optimizeImages } from "./imageOptimizer";

// import { readFileSync } from 'fs'

// import {hero} from './src/config/partial.js'

const pages = {
  index:  resolve(__dirname, 'index.html'),
  about:  resolve(__dirname, 'about.html'),
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
      plugins: [
        autoprefixer(),
      ],
    },
  },

  plugins: [
      handlebars({
      partialDirectory: path.resolve(__dirname, 'src/html'),
    }),

      // viteStaticCopy({
      //     targets: [
      //         {
      //             // src: path.resolve(__dirname, 'src/image'),
      //           src: 'src/image/**/*.{png,jpg,jpeg,gif,svg,webp,avif}',
      //           dest: 'image'      // dist/image - path fo images
      //         }
      //     ]
      // }),
    // ViteImageOptimizer(DEFAULT_OPTIONS),

    viteImagemin({ //  WebP
      gifsicle: {},
      optipng: {},
      mozjpeg: { quality: 75 },
      webp: { quality: 75 },
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