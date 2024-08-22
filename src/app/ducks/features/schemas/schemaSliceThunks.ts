/* Thunks for managing projects state */
import { createAsyncThunk } from "@reduxjs/toolkit";
import ServiceWorkerDBCalls from "app/utils/chrome_helpers/indexed_db";

export const fetchAllSchemas = createAsyncThunk(
    "schemas/fetchAll",
    async ()=>{

        try{
            const allSchemas = await ServiceWorkerDBCalls.fetchAllSchemas();
            return allSchemas;
        }catch(e){

            console.log(e);
            throw new Error("Failed to fetch schemas");

        }
        

    }
);

export const addSchema = createAsyncThunk(
    'schemas/addSchema',
    async (schemaDetails: SchemaDetails)=>{
        try{

            const result = await ServiceWorkerDBCalls.addSchema(schemaDetails);

            if(result.success){
                return schemaDetails
            } else {
                throw new Error("Failed to add schema");
            }

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