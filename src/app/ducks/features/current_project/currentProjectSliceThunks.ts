/* Thunks for managing current project state */
import { createAsyncThunk } from "@reduxjs/toolkit";
import ServiceWorkerDBCalls from "app/utils/chrome_helpers/indexed_db";

export const changeCurrentProject = createAsyncThunk(
    "currentProject/changeProject",
    async (projectId: ProjectId)=>{

        try{
            const projectDetails: ProjectDetails = await ServiceWorkerDBCalls.changeCurrentProject(projectId);

            return projectDetails

        }catch(e){

            console.log(e);
            throw new Error("Failed to set current project");
        }
    }
);

export const changeCurrentProjectDetails = createAsyncThunk(
    "currentProject/changeProjectDetails",
    async (newCurrentProjectDetails: CurrentProjectDetails)=>{


        try{
            const response = await ServiceWorkerDBCalls.changeCurrentProjectDetails(newCurrentProjectDetails);

            if(response.success){
                return newCurrentProjectDetails
            } else {
                throw new Error("")
            }

        }catch(e){

            console.log(e);
            throw new Error("Failed to set current project details");
        }
    }
);

export const removeCurrentProject = createAsyncThunk(
    "currentProject/removeProject",
    async ()=>{

        try{
            await ServiceWorkerDBCalls.removeCurrentProject();

            return

        }catch(e){

            console.log(e);
            throw new Error("Failed to remove current project");
        }
    }
)

export const getCurrentProject  = createAsyncThunk(
    "currentProject/getCurrentProject",
    async()=>{

        try{
            const currentProjectDetails = await ServiceWorkerDBCalls.getCurrentProject();

            return currentProjectDetails

        }catch(e){

            console.log(e);
            throw new Error("Failed to get current project");
        }

    }
)

export const removeCurrentProjectSession = createAsyncThunk(
    "currentProject/removeSession",
    async (sessionId: SessionId)=>{

        try{
            const result = await ServiceWorkerDBCalls.removeCurrentSession(sessionId);

            return sessionId;

        }catch(e){

            console.log(e);
            throw new Error("Failed to remove current session");
        }
    }
)
