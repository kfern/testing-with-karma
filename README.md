# testing-with-karma

## Instalar Karma con Chrome, mocha, chai, fixtures, coverage

npm i --save-dev karma karma-chrome-launcher karma-fixture karma-html2js-preprocessor karma-coverage chai mocha karma-chai karma-mocha

## Crear el archivo de configuración karma.conf.js

./node_modules/.bin/karma init karma.conf.js

El resultado final ha de quedar:

```
// Karma configuration
module.exports = function (config) {

  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'fixture'],

    // list of files / patterns to load in the browser
    files: [
      'test/fixtures/**/*.html',
      'src/**/*.js',
      'test/**/*.spec.js'
    ],

    client: {
      chai: {
        includeStack: true
      },
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      }
    },

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/fixtures/**/*.html': ['html2js'],
      'src/**/*.js': ['coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // optionally, configure the coverage reporter 
    coverageReporter: {
      reporters: [
        {
          type: 'text-summary'
        },
        {
          type: 'html',
          dir: 'coverage/'
        }
      ]
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
```

## Test de un plugin jquery

Instalar jquery en el proyecto. En este caso se instala una versión inferior a la 2

```
npm i --save-dev jquery@">1.12.0 <2.0.0"
```

Modificar el apartado files en karma.conf.js para cargar jquery en el contexto del navegador. 

```
    // list of files / patterns to load in the browser
    files: [
      'node_modules/jquery/dist/jquery.js',
      'test/fixtures/**/*.html',
      'src/**/*.js',
      'test/**/*.spec.js'
    ],    
```
    
Es el equivalente a incluir en el html una referencia a un recurso externo mediante el tag script

Para realizar las pruebas: 

Añadir en el proyecto:
El archivo html en test/fixtures/index.html
Los scripts propios usados en el proyecto en src/
Los tests en test/ con el patrón *.spec.js (Por ejemplo, main.spec.js)

Ejecutar los tests:

```
npm test

> testing-with-karma@1.0.0 test testing-with-karma
> karma start karma.conf.js

INFO [karma]: Karma v1.7.1 server started at http://0.0.0.0:9876/
INFO [launcher]: Launching browser ChromeHeadless with unlimited concurrency
INFO [launcher]: Starting browser ChromeHeadless
INFO [HeadlessChrome 0.0.0 (Windows 7 0.0.0)]: Connected on socket -2J_dLZVQAAzD1bvAAAA with id 75772197
HeadlessChrome 0.0.0 (Windows 7 0.0.0): Executed 4 of 4 SUCCESS (0.067 secs / 0.047 secs)

=============================== Coverage summary ===============================
Statements   : 100% ( 13/13 )
Branches     : 100% ( 6/6 )
Functions    : 100% ( 5/5 )
Lines        : 100% ( 13/13 )
================================================================================
```
El resultado muestra que se han pasado correctamente todos los tests y que además cubren la totalidad del código fuente del proyecto.