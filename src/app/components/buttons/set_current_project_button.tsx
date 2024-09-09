import React from 'react';
import ButtonTemplate from './button_template';
import { useAppDispatch } from 'app/utils/hooks';
import { changeCurrentProject } from '#ducks/features/current_project/currentProjectSliceThunks';
import { changeView } from '#ducks/features/navigation/navigationSlice';
import { toast } from 'react-toastify';

const SetCurrentProjectButton: React.FC = ({id: projectId}) => {
	const dispatch = useAppDispatch();

	// Change Project button click event handler goes here
	const SetProjectHandler = async () => {
		//Change current project state
		try {
			const newCurrentProjectDetails = await dispatch(changeCurrentProject(projectId)).unwrap();

			//Update view params to ensure that current project details is available throughout app
			dispatch(
				changeView({
					viewParams: {
						...newCurrentProjectDetails,
						lastSchema: null,
						lastSession: null,
						lastModified: null,
					},
					currentView: 'current_project',
				}),
			);
			toast.success('Current project changed successfully', {
				autoClose: 500,
				hideProgressBar: true
			});
		} catch (e) {
			console.log(e);
			toast.error('Could not change current project', {
				autoClose: 500,
				hideProgressBar: true
			});
		}
	};

	return (
		<ButtonTemplate onClick={SetProjectHandler}>
			Set Current Project
		</ButtonTemplate>
	);
};

export default SetCurrentProjectButton;
