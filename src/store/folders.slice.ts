import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FoldersItem {
	id: number;
	name: string;
	notes: number[];
	pinned: {
		state: boolean;
		priority: number;
	};
	selected: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface FoldersState {
	items: FoldersItem[];
	pin: {
		count: number;
		lastPriority: number;
	};
}

const initialState: FoldersState = {
	items: [
		{
			id: 1,
			name: 'Все',
			notes: [],
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			pinned: {
				state: false,
				priority: -1
			},
			selected: false
		}
	],
	pin: {
		count: 0,
		lastPriority: 0
	}
};

export type FoldersItemPayload = Pick<FoldersItem, 'id' | 'name' | 'notes'>;

export const foldersSlice = createSlice({
	name: 'folders',
	initialState,
	reducers: {
		clear: state => {
			state.items = state.items.filter(folder => folder.id === 1);
			state.pin.count = 0;
			state.pin.lastPriority = 0;
		},
		add: (state, action: PayloadAction<FoldersItemPayload>) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (existed) return;

			state.items.push({
				...action.payload,
				pinned: {
					state: false,
					priority: -1
				},
				selected: false,
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
		},
		rename: (
			state,
			action: PayloadAction<Omit<FoldersItemPayload, 'notes'>>
		) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			if (!existed) return;

			existed.name = action.payload.name;
			existed.updatedAt = new Date().toISOString();
		},
		addNotes: (
			state,
			action: PayloadAction<{ id: number; notes: number[] }>
		) => {
			const existed = state.items.find(item => item.id === action.payload.id);

			addNotesToFolder(existed);

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
			const existed = state.items.find(item => item.id === action.payload.id);

			removeNotesFromFolder(existed);

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

export const foldersActions = foldersSlice.actions;
export default foldersSlice.reducer;
