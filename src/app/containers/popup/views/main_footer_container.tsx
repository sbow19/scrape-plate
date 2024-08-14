/* Stateful container of popup container component */
import React from 'react';
import MainFooter from '#components/popup/views/main_footer'
import { useAppDispatch } from 'app/utils/hooks';
import { changeView } from '#ducks/features/navigation/navigationSlice';
import { projectsList } from '#mocks/dummyData';

const MainFooterContainer: React.FC = () => {

    const dispatch = useAppDispatch();

    const handleManageProjectsClick = () => {
        // TODO: Implement logic for managing projects
        dispatch(changeView({
            currentView: 'all_projects',
            viewParams: {
                projectsList
            }
        }))
    };

	return (<MainFooter onManageProjectsClick={handleManageProjectsClick}/>);
};

export default MainFooterContainer;