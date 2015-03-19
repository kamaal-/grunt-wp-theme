module.exports = function( grunt ) {

	'use strict';

	// Project configuration
	grunt.initConfig( {

		pkg : grunt.file.readJSON( 'package.json' ),

		public : 'assets/public/',

		// sass compile
		{% if ('sass' === css_preprocessor) { %}
		compass : {
			compilesass : {
				options : {
					config : 'config.rb',
					environment : 'development',
					force : grunt.option('force') || false,
					outputStyle : 'expanded'
				}
			}
		},
		{% } %}


		// css comb
		csscomb : {
			distribute : {
				expand : true,
				'assets/public/css/app.css': ['src/css/main.css']
			}
		},


		// copy font awesom
		{% if ('y' === fontawesome) { %}
		copy : {
			fonts : {
				expand : true,
				cwd : '',
				src: 'src/vendor/font-awesome/fonts/*',
				dest: 'assets/public/fonts/',
				flatten: true,
				filter: 'isFile'
			}
		},
		{% } %}

		//css minification
		cssmin : {
			distribute : {
				files : {
					'assets/public/css/app.min.css' : ['assets/public/css/app.css']
				}
			},
			//create wordpress style.css
			wordpressStyle : {
				options : {
					banner : '/*\n'+
							 ' * ﷽ \n' +
							 ' *\n'+
							 ' * Time: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
							 ' * Theme Name: {% title %}\n' +
							 ' * Theme URI: {% homepage %}\n' +
							 ' * Author: {% author_name %}\n' +
							 ' * Author URI: {% author_url %}\n' +
							 ' * Description: {% title %} {% description %}' +
							 ' * Version: {% version %} \n' +
							 ' * Copyright: <%= grunt.template.today("yyyy") %> {% author_name %} <{% author_email %}> Licensed: {% license %} \n' +
							 ' * Tags: No tags \n' +
							 ' * http://www.apache.org/licenses/LICENSE-2.0 \n' +
							 ' */ \n'
				},
	        	files : {
	          		'style.css': ['assets/public/css/empty.css']
	        	}
			} 
		},

		//js hint
		jshint : {
			client : {
	        	options : {
	          		unused : false,
	          		reporter : require('jshint-stylish')
	        	},
        		directives : {
	          		browser : true,
	          		sloppy : true,
	          		predef : [
		            	'Modernizr',
		            	'console'
	          		],
          			nomen : false
        		},
				all : [
					'assets/public/js/*.js',
					{% if ('sass' === js_test) { %}
					'assets/test/js/*.js',
					{% } %}
					'assets/admin/js/*.js'
				],
			},
			grunt : {
				all : [
					'Gruntfile.js'
				],
				options : {
					jshintrc : '.gruntjshintrc'
				}
			}

		},


		//js test 
		{% if ('y' === js_test) { %}
		test :   {
			files : ['assets/test/js/*.js']
		},
		{% } %}

		uglify : {
			options : {
				banner : '/*! ﷽ \n' +
						 ' * Author: Kamaal Aboothalib\n' +
						 ' * Author URI: http://kamaal.me\n' +
						 ' * <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd h:MM:ss") %> */\n',
				compress : {
					drop_console : false
				}
			},

			build : {
				src : [
					'src/js/plugins.js',
					'src/js/app.js'
				],
				dest: 'assets/public/js/app.min.js'
			}
		},

		watch : {
			// sass
			{% if ('sass' === css_preprocessor) { %}
			sass : {
				files : [
					'src/sass/*.scss',
					'src/sass/base/*.scss',
					'src/sass/layouts/*.scss',
					'src/sass/modules/*.scss'
				],
				tasks : [ 'compass', 'csscomb', 'copy', 'cssmin'],
				options: {
					debounceDelay: 500,
					livereload: false
				}
			}
			{% } %}

			scripts : {
				files : [
					'src/js/*.js'
				],
				tasks : ['jshint', 'uglify'],
				options: {
					debounceDelay: 700,
					livereload: false
				}
			}

    	}

	} );

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['jshint']);
  	grunt.registerTask('test', 'jshint');

};