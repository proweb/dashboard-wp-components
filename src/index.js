import { createRoot } from '@wordpress/element';


import { Panel, PanelBody, PanelRow, Button, Icon } from '@wordpress/components';
import { __experimentalHeading as Heading } from '@wordpress/components';
import { verse, plusCircle, external, commentAuthorAvatar } from '@wordpress/icons';



const rootElement = document.getElementById('demo-app');

/**
 * App component renders a demonstration panel using React components
 * from WordPress. It includes two PanelBody sections:
 * 
 * 1. The first PanelBody provides a heading and a description paragraph
 *    with an icon, showcasing the use of React components for interface
 *    development.
 * 
 * 2. The second PanelBody displays various styled buttons, demonstrating
 *    different button variants available in WordPress components. Each
 *    button has specific styling and some have icons with specific positions.
 */

const App = () => (
    <>
        <Panel header="React in WordPress">
            <PanelBody title="Title for PanelBody" icon={verse} initialOpen={true}>
                <Heading level={2}>Компоненты на React для разработки интерфейса</Heading>
                <PanelRow>
                    <p>демо-плагин. Создано c учебными целями...</p>

                </PanelRow>
                <PanelRow>
                     <>
                    <Heading level={4}>разработка - Сергей Мочалов</Heading>  
                    </>
                </PanelRow>

            </PanelBody>


            <PanelBody title="Компоненты: Buttons" initialOpen={true}>
                <Heading level={3}>Стили кнопок:</Heading>
                <PanelRow>
                    <Button icon={plusCircle} iconPosition='left'>Defaut</Button>
                    <Button variant='primary' >Primary</Button>
                    <Button variant='secondary' onClick={() => alert('Secondary')}>Secondary</Button>
                    <Button variant='tertiary'>Tertiary</Button>
                    <Button variant='link' icon={external} iconPosition='right'>Link</Button>
                </PanelRow>
                <PanelRow></PanelRow>
                <PanelRow></PanelRow>
                <PanelRow></PanelRow>

            </PanelBody>
        </Panel>

    </>
);

if (rootElement) {
    createRoot(rootElement).render(<App />);
}
