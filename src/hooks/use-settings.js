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
	const [ isResolving, setIsResolving ] = useState( true );
	const [ isSaving, setIsSaving ] = useState( false );

	const { createErrorNotice, createSuccessNotice } =
		useDispatch( noticesStore );

	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } )
			.then( ( wpSettings ) => {
				if ( wpSettings?.dashboard_demo_settings ) {
					setSettings( wpSettings.dashboard_demo_settings );
				}
			} )
			.catch( () => {
				createErrorNotice(
					__( 'Could not load settings.', 'dashboard-wp-components' )
				);
			} )
			.finally( () => setIsResolving( false ) );
	}, [ createErrorNotice ] );

	const saveSettings = () => {
		if ( isSaving ) {
			return;
		}

		setIsSaving( true );

		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: {
				dashboard_demo_settings: settings,
			},
		} )
			.then( () => {
				createSuccessNotice(
					__( 'Settings saved.', 'dashboard-wp-components' )
				);
			} )
			.catch( () => {
				createErrorNotice(
					__( 'Could not save settings.', 'dashboard-wp-components' )
				);
			} )
			.finally( () => setIsSaving( false ) );
	};

	return {
		settings,
		setSettings,
		saveSettings,
		isResolving,
		isSaving,
	};
};
