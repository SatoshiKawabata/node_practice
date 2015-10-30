module.exports = function(grunt) {
	// config
	grunt.initConfig({
		uncss : {
			dist : {
				files : {
					'src/test.css' : ['src/test.html']
				}
			}
		}
	});

	// plugin
	grunt.loadNpmTasks('grunt-uncss');

	// task
	grunt.registerTask('default', 'uncss');
}