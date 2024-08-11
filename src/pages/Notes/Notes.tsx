import cn from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import AddButtonIcon from '../../assets/icons/AddButtonIcon';
import EditFoldersButtonIcon from '../../assets/icons/EditFoldersButtonIcon';
import RemoveButtonIcon from '../../assets/icons/RemoveButtonIcon';
import IconButton from '../../components/IconButton/IconButton';
import ChangeFolderModal from '../../components/Modals/ChangeFolderModal/ChangeFolderModal';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useAppDispatch } from '../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../hooks/useAppSelector.hook';
import {
	RootContextType,
	useRootContext
} from '../../layout/RootLayout/RootLayout';
import { notesActions } from '../../store/notes.slice';
import FolderList from './FolderList/FolderList';
import styles from './Notes.module.scss';

function Notes() {
	const [selectAllButtonState, setSelectAllButtonState] = useState(false);
	const [modalState, setModalState] = useState(false);

	const { searchValue, isSelection, setIsSelection } = useRootContext();

	const dispatch = useAppDispatch();
	const notes = useAppSelector(state => state.notes);

	const { folder } = useParams();
	const navigate = useNavigate();
	const folderId = parseInt(folder?.split('-')[1] ?? '1');

	useEffect(() => {
		if (notes.items.find(note => note.selected)) {
			setIsSelection(true);

			if (
				!notes.items
					.filter(note => note.folderId.includes(folderId))
					.find(note => !note.selected)
			) {
				setSelectAllButtonState(true);
			} else {
				setSelectAllButtonState(false);
			}
		}
	}, [notes.items]);

	const upsertNote = () => {
		const newNoteId = new Date().getTime();
		navigate(`/notes/${folder}/note-${newNoteId}/edit`);
	};

	const removeNotes = () => {
		const selectedNotes = notes.items.filter(note => note.selected);

		selectedNotes.forEach(note => {
			dispatch(notesActions.remove(note.id));
		});
	};

	const closeSidebar = () => {
		notes.items
			.filter(note => note.selected)
			.forEach(note => {
				dispatch(notesActions.toggleSelect(note.id));
			});

		setSelectAllButtonState(false);
		setIsSelection(false);
	};

	const toggleNotesSelectState = () => {
		let filteredNotes = notes.items.filter(note =>
			note.folderId.includes(folderId)
		);

		filteredNotes
			.filter(note => note.selected === selectAllButtonState)
			.forEach(note => {
				dispatch(notesActions.toggleSelect(note.id));
			});

		setSelectAllButtonState(state => !state);
	};

	const toggleNotesPinState = () => {
		notes.items.forEach(note => {
			if (note.selected) {
				dispatch(notesActions.togglePin(note.id));
			}
		});
	};

	const changeNotesFolder = () => {
		setModalState(true);
	};

	return (
		<div className={styles['notes']}>
			<div className={styles['notes__folders']}>
				<NavLink
					to={'/folders'}
					className={cn(styles['notes__edit-folders'], {
						[styles['notes__edit-folders_disabled']]: isSelection
					})}
				>
					<EditFoldersButtonIcon />
				</NavLink>
				<FolderList className={styles['notes__folders-list']} />
			</div>
			<div className={styles['notes__content']}>
				{isSelection && (
					<Sidebar
						className={styles['notes__sidebar']}
						closeSidebar={{ exist: true, action: closeSidebar }}
						toggleSelectState={{
							exist: true,
							action: toggleNotesSelectState,
							selectAllButtonState: selectAllButtonState
						}}
						togglePinState={{ exist: true, action: toggleNotesPinState }}
						changeFolder={{ exist: true, action: changeNotesFolder }}
					/>
				)}
				<div className={styles['notes__list']}>
					<Outlet
						context={
							{
								searchValue,
								isSelection,
								setIsSelection
							} satisfies RootContextType
						}
					/>
				</div>
			</div>
			<div className={styles['notes__buttons']}>
				{!isSelection ? (
					<IconButton
						appearance='circle'
						colorScheme='primary'
						className={styles['notes__add-button']}
						onClick={upsertNote}
					>
						<AddButtonIcon />
					</IconButton>
				) : (
					<IconButton
						appearance='circle'
						colorScheme='primary'
						className={styles['notes__remove-button']}
						onClick={removeNotes}
					>
						<RemoveButtonIcon />
					</IconButton>
				)}
			</div>
			<ChangeFolderModal
				modalState={modalState}
				setModalState={setModalState}
				notes={notes.items.filter(note => note.selected)}
			/>
		</div>
	);
}

export default Notes;
