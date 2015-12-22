module.exports = function(grunt) {

	var CONFIG = {
		src_path : "/Users/a13201/Downloads/us.sitesucker.mac.sitesucker/www.gundam2.info/",
		
		src : function(path) {
			return this.src_path + path;
		}
	};

	var uncssFiles = {};
	uncssFiles[CONFIG.src('css/all.css')] = [CONFIG.src('index_complete.html')];

	var cssoFiles = {};
	cssoFiles[CONFIG.src('css/all.min.css')] = [CONFIG.src('icss/all.css')];

	var uglifyFiles = {};
	uglifyFiles[CONFIG.src('js/all.min.js')] = [CONFIG.src('js/all.js')];

	var htmlMinFiles = {};
	htmlMinFiles[CONFIG.src('index.min.html')] = [CONFIG.src('index.html')];


	grunt.initConfig({
		 // htmlからcssを一つにまとめる
		uncss: {
			dist: {
				files: uncssFiles
			}
		},
		// cssの圧縮
		csso: {
			dist: {
				files: cssoFiles
			}
		},
		// jsを一つにまとめる
		concat: {
			files: {
				src: [
					CONFIG.src('js/tms-0.4.x.js'),
					CONFIG.src('js/uCarausel.js'),
					CONFIG.src('js/jquery.tools.min.js'),
					CONFIG.src('js/jquery.jqtransform.js'),
					CONFIG.src('js/jquery.snippet.min.js'),
					CONFIG.src('js/jquery.cycle.all.min.js'),
					CONFIG.src('js/jquery.cookie.js')
				],
				dest: CONFIG.src('js/depend.js')
			}
		},
		// jsを圧縮
		uglify: {
			dist : {
				files : uglifyFiles
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
				files : htmlMinFiles
			}
		},
		// ファイルを監視
		watch : {
		 	options : {
				livereload : true
			},
            watch_html : {
                files : [CONFIG.src('index.html')],
                tasks : ['htmlmin']
            },
            watch_css: {
            	files: [CONFIG.src('css/**/*')],
            	tasks: ['csso']
            }
        }
	});
	

	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-csso');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	
	grunt.registerTask('css_uncss', ['uncss']);
	grunt.registerTask('css_csso', ['csso']);
	grunt.registerTask('js_concat', ['concat']);
	grunt.registerTask('js_uglify', ['uglify']);
	grunt.registerTask('html_min', ['htmlmin', 'watch']);
};