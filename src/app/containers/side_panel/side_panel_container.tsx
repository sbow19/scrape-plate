/* Stateful container of popup container component */
import React from 'react';
import SidePanelView from '#components/side_panel/side_panel';
import { useAppSelector  } from 'app/utils/hooks';


const SidePanelContainer: React.FC<SidePanelContainerProps> = () => {

	const { currentView }  = useAppSelector((state) => state.navigation);

	return (
		<>
			<SidePanelView currentView={currentView}/>
		</>
	);
};

export default SidePanelContainer;
