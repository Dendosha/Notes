import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TasksItem {
	id: number;
	content: string;
	completed: boolean;
	selected: boolean;
	pinned: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface TasksState {
	items: TasksItem[];
}

export type TasksItemPayload = Pick<TasksItem, 'id' | 'content'>;

const initialState: TasksState = {
	items: []
};

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		clear: state => {
			state.items = [];
		},
		add: (state, action: PayloadAction<TasksItemPayload>) => {
			state.items.push({
				...action.payload,
				completed: false,
				selected: false,
				pinned: false,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			});
		},
		remove: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(item => item.id !== action.payload);
		},
		toggleSelect: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(item => item.id === action.payload);

			if (!existed) return;

			existed.selected = !existed.selected;
		},
		togglePin: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(item => item.id === action.payload);

			if (!existed) return;

			existed.pinned = !existed.pinned;
		},
		toggleComplete: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(item => item.id === action.payload);

			if (!existed) return;

			existed.completed = !existed.completed;
		},
		update: (state, action: PayloadAction<TasksItemPayload>) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (!existed) return;

			existed.content = action.payload.content;
			existed.updatedAt = new Date().toISOString();
		}
	}
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;
