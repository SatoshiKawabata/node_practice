module.exports = function(grunt) {
	var ORIGIN_URL = 'http://localhost/index.html';
	// var ORIGIN_URL = 'https://dl.dropboxusercontent.com/u/20443672/index.html';//'http://localhost/index.html';
	var TEST_URL = 'http://localhost/index.min.html';
	// var TEST_URL = 'https://dl.dropboxusercontent.com/u/20443672/index.min.html';//'http://localhost/index.min.html';
	var TEST_DIR = 'test/';
	var CMD_PHANTOM = 'phantomjs phantom/pageload.js ';
	var CMD_COMPARE = 'compare -metric AE ' + TEST_DIR + 'target.png ' + TEST_DIR + 'origin.png ' + TEST_DIR + 'diff.jpg';
	var CMD_LOADSPEED = 'phantomjs phantom/loadspeed.js ';

    grunt.loadNpmTasks('grunt-shell');

	grunt.initConfig({
	    shell: {
	    	// 元のサイトの速度を計測
	    	loadorigin : {
	    		command: CMD_LOADSPEED + ORIGIN_URL
	    	},
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
	    }
	});

	grunt.registerTask('default', [
		'shell:phantom', 
		'shell:compare'
	]);
	grunt.registerTask('origin', [
		// 'shell:loadorigin', 
		'shell:origin'
	]);


};
