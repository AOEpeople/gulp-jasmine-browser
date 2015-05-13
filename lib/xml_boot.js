(function() {
    function extend(destination, source) {
        for (var property in source) destination[property] = source[property];
        return destination;
    }

    var env = jasmine.getEnv();
    var jasmineInterface = jasmineRequire.interface(jasmine, env);

    extend(window, jasmineInterface);

    env.addReporter(new jasmine.JUnitXmlReporter(
        '..',
        null,
        null,
        null,
        false,
        callPhantom
    ));

    var currentWindowOnload = window.onload;
    window.onload = function() {
        if (currentWindowOnload) {
            currentWindowOnload();
        }
        env.execute();
    };
})();
