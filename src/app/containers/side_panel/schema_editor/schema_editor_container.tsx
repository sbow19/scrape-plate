/* Stateful container of side panel container component */
import React from 'react';
import EditSchema from '#components/side_panel/schema_editor/schema_editor';
import SidePanelGridContainer from '../shared/side_panel_grid_container';


const EditSchemaContainer: React.FC = ({children}) => {
	return (
		<>
			{/* Details about schema */}
			<EditSchema />
			{/* Grid to populate */}
			<SidePanelGridContainer/>
		</>
	);
};

export default EditSchemaContainer;