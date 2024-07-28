import { HTMLAttributes } from 'react';
import { MenuItem } from '../ContextMenu/ContextMenu.props';

export interface InteractiveListItemProps
	extends HTMLAttributes<HTMLDivElement> {
	contextMenuItems: MenuItem[];
	children: React.ReactNode;
}
