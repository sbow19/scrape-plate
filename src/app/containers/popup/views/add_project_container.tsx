/**
 * Add project view container for Chrome Extension popup
 */

import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from 'app/utils/hooks';
import { addProject } from '#ducks/features/projects/projectSliceThunks';
import AddProject from '#components/popup/views/add_project';

import {
	generateId,
	createEmptySessions,
	createSchemaListObject,
} from 'app/utils/helper_funcs';
import { changeView } from '#ducks/features/navigation/navigationSlice';

import { toast } from 'react-toastify';

const AddProjectContainer: React.FC = () => {
	/* Redux State */
	const dispatch = useAppDispatch();

	// Fetch schemas
	const userSchemas = useAppSelector((state) => state.schemas);

	const currentProjectDetails = useAppSelector(state=>state.currentProject)

	//Fetch loading projects loading state
	const { isLoading, isError } = useAppSelector((state) => state.projects);

	//Project name state
	const [projectName, setProjectName] = useState('');

	//Session list state
	const [sessionList, setSessionList] = useState<Array<string>>([]);

	//Typed session name
	const [sessionName, setSessionName] = useState<string>('');

	//Session list handler
	const sessionAddHandler = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		//Prevent default behaviour
		e.preventDefault();

		//If no text, don't do anything
		if (sessionName.trim() === '') {
			return;
		}

		//Add session name to on screen list
		setSessionList([...sessionList, sessionName]);

		//reset input
		setSessionName('');
	};

	//Schema list state
	const [schemaList, setSchemaList] = useState<SchemaList>({});

	//Schema current value
	const [schemaSelection, setSchemaSelection] = useState<SchemaDetails | null>(
		null,
	);

	//Session list handler
	const schemaAddHandler = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		//Prevent default behaviour
		e.preventDefault();

		//If no schema selected, don't do anything
		if (!schemaSelection) {
			return;
		}

		//Add schema name to on screen list
		setSchemaList((prevSchemaList) => {
			const chosenKeys = Object.keys(prevSchemaList);

			//Check if schema already in list
			if (chosenKeys.some((schemaId) => schemaSelection.id === schemaId)) {
				return prevSchemaList;
			} else {
				return {
					...prevSchemaList,
					newSchemaId: userSchemas[schemaSelection.id],
				};
			}
		});
	};

	const handleSchemaSelect = (schemaDetails: SchemaDetails) => {
		setSchemaSelection(schemaDetails);
	};

	//Delete items
	const handleSchemaDelete = (
		e: React.MouseEvent<HTMLButtonElement>,
		schemaId: SchemaId,
	) => {
		e.preventDefault();

		setSchemaList((prevSchemaList) => {
			//Filter selected item
			delete prevSchemaList[schemaId];

			return { ...prevSchemaList };
		});
	};

	const handleSessionDelete = (
		e: React.MouseEvent<HTMLButtonElement>,
		sessionName: string,
	) => {
		e.preventDefault();

		setSessionList((prevSessionList) => {
			//Filter selected item
			const newSessionList = prevSessionList.filter(
				(session) => session !== sessionName,
			);
			return newSessionList;
		});
	};

	//Add project handler
	const handleAddProject = async() => {
		const newProjectId = generateId();

		//New Project details object
		const newProject: ProjectDetails = {
			name: projectName,
			id: newProjectId,
			sessionNames: createEmptySessions(sessionList, newProjectId, projectName),
			projectSchemas: createSchemaListObject(schemaList, userSchemas),
			lastModified: new Date().toISOString(),
		};

		//Dispatch action to add project to project list
		try{
			await dispatch(addProject(newProject)).unwrap();

			toast.success('Project added', {
				autoClose: 1000,
				pauseOnHover: false,
				pauseOnFocusLoss: false,
				closeOnClick: true,
				hideProgressBar: true,
			}); // Use unwrap() to handle rejected promises

			//Remove everything on the screen
			setProjectName('');
			setSessionList([]);
			setSchemaList({});

			//Navigate to current project screen or pop
			dispatch(
				changeView({
					currentView: 'current_project',
					viewParams: currentProjectDetails
				}),
			);

		}catch(e){

			toast.error('Failed to add project', {
				autoClose: 1000,
				pauseOnHover: false,
				pauseOnFocusLoss: false,
				closeOnClick: true,
				hideProgressBar: true,
			});
			
		}
	};

	return (
		<AddProject
			userSchemas={userSchemas}
			sessionList={sessionList}
			projectName={projectName}
			onProjectNameChange={setProjectName}
			onSessionAdd={sessionAddHandler}
			sessionName={sessionName}
			onSessionNameChange={setSessionName}
			onSessionDelete={handleSessionDelete}
			schemaList={schemaList}
			onSchemaAdd={schemaAddHandler}
			onSchemaSelect={handleSchemaSelect}
			onSchemaDelete={handleSchemaDelete}
			onAddProject={handleAddProject}
			isLoading={isLoading}
			isError={isError}
		/>
	);
};

export default AddProjectContainer;
