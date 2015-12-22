module.exports = function(grunt) {
	grunt.initConfig({
		image: {
		  static: {
		    options: {
		      pngquant: true,
		      optipng: true,
		      zopflipng: true,
		      advpng: true,
		      jpegRecompress: false,
		      jpegoptim: true,
		      mozjpeg: true,
		      gifsicle: true,
		      svgo: true
		    },
		    files: {
		      // 'dist/img.png': 'src/*.png',
		      // 'dist/img.jpg': 'src/*.jpg',
		      // 'dist/img.gif': 'src/*.gif',
		      // 'dist/img.svg': 'src/*.svg'
		    }
		  },
		  dynamic: {
		    files: [{
		      expand: true,
		      cwd: 'src/',
		      src: ['**/*.{png,jpg,gif,svg}'],
		      dest: 'dist/'
		    }]
		  }
		}
	});

	grunt.loadNpmTasks('grunt-image');

	grunt.registerTask('default', ['image']);
};