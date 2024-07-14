import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotesItem } from './notes.slice';

export interface FoldersItem {
	id: string;
	name: string;
	notes: NotesItem[];
}

export interface FoldersState {
	items: FoldersItem[];
}

const initialState: FoldersState = {
	items: []
};

export const foldersSlice = createSlice({
	name: 'folders',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<FoldersItem>) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (existed) return;

			state.items.push(action.payload);
		},
		remove: (state, action: PayloadAction<string>) => {
			state.items.filter(item => item.id !== action.payload);
		},
		update: (state, action: PayloadAction<FoldersItem>) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (!existed) return;

			state.items.map(item => {
				if (item.id === action.payload.id) {
					item = {
						...item,
						name: action.payload.name,
						notes: action.payload.notes
					};
				}

				return item;
			});
		}
	}
});

export const foldersActions = foldersSlice.actions;
export default foldersSlice.reducer;
