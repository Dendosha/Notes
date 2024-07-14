import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../../hooks/useAppSelector.hook';
import { foldersActions } from '../../../store/folders.slice';
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

	const closeModal = () => {
		setModalState(false);
	};

	const createFolder = () => {
		const isCollision = !!folders.items.find(item => item.name === folderName);

		if (isCollision) {
			setFolderNamesCollision(isCollision);
			return;
		}

		dispatch(
			foldersActions.add({
				id: new Date().toISOString(),
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
				<h2 id={CREATE_FOLDER_MODAL_TITLE} className='visually-hidden'>
					Создать папку заметок
				</h2>
				<Input
					placeholder='Название папки'
					onChange={e => setFolderName(e.target.value)}
				/>
				{folderNamesCollision && (
					<span>Папка с таким именем уже существует</span>
				)}
				<div className={styles['modal-buttons']}>
					<TextButton
						action={closeModal}
						className={styles['modal-buttons__button']}
					>
						Отмена
					</TextButton>
					<TextButton
						action={createFolder}
						className={styles['modal-buttons__button']}
						disabled={createButtonDisabled}
					>
						Создать
					</TextButton>
				</div>
			</div>
		</CustomModal>
	);
}

export default CreateFolderModal;
