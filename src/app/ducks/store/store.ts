import { configureStore } from '@reduxjs/toolkit'
import navigationSlice from '#ducks/features/navigation/navigationSlice'
import contentContainerSlice from '#ducks/features/content_container/contentContainerSlice';
import currentProjectSlice from '#ducks/features/current_project/currentProjectSlice';
import schemasSlice from '#ducks/features/schemas/schemasSlice';

const store = configureStore({
  reducer: {
    navigation: navigationSlice,
    contentContainer: contentContainerSlice,
    currentProject: currentProjectSlice,
    schemas: schemasSlice
  },
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch