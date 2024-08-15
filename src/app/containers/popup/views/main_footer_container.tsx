/* Stateful container of popup container component */
import React from 'react';
import MainFooter from '#components/popup/views/main_footer'
import { useAppDispatch } from 'app/utils/hooks';
import { changeView } from '#ducks/features/navigation/navigationSlice';
import { projectsList } from '#mocks/dummyData';
import { changeContent } from '#ducks/features/content_container/contentContainerSlice';
import { contentContainerPrefill } from 'app/utils/content_container_boilerplate';

const MainFooterContainer: React.FC = () => {

    const dispatch = useAppDispatch();

    const handleManageProjectsClick = () => {
        
        dispatch(changeContent(contentContainerPrefill.allProjects))
        dispatch(changeView({
            currentView: 'all_projects',
            viewParams: {
                projectsList: projectsList
            }
        }))

        
    };

	return (<MainFooter onManageProjectsClick={handleManageProjectsClick}/>);
};

export default MainFooterContainer;