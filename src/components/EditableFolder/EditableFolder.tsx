import cn from 'classnames';
import { formatDate, ISOStringToDate } from '../../helpers/dateTime';
import { useAppDispatch } from '../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../hooks/useAppSelector.hook';
import { foldersActions } from '../../store/folders.slice';
import Checkbox from '../Checkbox/Checkbox';
import InteractiveListItem from '../InteractiveListItem/InteractiveListItem';
import styles from './EditableFolder.module.scss';
import { EditableFolderProps } from './EditableFolder.props';

function EditableFolder({
	contextMenuItems,
	children,
	data,
	isSelectable = true,
	isSelection = false,
	className,
	...props
}: EditableFolderProps) {
	const dispatch = useAppDispatch();
	const settings = useAppSelector(state => state.settings);

	const date = settings.sort === 'createDate' ? data.createdAt : data.updatedAt;

	return (
		<InteractiveListItem
			{...props}
			contextMenuItems={contextMenuItems}
			isSelection={isSelection}
			className={cn(styles['editable-folder'], className)}
		>
			{isSelectable && isSelection && (
				<Checkbox
					name='folder-select'
					className={styles['editable-folder__select-checkbox']}
					appearance='circle'
					checked={data.selected}
					tabIndex={-1}
					onChange={() => dispatch(foldersActions.toggleSelect(data.id))}
				/>
			)}
			<div className={styles['editable-folder__text']}>
				<span className={styles['editable-folder__title']}>{children}</span>
				<span className={styles['editable-folder__note-count']}>
					Количество заметок: {data.notes.length}
				</span>
				<span aria-hidden={true} className={styles['editable-folder__date']}>
					{formatDate(ISOStringToDate(date))}
				</span>
				{data.pinned.state && (
					<img
						src='/icons/pin.svg'
						className={styles['editable-folder__pin']}
					></img>
				)}
			</div>
		</InteractiveListItem>
	);
}

export default EditableFolder;
