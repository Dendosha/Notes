import cn from 'classnames';
import { forwardRef } from 'react';
import styles from './TextButton.module.scss';
import { TextButtonProps } from './TextButton.props';

const TextButton = forwardRef<HTMLButtonElement | null, TextButtonProps>(
	function TextButton({ children, className, ...props }, ref) {
		return (
			<button
				{...props}
				ref={ref}
				className={cn(styles['text-button'], className)}
			>
				{children}
			</button>
		);
	}
);

export default TextButton;
