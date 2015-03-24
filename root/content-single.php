<?php
/**
 ** The template used for displaying single post or attachment
 **
 ** Learn more: http://codex.wordpress.org/Template_Hierarchy
 **
 ** @package {%= title %}
 ** @since {%= version %}
 **/
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>

		<div class="entry-meta">
			<?php {%= prefix %}_posted_on(); ?>
		</div><!-- .entry-meta -->
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', '{%= prefix %}' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php _s_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->