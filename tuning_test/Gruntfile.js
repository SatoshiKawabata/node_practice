module.exports = function(grunt) {
	// config
	grunt.initConfig({
		// htmlから参照しているプロパティだけを抽出して一つのcssにまとめてくれる	
		uncss : {
			dist : {
				files : {
					'src/files/all.css' : ['src/index.html']
				}
			}
		},
		// cssを圧縮してくれる
		csso: {
			dist: {
				files: {
					'src/files/all.min.css': ['src/files/all.css']
				}
			}
		},
		// jsファイルを一つにまとめてくれる
		concat : {
			files : {
				// 元ファイル
				src : 'src/files/*.js',
				dest : 'src/files/all.js'
			}
		},
		// jsのタブインデント・改行を除き、難読化する。
		uglify : {
			dist : {
				files : {
					// src : 'src/files/all.js',
					// dest : 'src/files/all.min.js'
					'src/files/all.min.js' : [
						// ソース
						'src/files/all.js'
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
					'src/index.min.html' : 'src/index.html'
				}
			}
		}
	});

	// plugin
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-csso');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	// task
	grunt.registerTask('css_min', ["uncss", "csso"]);
	grunt.registerTask('js_min', ["concat", 'uglify']);
	grunt.registerTask('html_min', ['htmlmin']);
}