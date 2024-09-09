import React from 'react';
import CreatorView from '#components/side_panel/schema_creator/schema_creator_view';


const CreatorViewContainer: React.FC = ({children}) => {
	return (
		<>
		    {/* Creator View component */}
			<CreatorView />

			{/* Grid to populate */}
			{children}
		</>
	);
};

export default CreatorViewContainer;