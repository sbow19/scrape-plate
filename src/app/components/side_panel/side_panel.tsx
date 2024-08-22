/**
 * Side panel for Chrome Extension popup
 */

import React from 'react';
import * as styles from '#styles/side_panel.module.css';
import SchemaEditorContainer from '#containers/side_panel/schema_form/schema_editor_container';
import SchemaCaptureViewContainer from '#containers/side_panel/schema_capture/schema_capture_view_container';

const SidePanelView = (/* Stateful props */) => {
	return (
		<>
			{/* Render children based on previous interactions*/}
			<main
				aria-label='Side Panel view'
				className={styles.sidePanelContainer}
			>
				<h1>Quick Scrape</h1>
				{/* Render scrape view or editor  */}
				{1 === 0 ? <SchemaEditorContainer/> : < SchemaCaptureViewContainer/>}
				
				
			</main>
		</>
	);
};







//Schema editor

export default SidePanelView;
