import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddButtonIcon from '../../assets/icons/AddButtonIcon';
import BackButtonIcon from '../../assets/icons/BackButtonIcon';
import RemoveButtonIcon from '../../assets/icons/RemoveButtonIcon';
import EditableFolder from '../../components/EditableFolder/EditableFolder';
import IconButton from '../../components/IconButton/IconButton';
import CreateFolderModal from '../../components/Modals/CreateFolderModal/CreateFolderModal';
import Sidebar from '../../components/Sidebar/Sidebar';
import { handleListFocus } from '../../helpers/handleListFocus';
import { useAppDispatch } from '../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../hooks/useAppSelector.hook';
import { foldersActions } from '../../store/folders.slice';
import styles from './Folders.module.scss';

function Folders() {
	const [isAnyNoteSelected, setIsAnyNoteSelected] = useState(false);
	const [selectAllButtonState, setSelectAllButtonState] = useState(false);
	const [createFolderModalState, setCreateFolderModalState] = useState(false);

	const [isSelection, setIsSelection] = useState(false);

	const firstSidebarButtonRef = useRef<HTMLButtonElement>(null);

	const dispatch = useAppDispatch();
	const folders = useAppSelector(state => state.folders);

	const navigate = useNavigate();

	useEffect(() => {
		if (isSelection && firstSidebarButtonRef.current) {
			firstSidebarButtonRef.current.focus();
		}
	}, [isSelection, firstSidebarButtonRef]);

	useEffect(() => {
		if (folders.items.find(folder => folder.selected)) {
			setIsSelection(true);
			setIsAnyNoteSelected(true);

			if (
				!folders.items
					.filter(folder => folder.id !== 1)
					.find(folder => !folder.selected)
			) {
				setSelectAllButtonState(true);
			} else {
				setSelectAllButtonState(false);
			}
		} else {
			setIsAnyNoteSelected(false);
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key !== 'Escape') {
				return;
			}

			closeSidebar();
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [folders.items]);

	const createFolder = () => {
		setCreateFolderModalState(true);
	};

	const removeFolder = () => {
		const selectedFolders = folders.items.filter(folder => folder.selected);

		selectedFolders.forEach(folder => {
			dispatch(foldersActions.remove(folder.id));
		});
	};

	const closeSidebar = () => {
		folders.items
			.filter(folder => folder.selected && folder.id !== 1)
			.forEach(folder => {
				dispatch(foldersActions.toggleSelect(folder.id));
			});

		setSelectAllButtonState(false);
		setIsSelection(false);
	};

	const toggleFoldersSelectState = () => {
		folders.items
			.filter(
				folder => folder.selected === selectAllButtonState && folder.id !== 1
			)
			.forEach(folder => {
				dispatch(foldersActions.toggleSelect(folder.id));
			});

		setSelectAllButtonState(state => !state);
	};

	const toggleFoldersPinState = () => {
		folders.items.forEach(folder => {
			if (folder.selected) {
				dispatch(foldersActions.togglePin(folder.id));
			}
		});
	};

	return (
		<div className={styles['folders']}>
			<div className={styles['folders__header']}>
				<IconButton
					iconType='stroke'
					onClick={() => navigate(-1)}
					tabIndex={isSelection ? -1 : 0}
				>
					<BackButtonIcon />
				</IconButton>
				<h2 className={styles['folders__title']}>Папки</h2>
			</div>
			<div className={styles['folders__content']}>
				{isSelection && (
					<Sidebar
						className={styles['folders__sidebar']}
						closeSidebar={{
							exist: true,
							action: closeSidebar,
							ref: firstSidebarButtonRef
						}}
						toggleSelectState={{
							exist: true,
							action: toggleFoldersSelectState,
							selectAllButtonState: selectAllButtonState
						}}
						togglePinState={{
							exist: true,
							action: toggleFoldersPinState,
							disabled: !isAnyNoteSelected
						}}
						changeFolder={{
							exist: false
						}}
					/>
				)}
				<div className={styles['folders__list']} onFocus={handleListFocus}>
					{folders.items.map(folder => (
						<EditableFolder
							data={folder}
							isSelection={isSelection}
							isSelectable={folder.id !== 1}
							key={folder.id}
						>
							{folder.name}
						</EditableFolder>
					))}
				</div>
			</div>
			<div className={styles['folders__buttons']}>
				{!isSelection ? (
					<IconButton
						appearance='circle'
						colorScheme='primary'
						className={styles['folders__add-button']}
						onClick={createFolder}
					>
						<AddButtonIcon />
					</IconButton>
				) : (
					<IconButton
						appearance='circle'
						colorScheme='primary'
						className={styles['folders__remove-button']}
						onClick={removeFolder}
						disabled={!isAnyNoteSelected}
					>
						<RemoveButtonIcon />
					</IconButton>
				)}
			</div>
			<CreateFolderModal
				modalState={createFolderModalState}
				setModalState={setCreateFolderModalState}
			/>
		</div>
	);
}

export default Folders;
