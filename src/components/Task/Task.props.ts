import { HTMLAttributes } from 'react';

export interface TaskProps extends HTMLAttributes<HTMLDivElement> {
	children: string;
	pinned?: boolean;
}
