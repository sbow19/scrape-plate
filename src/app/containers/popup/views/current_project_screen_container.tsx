import React, { useEffect, useState } from 'react';
import CurrentProjectScreen from '#components/popup/views/current_project_screen';
import { useAppDispatch, useAppSelector } from 'app/utils/hooks';
import { changeProject, changeProjectDetails } from '#ducks/features/current_project/currentProjectSlice';



const helper = (name, list)=>{

	return list.some((entry)=>{
		if(entry.name === name){
			return true
		} else {
			return false
		}
	})

}


const CurrentProjectScreenContainer = (): JSX.Element => {
	const [projectText, setProjectText] = useState('');
	const [sessionText, setSessionText] = useState('');
	const [schemaText, setSchemaText] = useState('');

	//Fetch current project details from state storage
	const currentProject = useAppSelector(state=>state.currentProject);

	const projectList = useAppSelector(state=>state.projects.projectList) 

	//Populate text fields with current project data
	useEffect(() => {
		setProjectText(currentProject?.name ?? '');
		setSessionText(currentProject.lastSession?.name ?? '');
		setSchemaText(currentProject.lastSchema?.name ?? '');
	}, []);

	const handleTextChange: InputChangeHandler = (event, targetInputField) => {
		switch (targetInputField) {
			case 'project_input':
                setProjectText(event.target.value);

				//Check if only one project is matched, then update current project
				if(helper(event.target.value, Object.keys(projectList).map(projectId => projectList[projectId]))){

					//Get project details from name
					const selectedProject: ProjectDetails = Object.values(projectList).find(
						(project) => project.name === event.target.value
					);

					//Change current project state
					dispatch(changeProject({
						...selectedProject,
						lastModified: null,
						lastSchema: null,
						lastSession: null
					}));
				}
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

	//Update current Project details based on selection
	const dispatch = useAppDispatch();

	const handleSelect:SelectHandler = (id, name, property)=>{
		console.log(id)
		//Update current project details in Redux store and change content on current project view accordingly
		switch(property){
			case "project":
				
				break
			case "session":
				dispatch(changeProjectDetails({ id, name, property }));
				break
			case "schema":
				dispatch(changeProjectDetails({ id, name, property }));
				break
			default: 
				break
		}
		
		
	}

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
