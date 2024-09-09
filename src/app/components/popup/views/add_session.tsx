/**
 * Add session view component for Chrome Extension popup
 */

import React from 'react';
import * as styles from '#styles/popup.module.css';
import CreateSessionButton from '#components/buttons/create_session_button';

const AddSession: React.FC<AddSessionViewProps> = ({
	userSchemas,
	sessionName,
    projectName,
	onSessionNameChange: handleSessionNameChange,
	schemaList,
	onSchemaAdd: handleAddSchema,
	onSchemaSelect: handleSchemaSelect,
	onSchemaDelete: handleSchemaDelete,

	onAddSession: handleAddSession,
}) => {

	const chosenSchemaKeys = Object.keys(schemaList);
	const allSchemaKeys = Object.keys(userSchemas);

	return (
		<div className={styles.popupAddProjectScreen}>
			<h2 className={styles.popupAddProjectHeader}>Add Session to {projectName}</h2>
			<form className={styles.popupAddProjectForm}>
				<div className={styles.addProjectTitle}>
					<label>Session Name</label>
				</div>
				<div className={styles.addProjectTitleInput}>
					<input
						type='text'
						placeholder="session name..."
						onChange={(e)=>{
							handleSessionNameChange(e.target.value);
						}}
						value={sessionName}
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
						{allSchemaKeys.map((schemaId) => {
							return (
								<option
									key={schemaId}
									value={userSchemas[schemaId].name}
								>
									{userSchemas[schemaId].name}
								</option>
							);
						})}
					</select>
					<button onClick={handleAddSchema}>Add</button>
				</div>
				<div className={styles.addProjectSelectSchemaWrapper}>
					<ul>
						{/* Selected options go here */}

						{chosenSchemaKeys.map((schemaId, index) => {
							return (
								<li
									key={index}
									value={userSchemas[schemaId].name}
								>
									{userSchemas[schemaId].name}
									<button onClick={(e) => handleSchemaDelete(e, schemaId)}>
										Remove
									</button>
								</li>
							);
						})}
					</ul>
				</div>

				<div className={styles.addProjectAddButtonWrapper}>
					<CreateSessionButton buttonStyle='main-button' onClick={handleAddSession} />
				</div>
			</form>
		</div>
	);
};

export default AddSession;
