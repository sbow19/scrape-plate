import React from 'react'
import * as styles from '#styles/side_panel.module.css';
import SidePanelGridRow from './side_panel_grid_row';

const SidePanelGrid = () => {
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
                    <SidePanelGridRow />


				</tbody>

				{/* Add or remove row to grid */}
				
			</table>
			<button> Save Capture</button>
		</section>
	);
};

export default SidePanelGrid;