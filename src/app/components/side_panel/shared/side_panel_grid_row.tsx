import React from 'react'
import * as styles from '#styles/side_panel.module.css';

const SidePanelGridRow = () => {
	return (
		<tr>
			
			<td>
				<textarea
					type='text'
					placeholder='Type or find key'
				/>
			</td>
			<td>
				<textarea
					type='text'
					placeholder='Type or find value'
					className={styles.sidePanelSchemaInput}
				/>
			</td>
		</tr>
	);
};

export default SidePanelGridRow;