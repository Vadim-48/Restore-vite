import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';

const iconsDir = path.resolve('src/icons');
const outFile = path.resolve('public/sprite.svg');

function generateSprite() {
  const files = fs.readdirSync(iconsDir).filter(f => f.endsWith('.svg'));
  let spriteContent = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">`;

  for (const file of files) {
    const name = path.basename(file, '.svg');
    const content = fs.readFileSync(path.join(iconsDir, file), 'utf-8');

    // Витягуємо viewBox з оригінального SVG
    const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

    // Видаляємо зовнішній тег <svg>, залишаємо всі внутрішні елементи з атрибутами
    let innerContent = content
      .replace(/<\?xml.*\?>/, '')
      .replace(/<!DOCTYPE.*>/, '')
      .replace(/<svg[^>]*>/, '')
      .replace(/<\/svg>/, '')
      .trim();

    // Витягуємо fill із зовнішнього <svg> якщо він є
    const svgFillMatch = content.match(/<svg[^>]*\sfill="([^"]+)"/);
    const symbolFill = svgFillMatch ? ` fill="${svgFillMatch[1]}"` : '';

    spriteContent += `<symbol id="icon-${name}" viewBox="${viewBox}"${symbolFill}>${innerContent}</symbol>`;
  }

  spriteContent += '</svg>';
  fs.writeFileSync(outFile, spriteContent);
  console.log('SVG sprite generated:', outFile);
}

generateSprite();

chokidar.watch(iconsDir)
  .on('add', generateSprite)
  .on('change', generateSprite)
  .on('unlink', generateSprite);



// import fs from 'fs';
// import path from 'path';
// import chokidar from 'chokidar';
//
// const iconsDir = path.resolve('src/icons');
// const outFile = path.resolve('public/sprite.svg');
//
// function generateSprite() {
//   const files = fs.readdirSync(iconsDir).filter(f => f.endsWith('.svg'));
//   let spriteContent = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">`;
//
//   for (const file of files) {
//     const name = path.basename(file, '.svg');
//     const content = fs.readFileSync(path.join(iconsDir, file), 'utf-8');
//
//     // Витягуємо viewBox з оригінального SVG
//     const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
//     const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
//
//     // Видаляємо зовнішній тег <svg> та xmlns, залишаємо лише внутрішній контент
//     const innerContent = content
//       .replace(/<\?xml.*\?>/, '')
//       .replace(/<!DOCTYPE.*>/, '')
//       .replace(/<svg[^>]*>/, '')
//       .replace(/<\/svg>/, '')
//       .trim();
//
//     // Додаємо символ з viewBox, без xmlns і width/height
//     spriteContent += `<symbol id="icon-${name}" viewBox="${viewBox}">${innerContent}</symbol>`;
//   }
//
//   spriteContent += '</svg>';
//   fs.writeFileSync(outFile, spriteContent);
//   console.log('SVG sprite generated:', outFile);
// }
//
// generateSprite();
//
// chokidar.watch(iconsDir)
//   .on('add', generateSprite)
//   .on('change', generateSprite)
//   .on('unlink', generateSprite);




// // generateSprite.js
// import fs from 'fs';
// import path from 'path';
// import chokidar from 'chokidar';
//
// const iconsDir = path.resolve('src/icons');
// const outFile = path.resolve('public/sprite.svg');
//
// function generateSprite() {
//   const files = fs.readdirSync(iconsDir).filter(f => f.endsWith('.svg'));
//   let spriteContent = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">`;
//
//   for (const file of files) {
//     const name = path.basename(file, '.svg');
//     const content = fs.readFileSync(path.join(iconsDir, file), 'utf-8')
//       .replace(/<\?xml.*\?>/, '')
//       .replace(/<!DOCTYPE.*>/, '')
//       .replace(/<svg[^>]*>|<\/svg>/g, '');
//     spriteContent += `<symbol id="icon-${name}" viewBox="0 0 24 24">${content}</symbol>`;
//   }
//
//   spriteContent += '</svg>';
//   fs.writeFileSync(outFile, spriteContent);
//   console.log('SVG sprite generated:', outFile);
// }
//
// // Одноразова генерація
// generateSprite();
//
// // Спостереження за змінами під час dev
// chokidar.watch(iconsDir).on('all', () => {
//   generateSprite();
// });


// // scripts/generate-sprite.js
// import fs from 'fs'
// import path from 'path'
//
// const iconsDir = path.resolve('src/icons')
// const outFile = path.resolve('public/sprite.svg')
//
// const files = fs.readdirSync(iconsDir).filter(f => f.endsWith('.svg'))
//
// let spriteContent = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">`
//
// for (const file of files) {
//   const name = path.basename(file, '.svg')
//   const content = fs.readFileSync(path.join(iconsDir, file), 'utf-8')
//     .replace(/<\?xml.*\?>/, '')
//     .replace(/<!DOCTYPE.*>/, '')
//     .replace(/<svg[^>]*>|<\/svg>/g, '')
//   spriteContent += `<symbol id="icon-${name}" viewBox="0 0 24 24">${content}</symbol>`
// }
//
// spriteContent += '</svg>'
//
// fs.writeFileSync(outFile, spriteContent)
//
// console.log('SVG sprite generated:', outFile)