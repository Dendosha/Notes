import { HTMLAttributes } from 'react';
import { NotesItem } from '../../store/notes.slice';
import { MenuItem } from '../ContextMenu/ContextMenu.props';

export interface NoteProps extends HTMLAttributes<HTMLLIElement> {
	contextMenuItems?: MenuItem[];
	children: string;
	data: NotesItem;
	isSelection?: boolean;
}
