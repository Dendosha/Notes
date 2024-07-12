import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotesItem {
	id: string;
	title: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface NotesState {
	items: NotesItem[];
}

const initialState: NotesState = {
	items: []
};

export const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		clear: state => {
			state.items = [];
		},
		add: (state, action: PayloadAction<NotesItem>) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (existed) return;
		},
		remove: (state, action: PayloadAction<string>) => {
			state.items.filter(item => item.id !== action.payload);
		},
		update: (
			state,
			action: PayloadAction<Omit<NotesItem, 'createdAt' | 'updatedAt'>>
		) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (!existed) return;

			state.items.map(item => {
				if (item.id === action.payload.id) {
					item = {
						...item,
						title: action.payload.title,
						content: action.payload.title,
						updatedAt: new Date()
					};
				}
			});
		}
	}
});

export const notesActions = notesSlice.actions;
export default notesSlice.reducer;
