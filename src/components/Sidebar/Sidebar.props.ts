import { HTMLAttributes } from 'react';

export interface SidebarButton {
	exist: true;
	action: () => void;
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
	closeSidebar: SidebarButton;
	toggleSelectState: SidebarButton & { selectAllButtonState: boolean };
	togglePinState: SidebarButton;
	changeFolder: SidebarButton;
}
