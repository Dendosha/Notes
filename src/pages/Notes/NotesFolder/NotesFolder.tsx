import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Note from '../../../components/Note/Note';
import { useAppDispatch } from '../../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../../hooks/useAppSelector.hook';
import { useRootContext } from '../../../layout/RootLayout/RootLayout';
import { notesActions, NotesItem } from '../../../store/notes.slice';

function NotesFolder() {
	const { searchValue, isSelection } = useRootContext();

	const dispatch = useAppDispatch();
	const folders = useAppSelector(state => state.folders);

	const navigate = useNavigate();
	const { folder } = useParams();
	const folderId = parseInt(folder?.split('-')[1] ?? '1');

	const notes = useAppSelector(state => state.notes);

	useEffect(() => {
		if (
			(folder !== 'all' &&
				folderId !== 1 &&
				!folders.items.find(item => item.id === folderId)) ||
			(folder !== 'all' && !folderId)
		) {
			navigate(-1);
		}
	}, []);

	const editNote = (note: NotesItem) => {
		if (isSelection) {
			dispatch(notesActions.toggleSelect(note.id));
			return;
		}

		navigate(`/notes/${folder}/note-${note.id}/edit`);
	};

	return (
		<>
			{notes.items
				.filter(note => note.folderId.includes(folderId))
				.filter(note => note.title.toLowerCase().includes(searchValue))
				.map(note => (
					<Note
						data={note}
						isSelection={isSelection}
						onClick={() => editNote(note)}
						key={note.id}
					>
						{note.title}
					</Note>
				))}
			<Outlet />
		</>
	);
}

export default NotesFolder;
