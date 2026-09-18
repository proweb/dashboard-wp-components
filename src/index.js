import { createRoot, lazy, Suspense } from '@wordpress/element';
import { Spinner } from '@wordpress/components';

/**
 * DataForm demo screen, split into a separate lazy chunk.
 *
 * `@wordpress/dataviews/wp` (and its heavy dependency tree) is not
 * registered by core as a script handle or ESM module in this runtime, so it
 * cannot be externalized. Instead it is bundled into the `dataform-demo`
 * chunk, which is fetched only when the screen renders.
 *
 * @since n.e.x.t
 */
const DataFormDemo = lazy( () => import( './dataform-demo' ) );

const rootElement = document.getElementById( 'demo-app' );

if ( rootElement ) {
	createRoot( rootElement ).render(
		<Suspense fallback={ <Spinner /> }>
			<DataFormDemo />
		</Suspense>
	);
}
