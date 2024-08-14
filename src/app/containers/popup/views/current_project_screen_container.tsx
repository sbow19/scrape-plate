import React, { useEffect, useState } from 'react';
import CurrentProjectScreen from '#components/popup/views/current_project_screen';
import { projectsList, projectDetails } from '#mocks/dummyData';

const CurrentProjectScreenContainer = (): JSX.Element => {
	const [projectText, setProjectText] = useState('');
	const [sessionText, setSessionText] = useState('');
	const [schemaText, setSchemaText] = useState('');

	//Populate text fields with current project data
	useEffect(() => {
		setProjectText(projectDetails?.name ?? '');
		setSessionText(projectDetails.lastSession?.name ?? '');
		setSchemaText(projectDetails.lastSchema?.name ?? '');
	}, []);

	const handleTextChange: InputChangeHandler = (event, targetInputField) => {
		switch (targetInputField) {
			case 'project_input':
                setProjectText(event.target.value)
				break;
			case 'session_input':
                setSessionText(event.target.value)
				break;
			case 'schema_input':
                setSchemaText(event.target.value)
				break;
			default:
				break;
		}
	};

	//Text handler package
	const inputText = {
		projectText: projectText,
		sessionText: sessionText,
		schemaText: schemaText,
	};

	return (
		<>
			<CurrentProjectScreen
				projectList={projectsList}
				currentProject={projectDetails}
                inputText={inputText}
				onChange={handleTextChange}
			/>
		</>
	);
};

export default CurrentProjectScreenContainer;
