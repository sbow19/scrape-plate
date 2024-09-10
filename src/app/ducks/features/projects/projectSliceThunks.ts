/* Thunks for managing projects state */
import { createAsyncThunk } from "@reduxjs/toolkit";
import ServiceWorkerDBCalls from "app/utils/chrome_helpers/indexed_db";
import {
	popView,
	removeSessionFromNavStack,
    addSessionToNavStack
} from '#ducks/features/navigation/navigationSlice';
import { changeContent } from '#ducks/features/content_container/contentContainerSlice';
import { contentContainerPrefill } from 'app/utils/content_container_boilerplate';




//Project logic
export const fetchAllProjects = createAsyncThunk(
    "projects/fetchAll",
    async ()=>{

        try{
            const allProjects = await ServiceWorkerDBCalls.fetchAllProjects();

            //Convert project details array to a project lists object
            /**
             * Add code here
             */

            const projectListTemplate: ProjectsList = {}

            const projectList: ProjectsList = allProjects.reduce((list, project)=>{
                list[project.id] = project;
                return list;
            }, projectListTemplate);


            return projectList;
        }catch(e){

            console.log(e);
            throw new Error("Failed to fetch projects");
        }
    }
);

export const addProject = createAsyncThunk(
    'projects/addProject',
    async (projectDetails: ProjectDetails)=>{
        try{

            const result = await ServiceWorkerDBCalls.addProject(projectDetails);

            console.log(result)

            if(result.success){
                return projectDetails
            } else {
                throw new Error("Failed to add project");
            }

        }catch(e){

            console.log(e);
            throw new Error("Failed to add project");

        }
    }
);

export const removeProject = createAsyncThunk(
    'projects/removeProject',
    async (projectId: ProjectId)=>{
        try{

            const result = await ServiceWorkerDBCalls.removeProject(projectId);
            if(result.success){
                return projectId
            } else {
                throw new Error("Failed to remove project");
            }

        }catch(e){

            console.log(e);
            throw new Error("Failed to remove project");

        }
    }
)

//Session logic
export const addSession = createAsyncThunk(
    'projects/addSession',
    async (sessionDetails: SessionDetails, {dispatch, getState})=>{
        try{

            //Add session to project list in backend
            const { data: newProjectDetails } = await ServiceWorkerDBCalls.addSession(sessionDetails);

            //Need to update the navigation stack recursively to remove session
			dispatch(addSessionToNavStack(newProjectDetails));

            //Go back to manage project view
			dispatch(popView());

            //Get current stack
            const store = getState();
            const currentStack: NavigationStackArray = store.navigation.currentStack
            const viewParams = currentStack[currentStack.length - 1].viewParams;

            //Change content in content view, if necessary
            dispatch(changeContent({
                ...contentContainerPrefill.manageProject, //Fill out manage project content
                names: ['Project', viewParams.name],
				id: viewParams.id, //Project id in manage project view
                tableRowData: Object.values(viewParams.sessionNames ?? {}).map((session) => {
                    return {
                        name: session.name,
                        id: session.id,
                        description: session.lastModified,
                    };
                })
            }));

            return newProjectDetails;

        }catch(e){

            console.log(e);
            throw new Error("Failed to add session");

        }
    }
);

export const removeSession = createAsyncThunk(
    'projects/removeSession',
    async (sessionIdObject: SessionIdObject, {dispatch, getState})=>{
    
        try{

            //Remove session and fetch updated project list
            const result = await ServiceWorkerDBCalls.removeSession(sessionIdObject.projectId, sessionIdObject.sessionId);
        
            //Need to update the navigation stack recursively to remove session
			dispatch(removeSessionFromNavStack(sessionIdObject));

            //Go back one in the nav stack
			dispatch(popView());

            //Get current stack
            const store = getState();
            const currentStack: NavigationStackArray = store.navigation.currentStack
            const viewParams = currentStack[currentStack.length - 1].viewParams;

            //Change content in content view, if necessary
            dispatch(changeContent({
                ...contentContainerPrefill.manageProject, //Most recent view params
                names: ['Project', viewParams.name],
				id: sessionIdObject.projectId,
                tableRowData: Object.values(viewParams.sessionNames ?? {}).map((session) => {
                    return {
                        name: session.name,
                        id: session.id,
                        description: session.lastModified,
                    };
                })
            }));


            return result.data


        }catch(e){

            console.log(e);
            throw new Error("Failed to remove session");

        }
    }
)