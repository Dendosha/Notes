import { HTMLAttributes } from 'react';
import { ActionConfirmationProps } from '../Tasks';

export interface TasksListProps extends HTMLAttributes<HTMLDivElement> {
	confirmAction: ({ message, onConfirm }: ActionConfirmationProps) => void;
	upsertTask: (
		e: React.MouseEvent | React.KeyboardEvent,
		taskId?: number
	) => void;
}
