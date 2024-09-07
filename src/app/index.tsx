import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '#styles/global.module.css'; // Global style presets

import { Provider } from 'react-redux';
import store from '#ducks/store/store';

import getRenderContext from './utils/chrome_helpers/render_context';

/* DEV STYLES __REMOVE IN PRODUCTION__ */
import '#styles/dev.module.css';

let renderContext: ServiceWorkerResponse["get_render_context"] = {
	renderContext: 'popup',
	view: "welcome"
}

/* Check render context */
try {
	renderContext = await getRenderContext();
} catch (e) {
	throw new Error('Could not get render context');
}


/* Render context */
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App renderContext={renderContext} />
		</Provider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
