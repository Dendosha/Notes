import { HTMLAttributes } from 'react';

export interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
	appearance?: 'circle' | 'square';
}
