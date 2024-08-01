import cn from 'classnames';
import { useAppDispatch } from '../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../hooks/useAppSelector.hook';
import { notesActions } from '../../store/notes.slice';
import Checkbox from '../Checkbox/Checkbox';
import { MenuItem } from '../ContextMenu/ContextMenu.props';
import InteractiveListItem from '../InteractiveListItem/InteractiveListItem';
import styles from './Note.module.scss';
import { NoteProps } from './Note.props';
import { formatDate } from './helpers';

function Note({
	children,
	data,
	isSelection = false,
	className,
	...props
}: NoteProps) {
	const dispatch = useAppDispatch();
	const settings = useAppSelector(state => state.settings);

	const date =
		settings.notesSort === 'createDate' ? data.createdAt : data.updatedAt;

	const setContextMenuItems = (): MenuItem[] => {
		const selectButtonName = data.selected ? 'Снять выделение' : 'Выделить';
		const pinButtonName = data.pinned ? 'Открепить' : 'Закрепить';

		return [
			{
				name: selectButtonName,
				action: () => dispatch(notesActions.toggleSelect(data.id))
			},
			{
				name: pinButtonName,
				action: () => dispatch(notesActions.togglePin(data.id))
			},
			//! Дописать после создания страницы редактирования заметок ↓
			{ name: 'Редактировать', action: () => console.log('Редактировать') },
			{ name: 'Удалить', action: () => dispatch(notesActions.remove(data.id)) }
		];
	};

	return (
		<InteractiveListItem
			{...props}
			contextMenuItems={setContextMenuItems()}
			tabIndex={0}
			className={cn(styles['note'], className)}
		>
			<span className={styles['note__text']}>{children}</span>
			<span className={styles['note__date']}>{formatDate(date)}</span>
			{data.pinned && (
				<img src='/public/icons/pin.svg' className={styles['note__pin']}></img>
			)}
			{isSelection && (
				<Checkbox
					name='note-select'
					className={styles['note__select-checkbox']}
					appearance='circle'
					checked={data.selected}
					onChange={() => dispatch(notesActions.toggleSelect(data.id))}
				/>
			)}
		</InteractiveListItem>
	);
}

export default Note;
