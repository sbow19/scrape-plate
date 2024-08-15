import React from 'react';
import { useAppSelector } from 'app/utils/hooks';
import AllProjectsScreen from '#components/popup/views/manage_projects_screen';

const AllProjectsScreenContainer: React.FC = () => {

    //Fetch all projects data in state
    const { currentView, viewParams}  = useAppSelector((state)=>state.navigation);

    console.log(currentView)

    if(currentView === "all_projects"){
        //Display projects based on viewParams
        return <AllProjectsScreen projectsList={viewParams.projectsList}/>;
    } else {
        //If not in all_projects view, display a message
        return <p>Error</p>;
    }

};

export default AllProjectsScreenContainer;
