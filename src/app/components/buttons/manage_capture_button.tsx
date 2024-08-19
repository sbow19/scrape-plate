import React from 'react';
import ButtonTemplate from './button_template';
import { useAppDispatch } from 'app/utils/hooks';
import { changeView } from '#ducks/features/navigation/navigationSlice';

const ManageCaptureButton: React.FC = ({id, currentView, buttonStyle})=>{

    const dispatch = useAppDispatch()

    // Add Project button click event handler goes here
    const ExportHandler = ()=>{
        // Add Project logic goes here
        dispatch(changeView({currentView:"manage_capture", viewParams: null}))
    }

    return(
        <ButtonTemplate onClick={ExportHandler} buttonStyle={buttonStyle}>Manage Capture</ButtonTemplate>
    )
}

export default ManageCaptureButton;