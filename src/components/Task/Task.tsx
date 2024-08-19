import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch.hook';
import { tasksActions } from '../../store/tasks.slice';
import Checkbox from '../Checkbox/Checkbox';
import { MenuItem } from '../ContextMenu/ContextMenu.props';
import InteractiveListItem from '../InteractiveListItem/InteractiveListItem';
import styles from './Task.module.scss';
import { TaskProps } from './Task.props';

function Task({
	children,
	data,
	isSelection = false,
	className,
	...props
}: TaskProps) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const setContextMenuItems = (): MenuItem[] => {
		const selectButtonName = data.selected ? 'Снять выделение' : 'Выделить';
		const completeButtonName = data.completed
			? 'Отменить выполнение'
			: 'Выполнить';
		const pinButtonName = data.pinned ? 'Открепить' : 'Закрепить';

		return [
			{
				name: selectButtonName,
				action: () => dispatch(tasksActions.toggleSelect(data.id))
			},
			{
				name: completeButtonName,
				action: () => dispatch(tasksActions.toggleComplete(data.id))
			},
			{
				name: pinButtonName,
				action: () => dispatch(tasksActions.togglePin(data.id))
			},
			{
				name: 'Редактировать',
				action: () => navigate(`/tasks/task-${data.id}/edit`)
			},
			{ name: 'Удалить', action: () => dispatch(tasksActions.remove(data.id)) }
		];
	};

	return (
		<InteractiveListItem
			{...props}
			contextMenuItems={setContextMenuItems()}
			isSelection={isSelection}
			className={cn(styles['task'], className)}
		>
			{!isSelection ? (
				<Checkbox
					name='task-complete'
					className={styles['task__complete-checkbox']}
					checked={data.completed}
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
			<p className={styles['task__content']}>
				<span className={styles['task__text']}>{children}</span>
				{data.pinned && (
					<img
						src='/public/icons/pin.svg'
						className={styles['task__pin']}
					></img>
				)}
			</p>
		</InteractiveListItem>
	);
}

export default Task;
