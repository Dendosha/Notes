import cn from 'classnames';
import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Folder.module.scss';
import { FolderProps } from './Folder.props';

const Folder = forwardRef<HTMLAnchorElement, FolderProps>(function Folder(
	{ to, children, disabled = false, className, ...props },
	ref
) {
	return (
		<NavLink
			ref={ref}
			to={to}
			className={({ isActive }) =>
				cn(styles['folder'], className, {
					[styles['folder_active']]: isActive,
					[styles['folder_disabled']]: disabled
				})
			}
			tabIndex={disabled ? -1 : 0}
			{...props}
		>
			{children}
		</NavLink>
	);
});

export default Folder;
