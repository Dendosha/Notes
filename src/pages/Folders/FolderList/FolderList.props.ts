import { HTMLAttributes } from 'react';
import { ActionConfirmationProps } from '../Folders';

export interface FolderListProps extends HTMLAttributes<HTMLDivElement> {
	isSelection: boolean;
	confirmAction: ({ message, onConfirm }: ActionConfirmationProps) => void;
}
