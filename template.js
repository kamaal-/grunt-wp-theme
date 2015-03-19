/**
 * grunt-wp-theme
 * http://kamaal.me
 *
 * Copyright (c) 2015 Kamaal Aboothalib, 10up
 * Licensed under the MIT License
 */
 'use strict';

 // Basic template description
exports.description = 'Create a WP theme.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after the question prompts.
exports.after = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template
exports.template = function( grunt, init, done ) {

	init.process( {}, [
		// Prompt for these values.
		init.prompt( 'title', 'Elephas' ),
		{
			name   : 'prefix',
			message: 'PHP function prefix (alpha and underscore characters only)',
			default: 'elephas'
		},
		init.prompt( 'description', 'The best WordPress theme ever made!' ),
		init.prompt( 'homepage', 'http://kamaal.me' ),

		init.prompt( 'author_name' ),
		init.prompt( 'author_email' ),
		init.prompt( 'author_url', 'http://kamaal.me' ),
		init.prompt( 'license', 'Licensed under the MIT License' ),
		{
			name: 'css_preprocessor',
			message: 'CSS Preprocessor: Will you use "Sass", "LESS", or "none" for CSS with this project?',
			default: 'Sass'
		},
		{
			name: 'dependancy',
			message : 'CSS Framework: Will you use "Bootstrap (b)", "Foundation (f)", "Bourboun (br)" or "Jeet (j)" ?',
			default: 'b'
		},
		{
			name: 'js_test',
			message: 'Test your js? yes or no',
			default: 'no'
		},
		{
			name: 'fontawesome',
			message: 'Fontawesome? yes or no',
			default: 'no'
		}
	], function( err, props ) {
		props.keywords = [];
		props.version = '0.1.0';
		props.devDependencies = {
			'grunt': '~0.4.5',
			'matchdep': '~0.1.2',
			'grunt-contrib-concat': '~0.5.0',
			'grunt-contrib-uglify': '~0.6.0',
			'grunt-contrib-cssmin': '~0.10.0',
			'grunt-contrib-jshint': '~0.10.0',
			'grunt-contrib-nodeunit': '~0.4.1',
			'grunt-contrib-watch': '~0.6.1',
		};

		// Sanitize names where we need to for PHP/JS
		props.name = props.title.replace( /\s+/g, '-' ).toLowerCase();
		// Development prefix (i.e. to prefix PHP function names, variables)
		props.prefix = props.prefix.replace('/[^a-z_]/i', '').toLowerCase();
		// Development prefix in all caps (e.g. for constants)
		props.prefix_caps = props.prefix.toUpperCase();
		// An additional value, safe to use as a JavaScript identifier.
		props.js_safe_name = props.name.replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
		// An additional value that won't conflict with NodeUnit unit tests.
		props.js_test_safe_name = props.js_safe_name === 'test' ? 'myTest' : props.js_safe_name;
		props.js_safe_name_caps = props.js_safe_name.toUpperCase();

		// Files to copy and process
		var files = init.filesToCopy( props );

		switch( props.css_preprocessor.toLowerCase()[0] ) {
			case 'l':
				delete files[ 'assets/css/sass/' + props.js_safe_name + '.scss'];
				delete files[ 'assets/css/src/' + props.js_safe_name + '.css' ];

				props.devDependencies["grunt-contrib-less"] = "~0.11.2";
				props.css_preprocessor = 'less';
				break;
			case 'n':
			case undefined:
				delete files[ 'assets/css/less/' + props.js_safe_name + '.less'];
				delete files[ 'assets/css/sass/' + props.js_safe_name + '.scss'];

				props.css_preprocessor = 'none';
				break;
			// SASS is the default
			default:
				delete files[ 'assets/css/less/' + props.js_safe_name + '.less'];
				delete files[ 'assets/css/src/' + props.js_safe_name + '.css' ];

				props.devDependencies["grunt-contrib-sass"] = "~0.8.0";
				props.css_preprocessor = 'sass';
				break;
		}

		switch( props.dependancy.toLowerCase()[0] ) {
			case 'b':
				if('yes' === props.fontawesome){
					props.dependancy = '"bootstrap-sass": "^3.3.3", "font-awesome": "^4.3.0"';
				}else{
					props.dependancy = '"bootstrap-sass": "^3.3.3"';
				}
				break;

			case 'f':

				if('yes' === props.fontawesome){
					props.dependancy = '"foundation": "^5.5.1", "font-awesome": "^4.3.0"';
				}else{
					props.dependancy = '"foundation": "^5.5.1"';
				}
				
				break;

			case 'br':

				if('yes' === props.fontawesome){
					props.dependancy = '"bourbon": "^4.2.1", "neat": "^1.7.2", "font-awesome": "^4.3.0"';
				}else{
					props.dependancy = '"bourbon": "^4.2.1", "neat": "^1.7.2"';
				}
				
				break;

			case 'j':

				if('yes' === props.fontawesome){
					props.dependancy = '"jeet": "^6.1.2", "neat": "^1.7.2", "font-awesome": "^4.3.0"';
				}else{
					props.dependancy = '"jeet": "^6.1.2"';
				}
				
				break;

			default:
				props.dependancy = '"bootstrap-sass": "^3.3.3", "font-awesome": "^4.3.0"';
				break;
		}

		console.log( files );

		// Actually copy and process files
		init.copyAndProcess( files, props );

		// Generate package.json file
		init.writePackageJSON( 'package.json', props );

		// Done!
		done();
	});

};