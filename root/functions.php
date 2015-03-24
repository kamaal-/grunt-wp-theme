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

$prefix_upper = strtoupper('{%= prefix %}');

define( $prefix_upper .'_DEBUG', TRUE );

/**
 ** Custom utility functions that required for the theme.
 ** after u can use {%= prefix %}_get_theme_version(), 
 **/
require get_template_directory() . '/includes/helper.php';


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

	/*
	 * Make theme available for translation.
	 */
	load_theme_textdomain( '{%= prefix %}', get_template_directory() . '/languages' );
	
	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', '{%= prefix %}' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See http://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside', 'image', 'video', 'quote', 'link',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( '_s_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );

}

endif; //{%= prefix %}_setup

add_action( 'after_setup_theme', '{%= prefix %}_setup' );


/**
 ** Register widget area.
 **
 ** @link http://codex.wordpress.org/Function_Reference/register_sidebar
 ** @package {%= title %}
 ** @since {%= version %}
 **/
function {%= prefix %}_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', '{%= prefix %}' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
}

add_action( 'widgets_init', '{%= prefix %}_widgets_init' );



/**
 ** Enqueue scripts and styles.
 ** 
 ** @package {%= title %}
 ** @since {%= version %}
 **/
function {%= prefix %}_enqueue_scripts() {

	wp_enqueue_style( '{%= prefix %}-style', get_template_directory_uri() . '/assets/public/css/app' . {%= prefix %}_script_prefix() . '.css' );
	
	wp_enqueue_script( '{%= prefix %}-script', get_template_directory_uri() . '/assets/public/js/app' . {%= prefix %}_script_prefix() . '.js' , array('jquery'), {%= prefix %}_get_theme_version(), true );
	
}
add_action( 'wp_enqueue_scripts', '{%= prefix %}_enqueue_scripts' );



/**
 ** Custom template tags for this theme.
 **
 ** @package {%= title %}
 ** @since {%= version %}
 **/
require get_template_directory() . '/includes/template-tags.php';


/**
 ** Custom functions that act independently of the theme templates.
 **
 ** @package {%= title %}
 ** @since {%= version %}
 **/
require get_template_directory() . '/includes/extras.php';


/**
 ** Customizer additions.
 **
 ** @package {%= title %}
 ** @since {%= version %}
 **/
require get_template_directory() . '/includes/customizer.php';


