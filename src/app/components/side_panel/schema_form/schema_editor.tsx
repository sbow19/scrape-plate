//Schema editor component here

import React from 'react'
import * as styles from '#styles/side_panel.module.css';
import SchemaFormGridContainer from '#containers/side_panel/schema_form/schema_form_grid_container';

const SchemaEditor = () => {
	return (
		<form className={styles.schemaCreatorContainer}>
			<h2> Schema Editor</h2>
			<ul className={styles.sidePanelSchemaDetailsContainer}>
				<li>
					<div>
						<label>Select Schema:</label>
					</div>
					<div>
						<select>
							{/* List of schemas to edit here */}
							<option value='text'>Text</option>
							<option value='number'>Number</option>
							<option value='date'>Date</option>
							<option value='dropdown'>Dropdown</option>
							<option value='checkbox'>Checkbox</option>
							<option value='radio'>Radio</option>
						</select>
					</div>
				</li>
				<li>
					<div>
						<label>Name:</label>
					</div>
					<div>
						<input
							type='text'
							placeholder='Enter schema name'
						/>
					</div>
				</li>
				<li>
					<div>
						<label>URL:</label>
					</div>
					<div>
						<input
							type='text'
							placeholder='Enter URL'
						/>
					</div>
				</li>
			</ul>
			<SchemaFormGridContainer />
		</form>
	);
};

export default SchemaEditor;