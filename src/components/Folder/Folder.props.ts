import { NavLinkProps } from 'react-router-dom';

export interface FolderProps extends NavLinkProps {
	children: string;
	disabled?: boolean;
	pinned?: boolean;
}
