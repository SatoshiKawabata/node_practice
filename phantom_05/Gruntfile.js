module.exports = function(grunt) {
	var CONFIG = {
		origin : 'http://localhost/user.html',
		target : 'http://localhost/user.html',
		origin_local : 'http://localhost/www.gundam.info/',
		target_local : 'http://localhost/www.gundam2.info/',
		deploy_dir : 'test/',
		watch_path : "/Users/a13201/Downloads/",//us.sitesucker.mac.sitesucker/www.gundam2.info/",


		capture : function capture(targetUrl, out) {
			var cmd = 'phantomjs --disk-cache=false --load-images=true phantom/pageload.js ' + targetUrl + ' ' + out;
			return cmd;
		},
		compare : function(target, origin, out) {
			return 'compare -metric AE ' + target + ' ' + origin + ' ' + out;
		},

		har : function har(targetUrl, out) {
			var cmd = 'phantomjs --disk-cache=false --load-images=true phantom/netsniff.js ' + targetUrl + ' > ' + out;
			return cmd;
		},

		diff : function diff(target, origin) {
			return 'diff -u -w ' + origin + ' ' + target + ' | grep --line-buffered -e "onLoad"';
		}
	};

	grunt.initConfig({
		shell: {
			// キャプチャを撮る
	        capture_origin: {
	    		command: CONFIG.capture(
	    			CONFIG.origin, 
	    			CONFIG.deploy_dir +'origin.png')
	    	},
	    	capture_target : {
	    		command: CONFIG.capture(
	    			CONFIG.target, 
	    			CONFIG.deploy_dir +'target.png')
	    	},
	    	capture_local : {
	    		command: CONFIG.capture(
	    			CONFIG.target_local, 
	    			CONFIG.deploy_dir +'target_local.png')
	    	},
	    	// 元のサイトのキャプチャと比較
	        compare: {
	        	command: CONFIG.compare(
	        		CONFIG.deploy_dir + 'target.png', 
	        		CONFIG.deploy_dir + 'origin.png', 
	        		CONFIG.deploy_dir + 'diff.jpg')
	        },
	        compare_local: {
	        	command: CONFIG.compare(
	        		CONFIG.deploy_dir + 'target_local.png', 
	        		CONFIG.deploy_dir + 'origin.png', 
	        		CONFIG.deploy_dir + 'diff.jpg')
	        },
	        // 計測データを出力
	        har_origin: {
	        	command: CONFIG.har(
	        		CONFIG.origin, 
	        		CONFIG.deploy_dir + 'origin.har')
	        },
	        har_target: {
	        	command: CONFIG.har(
	        		CONFIG.target, 
	        		CONFIG.deploy_dir + 'target.har')
	        },
	        har_target_local: {
	        	command: CONFIG.har(
	        		CONFIG.target_local, 
	        		CONFIG.deploy_dir + 'target_local.har')
	        },
	        // 計測ファイルのdiffを出力
	        har_diff: {
	        	command: CONFIG.diff(
	        		CONFIG.deploy_dir + 'target.har', 
	        		CONFIG.deploy_dir + 'origin.har')
	        },
	        har_diff_local: {
	        	command: CONFIG.diff(
	        		CONFIG.deploy_dir + 'target_local.har', 
	        		CONFIG.deploy_dir + 'origin.har')
	        }
		},
		// ファイルを監視
		watch : {
		 	options : {
				livereload : true
			},
			// ソースに変更があればすぐさまローカル比較を行う
            watch_all: {
            	files : [CONFIG.watch_path + '**/*'],
            	tasks: [
	            	'shell:har_target_local',
					'shell:har_diff_local',
					'shell:capture_local',
					'shell:compare_local'
            	]
            }
        }
	});
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('origin', [
		'shell:capture_origin',
		'shell:har_origin'
	]);

	grunt.registerTask('compare', [
		'shell:har_target',
		'shell:har_diff',
		'shell:capture_target',
		'shell:compare'
	]);

	grunt.registerTask('compare_local', [
		'shell:har_target_local',
		'shell:har_diff_local',
		'shell:capture_local',
		'shell:compare_local'
	]);
};