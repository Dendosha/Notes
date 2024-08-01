import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../../hooks/useAppSelector.hook';
import { foldersActions } from '../../../store/folders.slice';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';
import Input from '../../Input/Input';
import TextButton from '../../TextButton/TextButton';
import CustomModal from '../CustomModal/CustomModal';
import styles from './RenameFolderModal.module.scss';
import { RenameFolderModalProps } from './RenameFolderModal.props';

const RENAME_FOLDER_MODAL_TITLE = 'rename-folder-modal-title';

function RenameFolderModal({
	id,
	name,
	modalState,
	setModalState
}: RenameFolderModalProps) {
	const dispatch = useAppDispatch();
	const folders = useAppSelector(state => state.folders);

	const inputRef = useRef<HTMLInputElement>(null);

	const [folderNamesCollision, setFolderNamesCollision] = useState(false);
	const [folderName, setFolderName] = useState(name);
	const [renameButtonDisabled, setRenameButtonDisabled] = useState(true);

	useEffect(() => {
		if (folderName !== '') {
			setRenameButtonDisabled(false);
		} else {
			setRenameButtonDisabled(true);
		}
	}, [folderName]);

	const closeSnackbar = () => {
		setFolderNamesCollision(false);
		inputRef.current?.focus();
	};

	const closeModal = () => {
		setModalState(false);
	};

	const renameFolder = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (folderName === name) {
			closeModal();
			return;
		}

		const isCollision = !!folders.items.find(item => item.name === folderName);

		if (isCollision) {
			setFolderNamesCollision(isCollision);
			return;
		}

		dispatch(
			foldersActions.rename({
				id,
				name: folderName
			})
		);

		closeModal();
	};

	return (
		<CustomModal
			open={modalState}
			onClose={closeModal}
			aria-labelledby={RENAME_FOLDER_MODAL_TITLE}
		>
			<div>
				<form onSubmit={renameFolder} className={styles['modal-form']}>
					<h2 id={RENAME_FOLDER_MODAL_TITLE} className='visually-hidden'>
						Переименовать папку заметок
					</h2>
					<Input
						ref={inputRef}
						name='newFodlerName'
						placeholder='Название папки'
						value={folderName}
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
							disabled={renameButtonDisabled}
						>
							Переименовать
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

export default RenameFolderModal;
