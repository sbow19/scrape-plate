/**
 * Manage navigation state and parameters associated with navigation
 * */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NavigationState = {
    currentView: "welcome",
    viewParams: null
};

export const navigationSlice = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        changeView: (state: NavigationState, action: PayloadAction<NavigationState>) => {
            state.currentView = action.payload.currentView;

            /* If payload contains view params, then add those to state */
            if(action.payload?.viewParams){
                state.viewParams = action.payload.viewParams;
            }
        }
    }
});

export const { changeView } = navigationSlice.actions;

export default navigationSlice.reducer;