import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotesItem } from './notes.slice';

export interface FoldersItem {
	id: number;
	name: string;
	notes: NotesItem[];
	pinned: boolean;
	selected: boolean;
	createdAt: string;
}

export interface FoldersState {
	items: FoldersItem[];
}

const initialState: FoldersState = {
	items: []
};

export type FoldersItemPayload = Pick<FoldersItem, 'id' | 'name' | 'notes'>;

export const foldersSlice = createSlice({
	name: 'folders',
	initialState,
	reducers: {
		clear: state => {
			state.items = [];
		},
		add: (state, action: PayloadAction<FoldersItemPayload>) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (existed) return;

			state.items.push({
				...action.payload,
				pinned: false,
				selected: false,
				createdAt: new Date().toISOString()
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
		rename: (
			state,
			action: PayloadAction<Omit<FoldersItemPayload, 'notes'>>
		) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (!existed) return;

			existed.name = action.payload.name;
		},
		updateNotes: (
			state,
			action: PayloadAction<Omit<FoldersItemPayload, 'name'>>
		) => {
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
