import React, { useEffect, useState } from 'react';
import CurrentProjectScreen from '#components/popup/views/current_project_screen';
import { useAppDispatch, useAppSelector } from 'app/utils/hooks';
import {
	changeCurrentProject,
	changeCurrentProjectDetails,
} from '#ducks/features/current_project/currentProjectSliceThunks';

import { toast } from 'react-toastify';
import { changeView } from '#ducks/features/navigation/navigationSlice';

const helper = (name, list) => {
	return list.some((entry) => {
		if (entry.name === name) {
			return true;
		} else {
			return false;
		}
	});
};

const CurrentProjectScreenContainer = (): JSX.Element => {
	const [projectText, setProjectText] = useState('');
	const [sessionText, setSessionText] = useState('');
	const [schemaText, setSchemaText] = useState('');

	//Fetch current project details from state storage
	const currentProject = useAppSelector((state) => state.currentProject);

	const projectList = useAppSelector((state) => state.projects.projectList);

	//Populate text fields with current project data
	useEffect(() => {
		setProjectText(currentProject?.name ?? '');
		setSessionText(currentProject.lastSession?.name ?? '');
		setSchemaText(currentProject.lastSchema?.name ?? '');
	}, []);

	const handleTextChange: InputChangeHandler = async (
		event,
		targetInputField,
	) => {
		switch (targetInputField) {
			case 'project_input':
				setProjectText(event.target.value);

				//Check if only one project is matched, then update current project
				if (
					helper(
						event.target.value,
						Object.keys(projectList).map((projectId) => projectList[projectId]),
					)
				) {
					//Get project details from name
					const selectedProject: ProjectDetails = Object.values(
						projectList,
					).find((project) => project.name === event.target.value);

					//Change current project state
					try {
						await dispatch(changeCurrentProject(selectedProject.id)).unwrap();

						//Update view params to ensure that current prject details is available throughout app
						dispatch(changeView({
							viewParams: {
								...selectedProject,
								lastSchema: null,
                                lastSession: null,
								lastModified: null
							},
							currentView: 'current_project'
						}))
						toast.success('Current project changed successfully', {
							autoClose: 500, 
							hideProgressBar: true
						});
					} catch (e) {
						console.log(e);
						toast.error('Could not change current project', {
							autoClose: 500, 
							hideProgressBar: true
						});
					}
				}
				break;
			case 'session_input':
				setSessionText(event.target.value);

				const sessionList = currentProject?.sessionNames ?? {};

				//Check if only one session is matched, then update current project with last session data
				if (
					helper(
						event.target.value,
						Object.keys(sessionList).map((sessionId) => sessionList[sessionId]),
					)
				) {
					//Get session details from name
					const selectedSession: SessionDetails = Object.values(
						sessionList,
					).find((session) => session.name === event.target.value);

					//Set new current project object
					const newCurrentProject: CurrentProjectDetails = {
						...currentProject,
						lastSession: selectedSession,
					};

					//Change current project state
					try {
						await dispatch(
							changeCurrentProjectDetails(newCurrentProject),
						).unwrap();
					} catch (e) {
						console.log(e);
						toast.error('Could not update current project');
					}
				}
				break;
			case 'schema_input':
				setSchemaText(event.target.value);
				break;
			default:
				break;
		}
	};

	//Update current Project details based on selection
	const dispatch = useAppDispatch();

	//Text handler package
	const inputText = {
		projectText: projectText,
		sessionText: sessionText,
		schemaText: schemaText,
	};

	return (
		<>
			<CurrentProjectScreen
				projectList={projectList}
				currentProject={currentProject}
				inputText={inputText}
				onChange={handleTextChange}
			/>
		</>
	);
};

export default CurrentProjectScreenContainer;
