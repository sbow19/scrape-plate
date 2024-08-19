import React from 'react';
import ButtonTemplate from './button_template';
// import { useAppDispatch } from 'app/utils/hooks';
// import { changeView } from '#ducks/features/navigation/navigationSlice';

const CreateProjectButton: React.FC = ({id, currentView, buttonStyle})=>{

    // const dispatch = useAppDispatch()

    // Create Project button click event handler goes here
    const CreateHandler = ()=>{
        // Create project logic here
        
    }

    return(
        <ButtonTemplate onClick={CreateHandler} buttonStyle={buttonStyle}>Add Project</ButtonTemplate>
    )
}

export default CreateProjectButton;