import cn from 'classnames';
import { formatDate, ISOStringToDate } from '../../helpers/dateTime';
import { useAppDispatch } from '../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../hooks/useAppSelector.hook';
import { notesActions } from '../../store/notes.slice';
import Checkbox from '../Checkbox/Checkbox';
import InteractiveListItem from '../InteractiveListItem/InteractiveListItem';
import styles from './Note.module.scss';
import { NoteProps } from './Note.props';

function Note({
	contextMenuItems,
	children,
	data,
	isSelection = false,
	className,
	...props
}: NoteProps) {
	const dispatch = useAppDispatch();
	const settings = useAppSelector(state => state.settings);

	const date = settings.sort === 'createDate' ? data.createdAt : data.updatedAt;

	return (
		<InteractiveListItem
			{...props}
			contextMenuItems={contextMenuItems}
			isSelection={isSelection}
			className={cn(styles['note'], className)}
		>
			{isSelection && (
				<Checkbox
					name='note-select'
					className={styles['note__select-checkbox']}
					appearance='circle'
					checked={data.selected}
					tabIndex={-1}
					onChange={() => dispatch(notesActions.toggleSelect(data.id))}
				/>
			)}
			<div className={styles['note__text']}>
				<span className={styles['note__title']}>{children}</span>
				<span className={styles['note__date']}>
					{formatDate(ISOStringToDate(date))}
				</span>
				{data.pinned.state && (
					<img src='/icons/pin.svg' className={styles['note__pin']}></img>
				)}
			</div>
		</InteractiveListItem>
	);
}

export default Note;
