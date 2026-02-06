<?php
/*
 * Plugin Name: Dashboard WP components
 * Description: Admin page with Gutenberg components
 * Version: 1.0.0
 * Author: Sergey Mochalov
 * 
 */

namespace KPFU\Plugin\Gutenbergpage;

use \add_action;

add_action('admin_menu', __NAMESPACE__ . '\dashboard_page');

# Assets function
function add_assets()
{
	// Automatically load imported dependencies and assets version.
	$asset_file = include plugin_dir_path(__FILE__) . 'build/index.asset.php';
	// Load our app.js.
	wp_register_script(
		'demo-gb-app',
		plugins_url('build/index.js', __FILE__),
		$asset_file['dependencies'],
		$asset_file['version'],
		// we need it for DOM ready
		array(
			'strategy' => 'defer'
		) 
	);
	wp_enqueue_script('demo-gb-app');


	wp_register_style(
		'demo-gb-css',
		plugins_url('style.css', __FILE__),
		array('wp-components'),
		$asset_file['version']
	);
	wp_enqueue_style('demo-gb-css');

}

function dashboard_page()
{

	$page_hook_suffix = add_dashboard_page(
		'Gutenberg components',
		'GB components',
		'manage_options',
		'gb-components-demo',
		__NAMESPACE__ . '\page_render_markup'
	);

	add_action("admin_print_scripts-{$page_hook_suffix}", __NAMESPACE__ . '\add_assets');
}


function page_render_markup()
{
	# Root node for React mount
	echo "<div id='demo-app'></div>";
}

/**
 * Register settings for the DataForm demo.
 */
function dashboard_register_settings() {
    $default = array(
        'message' => __( 'Hello, World!', 'dashboard-wp-components' ),
        'display' => true,
        'size'    => 'medium',
    );
    $schema  = array(
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
                'enum' => array(
                    'small',
                    'medium',
                    'large',
                    'x-large',
                ),
            ),
        ),
    );

    register_setting(
        'options',
        'dashboard_demo_settings',
        array(
            'type'         => 'object',
            'default'      => $default,
            'show_in_rest' => array(
                'schema' => $schema,
            ),
        )
    );
}
add_action( 'init', __NAMESPACE__ . '\dashboard_register_settings' );
