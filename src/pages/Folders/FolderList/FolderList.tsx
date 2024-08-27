import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '../../../components/ContextMenu/ContextMenu.props';
import EditableFolder from '../../../components/EditableFolder/EditableFolder';
import InteractiveList from '../../../components/InteractiveList/InteractiveList';
import RenameFolderModal from '../../../components/Modals/RenameFolderModal/RenameFolderModal';
import { sortItems } from '../../../helpers/sortItems';
import { useAppDispatch } from '../../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../../hooks/useAppSelector.hook';
import { foldersActions, FoldersItem } from '../../../store/folders.slice';
import styles from './FolderList.module.scss';
import { FolderListProps } from './FolderList.props';

interface RenameFolderProps {
	id: number;
	name: string;
}

function FolderList({ isSelection, confirmAction }: FolderListProps) {
	const [renameFolderModalState, setRenameFolderModalState] = useState(false);
	const [renameFolderProps, setRenameFolderProps] =
		useState<RenameFolderProps>();

	const dispatch = useAppDispatch();
	const folders = useAppSelector(state => state.folders);
	const settings = useAppSelector(state => state.settings);

	const folderAll = folders.items.find(folder => folder.id === 1)!;
	const folderList = sortItems(
		folders.items.filter(folder => folder.id !== 1),
		settings.sort,
		true
	).filter(folder => folder.id !== 1);

	const navigate = useNavigate();

	const openRenameFolder = (folder: FoldersItem) => {
		setRenameFolderProps({
			id: folder.id,
			name: folder.name
		});
		setRenameFolderModalState(true);
	};

	const setContextMenuItems = (folder: FoldersItem): MenuItem[] => {
		const selectButtonName = folder.selected ? 'Снять выделение' : 'Выделить';
		const pinButtonName = folder.pinned.state ? 'Открепить' : 'Закрепить';

		return [
			{
				name: selectButtonName,
				action: () => dispatch(foldersActions.toggleSelect(folder.id))
			},
			{
				name: pinButtonName,
				action: () => dispatch(foldersActions.togglePin(folder.id))
			},
			{
				name: 'Переименовать',
				action: () => {
					setRenameFolderProps({
						id: folder.id,
						name: folder.name
					});
					setRenameFolderModalState(true);
				}
			},
			{
				name: 'Удалить',
				action: () => openRenameFolder(folder)
			}
		];
	};

	return (
		<>
			<InteractiveList className={styles['folders-list']}>
				<EditableFolder
					data={folderAll}
					isSelection={isSelection}
					isSelectable={false}
					key={folderAll.id}
				>
					{folderAll.name}
				</EditableFolder>
				{folderList.map(folder => (
					<EditableFolder
						contextMenuItems={setContextMenuItems(folder)}
						data={folder}
						isSelection={isSelection}
						key={folder.id}
						onClick={() => openRenameFolder(folder)}
						onKeyDown={e => e.key === 'Enter' && openRenameFolder(folder)}
					>
						{folder.name}
					</EditableFolder>
				))}
			</InteractiveList>
			{renameFolderProps && (
				<RenameFolderModal
					modalState={renameFolderModalState}
					setModalState={setRenameFolderModalState}
					confirmAction={confirmAction}
					id={renameFolderProps.id}
					name={renameFolderProps.name}
				/>
			)}
		</>
	);
}

export default FolderList;
