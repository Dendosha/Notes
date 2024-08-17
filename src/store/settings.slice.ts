import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
	notesSort: 'createDate' | 'updateDate';
	notesLayout: 'list' | 'tiles';
	actionConfirmations: boolean;
}

export type SettingsPayload = {
	[Key in keyof SettingsState]: {
		key: Key;
		value: SettingsState[Key];
	};
}[keyof SettingsState];

const initialState: SettingsState = {
	notesSort: 'createDate',
	notesLayout: 'list',
	actionConfirmations: false
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		update: (state, action: PayloadAction<SettingsPayload>) => {
			switch (action.payload.key) {
				case 'notesSort':
					state.notesSort = action.payload.value;
					break;
				case 'notesLayout':
					state.notesLayout = action.payload.value;
					break;
				case 'actionConfirmations':
					state.actionConfirmations = action.payload.value;
					break;
			}
		}
	}
});

export const settingsActions = settingsSlice.actions;
export default settingsSlice.reducer;
