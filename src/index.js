import { createRoot } from '@wordpress/element';
import {
	Button,
	__experimentalHeading as Heading, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	Panel,
	PanelBody,
	NoticeList,
} from '@wordpress/components';
import { DataForm } from '@wordpress/dataviews/wp';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { __ } from '@wordpress/i18n';
import { useSettings } from './hooks/use-settings';

const App = () => {
	const { settings, setSettings, saveSettings } = useSettings();
	const notices = useSelect(
		( select ) => select( noticesStore ).getNotices(),
		[]
	);
	const { removeNotice } = useDispatch( noticesStore );

	const fields = [
		{
			id: 'message',
			label: __( 'Message', 'dashboard-wp-components' ),
			type: 'text',
			Edit: 'textarea',
		},
		{
			id: 'display',
			label: __( 'Display', 'dashboard-wp-components' ),
			type: 'boolean',
			Edit: 'toggle',
		},
		{
			id: 'size',
			label: __( 'Font size', 'dashboard-wp-components' ),
			type: 'text',
			Edit: 'toggleGroup',
			elements: [
				{
					value: 'small',
					label: __( 'Small', 'dashboard-wp-components' ),
				},
				{
					value: 'medium',
					label: __( 'Medium', 'dashboard-wp-components' ),
				},
				{
					value: 'large',
					label: __( 'Large', 'dashboard-wp-components' ),
				},
				{
					value: 'x-large',
					label: __( 'Extra Large', 'dashboard-wp-components' ),
				},
			],
		},
	];

	const form = {
		fields: [
			{
				id: 'bar',
				label: __( 'General', 'dashboard-wp-components' ),
				children: [ 'message', 'display' ],
				layout: { type: 'card', withHeader: false },
			},
			{
				id: 'appearance',
				label: __( 'Appearance', 'dashboard-wp-components' ),
				children: [ 'size' ],
				layout: { type: 'card', isOpened: false },
			},
		],
	};

	return (
		<Panel header={ __( 'DataForm Demo', 'dashboard-wp-components' ) }>
			<PanelBody>
				<NoticeList notices={ notices } onRemove={ removeNotice } />
				<Heading level={ 2 }>
					{ __(
						'Configure Plugin Settings',
						'dashboard-wp-components'
					) }
				</Heading>
				<DataForm
					data={ settings }
					fields={ fields }
					form={ form }
					onChange={ ( edits ) =>
						setSettings( ( current ) => ( {
							...current,
							...edits,
						} ) )
					}
				/>
				<div style={ { marginTop: '20px' } }>
					<Button variant="primary" onClick={ saveSettings }>
						{ __( 'Save Settings', 'dashboard-wp-components' ) }
					</Button>
				</div>
			</PanelBody>
		</Panel>
	);
};

const rootElement = document.getElementById( 'demo-app' );
if ( rootElement ) {
	createRoot( rootElement ).render( <App /> );
}
