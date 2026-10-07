const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join('C:/Users/ENVY/Downloads/index.html'), 'utf8');
const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/);
const body = bodyMatch[1];
const scriptStart = body.indexOf('<!-- JavaScript');
const markup = body.slice(0, scriptStart);

let jsx = markup
  .replace(/class=/g, 'className=')
  .replace(/for=/g, 'htmlFor=')
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<br>/g, '<br />')
  .replace(/<input([^>]*?)\s*\/?>/g, '<input$1 />');

jsx = jsx.replace(/style="([^"]*)"/g, (_, styleStr) => {
  const parts = styleStr.split(';').filter(Boolean);
  const entries = parts.map((part) => {
    const colon = part.indexOf(':');
    const key = part.slice(0, colon).trim();
    const value = part.slice(colon + 1).trim();
    const camelKey = key.replace(/-([a-z])/g, (m, c) => c.toUpperCase());
    return `${camelKey}: '${value}'`;
  });
  return `style={{ ${entries.join(', ')} }}`;
});

const outDir = path.join(__dirname, '../components');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'HomeMarkup.jsx'), jsx);
console.log('Written', jsx.length, 'chars');
