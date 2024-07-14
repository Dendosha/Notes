import { Snackbar } from '@mui/base';
import cn from 'classnames';
import CancelButton from '../../assets/icons/CancelButtonIcon';
import styles from './CustomSnackbar.module.scss';
import { CustomSnackbarProps } from './CustomSnackbar.props';

function CustomSnackbar({
	open,
	handleClose,
	className,
	children,
	autoHideDuration = 2000
}: CustomSnackbarProps) {
	return (
		<Snackbar
			autoHideDuration={autoHideDuration}
			open={open}
			onClose={handleClose}
			className={cn(styles['custom-snackbar'], className)}
		>
			{children}
			<button
				onClick={handleClose}
				className={styles['custom-snackbar__close-button']}
			>
				<CancelButton width='20px' height='20px' />
			</button>
		</Snackbar>
	);
}

export default CustomSnackbar;
