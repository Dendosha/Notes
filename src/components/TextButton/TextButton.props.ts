import { ButtonHTMLAttributes } from 'react';

export interface TextButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: string;
}
