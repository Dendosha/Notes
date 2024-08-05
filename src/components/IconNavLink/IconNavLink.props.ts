import { NavLinkProps } from 'react-router-dom';

export interface IconNavLinkProps extends NavLinkProps {
	appearance?: 'circle' | 'polygon';
	iconType?: 'fill' | 'stroke' | 'both';
}
