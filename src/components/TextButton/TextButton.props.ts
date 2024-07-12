import { HTMLAttributes } from 'react';

export interface TextButtonProps extends HTMLAttributes<HTMLButtonElement> {
	children: string;
	action: () => void;
}
