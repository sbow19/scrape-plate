import React from 'react';
import ButtonTemplate from './button_template';
import { useAppDispatch } from 'app/utils/hooks';
// import { changeCurrentProject } from '#ducks/features/navigation/currentProjectSlice';

const SetCurrentProjectButton: React.FC = ()=>{

    const dispatch = useAppDispatch()

    // Add Project button click event handler goes here
    const SetProjectHandler = ()=>{
        // Add Project logic goes here
        dispatch(changeCurrentProject({}))
    }

    return(
        <ButtonTemplate onClick={SetProjectHandler}>Set Current Project</ButtonTemplate>
    )
}

export default SetCurrentProjectButton;