import { SnackbarOwnProps } from '@mui/base';

export interface CustomSnackbarProps extends SnackbarOwnProps {
	className?: string | undefined;
	handleClose: () => void;
}
