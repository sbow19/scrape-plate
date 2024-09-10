import React, { useEffect, useState } from 'react';
import CreatorView from '#components/side_panel/schema_creator/schema_creator_view';
import SidePanelGridContainer from '../shared/side_panel_grid_container';
import { useAppSelector, useAppDispatch } from 'app/utils/hooks';
import { addSchema } from '#ducks/features/schemas/schemaSliceThunks';
import { changeView } from '#ducks/features/navigation/navigationSlice';
import { generateId } from 'app/utils/helper_funcs';
import { toast } from 'react-toastify';

const CreatorViewContainer: React.FC = () => {
	const dispatch = useAppDispatch();

	/* Schema list state */
	const schemaList = useAppSelector((state) => state.schemas);

	const [schemaName, setSchemaName] = useState('');

	const [isSchemaNameDuplicate, setIsSchemaNameDuplicate] = useState(false);

	const handleSchemaNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		//Check that schema name doesn't exist
		const result = Object.values(schemaList).includes(
			(schema: SchemaDetails) => {
				if (schema.name === schemaName) {
					return true;
				} else {
					return false;
				}
			},
		);

		if (result) {
			setIsSchemaNameDuplicate(true);
		}

		setSchemaName(e.target.value);
	};

	/* Project assignment handlers */

	//Project list state
	const projectList: ProjectsList = useAppSelector(
		(state) => state.projects.projectList,
	);

	//Project selected in dropdown list
	const [projectSelection, setProjectSelection] =
		useState<ProjectDetails | null>(null);

	//Project list state
	const [projectSelectionList, setProjectSelectionList] =
		useState<ProjectsList>({});

	//Project list handler
	const projectAddHandler = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		//Prevent default behaviour
		e.preventDefault();

		//If no project selected, don't do anything
		if (!projectSelection) {
			return;
		}

		//Add project name to on screen list
		setProjectSelectionList((prevProjectList) => {
			const chosenKeys = Object.keys(prevProjectList);

			//Check if project already in list
			if (chosenKeys.some((projectId) => projectSelection.id === projectId)) {
				return prevProjectList;
			} else {
				return {
					...prevProjectList,
					[projectSelection.id]: projectList[projectSelection.id],
				};
			}
		});
	};

	const handleProjectSelect = (projectName: string) => {
		const newProjectDetails = Object.values(projectList).find((project) => {
			if (project.name === projectName) {
				return true;
			} else {
				return false;
			}
		});

		setProjectSelection(newProjectDetails ?? null);
	};

	//Delete Project item from list
	const handleProjectDelete = (
		e: React.MouseEvent<HTMLButtonElement>,
		projectId: ProjectId,
	) => {
		e.preventDefault();

		setProjectSelectionList((prevProjectList) => {
			console.log(prevProjectList);
			//Filter selected item
			delete prevProjectList[projectId];

			return { ...prevProjectList };
		});
	};

	/* URL state */
	//Fetch url state from store

	const [url, setUrl] = useState('');

	useEffect(() => {
		//Get url from Chrome Extension on load
	}, []);

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(e.target.value);
	};

	/* Handle add new schema */
	const handleAddSchema = async () => {
		const newSchemaId = generateId();

		//New Schema details object
		const newSchema: SchemaDetailsAdd = {
			schemaDetails: {
				name: schemaName,
				id: newSchemaId,
				url: url,
				schema: {},
			},
			projectIds: Object.values(projectSelectionList).map((project) => {
				return project.id;
			}),
		};

		//Dispatch action to add Schema to Schema list
		try {
			await dispatch(addSchema(newSchema)).unwrap();

			toast.success('Schema added', {
				autoClose: 1000,
				pauseOnHover: false,
				pauseOnFocusLoss: false,
				closeOnClick: true,
				hideProgressBar: true,
			}); // Use unwrap() to handle rejected promises

			//Remove everything on the screen
			setSchemaName('');
			setProjectSelection(null);
			setUrl('');
			setIsSchemaNameDuplicate(false);
			setProjectSelectionList({});

			//Navigate to schema capture screen
			dispatch(
				changeView({
					currentView: 'schema_capture',
					viewParams: newSchema,
				}),
			);
		} catch (e) {
			toast.error('Failed to add schema', {
				autoClose: 1000,
				pauseOnHover: false,
				pauseOnFocusLoss: false,
				closeOnClick: true,
				hideProgressBar: true,
			});
		}
	};

	return (
		<>
			{/* Creator View component */}
			<CreatorView
				schemaName={schemaName}
				isSchemaNameDuplicate={isSchemaNameDuplicate}
				onSchemaNameChange={handleSchemaNameChange}
				projectList={projectList}
				projectSelection={projectSelection}
				projectSelectionList={projectSelectionList}
				onAddProject={projectAddHandler}
				onSelectProject={handleProjectSelect}
				onDeleteProject={handleProjectDelete}
				url={url}
				onUrlChange={handleUrlChange}
			/>

			{/* Grid to populate */}
			<SidePanelGridContainer />

			{/* Save */}
			<button
				onClick={(e) => {
					e.preventDefault();
					handleAddSchema();
				}}
			>
				Save Schema
			</button>
		</>
	);
};

export default CreatorViewContainer;
