# testing-with-karma

## Instalar Karma con Chrome, qunit, fixtures, coverage

npm i --save-dev karma karma-chrome-launcher karma-fixture karma-html2js-preprocessor karma-coverage

npm i --save-dev qunitjs karma-qunit

## Crear el archivo de configuración karma.conf.js

./node_modules/.bin/karma init karma.conf.js

El resultado final ha de quedar:

```

// Karma configuration
module.exports = function(config) {
    
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['qunit', 'fixture'],

    // list of files / patterns to load in the browser
    files: [
      'src/index.html',
      'src/**/*.js',
      'test/**/*.spec.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
         'src/index.html': ['html2js'],
         'src/**/*.js': ['coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // optionally, configure the coverage reporter 
    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/'
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

## Comprobar si de momento va todo bien

```
npm test
```

```

WARN [watcher]: Pattern "[...]/testing-with-karma/src/index.html" does not match any file.
WARN [watcher]: Pattern "[...]/testing-with-karma/src/**/*.js" does not match any file.
WARN [watcher]: Pattern "[...]/testing-with-karma/test/**/*.spec.js" does not match any file.
INFO [karma]: Karma v1.7.1 server started at http://0.0.0.0:9876/
INFO [launcher]: Launching browser ChromeHeadless with unlimited concurrency
INFO [launcher]: Starting browser ChromeHeadless
INFO [HeadlessChrome 0.0.0 (Linux 0.0.0)]: Connected on socket xCRw-J-ufasm9oExAAAA with id 76224472
HeadlessChrome 0.0.0 (Linux 0.0.0): Executed 0 of 0 ERROR (0.002 secs / 0 secs)
npm ERR! Test failed.  See above for more details.

```

El resultado es el esperado ya que Karma está funcionando pero aún no se han incluido los archivos con el código ni los tests

## Test de un plugin jquery

Instalar jquery en el proyecto. En este caso se instala una versión inferior a la 2

```
npm i --save-dev jquery@">1.12.0 <2.0.0"
```

Modificar el apartado files en karma.conf.js para cargar jquery en el contexto del navegador. 

```

    // list of files / patterns to load in the browser
    files: [
      'src/index.html',
      'node_modules/jquery/dist/jquery.js',
      'src/**/*.js',
      'test/**/*.spec.js'
    ],
    
```
    
Es el equivalente a incluir en el html una referencia a un recurso externo mediante el tag script

Para realizar las pruebas: 

Añadir en el proyecto:
El archivo html src/index.html
Los scripts propios usados en el proyecto en src/
Los tests en test/ con el patrón *.spec.js (Por ejemplo, main.spec.js)

Ejecutar los tests:

```
npm test
```

