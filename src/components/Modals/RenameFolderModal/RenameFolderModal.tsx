import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../../hooks/useAppSelector.hook';
import { foldersActions } from '../../../store/folders.slice';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';
import TextButton from '../../TextButton/TextButton';
import TextField from '../../TextField/TextField';
import CustomModal from '../CustomModal/CustomModal';
import styles from './RenameFolderModal.module.scss';
import { RenameFolderModalProps } from './RenameFolderModal.props';

const RENAME_FOLDER_MODAL_TITLE = 'rename-folder-modal-title';

function RenameFolderModal({
	id,
	name,
	modalState,
	setModalState,
	confirmAction
}: RenameFolderModalProps) {
	const dispatch = useAppDispatch();
	const folders = useAppSelector(state => state.folders);
	const settings = useAppSelector(state => state.settings);

	const inputRef = useRef<HTMLInputElement>(null);

	const [folderNamesCollision, setFolderNamesCollision] = useState(false);
	const [folderName, setFolderName] = useState(name);
	const [renameButtonDisabled, setRenameButtonDisabled] = useState(true);

	useEffect(() => {
		setFolderName(name);
	}, [name]);

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

	const closeModal = (e: React.KeyboardEvent | React.MouseEvent) => {
		e.stopPropagation();
		setModalState(false);
	};

	const renameFolder = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (folderName === name) {
			setModalState(false);
			return;
		}

		const isCollision = !!folders.items.find(item => item.name === folderName);

		if (isCollision) {
			setFolderNamesCollision(isCollision);
			return;
		}

		if (settings.actionConfirmations === 'all') {
			confirmAction({ message: 'Подтвердить изменения', onConfirm: rename });
		} else {
			rename();
		}

		setModalState(false);

		function rename() {
			dispatch(
				foldersActions.rename({
					id,
					name: folderName
				})
			);
		}
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
					<TextField
						ref={inputRef}
						name='new-folder-name'
						placeholder='Название папки'
						value={folderName}
						onFocus={e => e.stopPropagation()}
						onChange={e =>
							setFolderName((e.target as EventTarget & HTMLInputElement).value)
						}
					/>
					<div className={styles['modal-buttons']}>
						<TextButton
							type='button'
							onFocus={e => e.stopPropagation()}
							onClick={closeModal}
							className={styles['modal-buttons__button']}
						>
							Отмена
						</TextButton>
						<TextButton
							type='submit'
							className={styles['modal-buttons__button']}
							disabled={renameButtonDisabled}
							onFocus={e => e.stopPropagation()}
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
