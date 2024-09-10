import React from 'react';
import CaptureView from '#components/side_panel/schema_capture/schema_capture_view';
import SidePanelGridContainer from '../shared/side_panel_grid_container';


const CaptureViewContainer: React.FC = ({children}) => {
	return (
		<>
		    {/* CaptureView component */}
			<CaptureView />

			{/* Grid to populate */}
			<SidePanelGridContainer />
		</>
	);
};

export default CaptureViewContainer;