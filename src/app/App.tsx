import React from 'react';
import MainPopupViewContainer from '#containers/popup/main_container';
import SidePanelContainer from '#containers/side_panel/side_panel_container';

/**
 * What version of the app is rendered depends on whether the user is in popup mode 	or using the Chrome Side Panel API
 */

/* Render main app by default */
function App({renderContext = "popup"}) {
	let renderedApp: JSX.Element = <></>;

	if (renderContext === 'popup') {
		renderedApp = <MainPopupViewContainer/>;
	} else if (renderContext === 'side panel') {
		renderedApp = <SidePanelContainer />;
	}

	return <div className='App'>{renderedApp}</div>;
}

export default App;
