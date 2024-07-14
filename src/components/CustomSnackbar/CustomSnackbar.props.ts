import { SnackbarOwnProps } from '@mui/base';

export interface CustomSnackbarProps extends SnackbarOwnProps {
	className?: string | undefined;
	setOpen: (state: React.SetStateAction<boolean>) => void;
}
