/**
 * Manage projects  from storage
 * */
import { createSlice } from "@reduxjs/toolkit";
import  { fetchAllProjects, addProject, removeProject } from './projectSliceThunks'


const initialState: ProjectListFetch = {
    projectList: [],
    isLoading: false,
    isError: false
};

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {

   
    },
    extraReducers: (builder)=>{
        //Fetch all projects
        builder.addCase(fetchAllProjects.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(fetchAllProjects.fulfilled, (state, action)=>{
            //Pending sets loading element
            state.projectList = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchAllProjects.rejected, (state)=>{
            //Pending sets loading element
            state.isError = true;
        })
        
        //Add a new project
        .addCase(addProject.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(addProject.fulfilled, (state, action)=>{
            //Add new project to project list if successful
            state.isLoading = false
            state.projectList[action.payload.id] = action.payload;
            
        })
        .addCase(addProject.rejected, (state)=>{
            //Add new project to project list if successful
            state.isError = true;
            state.isLoading = false;
        })

        //Remove a project
        .addCase(removeProject.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(removeProject.fulfilled, (state, action)=>{
            //Remove project if successful
            delete state.projectList[action.payload];
        })
        .addCase(removeProject.rejected, (state)=>{
            
            state.isError = false;
            
        })
    }
});

export const { } = projectsSlice.actions;

export default projectsSlice.reducer;