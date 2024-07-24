import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotesItem } from './notes.slice';

export interface FoldersItem {
	id: number;
	name: string;
	notes: NotesItem[];
}

export interface FoldersState {
	items: FoldersItem[];
	selectedItems: FoldersItem[];
}

const initialState: FoldersState = {
	items: [],
	selectedItems: []
};

export const foldersSlice = createSlice({
	name: 'folders',
	initialState,
	reducers: {
		clear: state => {
			state.items = [];
			state.selectedItems = [];
		},
		add: (state, action: PayloadAction<FoldersItem>) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (existed) return;

			state.items.push(action.payload);
		},
		remove: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(item => item.id !== action.payload);
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
		rename: (state, action: PayloadAction<Omit<FoldersItem, 'notes'>>) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (!existed) return;

			existed.name = action.payload.name;
		},
		updateNotes: (state, action: PayloadAction<Omit<FoldersItem, 'name'>>) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (!existed) return;

			state.items.map(item => {
				if (item.id === action.payload.id) {
					item.notes = action.payload.notes;
				} else {
					item.notes = item.notes.filter(note =>
						action.payload.notes.includes(note)
					);
				}
				return item;
			});
		}
	}
});

export const foldersActions = foldersSlice.actions;
export default foldersSlice.reducer;
