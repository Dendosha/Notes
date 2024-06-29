import cn from 'classnames';
import Checkbox from '../Checkbox/Checkbox';
import styles from './Task.module.scss';
import { TaskProps } from './Task.props';

function Task({
	children,
	pinned = false,
	isSelection = false,
	className,
	...props
}: TaskProps) {
	return (
		<div {...props} tabIndex={0} className={cn(styles['task'], className)}>
			{!isSelection && (
				<Checkbox className={styles['task__complete-checkbox']} />
			)}
			<span className={styles['task__text']}>{children}</span>
			{pinned && (
				<img src='/public/icons/pin.svg' className={styles['task__pin']}></img>
			)}
			{isSelection && (
				<Checkbox
					className={styles['task__select-checkbox']}
					appearance='circle'
				/>
			)}
		</div>
	);
}

export default Task;
