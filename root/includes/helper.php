<?php



define( 'ELEPHAS_DEBUG', TRUE );


if( !function_exists( '{%= prefix %}_get_theme_version' ) ):
  
/**
 ** Returns theme version.
 **
 ** @package {%= title %}
 ** @since {%= version %}
 ** @return string
 **/
function {%= prefix %}_get_theme_version() {

  $theme = wp_get_theme();
  return $theme->get('Version');

}


endif;


if( !function_exists( '{%= prefix %}_script_prefix' ) ):
  
/**
 ** Returns theme version.
 **
 ** @package {%= title %}
 ** @since {%= version %}
 ** @return string
 **/
function {%= prefix %}_script_prefix() {

  return ELEPHAS_DEBUG ? '' : '.min';

}


endif;