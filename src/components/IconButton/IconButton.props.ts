import { HTMLAttributes } from 'react';

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
	action: () => void;
	appearance?: 'circle' | 'polygon';
}