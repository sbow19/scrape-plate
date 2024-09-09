/**
 * Add session view container for Chrome Extension popup
 */

import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from 'app/utils/hooks';
import { addSession } from '#ducks/features/projects/projectSliceThunks';
import AddSession from '#components/popup/views/add_session';

import {
	generateId,
} from 'app/utils/helper_funcs';
import { changeView } from '#ducks/features/navigation/navigationSlice';

import { toast } from 'react-toastify';

const AddSessionContainer: React.FC = () => {
	/* Redux State */
	const dispatch = useAppDispatch();

	// Fetch state details
	const userSchemas = useAppSelector((state) => state.schemas);

	const currentProjectDetails = useAppSelector(state=>state.currentProject);

    const viewParams: ProjectDetails = useAppSelector(state=>state.navigation.viewParams)


	//Session name state
	const [sessionName, setSessionName] = useState('');

	//Session list handler
	const sessionNameHandler = (sessionName: string) => {

		//reset input
		setSessionName(sessionName);
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

	//Add session handler
	const handleAddSession = async() => {
		const newSessionId = generateId();

		//New session details object
		const newSession: SessionDetails = {
			name: sessionName.trim(),
			id: newSessionId,
            projectId: viewParams.id,
            projectName: viewParams.name,
            captures: {},
			lastModified: new Date().toISOString(),
		};

		//Dispatch action to add session
		try{
			await dispatch(addSession(newSession)).unwrap();

			toast.success('Session added', {
				autoClose: 1000,
				pauseOnHover: false,
				pauseOnFocusLoss: false,
				closeOnClick: true,
				hideProgressBar: true,
			}); // Use unwrap() to handle rejected promises

			//Remove everything on the screen
			setSessionName('');
			setSchemaList({});

			//Navigate to current project screen or pop
			dispatch(
				changeView({
					currentView: 'current_project',
					viewParams: currentProjectDetails
				}),
			);

		}catch(e){

			toast.error('Failed to add session', {
				autoClose: 1000,
				pauseOnHover: false,
				pauseOnFocusLoss: false,
				closeOnClick: true,
				hideProgressBar: true,
			});
			
		}
	};

	return (
		<AddSession
			userSchemas={userSchemas}
			sessionName={sessionName}
            projectName={viewParams.name}
			onSessionNameChange={sessionNameHandler}
			schemaList={schemaList}
			onSchemaAdd={schemaAddHandler}
			onSchemaSelect={handleSchemaSelect}
			onSchemaDelete={handleSchemaDelete}
            onAddSession={handleAddSession}
		/>
	);
};

export default AddSessionContainer;
