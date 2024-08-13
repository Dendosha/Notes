import cn from 'classnames';
import { forwardRef } from 'react';
import styles from './Checkbox.module.scss';
import { CheckboxProps } from './Checkbox.props';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
	{ appearance = 'square', className, id, ...props },
	ref
) {
	return (
		<>
			<label
				className={cn(styles['checkbox'], className, {
					[styles['checkbox_square']]: appearance === 'square',
					[styles['checkbox_circle']]: appearance === 'circle'
				})}
				onClick={e => e.stopPropagation()}
			>
				<input
					id={id}
					{...props}
					ref={ref}
					type='checkbox'
					className={cn('visually-hidden', styles['native-checkbox'])}
				/>
				<span className={styles['custom-checkbox']}></span>
			</label>
		</>
	);
});

export default Checkbox;
