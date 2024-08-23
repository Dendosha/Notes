import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotesItem {
	id: number;
	title: string;
	content: string;
	selected: boolean;
	pinned: {
		state: boolean;
		priority: number;
	};
	folderId: [number, number | undefined];
	createdAt: string;
	updatedAt: string;
}

export interface NotesState {
	items: NotesItem[];
	pin: {
		count: number;
		lastPriority: number;
	};
}

export type NotesPayload = {
	folderId?: number;
} & Pick<NotesItem, 'id' | 'title' | 'content'>;

const initialState: NotesState = {
	items: [],
	pin: {
		count: 0,
		lastPriority: 0
	}
};

export const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		clear: state => {
			state.items = [];
			state.pin.count = 0;
			state.pin.lastPriority = 0;
		},
		add: (state, action: PayloadAction<NotesPayload>) => {
			state.items.push({
				...action.payload,
				folderId: [1, action.payload.folderId],
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
		update: (state, action: PayloadAction<NotesPayload>) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (!existed) return;

			state.items.map(item => {
				if (item.id === action.payload.id) {
					item.title = action.payload.title;
					item.content = action.payload.content;
					item.updatedAt = new Date().toISOString();
					item.folderId[1] = action.payload.folderId ?? item.folderId[1];
				}

				return item;
			});
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

export const notesActions = notesSlice.actions;
export default notesSlice.reducer;
