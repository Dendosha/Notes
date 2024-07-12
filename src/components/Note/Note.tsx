import cn from 'classnames';
import Checkbox from '../Checkbox/Checkbox';
import styles from './Note.module.scss';
import { NoteProps } from './Note.props';

function Note({
	children,
	date,
	pinned = false,
	isSelection = false,
	className,
	...props
}: NoteProps) {
	return (
		<div {...props} tabIndex={0} className={cn(styles['note'], className)}>
			<span className={styles['note__text']}>{children}</span>
			<span className={styles['note__date']}>{date}</span>
			{pinned && (
				<img src='/public/icons/pin.svg' className={styles['note__pin']}></img>
			)}
			{isSelection && (
				<Checkbox
					className={styles['note__select-checkbox']}
					appearance='circle'
				/>
			)}
		</div>
	);
}

export default Note;
