/* Stateful container of popup container component */
import React from 'react';
import MainFooter from '#components/popup/views/main_footer';
import { useAppDispatch, useAppSelector } from 'app/utils/hooks';
import { changeView } from '#ducks/features/navigation/navigationSlice';
// import { projectsList } from '#mocks/dummyData';
import { changeContent } from '#ducks/features/content_container/contentContainerSlice';
import { contentContainerPrefill } from 'app/utils/content_container_boilerplate';

const MainFooterContainer: React.FC = () => {
	const dispatch = useAppDispatch();

	//Fetch projects list data
	const projectList = useAppSelector((state) => state.projects);

    //Content container param
    const contentContainerPrefillAllProjects: ContentContainerPrefillItem = {
        ...contentContainerPrefill.allProjects,
        tableRowData: Object.values(projectList.projectList).map(((project) => {
			return { name: project.name, id: project.id, description: project.lastModified};
		}))
    }

	const handleManageProjectsClick = () => {
		dispatch(
			changeContent(contentContainerPrefillAllProjects),
		);
		dispatch(
			changeView({
				currentView: 'all_projects',
				viewParams: {
					projectsList: projectList,
				}
			}),
		);
	};

	return <MainFooter onManageProjectsClick={handleManageProjectsClick} />;
};

export default MainFooterContainer;
