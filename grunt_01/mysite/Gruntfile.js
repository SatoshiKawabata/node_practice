module.exports = function(grunt) {
	// config
	grunt.initConfig({
		less : {
			build : {
				src: 'src/styles.less',
				dest: 'build/styles.css'
			}
		}
	});

	// plugin
	grunt.loadNpmTasks('grunt-contrib-less');

	// tasks
	grunt.registerTask('default', 'less');
};