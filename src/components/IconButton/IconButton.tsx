import cn from 'classnames';
import styles from './IconButton.module.scss';
import { IconButtonProps } from './IconButton.props';

function IconButton({
	appearance = 'polygon',
	iconType = 'fill',
	children,
	className,
	...props
}: IconButtonProps) {
	return (
		<button
			className={cn(styles['icon-button'], className, {
				[styles['icon-button_polygon']]: appearance === 'polygon',
				[styles['icon-button_circle']]: appearance === 'circle',
				[styles['icon-button_fill']]: iconType === 'fill',
				[styles['icon-button_stroke']]: iconType === 'stroke',
				[styles['icon-button_fill-and-stroke']]: iconType === 'both'
			})}
			{...props}
		>
			{children}
		</button>
	);
}

export default IconButton;
