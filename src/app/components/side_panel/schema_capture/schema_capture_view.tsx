import React from 'react'
import * as styles from '#styles/side_panel.module.css';
import SchemaCaptureGridContainer from '#containers/side_panel/schema_capture/schema_capture_grid_container';

const SchemaCaptureView = ()=>{

    return (
		<form className={styles.schemaCreatorContainer}>
			<h2> Review Capture </h2>
			<ul className={styles.sidePanelSchemaDetailsContainer}>
				
				<li>
					<div>
						<label>Schema Name:</label>
					</div>
					<div>
						<span>Placeholder Schema Name</span>
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
						<span>Placeholder Schema Name</span>
					</div>
				</li>
			</ul>
            <SchemaCaptureGridContainer/>
			
		</form>
	);
}

export default SchemaCaptureView