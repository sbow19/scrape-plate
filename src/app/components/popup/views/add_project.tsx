/**
 * Add project view component for Chrome Extension popup
 */

import React from 'react';
import * as styles from '#styles/popup.module.css';

import CreateProjectButton from '#components/buttons/create_project_button';

const AddProject: React.FC<AddProjectViewProps> = ({
	userSchemas,
	sessionList,
	onSessionAdd: handleAddSession,
	sessionName,
	onSessionNameChange: handleSessionNameChange,
	onSessionDelete: handleSessionDelete,

	schemaList,
	onSchemaAdd: handleAddSchema,
	onSchemaSelect: handleSchemaSelect,
	onSchemaDelete: handleSchemaDelete,
}) => {
	return (
		<div className={styles.popupAddProjectScreen}>
			<h2 className={styles.popupAddProjectHeader}>Add Project</h2>
			<form className={styles.popupAddProjectForm}>
				<div className={styles.addProjectTitle}>
					<label>Project Name</label>
				</div>
				<div className={styles.addProjectTitleInput}>
					<input
						type='text'
						placeholder='Project Name'
					/>
				</div>

				<div className={styles.addProjectSessions}>
					<label>Select Schemas</label>
					<select
						onChange={(e) => {
							handleSchemaSelect(e.target.value);
						}}
					>
						<option
							value=''
							disabled
							selected
						>
							Select a schema...
						</option>
						{userSchemas.map((schema) => {
							return (
								<option
									key={schema.id}
									value={schema.name}
								>
									{schema.name}
								</option>
							);
						})}
					</select>
					<button onClick={handleAddSchema}>Add</button>
				</div>
				<div className={styles.addProjectSelectSchemaWrapper}>
					<ul>
						{/* Selected options go here */}

						{schemaList.map((schemaName, index) => {
							return (
								<li
									key={index}
									value={schemaName}
								>
									{schemaName}
									<button onClick={(e) => handleSchemaDelete(e, schemaName)}>
										Remove
									</button>
								</li>
							);
						})}
					</ul>
				</div>

				<div className={styles.addProjectSchemas}>
					<label>Add Sessions</label>
					<input
						type='text'
						placeholder='Session Name...'
						onChange={(e) => {
							handleSessionNameChange(e.target.value);
						}}
						value={sessionName}
					/>
					<button
						onClick={handleAddSession}
						
					>
						Add
					</button>
				</div>

				<div className={styles.addProjectSelectSessionsWrapper}>
					<ul>
						{/* Selected sessions go here */}
						{sessionList.map((sessionName, index) => {
							return (
								<li
									key={index}
									value={sessionName}
								>
									{sessionName}
									<button onClick={(e) => handleSessionDelete(e, sessionName)}>
										Remove
									</button>
								</li>
							);
						})}
					</ul>
				</div>

				<div className={styles.addProjectAddButtonWrapper}>
					<CreateProjectButton buttonStyle='main-button' />
				</div>
			</form>
		</div>
	);
};

export default AddProject;
