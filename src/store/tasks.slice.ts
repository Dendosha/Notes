import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TasksItem {
	id: number;
	content: string;
	completed: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface TasksState {
	items: TasksItem[];
	selectedItems: TasksItem[];
}

export type TasksItemPayload = Pick<TasksItem, 'id' | 'content'>;

const initialState: TasksState = {
	items: [],
	selectedItems: []
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
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			});
		},
		remove: (state, action: PayloadAction<number>) => {
			state.items.filter(item => item.id !== action.payload);
		},
		toggleComplete: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(item => item.id === action.payload);

			if (!existed) return;

			existed.completed = !existed.completed;
		},
		update: (state, action: PayloadAction<TasksItemPayload>) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (!existed) return;

			state.items.map(item => {
				if (item.id === action.payload.id) {
					item = {
						...item,
						content: action.payload.content,
						updatedAt: new Date().toISOString()
					};
				}
			});
		}
	}
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;
