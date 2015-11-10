module.exports = function(grunt) {
	var ORIGIN_URL = 'http://localhost/index.html';
	var TEST_URL = 'http://localhost/index.min.html';
	var TEST_DIR = 'test/';
	var CMD_COMPARE = 'compare -metric AE ' + TEST_DIR + 'target.png ' + TEST_DIR + 'origin.png ' + TEST_DIR + 'diff.jpg';
	var CMD_PHANTOM = 'phantomjs --disk-cache=false phantom/pageload.js ';

	var HTML_PATH = './src/index.html';

	grunt.initConfig({
	    shell: {
	        // 元のサイトのキャプチャを撮る
	        origin: {
	    		command: CMD_PHANTOM + ORIGIN_URL + ' origin'
	    	},
	    	// テスト用のサイトのキャプチャを撮る
	        phantom: {
	            command: CMD_PHANTOM + TEST_URL + ' target'
	        },
	        // 元のサイトのキャプチャと比較
	        compare: {
	        	command: CMD_COMPARE
	        }
	    },
	    // htmlからcssを一つにまとめる
		uncss: {
			dist: {
				files: {
					'./src/common/css/all.css': ['./src/index_complete.html']
				}
			}
		},
		// cssの圧縮
		csso: {
			dist: {
				files: {
					'./src/common/css/all.min.css': ['./src/common/css/all.css']
				}
			}
		},
		// jsを一つにまとめる
		concat: {
			files: {
				src: [
					'./src/common/js/jquery-2.1.4.min.js',
					'./src/common/js/jquery.bxslider.min.js',
					'./src/common/js/masonry.pkgd.min.js',
					// './src/common/js/ui.js'
				],
				dest: './src/common/js/all.js'
			}
		},
		// jsを圧縮
		uglify: {
			dist : {
				files : {
					'./src/common/js/all.min.js' : [
						// ソース
						'./src/common/js/all.js'
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
            watch_css: {
            	files: ['./src/common/css/*'],
            	tasks: ['csso']
            },
            watch_all: {
            	files : ['./src/**/*', 'Gruntfile.js'],
            	tasks: [
	            	'shell:phantom',
					'shell:compare'
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

	grunt.registerTask('test', [
		'shell:phantom',
		'shell:compare'
	]);
	grunt.registerTask('origin', [
		'shell:origin'
	]);

	grunt.registerTask('css_uncss', ['uncss']);
	grunt.registerTask('css_csso', ['csso']);
	grunt.registerTask('js_concat', ['concat']);
	grunt.registerTask('js_uglify', ['uglify']);
	grunt.registerTask('html_min', ['htmlmin', 'watch']);
};