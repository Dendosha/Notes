import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Folder.module.scss';
import { FolderProps } from './Folder.props';

function Folder({
	to,
	children,
	disabled = false,
	className,
	...props
}: FolderProps) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				cn(styles['folder'], className, {
					[styles['folder_active']]: isActive,
					[styles['folder_disabled']]: disabled
				})
			}
			{...props}
		>
			{children}
		</NavLink>
	);
}

export default Folder;
