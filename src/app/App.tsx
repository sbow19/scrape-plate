import React, { useEffect } from 'react';
import MainPopupViewContainer from '#containers/popup/main_container';
import SidePanelContainer from '#containers/side_panel/side_panel_container';
import StateToggle from '#mocks/state_toggle';

import { useAppDispatch } from 'app/utils/hooks';
import { changeView } from '#ducks/features/navigation/navigationSlice';
import { fetchAllProjects } from '#ducks/features/projects/projectSliceThunks';

import { toast } from 'react-toastify';

/* Ensures that styles applied to toast notificatios are done correctly */
import { injectStyle } from 'react-toastify/dist/inject-style';
injectStyle();

/**
 * What version of the app is rendered depends on whether the user is in popup mode or using the Chrome Side Panel API
 */

/* Render main app by default */
const App: React.FC<AppProps> = ({ renderContext }) => {
	//Here we update the global view state with the render context presets
	const dispatch = useAppDispatch();

	//Make sure that the current view is set to render context values
	dispatch(
		changeView({
			currentView: renderContext.view,
			viewParams: {},
			currentStack: [],
		}),
	);

	//Here we fetch the project list data
	useEffect(() => {
		const fetchProjects = async () => {
			try {
				await dispatch(fetchAllProjects()).unwrap();

				toast.success('Projects fetched', {
					autoClose: 1000,
					pauseOnHover: false,
					pauseOnFocusLoss: false,
					closeOnClick: true,
					hideProgressBar: true,
				}); // Use unwrap() to handle rejected promises
			} catch (err) {
				console.error('Failed to fetch projects:', err);
				toast.error('Projects failed to load', {
					autoClose: 1000,
					pauseOnHover: false,
					pauseOnFocusLoss: false,
					closeOnClick: true,
					hideProgressBar: true,
				});
			}
		};

		fetchProjects();
	}, [dispatch]);

	if (renderContext.renderContext === 'popup') {
		return (
			<>
				<MainPopupViewContainer />
				<StateToggle />
			</>
		);
	} else if (renderContext.renderContext === 'side_panel') {
		return (
			<>
				<SidePanelContainer />
			</>
		);
	}

	return <div>App component rendering default view</div>;
};

export default App;
