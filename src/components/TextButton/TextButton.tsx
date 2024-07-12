import cn from 'classnames';
import styles from './TextButton.module.scss';
import { TextButtonProps } from './TextButton.props';

function TextButton({
	children,
	action,
	className,
	...props
}: TextButtonProps) {
	return (
		<button
			{...props}
			className={cn(styles['text-button'], className)}
			onClick={action}
		>
			{children}
		</button>
	);
}

export default TextButton;
