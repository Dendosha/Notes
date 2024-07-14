import { ButtonHTMLAttributes } from 'react';

export interface IconButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	action: () => void;
	appearance?: 'circle' | 'polygon';
}
