import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { MenuItem } from '../../../components/ContextMenu/ContextMenu.props';
import InteractiveList from '../../../components/InteractiveList/InteractiveList';
import Note from '../../../components/Note/Note';
import { sortItems } from '../../../helpers/sortItems';
import { useAppDispatch } from '../../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../../hooks/useAppSelector.hook';
import { foldersActions } from '../../../store/folders.slice';
import { notesActions, NotesItem } from '../../../store/notes.slice';
import { NotesContextType, useNotesContext } from '../Notes';
import style from './NotesFolder.module.scss';

function NotesFolder() {
	const { searchValue, isSelection, focusFromUpsertNoteRef, confirmAction } =
		useNotesContext();

	const dispatch = useAppDispatch();
	const folders = useAppSelector(state => state.folders);

	const navigate = useNavigate();
	const { folder } = useParams();
	const folderId = parseInt(folder?.split('-')[1] ?? '1');

	const notes = useAppSelector(state => state.notes);
	const settings = useAppSelector(state => state.settings);
	const folderNotes = sortItems(notes.items, settings.sort).filter(note =>
		note.folderId.includes(folderId)
	);

	useEffect(() => {
		if (
			(folder !== 'all' &&
				folderId !== 1 &&
				!folders.items.find(item => item.id === folderId)) ||
			(folder !== 'all' && !folderId)
		) {
			navigate(-1);
		}
	}, [folder]);

	const setContextMenuItems = (note: NotesItem): MenuItem[] => {
		const selectButtonName = note.selected ? 'Снять выделение' : 'Выделить';
		const pinButtonName = note.pinned.state ? 'Открепить' : 'Закрепить';

		return [
			{
				name: selectButtonName,
				action: () => dispatch(notesActions.toggleSelect(note.id))
			},
			{
				name: pinButtonName,
				action: () => dispatch(notesActions.togglePin(note.id))
			},
			{
				name: 'Редактировать',
				action: () => navigate(`/notes/${folder}/note-${note.id}/edit`)
			},
			{
				name: 'Удалить',
				action: () => {
					if (
						settings.actionConfirmations === 'all' ||
						settings.actionConfirmations === 'deleteOnly'
					) {
						confirmAction({
							message: 'Подтвердить удаление',
							onConfirm: remove
						});
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
					}
				}
			}
		];
	};

	const editNote = (
		e: React.MouseEvent | React.KeyboardEvent,
		note: NotesItem
	) => {
		if (isSelection) {
			dispatch(notesActions.toggleSelect(note.id));
			return;
		}

		focusFromUpsertNoteRef.current = e.currentTarget as HTMLLIElement;
		navigate(`/notes/${folder}/note-${note.id}/edit`);
	};

	return (
		<>
			<InteractiveList
				className={style['notes-list']}
				isNotFocusable={folderNotes.length === 0}
			>
				{folderNotes
					.filter(note => note.title.toLowerCase().includes(searchValue))
					.map(note => (
						<Note
							contextMenuItems={setContextMenuItems(note)}
							data={note}
							isSelection={isSelection}
							onClick={e => editNote(e, note)}
							onKeyDown={e => e.key === 'Enter' && editNote(e, note)}
							key={note.id}
						>
							{note.title !== '' ? note.title : 'Без заголовка'}
						</Note>
					))}
			</InteractiveList>
			<Outlet
				context={
					{ focusFromUpsertNoteRef, confirmAction } satisfies NotesContextType
				}
			/>
		</>
	);
}

export default NotesFolder;
