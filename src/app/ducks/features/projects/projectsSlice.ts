/**
 * Manage projects  from storage
 * */
import { createSlice } from "@reduxjs/toolkit";
import  { fetchAllProjects, addProject, removeProject } from './projectSliceThunks'


const initialState: ProjectsList = {};

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
   
    },
    extraReducers: (builder)=>{
        //Fetch all projects
        builder.addCase(fetchAllProjects.fulfilled, (state, action)=>{
            state = action.payload;
            return state
        })
        
        //Add a new project
        builder.addCase(addProject.fulfilled, (state, action)=>{
            //Add new project to project list if  successful
            state[action.payload.id] = action.payload;
        })

        //Remove a project
        builder.addCase(removeProject.fulfilled, (state, action)=>{
            //Remove project if successful
            delete state[action.payload];
        })
    }
});

export const { } = projectsSlice.actions;

export default projectsSlice.reducer;