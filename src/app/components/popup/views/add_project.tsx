/**
 * Add project view component for Chrome Extension popup
 */

import React from 'react';
import * as styles from '#styles/popup.module.css';

import CreateProjectButton from '#components/buttons/create_project_button';

const AddProject: React.FC = ({userSchemas}) => {
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

				<div className={styles.addProjectSchemas}>
					<label>Select Schemas</label>
					<select> 
                        <option value="" disabled selected>Select a schema...</option>
                        {userSchemas.map(schema=>{
                            return(
                                <option key={schema.id} value={schema.id}>{schema.name}</option>
                            )
                        })}
                    </select>
				</div>
				<div className={styles.addProjectSelectSchemaWrapper}>
					<ul>{/* Selected options go here */}</ul>
				</div>

				<div className={styles.addProjectSchemas}>
					<label>Add Sessions</label>
					<input
						type='text'
						placeholder='Session Name...'
					/>
					<button>Add</button>
				</div>

				<div className={styles.addProjectSelectSessionsWrapper}>
					<ul>{/* Selected sessions go here */}</ul>
				</div>

                <div className={styles.addProjectAddButtonWrapper}>
				    <CreateProjectButton buttonStyle="main-button" />
                </div>
				
			</form>
		</div>
	);
};

export default AddProject;
