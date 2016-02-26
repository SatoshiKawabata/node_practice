var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var crypto = require('crypto');
var ejs = require('ejs');

var index = fs.readFileSync('./fortune/fortune.ejs');
var form = fs.readFileSync('./fortune/form.ejs');

function escapeHtmlSpecialChar(html) {
  if (html === undefined) {
    return '';
  } else {
    html = html.replace(/&/g, '&amp;');
    html = html.replace(/</g, '&lt;');
    html = html.replace(/>/g, '&gt;');
    return html;
  }
};


