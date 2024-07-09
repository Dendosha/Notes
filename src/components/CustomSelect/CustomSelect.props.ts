import { SelectOwnProps } from '@mui/base';

export type OptionValueType = string | number;

interface CustomSelectItem<T extends OptionValueType> {
	value: T;
	label: string;
}

export interface CustomSelectOwnProps<T extends OptionValueType> {
	items: CustomSelectItem<T>[];
}

export type CustomSelectProps<T extends OptionValueType> =
	CustomSelectOwnProps<T> &
		Omit<SelectOwnProps<T, boolean>, 'slots' | 'slotProps'>;
