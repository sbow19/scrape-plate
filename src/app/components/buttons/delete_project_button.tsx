import React from 'react';
import ButtonTemplate from './button_template';
import { useAppDispatch, useAppSelector } from 'app/utils/hooks';
import { removeProject } from '#ducks/features/projects/projectSliceThunks';
import { toast } from 'react-toastify';
import { removeCurrentProject } from '#ducks/features/current_project/currentProjectSliceThunks';

// import { changeView } from '#ducks/features/navigation/navigationSlice';

const DeleteProjectButton: React.FC = ({ id, currentView, buttonStyle }) => {
	const dispatch = useAppDispatch();

	//Get current project data
	const currentProject = useAppSelector((state) => state.currentProject);

	// Delete Project button click event handler goes here
	const DeleteHandler = async () => {
		//Message Service Worker to trigger removal

		try {
			await dispatch(removeProject(id)).unwrap();

			toast.success('Project successfully deleted');

			//Set current project to default if deleted project is current project
            if (id === currentProject.id) {
                // dispatch(changeView('projects'));
                dispatch(removeCurrentProject());
            }
		} catch (e) {
			console.log(e);

			toast.error('Project could not be deleted');
		}
	};

	return (
		<ButtonTemplate
			onClick={DeleteHandler}
			buttonStyle={buttonStyle}
		>
			Delete Project
		</ButtonTemplate>
	);
};

export default DeleteProjectButton;
