import { useState } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../../hooks/useAppSelector.hook';
import { settingsActions } from '../../../store/settings.slice';
import Setting from '../Setting/Setting';
import styles from './SettingsList.module.scss';
import {
	actionConfirmationsItems,
	notesLayoutItems,
	notesSortItems
} from './setting-data';

function SettingsList() {
	const dispatch = useAppDispatch();
	const { notesSort, notesLayout, actionConfirmations } = useAppSelector(
		state => state.settings
	);

	const [notesSortValue, setNotesSortValue] = useState<
		'createDate' | 'updateDate'
	>(notesSort);
	const [notesLayoutValue, setNotesLayoutValue] = useState<'list' | 'tiles'>(
		notesLayout
	);
	const [actionConfirmationsValue, setActionConfirmationsValue] = useState(
		Number(actionConfirmations)
	);

	return (
		<div className={styles['settings-list']}>
			<Setting
				inputName='notes-sort'
				items={notesSortItems}
				defaultSelectValue={notesSortValue}
				setSelectValue={setNotesSortValue}
				onSelectChange={() =>
					dispatch(
						settingsActions.update({
							key: 'notesSort',
							value: notesSortValue
						})
					)
				}
			>
				Сортировка заметок
			</Setting>
			<div className={styles['settings-list__separator']}></div>
			<Setting
				inputName='notes-layout'
				items={notesLayoutItems}
				defaultSelectValue={notesLayoutValue}
				setSelectValue={setNotesLayoutValue}
				onSelectChange={() =>
					dispatch(
						settingsActions.update({
							key: 'notesLayout',
							value: notesLayoutValue
						})
					)
				}
			>
				Макет заметок
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
							value: Boolean(actionConfirmationsValue)
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
