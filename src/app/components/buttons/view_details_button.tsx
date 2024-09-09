import React from 'react';
import ButtonTemplate from './button_template';
import { useAppDispatch, useAppSelector } from 'app/utils/hooks';
import { changeView } from '#ducks/features/navigation/navigationSlice';
import { changeContent } from '#ducks/features/content_container/contentContainerSlice';
import { contentContainerPrefill } from 'app/utils/content_container_boilerplate';
import { toast } from 'react-toastify';

const ViewDetailsButton: React.FC<ViewDetailsButton> = ({
	children,
	id,
	targetView,
}) => {
	const dispatch = useAppDispatch();

	//Get project list info
	const { projectList } = useAppSelector((state) => state.projects);

	//Navigation state
	const { viewParams } = useAppSelector((state) => state.navigation);

	// Add Project button click event handler goes here
	const ViewDetailsHandler = () => {
		//If no id provided, then error
		if (!id) {
			return toast.error('No info here...', {
				autoClose: 1000,
				hideProgressBar: true
			});
		};


		// Add Project logic goes here
		if (targetView === 'manage_session') {
			//Get capture details from selected project and selected session id
			const captures: CaptureList = viewParams.sessionNames[id]?.captures ?? {};

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

			//Populate session manage template with session details and captures in each table row
			dispatch(
				changeContent({
					...contentContainerPrefill.manageSession,
					tableRowData: tableRowData,
					names: ['Session', viewParams.sessionNames[id].name],
					id: id,
				}),
			);
			
			dispatch(
				changeView({
					currentView: targetView,
					viewParams: {
						...projectList[viewParams.id], //Fetches current Project detail
						sessionId: id,
					},
				}),
			);
		} else if (targetView === 'manage_project') {
			//Get session names from selected project
			const sessionList: SessionList = projectList[id].sessionNames;

			//Populate project manage template with project details and sessions  in each table row
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
					names: ['Project', projectList[id].name],
					id: id,
				}),
			);

			//Change view to project manage view.
			dispatch(
				changeView({
					currentView: targetView,
					viewParams: {
						...projectList[id],
					},
				}),
			);
		} else if (targetView === 'manage_schema') {
			//Manage schema has to be handled in the side panel
			dispatch(changeContent({ ...contentContainerPrefill.manageSchema }));
			dispatch(
				changeView({ currentView: targetView, viewParams: { schemaId: '' } }),
			);
		}
	};

	return (
		<ButtonTemplate onClick={ViewDetailsHandler}>{children}</ButtonTemplate>
	);
};

export default ViewDetailsButton;
