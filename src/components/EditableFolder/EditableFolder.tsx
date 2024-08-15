import cn from 'classnames';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch.hook';
import { foldersActions } from '../../store/folders.slice';
import { notesActions } from '../../store/notes.slice';
import Checkbox from '../Checkbox/Checkbox';
import { MenuItem } from '../ContextMenu/ContextMenu.props';
import InteractiveListItem from '../InteractiveListItem/InteractiveListItem';
import RenameFolderModal from '../Modals/RenameFolderModal/RenameFolderModal';
import styles from './EditableFolder.module.scss';
import { EditableFolderProps } from './EditableFolder.props';

function EditableFolder({
	children,
	data,
	isSelectable = true,
	isSelection = false,
	className,
	...props
}: EditableFolderProps) {
	const dispatch = useAppDispatch();
	const [renameFolderModalState, setRenameFolderModalState] = useState(false);

	const setContextMenuItems = (): MenuItem[] => {
		const selectButtonName = data.selected ? 'Снять выделение' : 'Выделить';
		const pinButtonName = data.pinned ? 'Открепить' : 'Закрепить';

		return [
			{
				name: selectButtonName,
				action: () => dispatch(foldersActions.toggleSelect(data.id))
			},
			{
				name: pinButtonName,
				action: () => dispatch(foldersActions.togglePin(data.id))
			},
			{ name: 'Переименовать', action: () => setRenameFolderModalState(true) },
			{
				name: 'Удалить',
				action: () => {
					data.notes.forEach(noteId => {
						dispatch(notesActions.remove(noteId));
					});
					dispatch(foldersActions.remove(data.id));
				}
			}
		];
	};

	return (
		<InteractiveListItem
			{...props}
			contextMenuItems={isSelectable ? setContextMenuItems() : undefined}
			isSelection={isSelection}
			tabIndex={0}
			className={cn(styles['editable-folder'], className)}
			onClick={() => data.id !== 1 && setRenameFolderModalState(true)}
		>
			{isSelectable && isSelection && (
				<Checkbox
					name='folder-select'
					className={styles['editable-folder__select-checkbox']}
					appearance='circle'
					checked={data.selected}
					onChange={() => dispatch(foldersActions.toggleSelect(data.id))}
				/>
			)}
			<div className={styles['editable-folder__text']}>
				<span className={styles['editable-folder__title']}>{children}</span>
				<span className={styles['editable-folder__note-count']}>
					Заметок: {data.notes.length}
				</span>
				{data.pinned && (
					<img
						src='/public/icons/pin.svg'
						className={styles['editable-folder__pin']}
					></img>
				)}
			</div>
			<RenameFolderModal
				modalState={renameFolderModalState}
				setModalState={setRenameFolderModalState}
				id={data.id}
				name={data.name}
			/>
		</InteractiveListItem>
	);
}

export default EditableFolder;
