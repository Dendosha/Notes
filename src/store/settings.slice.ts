import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
	sort: 'createDate' | 'updateDate';
	actionConfirmations: 'all' | 'deleteOnly' | 'none';
}

export type SettingValue<
	T extends SettingsState,
	K extends keyof T = keyof T
> = T[K] extends keyof SettingsState ? T[K] : never;

export type SettingsPayload = {
	[Key in keyof SettingsState]: {
		key: Key;
		value: SettingValue<SettingsState, Key>;
	};
}[keyof SettingsState];

const initialState: SettingsState = {
	sort: 'createDate',
	actionConfirmations: 'deleteOnly'
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		update: (state, action: PayloadAction<SettingsPayload>) => {
			state[action.payload.key] = action.payload.value;
		}
	}
});

export const settingsActions = settingsSlice.actions;
export default settingsSlice.reducer;
