import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import foldersSlice from './folders.slice';
import notesSlice from './notes.slice';
import settingsSlice from './settings.slice';
import tasksSlice from './tasks.slice';

const rootStore = combineReducers({
	notes: notesSlice,
	tasks: tasksSlice,
	folders: foldersSlice,
	settings: settingsSlice
});

const persistConfig = {
	key: 'root',
	storage
};

const persistedReducer = persistReducer(persistConfig, rootStore);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
});

export const persistor = persistStore(store);

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
