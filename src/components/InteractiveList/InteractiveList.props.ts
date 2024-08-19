import { HTMLAttributes } from 'react';

export interface InteractiveListProps extends HTMLAttributes<HTMLUListElement> {
	isNotFocusable?: boolean;
}
