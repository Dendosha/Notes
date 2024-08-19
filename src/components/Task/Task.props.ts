import { HTMLAttributes } from 'react';
import { TasksItem } from '../../store/tasks.slice';

export interface TaskProps extends HTMLAttributes<HTMLLIElement> {
	children: string;
	data: TasksItem;
	isSelection?: boolean;
}
