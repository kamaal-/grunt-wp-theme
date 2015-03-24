<?php
/**
 ** Custom template tags for this theme.
 **
 ** Eventually, some of the functionality here could be replaced by core features.
 **
 ** @package {%= title %}
 ** @since {%= version %}
 **/

if ( ! function_exists( '{%= prefix %}_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post-date/time and author.
 */
function {%= prefix %}_posted_on() {
	$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
	if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
		$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
	}
	$time_string = sprintf( $time_string,
		esc_attr( get_the_date( 'c' ) ),
		esc_html( get_the_date() ),
		esc_attr( get_the_modified_date( 'c' ) ),
		esc_html( get_the_modified_date() )
	);
	$posted_on = sprintf(
		_x( 'Posted on %s', 'post date', '{%= prefix %}' ),
		'<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>'
	);
	$byline = sprintf(
		_x( 'by %s', 'post author', '{%= prefix %}' ),
		'<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
	);
	echo '<span class="posted-on">' . $posted_on . '</span><span class="byline"> ' . $byline . '</span>';
}
endif;

if ( ! function_exists( '{%= prefix %}_entry_footer' ) ) :
/**
 * Prints HTML with meta information for the categories, tags and comments.
 */
function {%= prefix %}_entry_footer() {
	// Hide category and tag text for pages.
	if ( 'post' == get_post_type() ) {
		/* translators: used between list items, there is a space after the comma */
		$categories_list = get_the_category_list( __( ', ', '{%= prefix %}' ) );
		if ( $categories_list && _s_categorized_blog() ) {
			printf( '<span class="cat-links">' . __( 'Posted in %1$s', '{%= prefix %}' ) . '</span>', $categories_list );
		}
		/* translators: used between list items, there is a space after the comma */
		$tags_list = get_the_tag_list( '', __( ', ', '{%= prefix %}' ) );
		if ( $tags_list ) {
			printf( '<span class="tags-links">' . __( 'Tagged %1$s', '{%= prefix %}' ) . '</span>', $tags_list );
		}
	}
	if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
		echo '<span class="comments-link">';
		comments_popup_link( __( 'Leave a comment', '{%= prefix %}' ), __( '1 Comment', '{%= prefix %}' ), __( '% Comments', '{%= prefix %}' ) );
		echo '</span>';
	}
	edit_post_link( __( 'Edit', '{%= prefix %}' ), '<span class="edit-link">', '</span>' );
}
endif;