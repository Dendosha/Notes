import { HTMLAttributes } from 'react';
import { TasksItem } from '../../store/tasks.slice';

export interface TaskProps extends HTMLAttributes<HTMLDivElement> {
	children: string;
	data: TasksItem;
	isSelection?: boolean;
}
