import React from 'react';
import ButtonTemplate from './button_template';
import { useAppDispatch } from 'app/utils/hooks';
import { changeView } from '#ducks/features/navigation/navigationSlice'
import { changeContent } from '#ducks/features/content_container/contentContainerSlice';
import { contentContainerPrefill } from 'app/utils/content_container_boilerplate';

const ViewDetailsButton: React.FC<ViewDetailsButton> = ({children, id, targetView})=>{

    const dispatch = useAppDispatch()

    // Add Project button click event handler goes here
    const ViewDetailsHandler = ()=>{
        // Add Project logic goes here
        if(targetView === "manage_schema"){
            dispatch(changeView({currentView: targetView, viewParams: {schemaId: id}}))
        } else if (targetView === "manage_session"){
            dispatch(changeContent(contentContainerPrefill.manageSession))
            dispatch(changeView({currentView: targetView, viewParams: {sessionId: id}}))
            
        } else if (targetView === "manage_project"){
            dispatch(changeContent(contentContainerPrefill.manageProject))
            dispatch(changeView({currentView: targetView, viewParams: {
                id: "",
                name: "",
                sessionNames: [],
                projectSchemas: []
            }}))
            
        }
        
    }

    return(
        <ButtonTemplate onClick={ViewDetailsHandler}>{children}</ButtonTemplate>
    )
}

export default ViewDetailsButton;