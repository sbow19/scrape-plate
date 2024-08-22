/**
 * Manage schemas from storage
 * */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllSchemas, addSchema, removeSchema } from "./schemaSliceThunks";


const initialState: SchemaList = {};

export const schemasSlice = createSlice({
    name: "schemas",
    initialState,
    reducers: {

    },
    extraReducers: (builder)=>{
        //Fetch all schemas
        builder.addCase(fetchAllSchemas.fulfilled, (state, action)=>{
            state = action.payload;
            return state
        })
        
        //Add a new schema
        builder.addCase(addSchema.fulfilled, (state, action)=>{
            //Add new schema to schema list if  successful
            state[action.payload.id] = action.payload;
        })

        //Remove a schema
        builder.addCase(removeSchema.fulfilled, (state, action)=>{
            //Remove schema if successful
            delete state[action.payload];
        })
    }
});

export default schemasSlice.reducer;