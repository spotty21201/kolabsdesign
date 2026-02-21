const fs = require('fs');

const file = 'src/data/mockData.ts';
let content = fs.readFileSync(file, 'utf8');

// replace all picsum photos with empty strings
content = content.replace(/heroImage: 'https:\/\/picsum\.photos[^']+',/g, "heroImage: '',");

fs.writeFileSync(file, content);
console.log('Images wiped.');
