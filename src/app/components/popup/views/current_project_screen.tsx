import React from 'react';
import * as styles from '#styles/popup.module.css';
import MainFooterContainer from '#containers/popup/views/main_footer_container';

const CurrentProjectScreen: React.FC<CurrentProjectScreenProps> = ({
	currentProject,
	projectList,
    inputText,
    onChange: handleTextChange
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
                    placeholder={"Please type..."}
                    value={inputText.projectText ? inputText.projectText : ""}
                    onChange={e=>handleTextChange(e, "project_input")}
                    role="combobox"
				></input>
				<datalist id='project_list' data-testid='project_list'>
					{projectList.length > 0 ? (
						projectList.map((project) => (
							<option key={project.id} value={project.name} data-testid={project.name}></option>
						))
					) : (
						<option>No projects</option>
					)}
				</datalist>
                <button>View Project</button>

				<label htmlFor='session_list_input'>Session:</label>
				<input
					id='session_list_input'
					list='session_list'
                    placeholder={"Please type..."}
                    value={inputText.sessionText ? inputText.sessionText : ""}
                    onChange={e=>handleTextChange(e, "session_input")}
                    role="combobox"
				></input>
				<datalist id='session_list'  data-testid='session_list'>
					{sessionNames.length > 0 ? (
						sessionNames.map((session) => (
							<option key={session.id} value={session.name} data-testid={session.name}></option>
						))
					) : (
						<option>No sessions</option>
					)}
				</datalist>
                <button>View Session</button>

				<label htmlFor='schema_list_input'>Schema:</label>
				<input
					id='schema_list_input'
					list='schema_list'
                    placeholder={"Please type..."}
                    value={inputText.schemaText ? inputText.schemaText : ""}
                    onChange={e=>handleTextChange(e, "schema_input")}
                    role="combobox"
				></input>
				<datalist id='schema_list'  data-testid='schema_list'>
					{projectSchemas.length > 0 ? (
						projectSchemas.map((schema) => (
							<option key={schema.id} value={schema.name} data-testid={schema.name}></option>
						))
					) : (
						<option>No Schema</option>
					)}
				</datalist>
                <button>View Schema</button>

				<button>Export</button>
			</form>
			<MainFooterContainer/>
		</article>
	);
};

export default CurrentProjectScreen;
