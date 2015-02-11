<?php

/**
 ** {%= title %} functions and definitions
 **
 ** When using a child theme (see http://codex.wordpress.org/Theme_Development and
 ** http://codex.wordpress.org/Child_Themes), you can override certain functions
 ** (those wrapped in a function_exists()) by defining them first in your child theme's
 ** functions.php file. The child theme's functions.php file is included before the parent
 ** theme's file, so the child theme functions would be used.
 **
 ** @package {%= title %}
 ** @since {%= version %}
 **/

/**
 ** Custom utility functions that required for the theme.
 ** after u can use {%= prefix %}_get_theme_version(), 
 **/
require get_template_directory() . '/includes/helpers.php';


/**
 ** Set the content width based on the theme's design and stylesheet.
 **/

if ( ! isset( $content_width ) ) {
	$content_width = 640; /* pixels */
}

if ( ! function_exists( '{%= prefix %}_setup' ) ) :
/**
 ** Sets up theme defaults and registers support for various WordPress features.
 **
 ** Note that this function is hooked into the after_setup_theme hook, which
 ** runs before the init hook. The init hook is too late for some features, such
 ** as indicating support for post thumbnails.
 ** @package {%= title %}
 ** @since {%= version %}
 **/
function {%= prefix %}_setup(){
	
}

endif;