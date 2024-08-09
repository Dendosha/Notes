import { NavLinkProps } from 'react-router-dom';

export interface IconNavLinkProps extends NavLinkProps {
	disabled?: boolean;
	appearance?: 'circle' | 'polygon';
	iconType?: 'fill' | 'stroke' | 'both';
}
