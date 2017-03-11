module.exports = function(grunt){

    grunt.initConfig({

        jshint:{
            options:{
                sub:true
            },
            all:['client/src/js/controllers/*.js','client/src/js/services/*.js','client/src/js/app.js']
        },

        concat:{
            build:{
                files:{
                    'client/dist/js/app.js': ['client/src/js/app.js','client/src/js/controllers/*.js','client/src/js/services/*.js']
                }
            }
        },

        uglify:{
            build:{
                files:{
                    'client/dist/js/app.min.js' : ['client/dist/js/app.js']
                }
            }
        },

        cssmin:{
            build:{
                files:{
                    'client/dist/css/styles.min.css' : ['client/src/css/styles.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('build',['jshint','concat','uglify']);
}