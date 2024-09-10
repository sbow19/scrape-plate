/**
 * Side panel for Chrome Extension popup
 */

import React from 'react';
import * as styles from '#styles/side_panel.module.css';
import EditSchemaContainer from '#containers/side_panel/schema_editor/schema_editor_container';
import CaptureViewContainer from '#containers/side_panel/schema_capture/schema_capture_view_container';
import CreatorViewContainer from '#containers/side_panel/schema_creator/schema_creator_view_container';


const SidePanelView: React.FC<SidePanelProps> = ({ currentView }) => {

	//Default content
	let detailsContainer = <></>;
	let heading = '';

	if (currentView === 'schema_editor') {
		heading = 'Edit Schema';
		detailsContainer = (
			<EditSchemaContainer/>
		);
	} else if (currentView === 'schema_capture') {
		heading = 'Review Capture';
		detailsContainer = (
			<CaptureViewContainer/>
		);
	} else if (currentView === 'schema_creator') {
		heading = 'Create Schema';
		detailsContainer = (
			<CreatorViewContainer />
	
		);
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
				<form className={styles.schemaCreatorContainer}>
					<h2> {heading} </h2>
					{/* */}
					{detailsContainer}
				</form>
			</main>
		</>
	);
};

export default SidePanelView;
