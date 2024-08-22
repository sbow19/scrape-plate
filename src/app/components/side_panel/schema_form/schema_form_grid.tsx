import React from 'react'
import SchemaFormRowContainer from '#containers/side_panel/schema_form/schema_form_row_container';
import * as styles from '#styles/side_panel.module.css';

const SchemaFormGrid = () => {
	return (
		<section className={styles.sidePanelSchemaFormGrid}>
			<h3>schema</h3>
			<table className={styles.sidePanelSchemaTable}>
				<thead>
					<tr>
						<th>Key</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					{/* Populate with row components */}
					<SchemaFormRowContainer />
				</tbody>
			</table>
			<button> Save Changes</button>
		</section>
	);
};

export default SchemaFormGrid;