import React from 'react';
import * as styles from '#styles/popup.module.css';
import MainFooterContainer from '#containers/popup/views/main_footer_container';
import ViewDetailsButton from '#components/buttons/view_details_button';

const CurrentProjectScreen: React.FC<CurrentProjectScreenProps> = ({
	currentProject,
	projectList,
	inputText,
	onChange: handleTextChange,
	onSelect: handleSelect
}) => {
	//Extract sessions and schemas associated with project. Assign empty array if there is a null entry
	const sessionNames = currentProject?.sessionNames ?? [];
	const projectSchemas = currentProject?.projectSchemas ?? [];

	return (
		<article className={styles.popupCurrentProjectScreen}>
			<h2 className={styles.currentProjectTitle}>Current Project</h2>
			<form className={styles.currentProjectForm}>
				<label htmlFor='project_list_input'>Project:</label>
				<input
					id='project_list_input'
					list='project_list'
					placeholder={'Please type...'}
					value={inputText.projectText ? inputText.projectText : ''}
					onChange={(e) => handleTextChange(e, 'project_input')}
					role='combobox'
				></input>
				<datalist
					id='project_list'
					data-testid='project_list'
				>
					{projectList.length > 0 ? (
						projectList.map((project) => (
							<option
								key={project.id}
								value={project.name}
								data-testid={project.name}
								onClick={()=>{handleSelect(project.id, project.name, "project")}}
							></option>
						))
					) : (
						<option>No projects</option>
					)}
				</datalist>
				<ViewDetailsButton id={currentProject.id ?? null} targetView="manage_project">
					View Project
				</ViewDetailsButton>

				<label htmlFor='session_list_input'>Session:</label>
				<input
					id='session_list_input'
					list='session_list'
					placeholder={'Please type...'}
					value={inputText.sessionText ? inputText.sessionText : ''}
					onChange={(e) => handleTextChange(e, 'session_input')}
					role='combobox'
				></input>
				<datalist
					id='session_list'
					data-testid='session_list'
				>
					{sessionNames.length > 0 ? (
						sessionNames.map((session) => (
							<option
								key={session.id}
								value={session.name}
								data-testid={session.name}
								onClick={()=>{handleSelect(session.id, session.name, "session")}}
							></option>
						))
					) : (
						<option>No sessions</option>
					)}
				</datalist>
				<ViewDetailsButton id={currentProject.lastSession?.id ?? null} targetView="manage_session">
					View Session
				</ViewDetailsButton>

				<label htmlFor='schema_list_input'>Schema:</label>
				<input
					id='schema_list_input'
					list='schema_list'
					placeholder={'Please type...'}
					value={inputText.schemaText ? inputText.schemaText : ''}
					onChange={(e) => handleTextChange(e, 'schema_input')}
					role='combobox'
				></input>
				<datalist
					id='schema_list'
					data-testid='schema_list'
				>
					{projectSchemas.length > 0 ? (
						projectSchemas.map((schema) => (
							<option
								key={schema.id}
								value={schema.name}
								data-testid={schema.name}
								onClick={()=>{handleSelect(schema.id, schema.name, "schema")}}
							></option>
						))
					) : (
						<option>No Schema</option>
					)}
				</datalist>
				<ViewDetailsButton id={currentProject.lastSchema?.id ?? null} targetView="manage_schema">
					View Schema
				</ViewDetailsButton>

				<button>Export</button>
			</form>
			<MainFooterContainer />
		</article>
	);
};

export default CurrentProjectScreen;
