/**
 * Manage projects  from storage
 * */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import  { fetchAllProjects, addProject, removeProject, removeSession, addSession } from './projectSliceThunks'


const initialState: ProjectListFetch = {
    projectList: {},
    isLoading: false,
    isError: false
};

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {

        updateAllProjects: (state, action: PayloadAction<ProjectsList>)=>{

            state.projectList = action.payload;

        }

   
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
            state.isLoading = false;
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
            state.isLoading = false;
        })
        .addCase(removeProject.rejected, (state)=>{
            
            state.isError = false;
            state.isLoading = false;
            
        })

        //Remove session
        .addCase(removeSession.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(removeSession.fulfilled, (state, action)=>{

            //Remove session if successfully removed from Indexed db
            state.projectList[action.payload?.id] = action.payload; //Update the updated project
            state.isLoading = false;
        })
        .addCase(removeSession.rejected, (state)=>{
            
            state.isLoading = false;
            
        })

        //Add session
        .addCase(addSession.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(addSession.fulfilled, (state, action)=>{

            // Replace altered project list if successfully removed from Indexed db
            state.projectList[action.payload?.id] = action.payload; //Update the updated project
            state.isLoading = false;
        })
        .addCase(addSession.rejected, (state)=>{
            
            state.isLoading = false;
            
        })
    }
});

export const { updateAllProjects } = projectsSlice.actions;

export default projectsSlice.reducer;