import React from 'react';
import MainPopupViewContainer from '#containers/popup/main_container';
import SidePanelContainer from '#containers/side_panel/side_panel_container';


/**
 * What version of the app is rendered depends on whether the user is in popup mode 	or using the Chrome Side Panel API
 */

/* Render main app by default */
function App({renderContext = 'popup'}) {
	if (renderContext === 'popup') {
		return (
			<MainPopupViewContainer/>
		);
	} else if (renderContext === 'side panel') {
		return <SidePanelContainer />;
	}
}

/* Addtitional paths to add */
// <Route
// 							path='projects/'
// 							element={/* Manage all projects */}
// 						>
// 							<Route
// 								path=':projectId'
// 								element={/* Sessions and other project details */}
// 							>
// 								<Route
// 									path=':sessionId'
// 									element={/* Specific session info, list of captures */}
// 								>
// 									<Route
// 										path=':captureId'
// 										element={/* Display capture information */}
// 									/>
// 									<Route
// 										path='schemas'
// 										element={/* Display schemas related to this session */}
// 									/>
// 								</Route>
// 							</Route>
// 						</Route>
// 						<Route
// 							path='schemas/'
// 							element={/* See list of all schemas */}
// 						/>

export default App;
