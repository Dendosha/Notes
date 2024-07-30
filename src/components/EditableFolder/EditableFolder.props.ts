import { HTMLAttributes } from 'react';
import { FoldersItem } from '../../store/folders.slice';

export interface EditableFolderProps extends HTMLAttributes<HTMLDivElement> {
	children: string;
	data: FoldersItem;
	isSelection?: boolean;
}
