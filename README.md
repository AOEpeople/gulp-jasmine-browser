# gulp-jasmine-browser
[![Build Status](https://travis-ci.org/jasmine/gulp-jasmine-browser.svg?branch=master)](https://travis-ci.org/jasmine/gulp-jasmine-browser)

## Installing
`gulp-jasmine-browser` is available as an
[npm package](https://www.npmjs.com/package/gulp-jasmine-browser).

## Usage

### Create a Jasmine server to run specs in a browser

In `gulpfile.js`

```js
var gulp = require('gulp');
var jasmineBrowser = require('gulp-jasmine-browser');

gulp.task('jasmine', function() {
  return gulp.src(['src/**/*.js', 'spec/**/*_spec.js'])
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server());
});
```
In `gulp.src` include all files you need for testing other than jasmine itself.
This should include your spec files, and may also include your production JavaScript and
CSS files.

### Run jasmine tests headlessly

In `gulpfile.js`

```js
var gulp = require('gulp');
var jasmineBrowser = require('gulp-jasmine-browser');

gulp.task('jasmine-phantom', function() {
  return gulp.src(['src/**/*.js', 'spec/**/*_spec.js'])
    .pipe(jasmineBrowser.specRunner({console: true}))
    .pipe(jasmineBrowser.phantomjs());
});
```

Note the `{console: true}` passed into specRunner.

## Run jasmine tests and get xml report (JUNIT)

In `gulpfile.js`

```js
var gulp = require('gulp');
var jasmineBrowser = require('gulp-jasmine-browser');

gulp.task('jasmine-phantom', function() {
  return gulp.src(['src/**/*.js', 'spec/**/*_spec.js'])
    .pipe(jasmineBrowser.specRunner({xml: true}))
    .pipe(jasmineBrowser.phantomjs(xml: true, out: 'path/to/file.xml'));
});
```

Note the `{xml: true}` passed into specRunner and phantjomjs. With the out parameter you can decide where the output
shall be placed and how it shall be named (defaults to report.xml).


### Usage with Webpack

If you would like to compile your front end assets with Webpack, for example to use
commonjs style require statements, you can pipe the compiled assets into
GulpJasmineBrowser.

In `gulpfile.js`

```js
var gulp = require('gulp');
var jasmineBrowser = require('gulp-jasmine-browser');
var webpack = require('gulp-webpack');

gulp.task('jasmine', function() {
  return gulp.src('spec/**/*_spec.js'])
    .pipe(webpack({watch: true, output: {filename: 'spec.js'}}))
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server());
});
```

## Development
### Getting Started
The application requires the following external dependencies:
* [Node](https://nodejs.org/)
* [Gulp](http://gulpjs.com/)
* [PhantomJS](http://phantomjs.org/) - if you want to run tests with Phantom, see your options under 'Usage.'

The rest of the dependencies are handled through:
```bash
npm install
```

Run tests with:
```bash
npm test
```

(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.
