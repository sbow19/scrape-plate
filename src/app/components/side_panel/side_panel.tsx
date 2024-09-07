/**
 * Side panel for Chrome Extension popup
 */

import React from 'react';
import * as styles from '#styles/side_panel.module.css';
import SchemaEditorContainer from '#containers/side_panel/schema_form/schema_editor_container';
import SchemaCaptureViewContainer from '#containers/side_panel/schema_capture/schema_capture_view_container';

const SidePanelView: React.FC<SidePanelProps> = ({ currentView }) => {

	let content = <></>;

	if(currentView === "schema_editor"){

		content = <SchemaEditorContainer/>

	}else if (currentView === "schema_capture"){

		content = < SchemaCaptureViewContainer/>
	}



	return (
		<>
			{/* Render children based on previous interactions*/}
			<main
				aria-label='Side Panel view'
				className={styles.sidePanelContainer}
			>
				<h1>Quick Scrape</h1>
				{/* Render scrape view or editor  */}
				{content}
				
				
			</main>
		</>
	);
};

export default SidePanelView;
