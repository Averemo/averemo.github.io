/*
 * Convert simple markdown to HTML.
 * by Phil Burk
 *
 * Support basic markdown including:
 * Headings like #, ##, ### and ####
 * Unordered lists using *, with nesting
 * Order lists using "1. whatever"
 * Links using [text](url)
 * Escaping of HTML characters like <&> and quotes.
 */

const escapeChars = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  '"': '&quot;',
  "'": '&#39;' // Using &#39; is safer than &apos; for broad compatibility
};

// A regex to find any of the characters that are keys in our object
const unsafeRegex = /[<>&"']/g;

/**
 * Escapes special HTML characters in a string.
 * @param {string} str The string to escape.
 * @returns {string} The escaped string.
 */
function escapeHTML(str) {
  // .replace() can take a function as its second argument.
  // The function is called for every match, and its return
  // value is used as the replacement.
  return str.replace(unsafeRegex, (match) => {
    return escapeChars[match];
  });
}

function wrapBlock(block, tag) {
    block = block.trim();
    if (block.length == 0) {
        return "";
    }
    return '<' + tag + '>' + block + '</' + tag + '>\n';
}

/**
 * Converts Markdown-style links in a string to HTML <a> tags.
 * @param {string} text The input string containing Markdown links.
 * @returns {string} The string with links converted to HTML.
 */
function convertMarkdownLinks(text) {
  // This is the regex to find [text](url)
  const linkRegex = /\[(.*?)]\((.*?)\)/g;

  // This is the replacement pattern
  // $1 inserts the text from the first capture group (.*? inside [])
  // $2 inserts the text from the second capture group (.*? inside ())
  const replacement = '<a href="$2" target="_blank">$1</a>';

  return text.replace(linkRegex, replacement);
}

/**
 * Converts Markdown-style bold (**text**) to HTML <b> tags.
 * @param {string} text The input string.
 * @returns {string} The string with bold text converted to HTML.
 */
function convertBold(text) {
  // Regex: Find text inside **...**
  // \*\* = literal ** (asterisks are escaped with \)
  // (.*?) = capture group for the text inside (non-greedy)
  const boldRegex = /\*\*(.*?)\*\*/g;

  // Replacement: Wrap the captured group ($1) in <b> tags
  const replacement = '<b>$1</b>';

  return text.replace(boldRegex, replacement);
}

class SimpleMarkdown {

    constructor(questions) {
        this.inOrderedList = false;
        this.unorderedListDepth = 0;
        this.html = "";
        this.block = "";
        this.numberedListRegex = /^\d+\./;
    }

    finishOrderedList() {
        if (this.inOrderedList) {
            this.html += '</ol>\n';
            this.inOrderedList = false;
        }
    }

    finishUnorderedList() {
        while (this.unorderedListDepth > 0) {
            this.html += '</ul>\n';
            this.unorderedListDepth -= 1;
        }
    }

    finishParagraph() {
        if (this.block.length > 0) {
            this.html += wrapBlock(this.block, 'p');
            this.block = "";
        }
    }

    continueOrderedList(line) {
        if (!this.inOrderedList) {
            this.html += '<ol>\n';
            this.inOrderedList = true;
        }
        var indexDot = line.indexOf('.');
        this.html += wrapBlock(line.substring(indexDot + 1), "li");
        this.block = "";
    }

    continueUnorderedList(line, depth) {
        while (this.unorderedListDepth > depth) {
            this.html += '</ul>\n';
            this.unorderedListDepth -= 1;
        }
        while (this.unorderedListDepth < depth) {
            this.html += '<ul>\n';
            this.unorderedListDepth += 1;
        }
        this.html += wrapBlock(line, "li");
        this.block = "";
    }

    processLine(line) {
        if (line.length > 0) {
            line = convertMarkdownLinks(line);
            line = convertBold(line);

            if (!line.startsWith("* ")) {
                this.finishUnorderedList();
            }
            if (!this.numberedListRegex.test(line)) {
                this.finishOrderedList();
            }

            if (line.startsWith("####")) {
                this.finishParagraph();
                this.html += wrapBlock(line.substring(4), "h4");
            } else if (line.startsWith("###")) {
                this.finishParagraph();
                this.html += wrapBlock(line.substring(3), "h3");
            } else if (line.startsWith("##")) {
                this.finishParagraph();
                this.html += wrapBlock(line.substring(2), "h2");
            } else if (line.startsWith("#")) {
                this.finishParagraph();
                this.html += wrapBlock(line.substring(1), "h1");
            } else if (line.startsWith("    * ")) {
                this.finishParagraph();
                this.continueUnorderedList(line.substring(6), 3);
            } else if (line.startsWith("  * ")) {
                this.finishParagraph();
                this.continueUnorderedList(line.substring(4), 2);
            } else if (line.startsWith("* ")) {
                this.finishParagraph();
                this.continueUnorderedList(line.substring(2), 1);
            } else if (this.numberedListRegex.test(line)) {
                this.finishParagraph();
                this.continueOrderedList(line);
            } else {
                this.block += ' ' + line.trim();
            }
        } else {
            this.finishParagraph();
            this.finishUnorderedList();
            this.finishOrderedList();
        }
    }

    convertToHTML(markdown) {
        markdown = escapeHTML(markdown); // prevents <script> attacks
        // Parse paragraphs.
        const lines = markdown.split(/\r?\n/);
        for (const line of lines) {
            this.processLine(line);
        }
        // Flush any remaining text.
        this.processLine("");
        return this.html;
    }
}

function writeMarkdown(markdown) {
    var converter = new SimpleMarkdown();
    var html = converter.convertToHTML(markdown);
    document.write(html);
}
