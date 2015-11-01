module.exports = function(grunt) {
	// config
	grunt.initConfig({
		csso: {
			dist: {
				files: {
					'build/output.css': ['src/*.css']
				}
			}
		}
	});

	// plugin
	grunt.loadNpmTasks('grunt-csso');

	// task
	grunt.registerTask('default', 'csso');
}