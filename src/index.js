import { createRoot } from '@wordpress/element';

import { Mybutton } from './components/ui/Button';
import { Panel, PanelBody, PanelRow } from '@wordpress/components';
import { __experimentalHeading as Heading } from '@wordpress/components';

const rootElement = document.getElementById( 'demo-app' );

const App = () => (
	<>
		<Panel header="Пример панели">
			<PanelBody>
				<Heading level={ 1 }>React in WordPress!</Heading>
				<PanelRow>
					<p>code is poetry</p>
				</PanelRow>
				<Mybutton />
			</PanelBody>
		</Panel>
	</>
);

if ( rootElement ) {
	createRoot( rootElement ).render( <App /> );
}
