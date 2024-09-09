/**
 * Manage current project state
 */
import { emptyProjectDetails } from '#mocks/dummyData';

import { createSlice } from '@reduxjs/toolkit';
import {
	changeCurrentProject,
	changeCurrentProjectDetails,
	getCurrentProject,
	removeCurrentProject,
	removeCurrentProjectSession
} from './currentProjectSliceThunks';

const initialState: CurrentProjectDetails = emptyProjectDetails;

export const currentProjectSlice = createSlice({
	name: 'current_project',
	initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		// Set Current Project
		builder
			.addCase(changeCurrentProject.pending, () => {
				//Nothing to handle here
			})
			.addCase(changeCurrentProject.fulfilled, (state, action) => {
				//Pending sets loading element
				const projectDetails = action.payload;

				state = {
					...projectDetails,
					lastSchema: null,
					lastSession: null,
					lastModified: null,
				};

				return state;
			})
			.addCase(changeCurrentProject.rejected, () => {
			})

			//Change current project details (last session, schema, last capture, other changes)
			.addCase(changeCurrentProjectDetails.pending, () => {
			})
			.addCase(changeCurrentProjectDetails.fulfilled, (state, action) => {
				const newCurrentProjectDetails = action.payload;

				state = {
					...newCurrentProjectDetails,
				};

				return state;
			})
			.addCase(changeCurrentProjectDetails.rejected, () => {
			})

			//Get current project
			.addCase(getCurrentProject.pending, () => {
			})
			.addCase(getCurrentProject.fulfilled, (state, action) => {
				//Pending sets loading element
				const currentProjectDetails = action.payload;

				//No current rpoject details, then set current project to empty details
				if (currentProjectDetails === null) {
					state = {
						id: '',
						name: '',
						sessionNames: {},
						projectSchemas: {},
						lastModified: null,
						lastSchema: null,
						lastSession: null,
					};

                    return state
				}

				//Set state to fetched current rpoject details
				state = {
					...currentProjectDetails,
				};

				return state;
			})
			.addCase(getCurrentProject.rejected, () => {
			})

			//Remove current project
			.addCase(removeCurrentProject.pending, () => {
				//Nothing to handle here
			})
			.addCase(removeCurrentProject.fulfilled, (state) => {
				
				//Set state to empty project details
				
					state = {
						id: '',
						name: '',
						sessionNames: {},
						projectSchemas: {},
						lastModified: null,
						lastSchema: null,
						lastSession: null,
					};

                    return state
			})
			.addCase(removeCurrentProject.rejected, () => {
				//Pending sets loading element
			})

			//Remmove current session
			.addCase(removeCurrentProjectSession.pending, () => {
				//Nothing to handle here
			})
			.addCase(removeCurrentProjectSession.fulfilled, (state, action) => {

				const sessionId = action.payload;

				delete state.sessionNames[sessionId]
				state.lastSession = null;

				
			})
			.addCase(removeCurrentProjectSession.rejected, () => {
				//Pending sets loading element
			});

	},
});

export const {} = currentProjectSlice.actions;

export default currentProjectSlice.reducer;
