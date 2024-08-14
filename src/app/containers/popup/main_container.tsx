/* Stateful container of popup container component */
import React from 'react';
import MainPopupView from '#components/popup/main';
import { useAppSelector } from 'app/utils/hooks';

const MainPopupViewContainer: React.FC = () => {

	const currentView = useAppSelector((state) => state.navigation.currentView);
	return (
		<>
			<MainPopupView currentView={currentView}/>
		</>
	);
};

export default MainPopupViewContainer;
