import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '../../../components/ContextMenu/ContextMenu.props';
import InteractiveList from '../../../components/InteractiveList/InteractiveList';
import Task from '../../../components/Task/Task';
import { sortItems } from '../../../helpers/sortItems';
import { useAppDispatch } from '../../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../../hooks/useAppSelector.hook';
import { useRootContext } from '../../../layout/RootLayout/RootLayout';
import { tasksActions, TasksItem } from '../../../store/tasks.slice';
import styles from './TasksList.module.scss';
import { TasksListProps } from './TasksList.props';

function TasksList({ confirmAction, upsertTask }: TasksListProps) {
	const dispatch = useAppDispatch();
	const tasks = useAppSelector(state => state.tasks);
	const settings = useAppSelector(state => state.settings);

	const navigate = useNavigate();

	const [uncompletedTasksCount, setUncompletedTasksCount] = useState(
		tasks.items.filter(task => !task.completed).length
	);
	const [completedTasksCount, setCompletedTasksCount] = useState(
		tasks.items.filter(task => task.completed).length
	);

	const { searchValue, isSelection } = useRootContext();

	const uncompletedTasksListRef = useRef<HTMLUListElement>(null);
	const completedTasksListRef = useRef<HTMLUListElement>(null);
	const updatedTasksListRef = useRef<HTMLUListElement | null>(null);

	const uncompletedTasks = sortItems(
		tasks.items.filter(task => !task.completed),
		settings.sort
	);
	const completedTasks = sortItems(
		tasks.items.filter(task => task.completed),
		settings.sort
	);

	useEffect(() => {
		if (uncompletedTasks.length < uncompletedTasksCount) {
			uncompletedTasksListRef.current?.focus();
		}

		setUncompletedTasksCount(uncompletedTasks.length);
	}, [uncompletedTasks]);

	useEffect(() => {
		if (completedTasks.length < completedTasksCount) {
			completedTasksListRef.current?.focus();
		}

		setCompletedTasksCount(completedTasks.length);
	}, [completedTasks]);

	const setContextMenuItems = (task: TasksItem): MenuItem[] => {
		const selectButtonName = task.selected ? 'Снять выделение' : 'Выделить';
		const completeButtonName = task.completed
			? 'Отменить выполнение'
			: 'Выполнить';
		const pinButtonName = task.pinned.state ? 'Открепить' : 'Закрепить';

		return [
			{
				name: selectButtonName,
				action: () => dispatch(tasksActions.toggleSelect(task.id))
			},
			{
				name: completeButtonName,
				action: () => dispatch(tasksActions.toggleComplete(task.id))
			},
			{
				name: pinButtonName,
				action: () => dispatch(tasksActions.togglePin(task.id))
			},
			{
				name: 'Редактировать',
				action: () => navigate(`/tasks/task-${task.id}/edit`)
			},
			{
				name: 'Удалить',
				action: () => {
					if (
						settings.actionConfirmations === 'all' ||
						settings.actionConfirmations === 'deleteOnly'
					) {
						confirmAction({
							message: 'Подтвердить удаление',
							onConfirm: remove
						});
					} else {
						remove();
					}

					function remove() {
						dispatch(tasksActions.remove(task.id));
					}
				}
			}
		];
	};

	const handleTaskKeyDown = (e: React.KeyboardEvent, task: TasksItem) => {
		if (e.code === 'Enter') {
			upsertTask(e, task.id);
		}

		if (e.code === 'KeyC' && !e.ctrlKey && !e.altKey && !e.metaKey) {
			updatedTasksListRef.current = e.currentTarget
				.parentElement as HTMLUListElement;
			dispatch(tasksActions.toggleComplete(task.id));
		}
	};

	return (
		<>
			{uncompletedTasks.length !== 0 && (
				<InteractiveList
					ref={uncompletedTasksListRef}
					className={styles['tasks-list']}
					isNotFocusable={uncompletedTasks.length === 0}
				>
					{uncompletedTasks
						.filter(task => task.content.toLowerCase().includes(searchValue))
						.map(task => (
							<Task
								contextMenuItems={setContextMenuItems(task)}
								data={task}
								isSelection={isSelection}
								key={task.id}
								data-key={task.id}
								onKeyDown={e => handleTaskKeyDown(e, task)}
								onClick={e => upsertTask(e, task.id)}
							>
								{task.content}
							</Task>
						))}
				</InteractiveList>
			)}
			{completedTasks.length !== 0 && (
				<>
					<h2 className={styles['tasks-list__title']}>Выполненные:</h2>
					<InteractiveList
						ref={completedTasksListRef}
						className={styles['tasks-list']}
						isNotFocusable={completedTasks.length === 0}
					>
						{completedTasks
							.filter(task => task.content.toLowerCase().includes(searchValue))
							.map(task => (
								<Task
									contextMenuItems={setContextMenuItems(task)}
									data={task}
									isSelection={isSelection}
									key={task.id}
									data-key={task.id}
									onKeyDown={e => handleTaskKeyDown(e, task)}
									onClick={e => upsertTask(e, task.id)}
								>
									{task.content}
								</Task>
							))}
					</InteractiveList>
				</>
			)}
		</>
	);
}

export default TasksList;
