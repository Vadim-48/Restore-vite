import { defineConfig } from 'vite'
import path from 'path'
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    handlebars({
      partialDirectory: 'src/html', // 👈 тут лежать твої .html файли
    }),
    {
      name: 'handlebars-full-reload',
      handleHotUpdate({ file, server }) {
        // Якщо змінюється будь-який .html файл у src/html — оновлюємо сторінку
        if (file.endsWith('.html')) {
          console.log('🔁 Reload через зміну шаблону:', file);
          server.ws.send({
            type: 'full-reload',
            path: '*',
          });
        }
      },
    },
  ],
  server: {
    watch: {
      include: ['src/html/**/*.html', 'src/**/*.html'], // 👈 можна залишити і src/**/*.hbs про всяк
    },
  },
});