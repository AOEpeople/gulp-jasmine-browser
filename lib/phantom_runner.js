var system = require('system');
var webPage = require('webpage');
var args = system.args;

var port = args[1] || 8888;
var xml  = args[2];

var page = webPage.create();
page.onConsoleMessage = function(message) {
  if (xml === 'undefined') {
    system.stdout.write(message);
  }
};
page.onCallback = function(success) {
  if (xml !== 'undefined') {
    // get the exposed xml report from phantomjs
    var xmlReport = page.evaluate(function() {
        return window.xml;
    });

    system.stdout.write(xmlReport);
  }

  phantom.exit(success ? 0 : 1);
};

page.open('http://localhost:' + port);
