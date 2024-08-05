import { ButtonHTMLAttributes } from 'react';

export interface IconButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	appearance?: 'circle' | 'polygon';
	iconType?: 'fill' | 'stroke' | 'both';
}
