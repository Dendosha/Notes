import { HTMLAttributes } from 'react';

export interface FolderListProps<T extends HTMLElement, K extends HTMLElement>
	extends HTMLAttributes<HTMLElement> {
	parentElementRef: React.RefObject<T>;
	prevElementRef: React.RefObject<K>;
}
