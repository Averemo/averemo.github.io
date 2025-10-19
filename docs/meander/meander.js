/*
 * Simple navigation system for a static website.
 * by Phil Burk
 */
function getBase() {
    return window.location.hostname === 'localhost'
        ? '/~phil/averemo'
        : '';
}

function buildLink(url, text) {
    return '<li><a href="' + getBase() + url + '">' + text + '</a></li>';
}

function beginMenu() {
    return '<ul>'
}
function endMenu() {
    return '</ul>'
}

function buildTopMenus() {
    return beginMenu()
        + buildLink('/index.html', 'Home')
        + buildLink('/topics/', 'Topics')
        + buildLink('/about.html', 'About&nbsp;Us')
        + buildLink('/', '')
        + endMenu();
}

function buildBottomMenus() {
    return beginMenu()
        + buildLink('/index.html', 'Home')
        + buildLink('/about.html', 'About Us')
        + endMenu();
}

function header() {
    let topHTML = `
<div id="container">
<div id="header">
  <div id="leftheader">
      <a href="${getBase()}/"> <img src="${getBase()}/images/flag_cropped.png" style="width:30vw"></a>
  </div>
  <div id="rightheader">
    <h1>Averemo</h1>
    <h2>- shared truth -</h2>
  </div>
  <br class="clearfloat"/>
</div>
<!-- Navigation Bar ******************************** -->
<div id="topnav">
  ${buildTopMenus()}
</div>

<div id="content">
<!-- Begin Content DIV ******************************** -->
`;
    document.write(topHTML);
}

function footer() {
    let bottomHTML = `
<!-- end content div ******************************** -->
</div>

<div id="footer">
  <p class="copyright">(C) 2025 Averemo - All Rights Reserved</p>
</div>
<!-- end container div ******************************** -->
</div>
`;
    document.write(bottomHTML);
}
