import cn from 'classnames';
import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import PinIcon from '../../assets/icons/PinIcon';
import styles from './Folder.module.scss';
import { FolderProps } from './Folder.props';

const Folder = forwardRef<HTMLAnchorElement, FolderProps>(function Folder(
	{ to, children, disabled = false, pinned = false, className, ...props },
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
			{...props}
		>
			<p className={styles['folder__text']}>{children}</p>
			{pinned && <PinIcon className={styles['folder__pin']} />}
		</NavLink>
	);
});

export default Folder;
