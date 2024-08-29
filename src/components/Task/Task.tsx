import cn from 'classnames';
import { formatDate, ISOStringToDate } from '../../helpers/dateTime';
import { useAppDispatch } from '../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../hooks/useAppSelector.hook';
import { tasksActions } from '../../store/tasks.slice';
import Checkbox from '../Checkbox/Checkbox';
import InteractiveListItem from '../InteractiveListItem/InteractiveListItem';
import styles from './Task.module.scss';
import { TaskProps } from './Task.props';

function Task({
	contextMenuItems,
	children,
	data,
	isSelection = false,
	className,
	...props
}: TaskProps) {
	const dispatch = useAppDispatch();
	const settings = useAppSelector(state => state.settings);

	const date = settings.sort === 'createDate' ? data.createdAt : data.updatedAt;

	return (
		<InteractiveListItem
			{...props}
			contextMenuItems={contextMenuItems}
			isSelection={isSelection}
			className={cn(styles['task'], className)}
		>
			{!isSelection ? (
				<Checkbox
					name='task-complete'
					className={styles['task__complete-checkbox']}
					checked={data.completed}
					tabIndex={-1}
					onChange={() => dispatch(tasksActions.toggleComplete(data.id))}
				/>
			) : (
				<Checkbox
					name='task-select'
					className={styles['task__select-checkbox']}
					appearance='circle'
					checked={data.selected}
					tabIndex={-1}
					onChange={() => dispatch(tasksActions.toggleSelect(data.id))}
				/>
			)}
			<div className={styles['task__text']}>
				<span className={styles['task__title']}>{children}</span>
				<span aria-hidden={true} className={styles['task__date']}>
					{formatDate(ISOStringToDate(date))}
				</span>
				{data.pinned.state && (
					<img src='/icons/pin.svg' className={styles['task__pin']}></img>
				)}
			</div>
		</InteractiveListItem>
	);
}

export default Task;
