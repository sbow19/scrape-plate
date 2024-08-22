import React from 'react'
import SchemaCaptureRowContainer from '#containers/side_panel/schema_capture/schema_capture_row_container';
import * as styles from '#styles/side_panel.module.css';

const SchemaCaptureGrid = () => {
	return (
		<section className={styles.sidePanelSchemaFormGrid}>
			<h3>Captured Content</h3>
			<table className={styles.sidePanelSchemaTable}>
				<thead>
					<tr>
						<th>Key</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					{/* Populate with row components */}
					<SchemaCaptureRowContainer />
				</tbody>
			</table>
			<button> Save Capture</button>
		</section>
	);
};

export default SchemaCaptureGrid;