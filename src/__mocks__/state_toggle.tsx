import React from 'react';
import { useAppDispatch } from 'app/utils/hooks';
import { changeView } from '#ducks/features/navigation/navigationSlice';
import { projectDetails } from './dummyData';

const StateToggle: React.FC = () => {
	const dispatch = useAppDispatch();

	return (
		<button
			onClick={() =>
				dispatch(changeView({ currentView: 'current_project', viewParams: projectDetails }))
			}
		>
			Toggle State
		</button>
	);
};

export default StateToggle;
