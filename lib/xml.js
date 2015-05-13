function getJasmineRequireObj() {
  if (typeof module !== 'undefined' && module.exports) {
    return exports;
  } else {
    window.jasmineRequire = window.jasmineRequire || {};
    return window.jasmineRequire;
  }
}

getJasmineRequireObj().console = function(jRequire, j$) {
  j$.XmlReporter = jRequire.XmlReporter();
};

getJasmineRequireObj().XmlReporter = function() {

  var noopTimer = {
    start: function(){},
    elapsed: function(){ return 0; }
  };

  function XmlReporter(options) {
    var print = options.print,
        showColors = options.showColors || false,
        onComplete = options.onComplete || function() {},
        timer = options.timer || noopTimer,
        specCount,
        failureCount,
        failedSpecs = [],
        pendingCount,
        passedCount,
        ansi = {
          green: '\x1B[32m',
          red: '\x1B[31m',
          yellow: '\x1B[33m',
          none: '\x1B[0m'
        },
        failedSuites = [],
        xml = '<?xml version="1.0" encoding="UTF-8"?><testsuite name="%name%" failures="%failures%" tests="%testnumber%" time="%time%">';

    // done
    this.jasmineStarted = function() {
      specCount = 0;
      failureCount = 0;
      pendingCount = 0;
      timer.start();
    };

    this.jasmineDone = function() {
      xml = xml
        .replace('%failures%', failureCount)
        .replace('%testnumber%', specCount)
        .replace('%time%', timer.elapsed() / 1000)
        .replace('%name%', 'jasmine');

      xml += '</testsuite>';

      window.xml = xml;

      onComplete(failureCount === 0);

    };

    // done
    this.specDone = function(result) {
      // properties on result: id|description|fullName|failedExpectations|passedExpectations|pendingReason|status
      specCount++;

      if (result.status == 'pending') {
        pendingCount++;

        xml += sprintf('<testcase name="%s" status="%s" />', result.fullName, result.status);
        return;
      }

      if (result.status == 'passed') {
        passedCount++;

        xml += sprintf('<testcase name="%s" status="%s" />', result.fullName, result.status);
        return;
      }

      if (result.status == 'failed') {
        failureCount++;

        xml += sprintf('<testcase name="%s" status="%s">', result.fullName, result.status);
        for (var i = 0; i < result.failedExpectations.length; i++) {
          var failedExpectation = result.failedExpectations[i];
          // properties on failedExpectation: matcherName|message|stack|passed|expected|actual

          xml += sprintf('<failure><![CDATA[%s]]></failure>', failedExpectation.message);
        }
        xml += '</testcase>';

        failedSpecs.push(result);
      }
    };

    // done
    this.suiteDone = function(result) {
      if (result.failedExpectations && result.failedExpectations.length > 0) {
        failureCount++;
        failedSuites.push(result);
      }
    };

    return this;

    function sprintf(){
      var args = Array.prototype.slice.call(arguments);
      return args.shift().replace(/%s/g, function(){
        return args.shift();
      });
    }
  }

  return XmlReporter;
};
