# How to Maintain the Averemo Website

This file documents how to work with the modern Markdown-driven site, relying solely on Eleventy components without using the legacy conversion script.

**Important:** You should no longer use or run `convert.js`. The single source of truth is now the hand-editable `.md` files in the `src/` directory.

## How to Test Locally

To convert the markdown and run a local web server:
```
cd work/averemo.github.io
npm start
```

Then visit the local link with your browser. The local website will update automatically when you edit a markdown file.

## Passing Javascript and HTML Through to the Website

You can inject fully interactive raw HTML or JavaScript features natively into any Markdown file. Since the Eleventy parser maps directly to the browser, anything you write inside a `.md` file that uses standard HTML syntax will render exactly as expected.

For example, to embed an applet or Javascript widget within a Markdown document:

```html
This is normal Markdown text describing my widget.

<div id="demo-app" style="border: 1px solid black; padding: 10px;">
    Loading app...
</div>

<script>
    document.getElementById('demo-app').innerHTML = "<b>Interactive Javascript Applet initialized!</b>";
</script>

This is more Markdown text following the widget.
```

## The Files Controlling the Markdown to HTML Conversion

The underlying mechanism that converts your Markdown string into the final nested HTML layouts is powered entirely by Eleventy (11ty) and defined by two key files:

*   **`.eleventy.js`** (Root directory): This is the master configuration file for the site build. It controls global behaviors, sets up the `eleventyNavigation` plugin responsible for parsing the front-matter arrays, and defines any global path passthrough copying (e.g., CSS and images).
*   **`src/_includes/base.njk`**: This Nunjucks template is the singular layout skeleton that wraps around your Markdown. When Eleventy compiles a page, it merges the compiled HTML string of your Markdown file directly into this template using `{{ content | safe }}`. It also handles the actual HTML markup loop that visually renders the navigation menu.
