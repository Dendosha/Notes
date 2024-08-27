import { useState } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../../hooks/useAppSelector.hook';
import {
	settingsActions,
	SettingsState,
	SettingValue
} from '../../../store/settings.slice';
import Setting from '../Setting/Setting';
import styles from './SettingsList.module.scss';
import { actionConfirmationsItems, notesSortItems } from './setting-data';

function SettingsList() {
	const dispatch = useAppDispatch();
	const { sort, actionConfirmations } = useAppSelector(state => state.settings);

	const [notesSortValue, setNotesSortValue] = useState<
		'createDate' | 'updateDate'
	>(sort);
	const [actionConfirmationsValue, setActionConfirmationsValue] = useState<
		'all' | 'deleteOnly' | 'none'
	>(actionConfirmations);

	return (
		<div className={styles['settings-list']}>
			<Setting
				inputName='sort'
				items={notesSortItems}
				defaultSelectValue={notesSortValue}
				setSelectValue={setNotesSortValue}
				onSelectChange={() =>
					dispatch(
						settingsActions.update({
							key: 'sort',
							value: notesSortValue as SettingValue<SettingsState, 'sort'>
						})
					)
				}
			>
				Сортировка по дате
			</Setting>
			<div className={styles['settings-list__separator']}></div>
			<Setting
				inputName='action-confirmations'
				items={actionConfirmationsItems}
				defaultSelectValue={actionConfirmationsValue}
				setSelectValue={setActionConfirmationsValue}
				onSelectChange={() =>
					dispatch(
						settingsActions.update({
							key: 'actionConfirmations',
							value: actionConfirmationsValue as SettingValue<
								SettingsState,
								'actionConfirmations'
							>
						})
					)
				}
			>
				Подтверждение действий
			</Setting>
		</div>
	);
}

export default SettingsList;
