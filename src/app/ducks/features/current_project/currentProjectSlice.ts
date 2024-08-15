/**
 * Manage current project state
 */
import { emptyProjectDetails } from "#mocks/dummyData";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CurrentProjectDetails = emptyProjectDetails;

export const currentProjectSlice = createSlice({
    name: "current_project",
    initialState,
    reducers: {
        changeProjectDetails: (state, action) => {
            state = action.payload;      
            return state
        },
        changeProject: (state, action) => {
            state = action.payload;     
            return state 
        }
    }
});

export const { changeProject, changeProjectDetails } = currentProjectSlice.actions;

export default currentProjectSlice.reducer;