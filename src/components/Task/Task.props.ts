import { HTMLAttributes } from 'react';
import { TasksItem } from '../../store/tasks.slice';
import { MenuItem } from '../ContextMenu/ContextMenu.props';

export interface TaskProps extends HTMLAttributes<HTMLLIElement> {
	contextMenuItems?: MenuItem[];
	children: string;
	data: TasksItem;
	isSelection?: boolean;
}
