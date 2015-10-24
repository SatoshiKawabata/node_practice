module.exports = function(grunt) {
	// config
	/*
task : { // pluginの名前になる
	target1 : { // 名前は自由
		src : ...,
		dest : ...
	},
	target2 : { 
		files : {
			'des' : 'src'
		}
	},
}
	*/
	grunt.initConfig({
		
		pkg : grunt.file.readJSON('package.json'),

		less : {
			// options : {
			// 	compress : true
			// },
			build : {
				src : 'src/styles.less',
				dest : 'build/styles.css'
			}
		},
		csslint : {
			check : {
				// src : 'build/styles.css'
				src : '<%= less.build.dest %>'
			}
		},
		cssmin : {
			minimize : {
				options : {
					banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
				},
				files : {
					'build/styles.min.css' : '<%= less.build.dest %>'
				}
			}
		},
		uglify : {
			build : {
				files : {
					'build/test.min.js' : 'src/test.js'
				}
			}
		},
		watch : {
			options : {
				livereload : true
			},
			watch_css : {
				files : 'src/*.less',
				tasks : ['less', 'csslint', 'cssmin']
			},
			watch_js : {
				files : 'src/*.js',
				tasks : ['uglify']
			}
		},
		connect : {
			server : {
				options : {
					port : 8888,
					hostname : '172.19.40.78'
				}
			}
		}
	});
	// plugin
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');

	// task
	grunt.registerTask('default', ['less', 'csslint', 'cssmin', 'connect', 'watch:watch_css']); // 'default'オプションで実行した時に、'less'というコマンドが実行される
	grunt.registerTask('minimize_js', ['uglify', 'watch:watch_js']);
};