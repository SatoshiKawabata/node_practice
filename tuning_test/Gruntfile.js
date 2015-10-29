module.exports = function(grunt) {
	// config
	grunt.initConfig({
		uncss : {
			dist : {
				"src/滋賀県立膳所高等学校_files/960_16.css" : ["src/滋賀県立膳所高等学校.html"]
			}
		}
	});

	// plugin
	grunt.loadNpmTasks('grunt-uncss');

	// task
	grunt.registerTask('default', "uncss");
}