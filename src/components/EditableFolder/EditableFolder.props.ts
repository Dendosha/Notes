import { HTMLAttributes } from 'react';
import { FoldersItem } from '../../store/folders.slice';
import { MenuItem } from '../ContextMenu/ContextMenu.props';

export interface EditableFolderProps extends HTMLAttributes<HTMLLIElement> {
	contextMenuItems?: MenuItem[];
	children: string;
	data: FoldersItem;
	isSelectable?: boolean;
	isSelection?: boolean;
}
