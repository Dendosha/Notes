import { ModalOwnProps } from '@mui/base';

export interface CustomModalProps
	extends Omit<ModalOwnProps, 'slots' | 'slotProps'> {
	className?: string | undefined;
	'aria-labelledby': string;
}
