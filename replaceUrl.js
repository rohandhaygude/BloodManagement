const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git') && !file.includes('dist')) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(file);
    }
  });
  return results;
};

const dirsToScan = [
  path.join(__dirname, 'Frontend'),
  path.join(__dirname, 'Dashboard')
];

let updatedCount = 0;

dirsToScan.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = walk(dir);
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    
    // Replace localhost
    content = content.replace(/http:\/\/localhost:3000/g, 'https://bloodmanagment-qiya.onrender.com');
    // Replace old render URL
    content = content.replace(/https:\/\/bloodmanagment-1zih\.onrender\.com/g, 'https://bloodmanagment-qiya.onrender.com');
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content);
      console.log('Updated', file);
      updatedCount++;
    }
  });
});

console.log('Total files updated:', updatedCount);
