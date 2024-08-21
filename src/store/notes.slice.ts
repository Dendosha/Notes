import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotesItem {
	id: number;
	title: string;
	content: string;
	selected: boolean;
	pinned: boolean;
	folderId: [number, number | undefined];
	createdAt: string;
	updatedAt: string;
}

export interface NotesState {
	items: NotesItem[];
	pinnedItems: NotesItem[];
}

export type NotesPayload = {
	folderId?: number;
} & Pick<NotesItem, 'id' | 'title' | 'content'>;

const initialState: NotesState = {
	items: [],
	pinnedItems: []
};

export const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		clear: state => {
			state.items = [];
		},
		add: (state, action: PayloadAction<NotesPayload>) => {
			state.items.push({
				...action.payload,
				folderId: [1, action.payload.folderId],
				selected: false,
				pinned: false,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
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

			if (existed.pinned) {
				const existedIndex = state.pinnedItems.findIndex(
					item => item.id === existed.id
				);
				state.pinnedItems.splice(existedIndex, 1);
			} else {
				state.pinnedItems.unshift(existed);
			}

			existed.pinned = !existed.pinned;
		},
		remove: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(item => item.id !== action.payload);
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
		}
	}
});

export const notesActions = notesSlice.actions;
export default notesSlice.reducer;
