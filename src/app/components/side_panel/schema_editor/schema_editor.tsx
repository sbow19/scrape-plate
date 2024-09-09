//Schema editor component here

import React from 'react';
import * as styles from '#styles/side_panel.module.css';

const EditSchema = () => {
	return (
		<ul className={styles.sidePanelSchemaDetailsContainer}>
			<li>
				<div>
					<label>Schema Name:</label>
				</div>
				<div>
					<span></span>
				</div>
				<div>
					<button>View Schema</button>
				</div>
			</li>
			<li>
				<div>
					<label>Target URL:</label>
				</div>
				<div>
					<span></span>
				</div>
			</li>
		</ul>
	);
};

export default EditSchema;
