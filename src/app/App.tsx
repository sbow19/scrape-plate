import React, { useEffect } from 'react';
import MainPopupViewContainer from '#containers/popup/main_container';
import SidePanelContainer from '#containers/side_panel/side_panel_container';

import { useAppDispatch } from 'app/utils/hooks';
import { changeView } from '#ducks/features/navigation/navigationSlice';
import { fetchAllProjects } from '#ducks/features/projects/projectSliceThunks';
import { getCurrentProject } from '#ducks/features/current_project/currentProjectSliceThunks';

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

	//Fetch the project list data
	useEffect(() => {
		const fetchProjects = async () => {
			try {
				await dispatch(fetchAllProjects()).unwrap();

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

	//Fetch current project details
	useEffect(() => {
		const fetchCurrentProject = async () => {
			try {
				const currentProjectDetails = await dispatch(getCurrentProject()).unwrap();

				const dummyProject: CurrentProjectDetails = {
					name: "",
					id: "",
					lastModified: null,
					lastSchema: null,
					lastSession: null,
					sessionNames: {},
					projectSchemas: {}
				};

				//If this is the first time logging in, then we send to welcome screen, otherwise to current rpoject screen
				if(renderContext.renderContext === "popup"){
					dispatch(
						changeView({
							currentView: 'current_project',
							viewParams: currentProjectDetails ?? dummyProject,
							currentStack: [],
						}),
					);
				} else if(renderContext.renderContext === "side_panel"){
					dispatch(
						changeView({
							currentView: renderContext.view,
							viewParams: currentProjectDetails ?? dummyProject,
							currentStack: [],
						}),
					);
				}
			

			} catch (err) {
				console.error('Failed to fetch current project:', err);
				toast.error('Failed to fetch current project', {
					autoClose: 1000,
					pauseOnHover: false,
					pauseOnFocusLoss: false,
					closeOnClick: true,
					hideProgressBar: true,
				});
			}
		};

		fetchCurrentProject();
	}, [dispatch]);

	//If current project, then we set render context to current project

	if (renderContext.renderContext === 'popup') {
		return (
			<>
				<MainPopupViewContainer />
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
