import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { __ } from '@wordpress/i18n';

export const useSettings = () => {
	const [ settings, setSettings ] = useState( {
		message: '',
		display: false,
		size: 'small',
	} );

	const { createSuccessNotice } = useDispatch( noticesStore );

	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( wpSettings ) => {
			if ( wpSettings.dashboard_demo_settings ) {
				setSettings( wpSettings.dashboard_demo_settings );
			}
		} );
	}, [] );

	const saveSettings = () => {
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: {
				dashboard_demo_settings: settings,
			},
		} ).then( () => {
			createSuccessNotice(
				__( 'Settings saved.', 'dashboard-wp-components' )
			);
		} );
	};

	return {
		settings,
		setSettings,
		saveSettings,
	};
};
