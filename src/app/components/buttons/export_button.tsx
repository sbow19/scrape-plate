import React from 'react';
import ButtonTemplate from './button_template';
import { useAppDispatch } from 'app/utils/hooks';
import { changeView } from '#ducks/features/navigation/navigationSlice';

const ExportButton: React.FC = ({id, currentView})=>{

    const dispatch = useAppDispatch()

    // Add Project button click event handler goes here
    const ExportHandler = ()=>{
        // Add Project logic goes here
        dispatch(changeView({currentView:"add_project", viewParams: null}))
    }

    return(
        <ButtonTemplate onClick={ExportHandler} buttonStyle="main-content">Export</ButtonTemplate>
    )
}

export default ExportButton;