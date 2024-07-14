import { Snackbar } from '@mui/base';
import cn from 'classnames';
import CancelButton from '../../assets/icons/CancelButtonIcon';
import styles from './CustomSnackbar.module.scss';
import { CustomSnackbarProps } from './CustomSnackbar.props';

function CustomSnackbar({
	open,
	setOpen,
	className,
	children,
	autoHideDuration = 2000
}: CustomSnackbarProps) {
	const closeSnackbar = () => {
		setOpen(false);
	};

	return (
		<Snackbar
			autoHideDuration={autoHideDuration}
			open={open}
			onClose={closeSnackbar}
			className={cn(styles['custom-snackbar'], className)}
		>
			{children}
			<button
				onClick={closeSnackbar}
				className={styles['custom-snackbar__close-button']}
			>
				<CancelButton width='20px' height='20px' />
			</button>
		</Snackbar>
	);
}

export default CustomSnackbar;
