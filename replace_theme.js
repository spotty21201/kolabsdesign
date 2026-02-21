const fs = require('fs');
const path = require('path');

const directory = './src';

const mappings = {
  'bg-\\[#0055FF\\]': 'bg-primary-orange',
  'text-\\[#0055FF\\]': 'text-primary-orange',
  'border-\\[#0055FF\\]': 'border-primary-orange',
  'text-blue-600': 'text-primary-orange',
  'text-blue-700': 'text-primary-orange',
  'hover:text-blue-700': 'hover:text-secondary-red',
  'hover:bg-blue-700': 'hover:bg-secondary-red',
  'text-gray-900': 'text-charcoal',
  'text-gray-800': 'text-charcoal/80',
  'text-gray-700': 'text-charcoal/70',
  'text-gray-600': 'text-charcoal/60',
  'text-gray-500': 'text-charcoal/50',
  'text-gray-400': 'text-charcoal/40',
  'bg-gray-50': 'bg-soft-gray/50',
  'bg-gray-100': 'bg-soft-gray/80',
  'bg-gray-200': 'bg-border-gray/50',
  'hover:bg-gray-50': 'hover:bg-soft-gray/50',
  'hover:bg-gray-100': 'hover:bg-soft-gray/80',
  'border-gray-200': 'border-border-gray',
  'border-gray-300': 'border-border-gray/80',
  'border-gray-100': 'border-border-gray/50',
  'bg-\\[#F9F9F8\\]': 'bg-soft-gray',
  'bg-\\[#F9F9F8\\]/80': 'bg-soft-gray/80',
  'text-\\[#111111\\]': 'text-charcoal',
  'bg-black': 'bg-charcoal',
  'text-white': 'text-white', // keeping white exactly as is
  'font-sans': 'font-sans',
  'font-serif': 'font-serif',
};

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
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
