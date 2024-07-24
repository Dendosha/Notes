import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotesItem {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	folderId?: number;
}

export interface NotesState {
	items: NotesItem[];
	selectedItems: NotesItem[];
}

export type NotesPayload = Omit<NotesItem, 'createdAt' | 'updatedAt'>;

const initialState: NotesState = {
	items: [],
	selectedItems: []
};

export const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		clear: state => {
			state.items = [];
			state.selectedItems = [];
		},
		add: (state, action: PayloadAction<NotesPayload>) => {
			state.items.push({
				...action.payload,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			});
		},
		select: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(item => item.id === action.payload);
			const alreadySelected = state.selectedItems.find(
				item => item.id === action.payload
			);

			if (!existed || alreadySelected) return;

			state.selectedItems.push(existed);
		},
		unselect: (state, action: PayloadAction<number>) => {
			const existed = state.selectedItems.find(
				item => item.id === action.payload
			);

			if (!existed) return;

			state.selectedItems = state.selectedItems.filter(
				item => item.id !== existed.id
			);
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
					item.folderId = action.payload.folderId;
				}

				return item;
			});
		}
	}
});

export const notesActions = notesSlice.actions;
export default notesSlice.reducer;
