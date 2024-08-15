import { HTMLAttributes } from 'react';
import { MenuItem } from '../ContextMenu/ContextMenu.props';

export interface InteractiveListItemProps
	extends HTMLAttributes<HTMLDivElement> {
	contextMenuItems?: MenuItem[];
	isSelection: boolean;
	children: React.ReactNode;
}
