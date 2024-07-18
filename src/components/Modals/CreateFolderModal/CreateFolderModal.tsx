import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../../hooks/useAppSelector.hook';
import { foldersActions } from '../../../store/folders.slice';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';
import Input from '../../Input/Input';
import TextButton from '../../TextButton/TextButton';
import CustomModal from '../CustomModal/CustomModal';
import styles from './CreateFolderModal.module.scss';
import { CreateFolderModalProps } from './CreateFolderModal.props';

const CREATE_FOLDER_MODAL_TITLE = 'create-folder-modal-title';

function CreateFolderModal({
	modalState,
	setModalState
}: CreateFolderModalProps) {
	const dispatch = useAppDispatch();
	const folders = useAppSelector(state => state.folders);

	const inputRef = useRef<HTMLInputElement>(null);

	const [folderNamesCollision, setFolderNamesCollision] = useState(false);
	const [folderName, setFolderName] = useState('');
	const [createButtonDisabled, setCreateButtonDisabled] = useState(true);

	useEffect(() => {
		if (folderName !== '') {
			setCreateButtonDisabled(false);
		} else {
			setCreateButtonDisabled(true);
		}
	}, [folderName]);

	const closeSnackbar = () => {
		setFolderNamesCollision(false);
		inputRef.current?.focus();
	};

	const closeModal = () => {
		setModalState(false);
	};

	const createFolder = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const isCollision = !!folders.items.find(item => item.name === folderName);

		if (isCollision) {
			setFolderNamesCollision(isCollision);
			return;
		}

		dispatch(
			foldersActions.add({
				id: new Date().getTime(),
				name: folderName,
				notes: []
			})
		);

		closeModal();
	};

	return (
		<CustomModal
			open={modalState}
			onClose={closeModal}
			aria-labelledby={CREATE_FOLDER_MODAL_TITLE}
		>
			<div>
				<form onSubmit={createFolder} className={styles['modal-form']}>
					<h2 id={CREATE_FOLDER_MODAL_TITLE} className='visually-hidden'>
						Создать папку заметок
					</h2>
					<Input
						ref={inputRef}
						placeholder='Название папки'
						onChange={e => setFolderName(e.target.value)}
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
							disabled={createButtonDisabled}
						>
							Создать
						</TextButton>
					</div>
				</form>
				<CustomSnackbar open={folderNamesCollision} handleClose={closeSnackbar}>
					Папка с таким именем уже существует
				</CustomSnackbar>
			</div>
		</CustomModal>
	);
}

export default CreateFolderModal;
