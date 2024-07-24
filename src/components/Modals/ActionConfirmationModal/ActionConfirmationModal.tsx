import TextButton from '../../TextButton/TextButton';
import CustomModal from '../CustomModal/CustomModal';
import styles from './ActionConfirmationModal.module.scss';
import { ActionConfirmationModalProps } from './ActionConfirmationModal.props';

const ACTION_CONFIRMATION_MODAL_TITLE = 'action-confirmation-modal-title';

function ActionConfirmationModal({
	message,
	onConfirm,
	modalState,
	setModalState
}: ActionConfirmationModalProps) {
	const closeModal = () => {
		setModalState(false);
	};

	const handleConfirm = () => {
		onConfirm();
		closeModal();
	};

	return (
		<CustomModal
			open={modalState}
			onClose={closeModal}
			className={styles['confirmation-modal']}
			aria-labelledby={ACTION_CONFIRMATION_MODAL_TITLE}
		>
			<div>
				<h2
					id={ACTION_CONFIRMATION_MODAL_TITLE}
					className={styles['confirmation-modal__title']}
				>
					{message}
				</h2>
				<div className={styles['confirmation-modal__buttons']}>
					<TextButton
						type='button'
						onClick={closeModal}
						className={styles['confirmation-modal__button']}
					>
						Отмена
					</TextButton>
					<TextButton
						type='button'
						className={styles['confirmation-modal__button']}
						onClick={handleConfirm}
					>
						Подтвердить
					</TextButton>
				</div>
			</div>
		</CustomModal>
	);
}

export default ActionConfirmationModal;
