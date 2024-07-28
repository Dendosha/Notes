import cn from 'classnames';
import Checkbox from '../Checkbox/Checkbox';
import { MenuItem } from '../ContextMenu/ContextMenu.props';
import InteractiveListItem from '../InteractiveListItem/InteractiveListItem';
import styles from './Task.module.scss';
import { TaskProps } from './Task.props';

const CONTEXT_MENU_ITEMS: MenuItem[] = [
	{ name: 'Выделить', action: () => console.log('Выделить') },
	{ name: 'Закрепить', action: () => console.log('Закрепить') },
	{ name: 'Редактировать', action: () => console.log('Редактировать') },
	{ name: 'Изменить папку', action: () => console.log('Изменить папку') },
	{ name: 'Удалить', action: () => console.log('Удалить') }
];

function Task({
	children,
	pinned = false,
	isSelection = false,
	className,
	...props
}: TaskProps) {
	return (
		<InteractiveListItem
			{...props}
			contextMenuItems={CONTEXT_MENU_ITEMS}
			tabIndex={0}
			className={cn(styles['task'], className)}
		>
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
		</InteractiveListItem>
	);
}

export default Task;
