import { HTMLAttributes } from 'react';

export interface NoteProps extends HTMLAttributes<HTMLDivElement> {
	children: string;
	date: string;
	pinned?: boolean;
}
