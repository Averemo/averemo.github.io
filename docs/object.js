function getBase() {
    return window.location.hostname === 'localhost'
        ? '/~phil/averemo'
        : '';
}

function buildLink(url, text) {
    return '<a href="' + getBase() + url + '">' + text + '</a>';
}
function testMenus() {

    document.write(buildLink('/index.html', 'Home'))
    document.write('&nbsp;|&nbsp')
    document.write(buildLink('/test.html', 'Constitution'))
    document.write('&nbsp;|&nbsp')
    document.write(buildLink('/topics/elfraud.html', 'Election Fraud'))
}
