import { SelectOwnProps } from '@mui/base';

export type OptionValueType = string | number;

export interface CustomSelectItem<T> {
	value: T;
	label: string;
}

export interface CustomSelectOwnProps<T> {
	items: CustomSelectItem<T>[];
	setValue: (state: React.SetStateAction<T>) => void;
}

export type CustomSelectProps<T> = CustomSelectOwnProps<T> &
	Omit<SelectOwnProps<{}, boolean>, 'slots' | 'slotProps'>;
