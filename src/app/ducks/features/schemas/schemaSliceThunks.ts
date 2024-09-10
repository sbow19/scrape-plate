/* Thunks for managing projects state */
import { createAsyncThunk } from "@reduxjs/toolkit";
import ServiceWorkerDBCalls from "app/utils/chrome_helpers/indexed_db";
import { updateAllProjects } from "../projects/projectsSlice";

export const fetchAllSchemas = createAsyncThunk(
    "schemas/fetchAll",
    async ()=>{

        try{
            const allSchemas = await ServiceWorkerDBCalls.fetchAllSchemas();

            const schemaListTemplate: SchemaList = {};

            const schemaList: SchemaList = allSchemas.reduce((list, schema)=>{
                list[schema.id] = schema;
                return list;
            }, schemaListTemplate);

            return schemaList;
        }catch(e){

            console.log(e);
            throw new Error("Failed to fetch schemas");

        }

    }
);

export const addSchema = createAsyncThunk(
    'schemas/addSchema',
    async (schemaDetails: SchemaDetailsAdd, {dispatch})=>{
        try{

            const {data: newProjectDetails } = await ServiceWorkerDBCalls.addSchema(schemaDetails);

            const projectListTemplate: ProjectsList = {}

            const projectList: ProjectsList = newProjectDetails.reduce((list, project)=>{
                list[project.id] = project;
                return list;
            }, projectListTemplate);

            //Update project list
            dispatch(updateAllProjects(projectList));

            return schemaDetails

        }catch(e){

            console.log(e);
            throw new Error("Failed to add schema");

        }
    }
);

export const removeSchema = createAsyncThunk(
    'projects/removeSchema',
    async (schemaId: SchemaId)=>{
        try{

            const result = await ServiceWorkerDBCalls.removeSchema(schemaId);
            if(result.success){
                return schemaId
            } else {
                throw new Error("Failed to remove schema");
            }

        }catch(e){

            console.log(e);
            throw new Error("Failed to remove schema");

        }
    }
)