import cn from 'classnames';
import Checkbox from '../Checkbox/Checkbox';
import styles from './EditableFolder.module.scss';
import { EditableFolderProps } from './EditableFolder.props';

function EditableFolder({
	children,
	noteCount,
	pinned = false,
	isSelection = false,
	className,
	...props
}: EditableFolderProps) {
	return (
		<div
			{...props}
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
		</div>
	);
}

export default EditableFolder;
