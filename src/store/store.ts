import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {}
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
