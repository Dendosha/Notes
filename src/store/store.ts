import { configureStore } from '@reduxjs/toolkit';
import foldersSlice from './folders.slice';
import notesSlice from './notes.slice';
import settingsSlice from './settings.slice';
import tasksSlice from './tasks.slice';

export const store = configureStore({
	reducer: {
		notes: notesSlice,
		tasks: tasksSlice,
		folders: foldersSlice,
		settings: settingsSlice
	}
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
