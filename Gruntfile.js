/*jshint camelcase: false */
/*global module:false */
module.exports = function(grunt) {

  grunt.initConfig({
    /*
      Watch files for changes.

      Changes in dependencies/ember.js or application javascript
      will trigger the neuter task.

      Changes to any templates will trigger the emberTemplates
      task (which writes a new compiled file into dependencies/)
      and then neuter all the files again.
    */
    watch: {
      less: {
        files: ['less/**/*.less'],
        tasks: ['less:development']
      }
    },

    less: {
      development: {
        options: {
          style: 'expanded'
        },
        files: {
          "css/styles.css": "less/styles.less"
        }
      },
      production: {
        options: {
          yuicompress: true
        },
        files: {
          "css/styles.css": "less/styles.less"
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('heroku', ['less:production']);

  /*
    Default task. Starts server, compiles templates, neuters application code, and begins
    watching for changes.
  */
  grunt.registerTask('default', ['less:development', 'watch']);
};