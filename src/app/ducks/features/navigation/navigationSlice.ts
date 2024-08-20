/**
 * Manage navigation state and parameters associated with navigation
 * */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: NavigationState = {
	currentView: 'welcome',
	viewParams: {},
	currentStack: [],
};

export const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		changeView: (
			state: NavigationState,
			action: PayloadAction<NavigationState>,
		) => {
			state.currentView = action.payload.currentView;

			/* If payload contains view params, then add those to state */
			state.viewParams = action.payload.viewParams;

			state.currentStack.push(action.payload);
            
		},
		popView: (state: NavigationState) => {

			if (state.currentStack.length > 1) {

                state.currentStack = state.currentStack.slice(0, -1)
				
                //Get previous view
				const lastView = state.currentStack[state.currentStack.length - 1];

                //If previous view, then make that the current view
				if (lastView) {
					state.currentView = lastView.currentView;
					state.viewParams = lastView.viewParams;
				}
			}
		},
	},
});

export const { changeView, popView } = navigationSlice.actions;

export default navigationSlice.reducer;
