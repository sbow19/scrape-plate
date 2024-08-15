/**
 * Manage content displayed in manage content views (Manage rpojects, project, session, schemas etc)
 * */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { contentContainerPrefill } from "app/utils/content_container_boilerplate";

const initialState = contentContainerPrefill.allProjects;

export const contentContainerSlice = createSlice({
    name: "content_container",
    initialState,
    reducers: {
        changeContent: (state: ContentContainerPrefillItem, action: PayloadAction<ContentContainerPrefillItem>) => {
            state = action.payload;
            return state      
        }
    }
});

export const { changeContent } = contentContainerSlice.actions;

export default contentContainerSlice.reducer;