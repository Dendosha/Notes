import cn from 'classnames';
import Checkbox from '../Checkbox/Checkbox';
import { MenuItem } from '../ContextMenu/ContextMenu.props';
import InteractiveListItem from '../InteractiveListItem/InteractiveListItem';
import styles from './Note.module.scss';
import { NoteProps } from './Note.props';

const CONTEXT_MENU_ITEMS: MenuItem[] = [
	{ name: 'Выделить', action: () => console.log('Выделить') },
	{ name: 'Закрепить', action: () => console.log('Закрепить') },
	{ name: 'Выполнить', action: () => console.log('Выполнить') },
	{ name: 'Редактировать', action: () => console.log('Редактировать') },
	{ name: 'Удалить', action: () => console.log('Удалить') }
];

function Note({
	children,
	date,
	pinned = false,
	isSelection = false,
	className,
	...props
}: NoteProps) {
	return (
		<InteractiveListItem
			{...props}
			contextMenuItems={CONTEXT_MENU_ITEMS}
			tabIndex={0}
			className={cn(styles['note'], className)}
		>
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
		</InteractiveListItem>
	);
}

export default Note;
