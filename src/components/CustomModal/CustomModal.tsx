import { Modal as BaseModal, ModalBackdropSlotProps } from '@mui/base/Modal';
import { Fade } from '@mui/material';
import { styled } from '@mui/system';
import cn from 'classnames';
import { forwardRef } from 'react';
import styles from './CustomModal.module.scss';
import { CustomModalProps } from './CustomModal.props';

function CustomModal({
	className,
	open,
	handleClose,
	children,
	...props
}: CustomModalProps) {
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				slots={{ backdrop: Backdrop }}
				slotProps={{
					root: {
						className: cn(styles['custom-modal'], className)
					},
					backdrop: {
						className: cn(styles['custom-modal__backdrop'])
					}
				}}
				closeAfterTransition
				{...props}
			>
				<Fade
					in={open}
					timeout={200}
					className={styles['custom-modal__content']}
				>
					{children}
				</Fade>
			</Modal>
		</div>
	);
}

const Modal = styled(BaseModal)`
	position: fixed;
	z-index: 1300;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Backdrop = forwardRef(function Backdrop(
	props: ModalBackdropSlotProps,
	ref: React.ForwardedRef<HTMLDivElement>
) {
	const { ownerState, ...other } = props;

	return (
		<Fade in={ownerState.open} timeout={200}>
			<div ref={ref} {...other} />
		</Fade>
	);
});

export default CustomModal;
