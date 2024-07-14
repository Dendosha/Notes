import cn from 'classnames';
import styles from './TextButton.module.scss';
import { TextButtonProps } from './TextButton.props';

function TextButton({ children, className, ...props }: TextButtonProps) {
	return (
		<button {...props} className={cn(styles['text-button'], className)}>
			{children}
		</button>
	);
}

export default TextButton;
