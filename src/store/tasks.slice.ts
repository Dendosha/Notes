import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TasksItem {
	id: string;
	content: string;
	completed: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface TasksState {
	items: TasksItem[];
}

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
		add: (state, action: PayloadAction<TasksItem>) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (existed) return;
		},
		remove: (state, action: PayloadAction<string>) => {
			state.items.filter(item => item.id !== action.payload);
		},
		toggleComplete: (state, action: PayloadAction<string>) => {
			const existed = state.items.find(item => item.id === action.payload);

			if (!existed) return;

			existed.completed = !existed.completed;
		},
		update: (
			state,
			action: PayloadAction<Pick<TasksItem, 'id' | 'content'>>
		) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (!existed) return;

			state.items.map(item => {
				if (item.id === action.payload.id) {
					item = {
						...item,
						content: action.payload.content,
						updatedAt: new Date()
					};
				}
			});
		}
	}
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;
