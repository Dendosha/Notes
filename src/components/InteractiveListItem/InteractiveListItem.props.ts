import { HTMLAttributes } from 'react';
import { MenuItem } from '../ContextMenu/ContextMenu.props';

export interface InteractiveListItemProps
	extends HTMLAttributes<HTMLLIElement> {
	contextMenuItems?: MenuItem[];
	isSelection: boolean;
	children: React.ReactNode;
}
