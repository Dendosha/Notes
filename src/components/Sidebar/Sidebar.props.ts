import { HTMLAttributes } from 'react';

export interface SidebarButton {
	exist: boolean;
	disabled?: boolean;
	ref?: React.RefObject<HTMLButtonElement>;
	action?: () => void;
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
	closeSidebar: SidebarButton;
	toggleSelectState: SidebarButton & { selectAllButtonState: boolean };
	togglePinState: SidebarButton;
	changeFolder: SidebarButton;
}
