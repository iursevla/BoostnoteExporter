var system = require('system')
var page = require('webpage').create()
var fs = require('fs')
var os = require('system').os

console.log('Loading a web page', system.args);

page.open('https://www.google.pt', function (status) {
    //Page is loaded!
    page.render('github.png'); //Render the page to a png (we want to PDF)
    phantom.exit();
});
