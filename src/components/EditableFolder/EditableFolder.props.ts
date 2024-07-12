import { HTMLAttributes } from 'react';

export interface EditableFolderProps extends HTMLAttributes<HTMLDivElement> {
	children: string;
	noteCount: number;
	pinned?: boolean;
	isSelection?: boolean;
}
