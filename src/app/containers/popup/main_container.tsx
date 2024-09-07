/* Stateful container of popup container component */
import React from 'react';
import MainPopupView from '#components/popup/main';
import { useAppSelector, useAppDispatch } from 'app/utils/hooks';
import { popView } from '#ducks/features/navigation/navigationSlice'
import { contentContainerPrefill } from 'app/utils/content_container_boilerplate';
import { changeContent } from '#ducks/features/content_container/contentContainerSlice';

const MainPopupViewContainer: React.FC<MainContainerProps> = () => {

	const { currentView, currentStack }  = useAppSelector((state) => state.navigation);
	const dispatch = useAppDispatch();

	//
	const handleBack = ()=>{
		dispatch(popView());

		//Change content of content template, if applicable
		const prevViewDetails = currentStack[currentStack.length - 2];
		const prevView = prevViewDetails.currentView;

		switch(prevView){
			case "manage_project":
				dispatch(changeContent(contentContainerPrefill.manageProject));
				break
			case "manage_session":
				dispatch(changeContent(contentContainerPrefill.manageSession));
                break
            case "manage_schema":
				dispatch(changeContent(contentContainerPrefill.manageSchema));
                break
			case "manage_capture":
				break
			case "all_projects":
				dispatch(changeContent(contentContainerPrefill.allProjects));
                break
			case "schemas":
				break
			default:
				break

		}
	};

	return (
		<>
			<MainPopupView currentView={currentView} navigationStack={currentStack} onBack={handleBack}/>
		</>
	);
};

export default MainPopupViewContainer;
