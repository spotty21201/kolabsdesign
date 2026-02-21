const fs = require('fs');
const path = require('path');

const directory = './src';

const mappings = {
  'primary-orange': 'primary',
  'secondary-red': 'primary',
};

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      for (const [key, value] of Object.entries(mappings)) {
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        content = content.replace(regex, value);
      }
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

walkDir(directory);
console.log('Replacements completed.');
