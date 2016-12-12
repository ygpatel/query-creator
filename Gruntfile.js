module.exports = function(grunt) {
  var banner = '/*! <%= pkg.name %> - v<%= pkg.version %> - \n' +
    ' (c) <%= pkg.author %> - \n'+
    ' <%= pkg.repository.url %> - \n' +
    ' <%= grunt.template.today("yyyy-mm-dd") %> */\n',
    minBanner = banner.replace(/\n/g, '') + '\n';

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    minBanner: minBanner,

    recess: {
      options: {
        compile: true
      },

      slider: {
        src: ['src/querycreator.less'],
        dest: 'dist/querycreator.css'
      },

      min: {
        options: {
          compress: true,
          banner: '<%= minBanner %>'
        },
        src: ['dist/querycreator.css'],
        dest: 'dist/querycreator.min.css'
      }
    },

    uglify: {
      options: {
        report: 'min',
        banner: '<%= minBanner %>'
      },
      querycreator: {
        files: {
          'dist/querycreator.min.js': [
            'dist/querycreator.js'
          ]
        }
      }
    },

    ngtemplates: {
      app: {
        src: 'src/**.html',
        dest: 'temp/templates.js',
        options: {
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true, // Only if you don't use comment directives!
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          },
          module: 'qcModule',
          url: function(url) {
            return url.replace('src/', '');
          },
          bootstrap: function(module, script) {
            return 'module.run(function($templateCache) {\n' + script + '\n});';
          }
        }
      }
    },

    replace: {
      dist: {
        options: {
          patterns: [{
            match: /\/\*templateReplacement\*\//,
            replacement: '<%= grunt.file.read("temp/templates.js") %>'
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['src/querycreator.js'],
          dest: 'dist/'
        }]
      }
    },

    concat: {
      options: {
        stripBanners: true,
        banner: banner
      },
      js: {
        src: ['dist/querycreator.js'],
        dest: 'dist/querycreator.js'
      },
      css: {
        src: ['dist/querycreator.css'],
        dest: 'dist/querycreator.css'
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      querycreator: {
        files: [{
          'dist/querycreator.js': 'dist/querycreator.js'
        }, {
          expand: true,
          src: ['dist/querycreator.js']
        }]
      }
    },
    watch: {
      all: {
        files: ['dist/*', 'demo/*'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['src/*.js', 'src/*.html'],
        tasks: ['js']
      },
      less: {
        files: ['src/*.less'],
        tasks: ['css']
      },
      test: {
        files: ['src/*.js', 'tests/specs/**/*.js'],
        tasks: ['test']
      }
    },
    serve: {
      options: {
        port: 9000
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    copy: {
      copyToSass: {
        files: [
          {expand: false, src: ['dist/querycreator.css'], dest: 'dist/querycreator.scss'},
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['css', 'js']);
  grunt.registerTask('test', ['karma']);

  grunt.registerTask('css', ['recess','concat:css', 'copy:copyToSass']);
  grunt.registerTask('js', ['ngtemplates', 'replace','concat:js', 'ngAnnotate', 'uglify']);
};
