import React from 'react';
import ButtonTemplate from './button_template';
import { useAppDispatch, useAppSelector } from 'app/utils/hooks';
import { toast } from 'react-toastify';
import { removeSession } from '#ducks/features/projects/projectSliceThunks';
import { removeCurrentProjectSession } from '#ducks/features/current_project/currentProjectSliceThunks';


const DeleteSessionButton: React.FC = ({
	sessionId,
	projectId,
	currentView,
	buttonStyle,
}) => {
	const dispatch = useAppDispatch();

	//Get current project data
	const currentProject = useAppSelector((state) => state.currentProject);

    //Get view params

	// Delete session button click event handler goes here
	const DeleteHandler = async () => {
		// Delete session logic here

		const sessionIdObject: SessionIdObject = {
			sessionId: sessionId,
			projectId: projectId,
		};

		try {
			await dispatch(removeSession(sessionIdObject)).unwrap();

			//If the session is in the current project, then we need to remove that separately
			if (projectId === currentProject?.id) {
				// dispatch(changeView('projects'));
				await dispatch(removeCurrentProjectSession(sessionId));
			}

			toast.success('Session successfully deleted');
			
		} catch (e) {
			console.log(e);

			toast.error('Session could not be deleted');
		}
	};

	return (
		<ButtonTemplate
			onClick={DeleteHandler}
			buttonStyle={buttonStyle}
		>
			Delete Session
		</ButtonTemplate>
	);
};

export default DeleteSessionButton;
