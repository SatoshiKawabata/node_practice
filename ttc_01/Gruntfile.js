module.exports = function(grunt) {

	var ORIGIN_URL = 'http://52.69.98.198/test/';
	var TEST_URL = 'http://52.192.174.15/test/index.min.html';
	var TEST_URL_LOCAL = 'http://itpro.nikkeibp.co.jp/article/COLUMN/20060227/230844/';//'http://localhost/src/index.min.html';
	var TEST_DIR = 'test/';
	function compare(target, origin, out) {
		return 'compare -metric AE ' + target + ' ' + origin + ' ' + out;
	}
	function capture(targetUrl) {
		var cmd = 'phantomjs --disk-cache=false --load-images=true phantom/pageload.js ' + targetUrl + ' ';
		return cmd;
	}
	function har(targetUrl) {
		var cmd = 'phantomjs --disk-cache=false --load-images=true phantom/netsniff.js ' + targetUrl + ' > ' + TEST_DIR;
		return cmd;
	}
	function diff(target, origin) {
		return 'diff -u -w ' + origin + ' ' + target + ' | grep --line-buffered -e "onLoad"'
	}

	grunt.initConfig({
		shell: {
	        // 元のサイトのキャプチャを撮る
	        origin: {
	    		command: capture(ORIGIN_URL) + 'origin'
	    	},
	    	// テスト用のサイトのキャプチャを撮る
	        phantom: {
	        	command: capture(TEST_URL) + 'target'
	        },
	        // テスト用のサイトのキャプチャを撮る
	        phantom_local: {
	        	command: capture(TEST_URL_LOCAL) + 'target_local'
	        },
	        // 元のサイトのキャプチャと比較
	        compare: {
	        	// command: CMD_COMPARE
	        	command: compare(TEST_DIR + 'target.png', TEST_DIR + 'origin.png', TEST_DIR + 'diff.jpg')
	        },
	        compare_local: {
	        	// command: CMD_COMPARE
	        	command: compare(TEST_DIR + 'target_local.png', TEST_DIR + 'origin.png', TEST_DIR + 'diff_local.jpg')
	        },
	        har_origin: {
	        	command: har(ORIGIN_URL) + 'origin.har'
	        },
	        har_test: {
	        	command: har(TEST_URL) + 'target.har'
	        },
	        har_test_local: {
	        	command: har(TEST_URL_LOCAL) + 'target_local.har'
	        },
	        har_diff: {
	        	command: diff(TEST_DIR + 'target.har', TEST_DIR + 'origin.har')
	        }
	    },
	    // htmlからcssを一つにまとめる
		uncss: {
			dist: {
				files: {
					'./src/css/all.css': ['./src/index_complete.html']
				}
			}
		},
		// cssの圧縮
		csso: {
			dist: {
				files: {
					'./src/css/all.min.css': ['./src/css/all.css']
				}
			}
		},
		// jsを一つにまとめる
		concat: {
			files: {
				src: [
					'./src/js/tms-0.4.x.js',
					'./src/js/uCarausel.js',
					'./src/js/jquery.tools.min.js',
					'./src/js/jquery.jqtransform.js',
					'./src/js/jquery.snippet.min.js',
					'./src/js/jquery.cycle.all.min.js',
					'./src/js/jquery.cookie.js',
				],
				dest: './src/js/depend.js'
			}
		},
		// jsを圧縮
		uglify: {
			dist : {
				files : {
					'./src/js/all.min.js' : [
						// ソース
						'./src/js/script.js'
					]
				}
			}
		},
		// htmlを圧縮
		htmlmin : {
			dist : {
				options : {
					removeComments : true,
					collapseWhitespace : true,
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


	grunt.registerTask('origin', [
		'shell:origin',
		'shell:har_origin'
	]);
	grunt.registerTask('test', [
		'shell:phantom',
		'shell:compare',
		'shell:har_test',
		'shell:har_diff'
	]);

	grunt.registerTask('test_local', [
		'shell:phantom_local',
		// 'shell:compare_local',
		'shell:har_test_local',
		// 'shell:har_diff'
	]);
	grunt.registerTask('css_uncss', ['uncss']);
	grunt.registerTask('css_csso', ['csso']);
	grunt.registerTask('js_concat', ['concat']);
	grunt.registerTask('js_uglify', ['uglify']);
	grunt.registerTask('html_min', ['htmlmin', 'watch']);
};