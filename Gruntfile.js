module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	uglify: {
		options: {
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		build: {
			src: ['public/js/misc/<%= pkg.name %>.js'],
			dest: 'build/<%= pkg.name %>.min.js'
		},
		min: {
	        	src: ['public/js/misc/<%= pkg.name %>.js'],
		        dest: 'build/<%= pkg.name %>-min.js'
		}

	},
	dust: {
		defaults: {
			files: {
		            "dst/default/views.js": "src/**/*.dust"
			},
		},

		many_targets: {
		        files: [
			      {
			              expand: true,
			              cwd: "./",
			              src: ["**/*.dust"],
			              dest: "public/js/dust",
			              ext: ".js"
			      }
			],
			options: {
				relative: true,
				amd: false
				
			}
		 }
	}
});

// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-uglify');

//Dust compilation
grunt.loadNpmTasks('grunt-dust');

// Default task(s).
grunt.registerTask('default', ['uglify','dust']);

grunt.registerTask('build', ['uglify','dust']);

//Dust compilation
//grunt.loadNpmTasks('grunt-dust');


};
