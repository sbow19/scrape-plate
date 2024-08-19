import React from 'react';
import ButtonTemplate from './button_template';
// import { useAppDispatch } from 'app/utils/hooks';
// import { changeView } from '#ducks/features/navigation/navigationSlice';

const DeleteSessionButton: React.FC = ({id, currentView, buttonStyle})=>{

    // const dispatch = useAppDispatch()

    // Delete session button click event handler goes here
    const DeleteHandler = ()=>{
        // Delete session logic here
        
    }

    return(
        <ButtonTemplate onClick={DeleteHandler} buttonStyle={buttonStyle}>Delete Schema</ButtonTemplate>
    )
}

export default DeleteSessionButton;