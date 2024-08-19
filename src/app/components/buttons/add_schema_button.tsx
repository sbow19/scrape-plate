import React from 'react';
import ButtonTemplate from './button_template';
import { useAppDispatch } from 'app/utils/hooks';
import { changeView } from '#ducks/features/navigation/navigationSlice';

const AddSchemaButton: React.FC = ({id, currentView, buttonStyle})=>{

    const dispatch = useAppDispatch()

    // Add Project button click event handler goes here
    const ExportHandler = ()=>{
        // Add Project logic goes here
        dispatch(changeView({currentView:"add_schema", viewParams: null}))
    }

    return(
        <ButtonTemplate onClick={ExportHandler} buttonStyle={buttonStyle}>Add Schema</ButtonTemplate>
    )
}

export default AddSchemaButton;