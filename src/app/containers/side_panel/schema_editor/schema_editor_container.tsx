/* Stateful container of side panel container component */
import React from 'react';
import EditSchema from '#components/side_panel/schema_editor/schema_editor';


const EditSchemaContainer: React.FC = ({children}) => {
	return (
		<>
			{/* Details about schema */}
			<EditSchema />
			{/* Grid to populate */}
			{children}
		</>
	);
};

export default EditSchemaContainer;