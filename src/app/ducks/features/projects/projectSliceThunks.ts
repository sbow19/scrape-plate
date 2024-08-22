/* Thunks for managing projects state */
import { createAsyncThunk } from "@reduxjs/toolkit";
import ServiceWorkerDBCalls from "app/utils/chrome_helpers/indexed_db";

export const fetchAllProjects = createAsyncThunk(
    "projects/fetchAll",
    async ()=>{

        try{
            const allProjects = await ServiceWorkerDBCalls.fetchAllProjects();
            return allProjects;
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