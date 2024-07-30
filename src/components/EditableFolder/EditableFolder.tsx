import cn from 'classnames';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch.hook';
import { foldersActions } from '../../store/folders.slice';
import Checkbox from '../Checkbox/Checkbox';
import { MenuItem } from '../ContextMenu/ContextMenu.props';
import InteractiveListItem from '../InteractiveListItem/InteractiveListItem';
import RenameFolderModal from '../Modals/RenameFolderModal/RenameFolderModal';
import styles from './EditableFolder.module.scss';
import { EditableFolderProps } from './EditableFolder.props';

function EditableFolder({
	children,
	data,
	isSelection = false,
	className,
	...props
}: EditableFolderProps) {
	const dispatch = useAppDispatch();
	const [renameModalState, setRenameModalState] = useState(false);

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
			{ name: 'Переименовать', action: () => setRenameModalState(true) },
			{
				name: 'Удалить',
				action: () => dispatch(foldersActions.remove(data.id))
			}
		];
	};

	return (
		<InteractiveListItem
			{...props}
			contextMenuItems={setContextMenuItems()}
			tabIndex={0}
			className={cn(styles['editable-folder'], className)}
		>
			<span className={styles['editable-folder__text']}>{children}</span>
			<span className={styles['editable-folder__note-count']}>
				{data.notes.length}
			</span>
			{data.pinned && (
				<img
					src='/public/icons/pin.svg'
					className={styles['editable-folder__pin']}
				></img>
			)}
			{isSelection && (
				<Checkbox
					className={styles['editable-folder__select-checkbox']}
					appearance='circle'
					checked={data.selected}
					onChange={() => dispatch(foldersActions.toggleSelect(data.id))}
				/>
			)}
			<RenameFolderModal
				modalState={renameModalState}
				setModalState={setRenameModalState}
				id={data.id}
				name={data.name}
			/>
		</InteractiveListItem>
	);
}

export default EditableFolder;
