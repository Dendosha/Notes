import { HTMLAttributes } from 'react';

type MenuItem = {
	name: string;
	action: () => void;
};

export interface ContextMenuProps extends HTMLAttributes<HTMLUListElement> {
	items: MenuItem[];
}
