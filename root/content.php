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
		<?php the_title( sprintf( '<h1 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h1>' ); ?>

		<?php if ( 'post' == get_post_type() ) : ?>
		<div class="entry-meta">
			<?php '{%= prefix %}'_posted_on(); ?>
		</div><!-- .entry-meta -->
		<?php endif; ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php
			/* translators: %s: Name of current post */
			the_content( sprintf(
				__( 'Read more %s <span class="meta-nav">&rarr;</span>', '{%= prefix %}' ),
				the_title( '<span class="screen-reader-text">"', '"</span>', false )
			) );
		?>

		<?php

			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', '{%= prefix %}' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php '{%= prefix %}'_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->