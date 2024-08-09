import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './IconNavLink.module.scss';
import { IconNavLinkProps } from './IconNavLink.props';

function IconNavLink({
	disabled = false,
	appearance = 'polygon',
	iconType = 'fill',
	children,
	className,
	to,
	...props
}: IconNavLinkProps) {
	return (
		<NavLink
			className={({ isActive }) =>
				cn(styles['icon-nav-link'], className, {
					[styles['icon-nav-link_active']]: isActive,
					[styles['icon-nav-link_disabled']]: disabled,
					[styles['icon-nav-link_polygon']]: appearance === 'polygon',
					[styles['icon-nav-link_circle']]: appearance === 'circle',
					[styles['icon-nav-link_fill']]: iconType === 'fill',
					[styles['icon-nav-link_stroke']]: iconType === 'stroke',
					[styles['icon-nav-link_fill-and-stroke']]: iconType === 'both'
				})
			}
			to={to}
			{...props}
		>
			{children}
		</NavLink>
	);
}

export default IconNavLink;
