import cn from 'classnames';
import Checkbox from '../Checkbox/Checkbox';
import { MenuItem } from '../ContextMenu/ContextMenu.props';
import InteractiveListItem from '../InteractiveListItem/InteractiveListItem';
import styles from './EditableFolder.module.scss';
import { EditableFolderProps } from './EditableFolder.props';

const CONTEXT_MENU_ITEMS: MenuItem[] = [
	{ name: 'Выделить', action: () => console.log('Выделить') },
	{ name: 'Закрепить', action: () => console.log('Закрепить') },
	{ name: 'Переименовать', action: () => console.log('Переименовать') },
	{ name: 'Удалить', action: () => console.log('Удалить') }
];

function EditableFolder({
	children,
	noteCount,
	pinned = false,
	isSelection = false,
	className,
	...props
}: EditableFolderProps) {
	return (
		<InteractiveListItem
			{...props}
			contextMenuItems={CONTEXT_MENU_ITEMS}
			tabIndex={0}
			className={cn(styles['editable-folder'], className)}
		>
			<span className={styles['editable-folder__text']}>{children}</span>
			<span className={styles['editable-folder__note-count']}>{noteCount}</span>
			{pinned && (
				<img
					src='/public/icons/pin.svg'
					className={styles['editable-folder__pin']}
				></img>
			)}
			{isSelection && (
				<Checkbox
					className={styles['editable-folder__select-checkbox']}
					appearance='circle'
				/>
			)}
		</InteractiveListItem>
	);
}

export default EditableFolder;
