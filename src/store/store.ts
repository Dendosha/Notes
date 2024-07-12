import { configureStore } from '@reduxjs/toolkit';
import notesSlice from './notes.slice';
import tasksSlice from './tasks.slice';

export const store = configureStore({
	reducer: {
		notes: notesSlice,
		tasks: tasksSlice
	}
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
