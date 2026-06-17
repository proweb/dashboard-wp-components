import { createRoot, useState } from '@wordpress/element';
import {
	Button,
	ButtonGroup,
	CheckboxControl,
	RadioControl,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
	Spinner,
	Notice,
	Panel,
	PanelBody,
	PanelRow,
	__experimentalHeading as Heading, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	__experimentalSurface as Surface, // eslint-disable-line @wordpress/no-unsafe-wp-apis
	Modal,
	Tooltip,
	ExternalLink,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { plus } from '@wordpress/icons';

const ComponentsPage = () => {
	const [ text, setText ] = useState( '' );
	const [ isChecked, setIsChecked ] = useState( false );
	const [ radioValue, setRadioValue ] = useState( 'a' );
	const [ rangeValue, setRangeValue ] = useState( 10 );
	const [ selectValue, setSelectValue ] = useState( 'm' );
	const [ isToggled, setIsToggled ] = useState( false );
	const [ isModalOpen, setIsModalOpen ] = useState( false );

	return (
		<div style={ { padding: '20px', maxWidth: '800px' } }>
			<Heading level={ 1 }>
				{ __(
					'WordPress Components Library',
					'dashboard-wp-components'
				) }
			</Heading>
			<p>
				{ __(
					'Explore the basic UI components from the @wordpress/components package.',
					'dashboard-wp-components'
				) }
			</p>

			<Panel
				header={ __(
					'Buttons & Interaction',
					'dashboard-wp-components'
				) }
			>
				<PanelBody
					title={ __(
						'Standard Buttons',
						'dashboard-wp-components'
					) }
					initialOpen={ true }
				>
					<PanelRow>
						<Button variant="primary">
							{ __( 'Primary', 'dashboard-wp-components' ) }
						</Button>
						<Button variant="secondary">
							{ __( 'Secondary', 'dashboard-wp-components' ) }
						</Button>
						<Button variant="tertiary">
							{ __( 'Tertiary', 'dashboard-wp-components' ) }
						</Button>
						<Button variant="link">
							{ __( 'Link', 'dashboard-wp-components' ) }
						</Button>
					</PanelRow>
					<div style={ { marginTop: '10px' } }>
						<ButtonGroup>
							<Button variant="secondary">A</Button>
							<Button variant="secondary">B</Button>
							<Button variant="secondary">C</Button>
						</ButtonGroup>
					</div>
				</PanelBody>
				<PanelBody
					title={ __(
						'Modals & Tooltips',
						'dashboard-wp-components'
					) }
					initialOpen={ false }
				>
					<PanelRow>
						<Button
							variant="secondary"
							onClick={ () => setIsModalOpen( true ) }
						>
							{ __( 'Open Modal', 'dashboard-wp-components' ) }
						</Button>
						{ isModalOpen && (
							<Modal
								title={ __(
									'Example Modal',
									'dashboard-wp-components'
								) }
								onRequestClose={ () => setIsModalOpen( false ) }
							>
								<p>
									{ __(
										'This is a modal component.',
										'dashboard-wp-components'
									) }
								</p>
								<Button
									variant="primary"
									onClick={ () => setIsModalOpen( false ) }
								>
									{ __( 'Close', 'dashboard-wp-components' ) }
								</Button>
							</Modal>
						) }
						<Tooltip
							text={ __(
								'More information',
								'dashboard-wp-components'
							) }
						>
							<Button
								variant="secondary"
								icon={ plus }
								showTooltip={ false }
							>
								{ __( 'Hover me', 'dashboard-wp-components' ) }
							</Button>
						</Tooltip>
					</PanelRow>
				</PanelBody>
			</Panel>

			<Panel header={ __( 'Form Controls', 'dashboard-wp-components' ) }>
				<PanelBody
					title={ __( 'Inputs', 'dashboard-wp-components' ) }
					initialOpen={ true }
				>
					<div style={ { marginBottom: '16px' } }>
						<TextControl
							label={ __( 'Text Input', 'dashboard-wp-components' ) }
							value={ text }
							onChange={ setText }
							help={ __(
								'Enter some text',
								'dashboard-wp-components'
							) }
						/>
					</div>
					<div style={ { marginBottom: '16px' } }>
						<CheckboxControl
							label={ __( 'Checkbox', 'dashboard-wp-components' ) }
							checked={ isChecked }
							onChange={ setIsChecked }
						/>
					</div>
					<div style={ { marginBottom: '16px' } }>
						<ToggleControl
							label={ __(
								'Toggle Switch',
								'dashboard-wp-components'
							) }
							checked={ isToggled }
							onChange={ setIsToggled }
						/>
					</div>
					<div style={ { marginBottom: '16px' } }>
						<SelectControl
							label={ __( 'Select One', 'dashboard-wp-components' ) }
							value={ selectValue }
							options={ [
								{ label: 'Small', value: 's' },
								{ label: 'Medium', value: 'm' },
								{ label: 'Large', value: 'l' },
							] }
							onChange={ setSelectValue }
						/>
					</div>
					<div style={ { marginBottom: '16px' } }>
						<RadioControl
							label={ __(
								'Radio Options',
								'dashboard-wp-components'
							) }
							selected={ radioValue }
							options={ [
								{ label: 'Option A', value: 'a' },
								{ label: 'Option B', value: 'b' },
							] }
							onChange={ setRadioValue }
						/>
					</div>
					<div style={ { marginBottom: '16px' } }>
						<RangeControl
							label={ __(
								'Range Slider',
								'dashboard-wp-components'
							) }
							value={ rangeValue }
							onChange={ setRangeValue }
							min={ 0 }
							max={ 100 }
						/>
					</div>
				</PanelBody>
			</Panel>

			<Panel
				header={ __( 'Feedback & Loading', 'dashboard-wp-components' ) }
			>
				<PanelBody title={ __( 'Notices', 'dashboard-wp-components' ) }>
					<Notice status="success" isDismissible={ false }>
						{ __(
							'Success message example',
							'dashboard-wp-components'
						) }
					</Notice>
					<div style={ { marginTop: '10px' } }>
						<Notice status="warning" isDismissible={ false }>
							{ __(
								'Warning message example',
								'dashboard-wp-components'
							) }
						</Notice>
					</div>
				</PanelBody>
				<PanelBody title={ __( 'Loading', 'dashboard-wp-components' ) }>
					<PanelRow>
						<span>
							{ __(
								'Loading spinner:',
								'dashboard-wp-components'
							) }
						</span>
						<Spinner />
					</PanelRow>
				</PanelBody>
			</Panel>

			<Panel header={ __( 'Layout & Links', 'dashboard-wp-components' ) }>
				<PanelBody
					title={ __(
						'Cards & Surfaces',
						'dashboard-wp-components'
					) }
				>
					<Card>
						<CardHeader>
							<Heading level={ 3 }>
								{ __(
									'Card Title',
									'dashboard-wp-components'
								) }
							</Heading>
						</CardHeader>
						<CardBody>
							{ __(
								'This is the main body of the card.',
								'dashboard-wp-components'
							) }
						</CardBody>
						<CardFooter>
							<small>
								{ __(
									'Card Footer content',
									'dashboard-wp-components'
								) }
							</small>
						</CardFooter>
					</Card>
					<div style={ { marginTop: '20px' } }>
						<Surface padding={ 4 } variant="tertiary">
							{ __(
								'Surface component with padding',
								'dashboard-wp-components'
							) }
						</Surface>
					</div>
					<div style={ { marginTop: '20px' } }>
						<ExternalLink href="https://developer.wordpress.org/block-editor/reference-guides/components/">
							{ __(
								'Official Components Documentation',
								'dashboard-wp-components'
							) }
						</ExternalLink>
					</div>
				</PanelBody>
			</Panel>
		</div>
	);
};

const rootElement = document.getElementById( 'components-app' );

if ( rootElement ) {
	createRoot( rootElement ).render( <ComponentsPage /> );
}
