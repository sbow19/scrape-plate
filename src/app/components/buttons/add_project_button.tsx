import React from 'react';
import ButtonTemplate from './button_template';
import { useAppDispatch, useAppSelector } from 'app/utils/hooks';
import { changeView } from '#ducks/features/navigation/navigationSlice';

const AddProjectButton: React.FC = ({id, currentView,  buttonStyle})=>{

    const dispatch = useAppDispatch()


    // Add Project button click event handler goes here
    const AddProjectHandler = ()=>{
        // Add Project logic goes here
        dispatch(changeView({currentView:"add_project", viewParams: null}))
    }

    return(
        <ButtonTemplate onClick={AddProjectHandler} buttonStyle={buttonStyle}>Add Project</ButtonTemplate>
    )
}

export default AddProjectButton;