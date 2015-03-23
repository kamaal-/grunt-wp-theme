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
		init.prompt( 'homepage', 'http://paristokyo.ae' ),

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
			name: 'cmb',
			message : 'Custom metabox: Will you use "WordPress Custom Metabox CMB2 Library" yes[y] or no[n]?',
			default: 'n'
		},
		{
			name: 'bootstrap',
			message : 'Bootstrap Framework: Will you use "Bootstrap" yes[y] or no[n]?',
			default: 'n'
		},
		{
			name: 'jeet',
			message : 'Jeet Grid Framework: Will you use "Jeet Grid", yes[y] or no[n]?',
			default: 'n'
		},
		{
			name: 'bourbon',
			message : 'Bourbon Framework: Will you use "Bourbon & Neat Grid", yes[y] or no[n]?',
			default: 'n'
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
			"grunt-contrib-clean": "^0.5.0",
		    "grunt-contrib-compass": "^0.6.0",
		    "grunt-contrib-compress": "^0.5.2",
		    "grunt-contrib-concat": "^0.4.0",
		    "grunt-contrib-copy": "^0.5.0",
		    "grunt-contrib-cssmin": "^0.9.0",
		    "grunt-contrib-jshint": "~0.7.0",
		    "grunt-contrib-uglify": "~0.2.4",
		    "grunt-contrib-watch": "~0.5.3",
		    "grunt-csscomb": "^2.0.1",
		    "grunt-template": "^0.2.3",
		    "jshint-stylish": "^0.1.5",
		    "load-grunt-tasks": "^0.4.0",
			'grunt-contrib-nodeunit': '~0.4.1'
		};

		// Sanitize names where we need to for PHP/JS
		props.name = props.title.replace( /\s+/g, '-' ).toLowerCase();
		props.dependancy = {};
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

				props.css_preprocessor = 'sass';
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