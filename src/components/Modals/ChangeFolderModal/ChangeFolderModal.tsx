import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../../hooks/useAppSelector.hook';
import { foldersActions } from '../../../store/folders.slice';
import { notesActions } from '../../../store/notes.slice';
import CustomSelect from '../../CustomSelect/CustomSelect';
import { CustomSelectItem } from '../../CustomSelect/CustomSelect.props';
import TextButton from '../../TextButton/TextButton';
import CustomModal from '../CustomModal/CustomModal';
import styles from './ChangeFolderModal.module.scss';
import { ChangeFolderModalProps } from './ChangeFolderModal.props';

const CHANGE_FOLDER_MODAL_TITLE = 'change-folder-modal-title';

function ChangeFolderModal({
	notes,
	modalState,
	setModalState
}: ChangeFolderModalProps) {
	const dispatch = useAppDispatch();
	const folders = useAppSelector(state => state.folders);

	const [newFolder, setNewFodler] = useState<string | number>('');

	const customSelectItems = folders.items.map(
		(item): CustomSelectItem<number> => ({
			value: item.id,
			label: item.name
		})
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const folderId = parseInt(formData.get('folder') as string);

		notes.forEach(note => {
			if (note.folderId[1]) {
				dispatch(
					foldersActions.removeNotes({
						id: note.folderId[1],
						notes: [note.id]
					})
				);
			}
		});

		dispatch(
			foldersActions.addNotes({
				id: folderId,
				notes: notes.map(note => note.id)
			})
		);

		notes.forEach(note => {
			dispatch(
				notesActions.update({
					...note,
					folderId: folderId
				})
			);
		});

		setModalState(false);
	};

	const closeModal = () => {
		setModalState(false);
	};

	return (
		<CustomModal
			open={modalState}
			onClose={closeModal}
			aria-labelledby={CHANGE_FOLDER_MODAL_TITLE}
		>
			<div>
				<form onSubmit={handleSubmit} className={styles['modal-form']}>
					<h2 id={CHANGE_FOLDER_MODAL_TITLE} className='visually-hidden'>
						Переместить заметки в другую папку
					</h2>
					<CustomSelect
						name='folder'
						setValue={setNewFodler}
						items={customSelectItems}
						defaultValue={''}
						placeholder={'Выберите папку'}
					/>
					<div className={styles['modal-buttons']}>
						<TextButton
							type='button'
							onClick={closeModal}
							className={styles['modal-buttons__button']}
						>
							Отмена
						</TextButton>
						<TextButton
							type='submit'
							className={styles['modal-buttons__button']}
							disabled={!newFolder}
						>
							Переместить
						</TextButton>
					</div>
				</form>
			</div>
		</CustomModal>
	);
}

export default ChangeFolderModal;
