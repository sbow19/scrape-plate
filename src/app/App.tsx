import React from 'react';
import MainPopupViewContainer from '#containers/popup/main_container';
import SidePanelContainer from '#containers/side_panel/side_panel_container';
import StateToggle from '#mocks/state_toggle';



/**
 * What version of the app is rendered depends on whether the user is in popup mode 	or using the Chrome Side Panel API
 */

/* Render main app by default */
function App({ renderContext = 'popup' }) {
	if (renderContext === 'popup') {
		return (
			<>
				<MainPopupViewContainer />
				<StateToggle/>
			</>
		);
	} else if (renderContext === 'side panel') {
		return <SidePanelContainer />;
	}
}

export default App;
