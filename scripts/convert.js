const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const turndownService = new TurndownService({ headingStyle: 'atx' });

const docsDir = path.join(__dirname, '../docs');
const srcDir = path.join(__dirname, '../src');

// Helper to add frontmatter
function addFrontmatter(title, content, layout = 'base.njk') {
  return `---\nlayout: ${layout}\ntitle: "${title}"\n---\n\n${content}`;
}

// Convert a single file
function convertFile(filePath) {
  const relativePath = path.relative(docsDir, filePath);
  const ext = path.extname(relativePath);
  
  if (ext !== '.html') return;

  const content = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(content);
  
  // Extract Title from <title> tag
  let title = $('title').text().trim() || 'Averemo Page';
  
  // Check if it uses writeMarkdown
  const markdownMatch = content.match(/writeMarkdown\(`([\s\S]*?)`\);/);
  if (markdownMatch) {
    let mdContent = markdownMatch[1].trim();
    // Some markdown files already have # Title at the top, we might keep it or not.
    // We just write it as .md
    let newPath = path.join(srcDir, relativePath).replace(/\.html$/, '.md');
    fs.mkdirSync(path.dirname(newPath), { recursive: true });
    fs.writeFileSync(newPath, addFrontmatter(title, mdContent));
    console.log(`Converted to Markdown via extraction: ${relativePath}`);
    return;
  }
  
  // Check if it has complex scripts (quiz logic)
  const scripts = $('script');
  let hasComplexScript = false;
  scripts.each((i, el) => {
    const text = $(el).html() || '';
    if (text.includes('quizData') || text.includes('new GoodBadQuiz')) {
      hasComplexScript = true;
    }
  });

  if (hasComplexScript) {
    // Keep as HTML, but strip header() and footer() and wrap in Frontmatter
    let bodyHtml = $('body').html() || '';
    bodyHtml = bodyHtml.replace(/<script>\s*header\(\);\s*<\/script>/g, '');
    bodyHtml = bodyHtml.replace(/<script>\s*footer\(\);\s*<\/script>/g, '');
    
    let newPath = path.join(srcDir, relativePath).replace(/\.html$/, '.njk');
    fs.mkdirSync(path.dirname(newPath), { recursive: true });
    fs.writeFileSync(newPath, addFrontmatter(title, bodyHtml.trim()));
    console.log(`Converted to Nunjucks (kept HTML due to scripts): ${relativePath}`);
    return;
  }

  // Otherwise, it's standard HTML, convert via Turndown
  let body = $('body').clone();
  // Remove all scripts to avoid header/footer
  body.find('script').remove();
  
  // Get HTML of the body
  let mainContent = body.html() || '';
  
  // Turndown it
  let mdContent = turndownService.turndown(mainContent);
  
  let newPath = path.join(srcDir, relativePath).replace(/\.html$/, '.md');
  fs.mkdirSync(path.dirname(newPath), { recursive: true });
  fs.writeFileSync(newPath, addFrontmatter(title, mdContent));
  console.log(`Converted to Markdown via Turndown: ${relativePath}`);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'images' && file !== 'meander' && file !== 'meander_custom') {
        walkDir(fullPath);
      }
    } else {
      convertFile(fullPath);
    }
  }
}

console.log("Starting conversion...");
walkDir(docsDir);
console.log("Conversion complete.");
