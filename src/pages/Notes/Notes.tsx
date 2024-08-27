import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import {
	NavLink,
	Outlet,
	useNavigate,
	useOutletContext,
	useParams
} from 'react-router-dom';
import AddButtonIcon from '../../assets/icons/AddButtonIcon';
import EditFoldersButtonIcon from '../../assets/icons/EditFoldersButtonIcon';
import RemoveButtonIcon from '../../assets/icons/RemoveButtonIcon';
import IconButton from '../../components/IconButton/IconButton';
import ActionConfirmationModal from '../../components/Modals/ActionConfirmationModal/ActionConfirmationModal';
import ChangeFolderModal from '../../components/Modals/ChangeFolderModal/ChangeFolderModal';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useAppDispatch } from '../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../hooks/useAppSelector.hook';
import {
	RootContextType,
	useRootContext
} from '../../layout/RootLayout/RootLayout';
import { foldersActions } from '../../store/folders.slice';
import { notesActions } from '../../store/notes.slice';
import FolderList from './FolderList/FolderList';
import styles from './Notes.module.scss';

export interface ActionConfirmationProps {
	message: string;
	onConfirm: () => void;
}

export interface NotesContextType {
	focusFromUpsertNoteRef: React.MutableRefObject<HTMLElement | null>;
	confirmAction: ({ message, onConfirm }: ActionConfirmationProps) => void;
}

export function useNotesContext() {
	return useOutletContext<RootContextType & NotesContextType>();
}

function Notes() {
	const [actionConfirmationModalState, setActionConfirmationModalState] =
		useState(false);
	const [actionConfirmationProps, setActionConfirmationProps] =
		useState<ActionConfirmationProps>({
			message: '',
			onConfirm: () => {}
		});

	const [isAnyNoteSelected, setIsAnyNoteSelected] = useState(false);
	const [selectAllButtonState, setSelectAllButtonState] = useState(false);
	const [changeFolderModalState, setChangeFolderModalState] = useState(false);

	const firstSidebarButtonRef = useRef<HTMLButtonElement>(null);
	const foldersPageAnchorRef = useRef<HTMLAnchorElement>(null);
	const foldersParentRef = useRef<HTMLDivElement>(null);
	const focusFromUpsertNoteRef = useRef<HTMLElement | null>(null);

	const { searchValue, isSelection, setIsSelection } = useRootContext();

	const dispatch = useAppDispatch();
	const notes = useAppSelector(state => state.notes);
	const settings = useAppSelector(state => state.settings);

	const { folder } = useParams();
	const navigate = useNavigate();
	const folderId = parseInt(folder?.split('-')[1] ?? '1');

	useEffect(() => {
		if (isSelection && firstSidebarButtonRef.current) {
			firstSidebarButtonRef.current.focus();
		}
	}, [isSelection, firstSidebarButtonRef]);

	useEffect(() => {
		if (notes.items.find(note => note.selected)) {
			setIsSelection(true);
			setIsAnyNoteSelected(true);

			if (
				!notes.items
					.filter(note => note.folderId.includes(folderId))
					.find(note => !note.selected)
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
	}, [notes.items]);

	const createNote = (e: React.MouseEvent) => {
		const newNoteId = new Date().getTime();
		focusFromUpsertNoteRef.current = e.currentTarget as HTMLButtonElement;
		navigate(`/notes/${folder}/note-${newNoteId}/edit`);
	};

	const confirmAction = ({ message, onConfirm }: ActionConfirmationProps) => {
		setActionConfirmationProps({
			message,
			onConfirm
		});
		setActionConfirmationModalState(true);
	};

	const removeNotes = () => {
		if (
			settings.actionConfirmations === 'all' ||
			settings.actionConfirmations === 'deleteOnly'
		) {
			confirmAction({ message: 'Подтвердить удаление', onConfirm: remove });
		} else {
			remove();
		}

		function remove() {
			const selectedNotes = notes.items.filter(note => note.selected);

			selectedNotes.forEach(note => {
				dispatch(notesActions.remove(note.id));
				dispatch(
					foldersActions.removeNotes({
						id: note.folderId[1] ?? note.folderId[0],
						notes: [note.id]
					})
				);
			});

			setSelectAllButtonState(false);
			setIsSelection(false);
		}
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
		setChangeFolderModalState(true);
	};

	return (
		<div className={styles['notes']}>
			<div ref={foldersParentRef} className={styles['notes__folders']}>
				<NavLink
					ref={foldersPageAnchorRef}
					to={'/folders'}
					className={cn(styles['notes__edit-folders'], {
						[styles['notes__edit-folders_disabled']]: isSelection
					})}
					tabIndex={isSelection ? -1 : 0}
				>
					<EditFoldersButtonIcon />
				</NavLink>
				<FolderList
					parentElementRef={foldersParentRef}
					prevElementRef={foldersPageAnchorRef}
					className={styles['notes__folders-list']}
				/>
			</div>
			<div className={styles['notes__content']}>
				{isSelection && (
					<Sidebar
						className={styles['notes__sidebar']}
						closeSidebar={{
							exist: true,
							action: closeSidebar,
							ref: firstSidebarButtonRef
						}}
						toggleSelectState={{
							exist: true,
							action: toggleNotesSelectState,
							selectAllButtonState: selectAllButtonState
						}}
						togglePinState={{
							exist: true,
							action: toggleNotesPinState,
							disabled: !isAnyNoteSelected
						}}
						changeFolder={{
							exist: true,
							action: changeNotesFolder,
							disabled: !isAnyNoteSelected
						}}
					/>
				)}
				<Outlet
					context={
						{
							searchValue,
							isSelection,
							setIsSelection,
							focusFromUpsertNoteRef,
							confirmAction
						} satisfies RootContextType & NotesContextType
					}
				/>
			</div>
			<div className={styles['notes__buttons']}>
				{!isSelection ? (
					<IconButton
						appearance='circle'
						colorScheme='primary'
						className={styles['notes__add-button']}
						onClick={createNote}
					>
						<AddButtonIcon />
					</IconButton>
				) : (
					<IconButton
						appearance='circle'
						colorScheme='primary'
						className={styles['notes__remove-button']}
						onClick={removeNotes}
						disabled={!isAnyNoteSelected}
					>
						<RemoveButtonIcon />
					</IconButton>
				)}
			</div>
			<ChangeFolderModal
				confirmAction={confirmAction}
				modalState={changeFolderModalState}
				setModalState={setChangeFolderModalState}
				notes={notes.items.filter(note => note.selected)}
			/>
			{settings.actionConfirmations !== 'none' && (
				<ActionConfirmationModal
					message={actionConfirmationProps.message}
					modalState={actionConfirmationModalState}
					onConfirm={actionConfirmationProps.onConfirm}
					setModalState={setActionConfirmationModalState}
				/>
			)}
		</div>
	);
}

export default Notes;
