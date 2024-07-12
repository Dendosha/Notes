import { configureStore } from '@reduxjs/toolkit';
import notesSlice from './notes.slice';

export const store = configureStore({
	reducer: {
		notes: notesSlice
	}
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
