import cn from 'classnames';
import { forwardRef } from 'react';
import styles from './IconButton.module.scss';
import { IconButtonProps } from './IconButton.props';

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	function IconButton(
		{
			appearance = 'polygon',
			colorScheme = 'default',
			iconType = 'fill',
			children,
			className,
			...props
		},
		ref
	) {
		return (
			<button
				className={cn(styles['icon-button'], className, {
					[styles['icon-button_primary-color-scheme']]:
						colorScheme === 'primary',
					[styles['icon-button_polygon']]: appearance === 'polygon',
					[styles['icon-button_circle']]: appearance === 'circle',
					[styles['icon-button_fill']]: iconType === 'fill',
					[styles['icon-button_stroke']]: iconType === 'stroke',
					[styles['icon-button_fill-and-stroke']]: iconType === 'both'
				})}
				ref={ref}
				{...props}
			>
				{children}
			</button>
		);
	}
);

export default IconButton;
