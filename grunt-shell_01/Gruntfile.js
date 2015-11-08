module.exports = function(grunt) {
	var CMD = 'phantomjs pageload.js http://localhost/phantom_imagemagick_01/origin/%E3%83%92%E3%82%9A%E3%82%AF%E3%82%99%E3%83%95%E3%82%99%E3%83%AC%E3%82%A4%E3%83%95%E3%82%99%20_%20%E8%87%AA%E5%88%86%E3%81%9D%E3%81%A3%E3%81%8F%E3%82%8A%E3%82%A2%E3%83%8F%E3%82%99%E3%82%BF%E3%83%BC%E3%81%A6%E3%82%99%E3%80%81%E4%BB%B2%E9%96%93%E3%81%A8%E5%86%92%E9%99%BA%E3%81%99%E3%82%8BMORPG.html';
	var CMD2 = 'compare -metric AE page.png origin.png diff.jpg';

    grunt.loadNpmTasks('grunt-shell');

	grunt.initConfig({
	    shell: {
	        phantom: {
	            command: CMD
	        },
	        compare: {
	        	command: CMD2
	        }
	    }
	});

	grunt.registerTask('default', ['shell']);
	grunt.registerTask('phantom', function() {
		var exec = require('child_process').exec;

		var done = this.async();
		var command = CMD;
		var options = {
			timeout: 10000
		};
		var callback = function(err, stdout, stderr) {
			console.log(stdout);
			done();
			console.log('complete');
		};

		exec(command, options, callback);
	});
};