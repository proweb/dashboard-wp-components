<?php
/**
 * Plugin Name:       Dashboard WP Components
 * Plugin URI:        https://github.com/proweb/dashboard-wp-components
 * Description:       Admin pages demonstrating Gutenberg-style React components.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.2
 * Author:            Sergey Mochalov
 * Text Domain:       dashboard-wp-components
 * Domain Path:       /languages
 */

namespace KPFU\Plugin\DashboardWpComponents;

defined( 'ABSPATH' ) || exit;

add_action( 'admin_menu', __NAMESPACE__ . '\register_pages' );
add_action( 'init', __NAMESPACE__ . '\register_settings' );

/**
 * Registers the admin pages and their asset enqueue hooks.
 *
 * @since n.e.x.t
 */
function register_pages(): void {
	register_page(
		__( 'Gutenberg components', 'dashboard-wp-components' ),
		__( 'GB components', 'dashboard-wp-components' ),
		'gb-components-demo',
		'index',
		__NAMESPACE__ . '\render_demo_page'
	);

	register_page(
		__( 'UI Components', 'dashboard-wp-components' ),
		__( 'Components', 'dashboard-wp-components' ),
		'gb-components-library',
		'components',
		__NAMESPACE__ . '\render_components_page'
	);
}

/**
 * Registers a single dashboard page and hooks its assets.
 *
 * @since n.e.x.t
 *
 * @param string   $page_title    Page title.
 * @param string   $menu_title    Menu title.
 * @param string   $slug          Page slug.
 * @param string   $build_file    Build file basename (without extension).
 * @param callable $render_callback Callback that renders the page markup.
 */
function register_page( string $page_title, string $menu_title, string $slug, string $build_file, callable $render_callback ): void {
	$hook_suffix = add_dashboard_page( $page_title, $menu_title, 'manage_options', $slug, $render_callback );

	add_action(
		"admin_print_scripts-{$hook_suffix}",
		static function () use ( $build_file ): void {
			enqueue_assets( $build_file );
		}
	);
}

/**
 * Enqueues the scripts and styles for a given build file.
 *
 * @since n.e.x.t
 *
 * @param string $build_file Build file basename (without extension).
 */
function enqueue_assets( string $build_file ): void {
	$asset_file = plugin_dir_path( __FILE__ ) . 'build/' . $build_file . '.asset.php';

	if ( ! file_exists( $asset_file ) ) {
		return;
	}

	$asset = include $asset_file;

	wp_enqueue_script(
		"demo-gb-{$build_file}-app",
		plugins_url( "build/{$build_file}.js", __FILE__ ),
		$asset['dependencies'],
		$asset['version'],
		array( 'strategy' => 'defer' )
	);

	wp_enqueue_style(
		'demo-gb-css',
		plugins_url( 'style.css', __FILE__ ),
		array( 'wp-components' ),
		$asset['version']
	);
}

/**
 * Renders the DataForm demo page markup.
 *
 * @since n.e.x.t
 */
function render_demo_page(): void {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	echo '<div id="demo-app"></div>';
}

/**
 * Renders the components library page markup.
 *
 * @since n.e.x.t
 */
function render_components_page(): void {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	echo '<div id="components-app"></div>';
}

/**
 * Returns the default settings.
 *
 * @since n.e.x.t
 *
 * @return array{message: string, display: bool, size: string} Default settings.
 */
function get_default_settings(): array {
	return array(
		'message' => __( 'Hello, World!', 'dashboard-wp-components' ),
		'display' => true,
		'size'    => 'medium',
	);
}

/**
 * Sanitizes the plugin settings.
 *
 * @since n.e.x.t
 *
 * @param mixed $value Raw settings value.
 * @return array{message: string, display: bool, size: string} Sanitized settings.
 */
function sanitize_settings( $value ): array {
	$default = get_default_settings();

	if ( ! is_array( $value ) ) {
		return $default;
	}

	$size = isset( $value['size'] ) && in_array( $value['size'], array( 'small', 'medium', 'large', 'x-large' ), true )
		? $value['size']
		: $default['size'];

	return array(
		'message' => isset( $value['message'] ) ? sanitize_text_field( $value['message'] ) : $default['message'],
		'display' => isset( $value['display'] ) ? (bool) $value['display'] : $default['display'],
		'size'    => $size,
	);
}

/**
 * Registers the settings for the DataForm demo.
 *
 * @since n.e.x.t
 */
function register_settings(): void {
	$schema = array(
		'type'       => 'object',
		'properties' => array(
			'message' => array(
				'type' => 'string',
			),
			'display' => array(
				'type' => 'boolean',
			),
			'size'    => array(
				'type' => 'string',
				'enum' => array( 'small', 'medium', 'large', 'x-large' ),
			),
		),
	);

	register_setting(
		'options',
		'dashboard_demo_settings',
		array(
			'type'             => 'object',
			'default'          => get_default_settings(),
			'sanitize_callback' => __NAMESPACE__ . '\sanitize_settings',
			'show_in_rest'     => array(
				'schema' => $schema,
			),
		)
	);
}