import { HTMLAttributes } from 'react';

export interface EditableFolderProps extends HTMLAttributes<HTMLDivElement> {
	children: string;
	pinned?: boolean;
	isSelection?: boolean;
}
