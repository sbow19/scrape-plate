import React from 'react';
import ButtonTemplate from './button_template';
// import { useAppDispatch } from 'app/utils/hooks';
// import { changeView } from '#ducks/features/navigation/navigationSlice';

const DeleteProjectButton: React.FC = ({id, currentView, buttonStyle})=>{

    // const dispatch = useAppDispatch()

    // Delete Project button click event handler goes here
    const DeleteHandler = ()=>{
        // Delete project logic here
        
    }

    return(
        <ButtonTemplate onClick={DeleteHandler} buttonStyle={buttonStyle}>Delete Project</ButtonTemplate>
    )
}

export default DeleteProjectButton;