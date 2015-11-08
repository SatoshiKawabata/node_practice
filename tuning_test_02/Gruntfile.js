module.exports = function(grunt) {
	var HTML_PATH = './src/index.html';
	grunt.initConfig({
		// htmlからcssを一つにまとめる
		uncss: {
			dist: {
				files: {
					'./src/files/all.css': [HTML_PATH]
				}
			}
		},
		// cssの圧縮
		csso: {
			dist: {
				files: {
					'./src/files/all.min.css': ['src/files/all.css']
				}
			}
		},
		// jsを一つにまとめる
		concat: {
			files: {
				src: [
					'./src/files/jquery.xdomainrequest.min.js',
					'./src/files/s.js',
					'./src/files/sdk.js',
					'./src/files/timeline.15ca66e7cea0d973c001aadc88ba3868.js',
					'./src/files/button.aec556e1a316f63b43fda3ae1e6a3e10.js',
					'./src/files/audio.min.js'
				],
				dest: './src/files/all.js'
			}
		},
		// jsを圧縮
		uglify: {
			dist : {
				files : {
					'./src/files/all.min.js' : [
						// ソース
						'./src/files/all.js'
					]
				}
			}
		},
		// htmlを圧縮
		htmlmin : {
			dist : {
				options : {
					removeComments : true,
					collapseWhitespace : false,
					minifyJS : true, // inlineのソースを圧縮
					minifyCSS : true // inlineのソースを圧縮
				},
				files : {
					'./src/index.min.html' : './src/index.html'
				}
			}
		},
		// ファイルを監視
		watch : {
		 	options : {
				livereload : true
			},
            watch_html : {
                files : ['./src/index.html', 'Gruntfile.js'],
                tasks : ['htmlmin']
            },
            watch_all: {
            	files : ['./src/**/*', 'Gruntfile.js'],
            	tasks: ['copy']
            }
        },
        // ファイルを指定フォルダにコピー
        copy: {
        	main: {
        		files : [
	        		{
		        		expand: true,
		        		cwd: './src/',
		        		src: ['**/*', '!js/**'],
		        		dest: '/Users/kawabatasatoshi/Dropbox/Public/'
		        	}
	        	]
        	}
        }
	});


	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-csso');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('css_uncss', ['uncss']);
	grunt.registerTask('css_csso', ['csso']);
	grunt.registerTask('js_concat', ['concat']);
	grunt.registerTask('js_uglify', ['uglify']);
	grunt.registerTask('html_min', ['htmlmin', 'watch']);

	grunt.registerTask('cp', ['copy']);
};