/* Stateful container of popup container component */
import React from 'react';
import MainPopupView from '#components/popup/main';
import { useAppSelector, useAppDispatch } from 'app/utils/hooks';
import { popView } from '#ducks/features/navigation/navigationSlice';
import { contentContainerPrefill } from 'app/utils/content_container_boilerplate';
import { changeContent } from '#ducks/features/content_container/contentContainerSlice';


const MainPopupViewContainer: React.FC<MainContainerProps> = () => {
	const { currentView, currentStack, viewParams } = useAppSelector(
		(state) => state.navigation,
	);
	const dispatch = useAppDispatch();

	//Get porject list
	const projectList = useAppSelector(state=>state.projects)
	//
	const handleBack = () => {
		dispatch(popView());

		//Change content of content template, if applicable
		const prevViewDetails = currentStack[currentStack.length - 2];
		const prevView = prevViewDetails.currentView;

		switch (prevView) {
			case 'manage_project':
				//Get session list from project detials object
				const sessionList: SessionList = viewParams?.sessionNames ?? {};
				dispatch(
					changeContent({
						...contentContainerPrefill.manageProject,
						tableRowData: Object.values(sessionList).map((session) => {
							return {
								name: session.name,
								id: session.id,
								description: session.lastModified,
							};
						}),
						names: ['Project', viewParams.name],
						id: viewParams.id,
					}),
				);
				break;
			case 'manage_session':

				//Get session id
				const sessionId = viewParams.sessionId;
				//Get capture details from selected project and selected session id
				const captures: CaptureList = viewParams.sessionNames[sessionId].captures;

				//Convert captures to table row data, or empty
				const tableRowData = captures
					? Object.values(captures).map((capture: CaptureDetails) => {
							return {
								name: capture.name,
								id: capture.id,
								description: capture.lastModified,
							};
					  })
					: [];
				dispatch(changeContent({
					...contentContainerPrefill.manageSession,
					tableRowData: tableRowData,
					names: ['Session', viewParams.sessionNames[sessionId].name],
				}));
				break;
			case 'manage_schema':
				dispatch(changeContent(contentContainerPrefill.manageSchema));
				break;
			case 'manage_capture':
				break;
			case 'all_projects':
				//Content container param
				const contentContainerPrefillAllProjects: ContentContainerPrefillItem = {
					...contentContainerPrefill.allProjects,
					tableRowData: Object.values(projectList.projectList).map(((project) => {
						return { name: project.name, id: project.id, description: project.lastModified};
					}))
				}
				dispatch(changeContent(contentContainerPrefillAllProjects));
				break;
			case 'schemas':
				break;
			default:
				break;
		}
	};

	return (
		<>
			<MainPopupView
				currentView={currentView}
				navigationStack={currentStack}
				onBack={handleBack}
			/>
		</>
	);
};

export default MainPopupViewContainer;
