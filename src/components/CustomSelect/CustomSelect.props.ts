import { SelectOwnProps } from '@mui/base';

export type OptionValueType = string | number;

export interface CustomSelectItem<T extends OptionValueType> {
	value: T;
	label: string;
}

export interface CustomSelectOwnProps<T extends OptionValueType> {
	items: CustomSelectItem<T>[];
	setValue: (state: React.SetStateAction<T>) => void;
}

export type CustomSelectProps<T extends OptionValueType> =
	CustomSelectOwnProps<T> &
		Omit<SelectOwnProps<T, boolean>, 'slots' | 'slotProps'>;
