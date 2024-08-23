import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TasksItem {
	id: number;
	content: string;
	completed: boolean;
	selected: boolean;
	pinned: {
		state: boolean;
		priority: number;
	};
	createdAt: string;
	updatedAt: string;
}

export interface TasksState {
	items: TasksItem[];
	pin: {
		count: number;
		lastPriority: number;
	};
}

export type TasksItemPayload = Pick<TasksItem, 'id' | 'content'>;

const initialState: TasksState = {
	items: [],
	pin: {
		count: 0,
		lastPriority: 0
	}
};

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		clear: state => {
			state.items = [];
			state.pin.count = 0;
			state.pin.lastPriority = 0;
		},
		add: (state, action: PayloadAction<TasksItemPayload>) => {
			state.items.push({
				...action.payload,
				completed: false,
				selected: false,
				pinned: {
					state: false,
					priority: -1
				},
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			});
		},
		remove: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(item => item.id === action.payload);

			if (!existed) return;

			if (existed.pinned.state) {
				state.pin.count--;
				if (state.pin.count === 0) {
					state.pin.lastPriority = 0;
				} else {
					state.pin.lastPriority =
						state.pin.lastPriority > existed.pinned.priority
							? state.pin.lastPriority
							: existed.pinned.priority - 1;
				}
			}

			state.items = state.items.filter(item => item.id !== existed.id);
		},
		update: (state, action: PayloadAction<TasksItemPayload>) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (!existed) return;

			existed.content = action.payload.content;
			existed.updatedAt = new Date().toISOString();
		},
		toggleComplete: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(item => item.id === action.payload);

			if (!existed) return;

			existed.completed = !existed.completed;
		},
		toggleSelect: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(item => item.id === action.payload);

			if (!existed) return;

			existed.selected = !existed.selected;
		},
		togglePin: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(item => item.id === action.payload);

			if (!existed) return;

			if (existed.pinned.state) {
				state.pin.count--;
				if (state.pin.count === 0) {
					state.pin.lastPriority = 0;
				} else {
					state.pin.lastPriority =
						state.pin.lastPriority > existed.pinned.priority
							? state.pin.lastPriority
							: existed.pinned.priority - 1;
				}
				existed.pinned.priority = -1;
			} else {
				state.pin.count++;
				state.pin.lastPriority++;
				existed.pinned.priority = state.pin.lastPriority;
			}

			existed.pinned.state = !existed.pinned.state;
		}
	}
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;
