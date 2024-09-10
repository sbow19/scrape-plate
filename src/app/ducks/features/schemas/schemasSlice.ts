/**
 * Manage schemas from storage
 * */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllSchemas, addSchema } from "./schemaSliceThunks";


const initialState: SchemaList = {};

export const schemasSlice = createSlice({
    name: "schemas",
    initialState,
    reducers: {


    },
    extraReducers: (builder)=>{
        //Fetch all schemas
        builder
        .addCase(fetchAllSchemas.pending, ()=>{
        })
        .addCase(fetchAllSchemas.fulfilled, (state, action)=>{
            //Fetch all schemas to schema list if successful
            state = action.payload;
        })
        .addCase(fetchAllSchemas.rejected, ()=>{
        })

        //Add Schema
        .addCase(addSchema.pending, ()=>{
        })
        .addCase(addSchema.fulfilled, (state, action)=>{

            //Set new property of schema list object
            state[action.payload.id] = action.payload;
        })
        .addCase(addSchema.rejected, ()=>{
        })
    }
});

export default schemasSlice.reducer;