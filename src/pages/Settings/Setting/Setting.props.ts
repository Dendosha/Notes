import { HTMLAttributes } from 'react';
import { CustomSelectItem } from '../../../components/CustomSelect/CustomSelect.props';

export type SelectChangeEvent =
	| React.MouseEvent<Element, MouseEvent>
	| React.KeyboardEvent<Element>
	| React.FocusEvent<Element, Element>
	| null;

export interface SettingProps<T> extends HTMLAttributes<HTMLDivElement> {
	inputName: string;
	items: CustomSelectItem<T>[];
	defaultSelectValue: T;
	setSelectValue: React.Dispatch<React.SetStateAction<T>>;
	onSelectChange: (e: SelectChangeEvent) => void;
}
