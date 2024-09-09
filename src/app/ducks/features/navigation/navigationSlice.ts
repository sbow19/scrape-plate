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
				//Get previous view
				const lastView = state.currentStack[state.currentStack.length - 2];

				//If the last view was current project then clear stack except for first view
				if (lastView.currentView === 'current_project') {
					state.currentStack = state.currentStack.slice(0, 1);
				} else {
					//Else pop the top of the stack
					state.currentStack = state.currentStack.slice(0, -1);
				}

				//If previous view, then make that the current view
				if (lastView) {
					state.currentView = lastView.currentView;
					state.viewParams = lastView.viewParams;
				}
			}
		},
		removeSessionFromNavStack: (
			state: NavigationState,
			action: PayloadAction<SessionIdObject>,
		) => {
			const navStack = state.currentStack;

			const sessionId = action.payload.sessionId;
			const projectId = action.payload.projectId;

			for (let i = navStack.length - 1; i > -1; i--) {
				let viewParams = navStack[i].viewParams;
				if (!viewParams) {
					continue;
				}

				//Type checks for view params to determine process

				const projectList = viewParams?.projectsList?.projectList ?? {};
				//Check for project list
				if (Object.keys(projectList ?? {}).length > 0) {
					if (
						projectList[projectId]?.sessionNames[sessionId]?.id ===
						action.payload.sessionId
					) {
						delete navStack[i].viewParams.projectsList.projectList[projectId]
							.sessionNames[sessionId];
						continue;
					}
				}

				const sessionNames = viewParams?.sessionNames ?? {};
				//Checks for project details
				if (Object.keys(sessionNames).length > 0) {
					if (sessionNames[sessionId]?.id === action.payload.sessionId) {
						delete navStack[i].viewParams.sessionNames[sessionId];
						continue;
					}
				}

				const value = viewParams[sessionId] ?? {};

				//Checks for session list
				if (Object.keys(value).length > 0) {
					if (viewParams[sessionId]?.id === action.payload.sessionId) {
						delete navStack[i].viewParams[sessionId];
						continue;
					}
				}
			}

			//Update current stack with new state
			state.currentStack = navStack;
		},
		addSessionToNavStack: (
			state: NavigationState,
			action: PayloadAction<ProjectDetails>,
		) => {
			const navStack = state.currentStack;

			const newProjectDetails = action.payload;

			const projectId = action.payload.id;

			for (let i = navStack.length - 1; i > -1; i--) {
				let viewParams = navStack[i].viewParams;
				if (!viewParams) {
					continue;
				}

				//Type checks for view params to determine process
				const projectList = viewParams?.projectsList?.projectList ?? {};
				//Check for project list
				if (Object.keys(projectList ?? {}).length > 0) {
					if (
						projectList[projectId]
					) {
						navStack[i].viewParams.projectsList.projectList[projectId] = newProjectDetails;
						continue;
					}
				}

				const sessionNames = viewParams?.sessionNames ?? {};
				//Checks for project details
				if (Object.keys(sessionNames).length > 0) {
					
					navStack[i].viewParams = newProjectDetails;
					continue;
					
				}

			}

			//Update current stack with new state
			state.currentStack = navStack;
		},
	},
});

export const {
	changeView,
	popView,
	removeSessionFromNavStack,
	addSessionToNavStack,
} = navigationSlice.actions;

export default navigationSlice.reducer;
