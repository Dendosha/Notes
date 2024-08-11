import { ButtonHTMLAttributes } from 'react';

export interface IconButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	appearance?: 'circle' | 'polygon';
	colorScheme?: 'default' | 'primary';
	iconType?: 'fill' | 'stroke' | 'both';
}
