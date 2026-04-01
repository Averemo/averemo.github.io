const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.md') || fullPath.endsWith('.njk')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace href="something.html" -> href="something/"
      // And [text](something.html) -> [text](something/)
      content = content.replace(/href="([^"]+)\.html"/g, 'href="$1/"');
      content = content.replace(/\]\(([^)]+)\.html\)/g, ']($1/)');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

walk(path.join(__dirname, '../src'));
console.log("Links updated to work with Eleventy permalinks.");
