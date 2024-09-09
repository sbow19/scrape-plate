import React from 'react';
import CaptureView from '#components/side_panel/schema_capture/schema_capture_view';


const CaptureViewContainer: React.FC = ({children}) => {
	return (
		<>
		    {/* CaptureView component */}
			<CaptureView />

			{/* Grid to populate */}
			{children}
		</>
	);
};

export default CaptureViewContainer;