import { HTMLAttributes } from 'react';

export type MenuItem = {
	name: string;
	action: () => void;
};

export interface ContextMenuProps extends HTMLAttributes<HTMLUListElement> {
	items: MenuItem[];
	coordinates: {
		x: number;
		y: number;
	};
	setMenuState: (state: React.SetStateAction<boolean>) => void;
}
