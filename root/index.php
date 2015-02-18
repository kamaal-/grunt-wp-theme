<?php
/**
 ** The main template file.
 **
 ** This is the most generic template file in a WordPress theme
 ** and one of the two required files for a theme (the other being style.css).
 ** It is usedto display a pa ge when nothing more specific matches a query.
 ** E.g., it puts together the home page when no home.php file exists.
 ** Learn more: http://codex.wordpress.org/Template_Hierarchy
 **
 ** @package {%= title %}
 ** @since {%= version %}
 **/

get_header(); ?>

<?php get_sidebar(); ?>
<?php get_footer(); ?>