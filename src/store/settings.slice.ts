import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
	notesSort: 'createDate' | 'updateDate';
	notesLayout: 'list' | 'tiles';
	actionConfirmations: boolean;
}

const initialState: SettingsState = {
	notesSort: 'createDate',
	notesLayout: 'list',
	actionConfirmations: false
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		update: (state, action: PayloadAction<SettingsState>) => {
			state = action.payload;
		}
	}
});

export const settingsActions = settingsSlice.actions;
export default settingsSlice.reducer;
