import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButtonIcon from '../../../assets/icons/BackButtonIcon';
import IconButton from '../../../components/IconButton/IconButton';
import TextField from '../../../components/TextField/TextField';
import { useAppDispatch } from '../../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../../hooks/useAppSelector.hook';
import { foldersActions } from '../../../store/folders.slice';
import { notesActions, NotesItem } from '../../../store/notes.slice';
import { useNotesContext } from '../Notes';
import styles from './NoteUpsert.module.scss';

function NoteUpsert() {
	const dispatch = useAppDispatch();
	const notes = useAppSelector(state => state.notes);
	const settings = useAppSelector(state => state.settings);

	const { focusFromUpsertNoteRef, confirmAction } = useNotesContext();

	const navigate = useNavigate();
	const { folder, note } = useParams();
	const folderId = parseInt(folder?.split('-')[1] ?? '1');
	const noteId = parseInt(note?.split('-')[1]!);

	const noteExist = notes.items.find(item => item.id === noteId);

	const buttonRef = useRef<HTMLButtonElement>(null);
	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		titleRef.current?.focus();

		function handleEscape(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				handleUpsert();
			}
		}

		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [titleRef.current]);

	const createNote = () => {
		if (settings.actionConfirmations === 'all') {
			confirmAction({ message: 'Подтвердить создание', onConfirm: create });
		} else {
			create();
		}

		function create() {
			dispatch(
				notesActions.add({
					id: noteId,
					title: titleRef.current?.value ?? '',
					content: descriptionRef.current?.value ?? '',
					folderId: folderId !== 1 ? folderId : undefined
				})
			);

			dispatch(
				foldersActions.addNotes({
					id: folderId,
					notes: [noteId]
				})
			);

			handleExit();
		}
	};

	const updateNote = () => {
		if (settings.actionConfirmations === 'all') {
			confirmAction({ message: 'Подтвердить создание', onConfirm: update });
		} else {
			update();
		}

		function update() {
			dispatch(
				notesActions.update({
					id: noteId,
					title: titleRef.current?.value!,
					content: descriptionRef.current?.value!
				})
			);

			handleExit();
		}
	};

	const removeNote = (note: NotesItem) => {
		if (
			settings.actionConfirmations === 'all' ||
			settings.actionConfirmations === 'deleteOnly'
		) {
			confirmAction({ message: 'Подтвердить удаление', onConfirm: remove });
		} else {
			remove();
		}

		function remove() {
			dispatch(notesActions.remove(note.id));
			dispatch(
				foldersActions.removeNotes({
					id: note.folderId[1] ?? note.folderId[0],
					notes: [note.id]
				})
			);

			handleExit();
		}
	};

	const handleUpsert = () => {
		if (noteExist) {
			if (
				titleRef.current?.value === noteExist.title &&
				descriptionRef.current?.value === noteExist.content
			) {
				handleExit();
				return;
			}

			if (!titleRef.current?.value && !descriptionRef.current?.value) {
				removeNote(noteExist);
			} else {
				updateNote();
			}
		} else if (titleRef.current?.value || descriptionRef.current?.value) {
			createNote();
		}
	};

	const handleExit = () => {
		navigate(-1);
		setTimeout(() => {
			focusFromUpsertNoteRef.current?.focus();
		}, 0.5);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key !== 'Tab') {
			return;
		}

		if (e.shiftKey && document.activeElement === buttonRef.current) {
			e.preventDefault();
			descriptionRef.current?.focus();
		} else if (
			!e.shiftKey &&
			document.activeElement === descriptionRef.current
		) {
			e.preventDefault();
			buttonRef.current?.focus();
		}
	};

	return (
		<div className={styles['note-upsert']} onKeyDown={handleKeyDown}>
			<div className={styles['note-upsert__header']}>
				<IconButton iconType='stroke' onClick={handleUpsert} ref={buttonRef}>
					<BackButtonIcon />
				</IconButton>
				<TextField
					as='input'
					ref={titleRef}
					autoComplete='off'
					name='note-title'
					defaultValue={noteExist?.title}
					placeholder='Заголовок'
				/>
			</div>
			<div className={styles['note-upsert__content']}>
				<TextField
					as='textarea'
					ref={descriptionRef}
					name='note-description'
					defaultValue={noteExist?.content}
					placeholder='Описание'
					className={styles['note-upsert__description']}
				/>
			</div>
		</div>
	);
}

export default NoteUpsert;
