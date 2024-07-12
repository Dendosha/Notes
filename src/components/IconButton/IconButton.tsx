import cn from 'classnames';
import styles from './IconButton.module.scss';
import { IconButtonProps } from './IconButton.props';

function IconButton({
	action,
	appearance = 'polygon',
	children,
	className,
	...props
}: IconButtonProps) {
	return (
		<button
			{...props}
			className={cn(styles['icon-button'], className, {
				[styles['icon-button_polygon']]: appearance === 'polygon',
				[styles['icon-button_circle']]: appearance === 'circle'
			})}
			onClick={action}
		>
			{children}
		</button>
	);
}

export default IconButton;
