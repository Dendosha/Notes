import { HTMLAttributes } from 'react';
import { NotesItem } from '../../store/notes.slice';

export interface NoteProps extends HTMLAttributes<HTMLDivElement> {
	children: string;
	data: NotesItem;
	isSelection?: boolean;
}
