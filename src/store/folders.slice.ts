import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FoldersItem {
	id: number;
	name: string;
	notes: number[];
	pinned: boolean;
	selected: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface FoldersState {
	items: FoldersItem[];
	pinnedItems: FoldersItem[];
}

const initialState: FoldersState = {
	items: [
		{
			id: 1,
			name: 'Все',
			notes: [],
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			pinned: false,
			selected: false
		}
	],
	pinnedItems: []
};

export type FoldersItemPayload = Pick<FoldersItem, 'id' | 'name' | 'notes'>;

export const foldersSlice = createSlice({
	name: 'folders',
	initialState,
	reducers: {
		clear: state => {
			state.items = state.items.filter(folder => folder.id === 1);
			state.pinnedItems = [];
		},
		add: (state, action: PayloadAction<FoldersItemPayload>) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (existed) return;

			state.items.push({
				...action.payload,
				pinned: false,
				selected: false,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString()
			});
		},
		remove: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(item => item.id === action.payload);

			if (!existed) return;

			const allFolder = state.items[0];
			let allFolderNotes: number[];

			allFolderNotes = [...allFolder.notes];

			existed.notes.forEach(noteId => {
				const noteToDelete = allFolderNotes.findIndex(
					allFolderNoteId => allFolderNoteId === noteId
				);

				allFolderNotes.splice(noteToDelete, 1);

				allFolder.notes = allFolderNotes;
			});

			state.items = state.items.filter(item => item.id !== existed.id);
			state.pinnedItems = state.pinnedItems.filter(
				item => item.id !== existed.id
			);
		},
		toggleSelect: (state, action: PayloadAction<number>) => {
			const unpinnedExisted = state.items.find(
				item => item.id === action.payload
			);
			const pinnedExisted = state.pinnedItems.find(
				item => item.id === action.payload
			);

			toggleFolderSelect(unpinnedExisted);
			toggleFolderSelect(pinnedExisted);

			function toggleFolderSelect(folder?: FoldersItem) {
				if (!folder) return;

				folder.selected = !folder.selected;
			}
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
		rename: (
			state,
			action: PayloadAction<Omit<FoldersItemPayload, 'notes'>>
		) => {
			const unpinnedExisted = state.items.find(
				item => item.id === action.payload.id
			);
			const pinnedExisted = state.pinnedItems.find(
				item => item.id === action.payload.id
			);

			renameFolder(unpinnedExisted);
			renameFolder(pinnedExisted);

			function renameFolder(folder?: FoldersItem) {
				if (!folder) return;

				folder.name = action.payload.name;
				folder.updatedAt = new Date().toISOString();
			}
		},
		addNotes: (
			state,
			action: PayloadAction<{ id: number; notes: number[] }>
		) => {
			const unpinnedExisted = state.items.find(
				item => item.id === action.payload.id
			);
			const pinnedExisted = state.pinnedItems.find(
				item => item.id === action.payload.id
			);

			addNotesToFolder(unpinnedExisted);
			addNotesToFolder(pinnedExisted);

			if (action.payload.id !== 1) {
				addNotesToFolder(state.items[0]);
			}

			function addNotesToFolder(folder?: FoldersItem) {
				if (!folder) return;

				const notesSet = new Set([...folder.notes, ...action.payload.notes]);
				folder.notes = Array.from(notesSet);
				folder.updatedAt = new Date().toISOString();
			}
		},
		removeNotes: (
			state,
			action: PayloadAction<{ id: number; notes: number[] }>
		) => {
			const unpinnedExisted = state.items.find(
				item => item.id === action.payload.id
			);
			const pinnedExisted = state.pinnedItems.find(
				item => item.id === action.payload.id
			);

			removeNotesFromFolder(unpinnedExisted);
			removeNotesFromFolder(pinnedExisted);

			if (action.payload.id !== 1) {
				removeNotesFromFolder(state.items[0]);
			}

			function removeNotesFromFolder(folder?: FoldersItem) {
				if (!folder) return;

				action.payload.notes.forEach(note => {
					folder.notes.splice(folder.notes.indexOf(note), 1);
				});
				folder.updatedAt = new Date().toISOString();
			}
		}
	}
});

export const foldersActions = foldersSlice.actions;
export default foldersSlice.reducer;
