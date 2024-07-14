import cn from 'classnames';
import { forwardRef } from 'react';
import styles from './Input.module.scss';
import { InputProps } from './Input.props';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ className, ...props },
	ref
) {
	return (
		<input
			{...props}
			ref={ref}
			className={cn(styles['input'], className)}
		></input>
	);
});

export default Input;
