import React from 'react';
import ButtonTemplate from './button_template';
import { useAppDispatch } from 'app/utils/hooks';
import { changeView } from '#ducks/features/navigation/navigationSlice';

const EditSchemaButton: React.FC = ({id, currentView})=>{

    const dispatch = useAppDispatch()

    // Add Project button click event handler goes here
    const EditSchemaHandler = ()=>{
        // Add Project logic goes here
        dispatch(changeView({currentView:"welcome", viewParams: null}))
    }

    return(
        <ButtonTemplate onClick={EditSchemaHandler} buttonStyle="main-content">Edit Schema</ButtonTemplate>
    )
}

export default EditSchemaButton;