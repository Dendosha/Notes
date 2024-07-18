import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotesItem {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}

export interface NotesState {
	items: NotesItem[];
}

export type NotesPayload = Omit<NotesItem, 'createdAt' | 'updatedAt'>;

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
		add: (state, action: PayloadAction<NotesPayload>) => {
			state.items.push({
				...action.payload,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			});
		},
		remove: (state, action: PayloadAction<number>) => {
			state.items.filter(item => item.id !== action.payload);
		},
		update: (state, action: PayloadAction<NotesPayload>) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (!existed) return;

			state.items.map(item => {
				if (item.id === action.payload.id) {
					item = {
						...item,
						title: action.payload.title,
						content: action.payload.content,
						updatedAt: new Date().toISOString()
					};
				}
			});
		}
	}
});

export const notesActions = notesSlice.actions;
export default notesSlice.reducer;
