import React from 'react';
import ButtonTemplate from './button_template';
import { useAppDispatch, useAppSelector } from 'app/utils/hooks';
import { changeView } from '#ducks/features/navigation/navigationSlice';

const AddSessionButton: React.FC = ({buttonStyle})=>{

    const dispatch = useAppDispatch();
    
    const viewParams: ProjectDetails = useAppSelector(state=>state.navigation.viewParams)

    // Add Session button click event handler goes here
    const AddSessionHandler = ()=>{
        // Add Session logic goes here
        dispatch(changeView({currentView:"add_session", viewParams: viewParams}))
    }

    return(
        <ButtonTemplate onClick={AddSessionHandler} buttonStyle={buttonStyle}>Add Session</ButtonTemplate>
    )
}

export default AddSessionButton;