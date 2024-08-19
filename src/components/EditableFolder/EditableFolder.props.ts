import { HTMLAttributes } from 'react';
import { FoldersItem } from '../../store/folders.slice';

export interface EditableFolderProps extends HTMLAttributes<HTMLLIElement> {
	children: string;
	data: FoldersItem;
	isSelectable?: boolean;
	isSelection?: boolean;
}
