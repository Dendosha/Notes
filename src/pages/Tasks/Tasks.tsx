import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import AddButtonIcon from '../../assets/icons/AddButtonIcon';
import RemoveButtonIcon from '../../assets/icons/RemoveButtonIcon';
import IconButton from '../../components/IconButton/IconButton';
import InteractiveList from '../../components/InteractiveList/InteractiveList';
import Sidebar from '../../components/Sidebar/Sidebar';
import Task from '../../components/Task/Task';
import { sortItems } from '../../helpers/sortItems';
import { useAppDispatch } from '../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../hooks/useAppSelector.hook';
import {
	RootContextType,
	useRootContext
} from '../../layout/RootLayout/RootLayout';
import { tasksActions, TasksItem } from '../../store/tasks.slice';
import styles from './Tasks.module.scss';

export interface TasksContextType {
	focusFromUpsertTaskRef: React.MutableRefObject<HTMLElement | null>;
}

export function useTasksContext() {
	return useOutletContext<RootContextType & TasksContextType>();
}

function Tasks() {
	const dispatch = useAppDispatch();
	const tasks = useAppSelector(state => state.tasks);
	const settings = useAppSelector(state => state.settings);

	const [isAnyTaskSelected, setIsAnyTaskSelected] = useState(false);
	const [selectAllButtonState, setSelectAllButtonState] = useState(false);
	const [uncompletedTasksCount, setUncompletedTasksCount] = useState(
		tasks.items.filter(task => !task.completed).length
	);
	const [completedTasksCount, setCompletedTasksCount] = useState(
		tasks.items.filter(task => task.completed).length
	);

	const { searchValue, isSelection, setIsSelection } = useRootContext();

	const firstSidebarButtonRef = useRef<HTMLButtonElement>(null);
	const focusFromUpsertTaskRef = useRef<HTMLElement | null>(null);
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

	const navigate = useNavigate();

	useEffect(() => {
		if (isSelection && firstSidebarButtonRef.current) {
			firstSidebarButtonRef.current.focus();
		}
	}, [isSelection, firstSidebarButtonRef]);

	useEffect(() => {
		if (tasks.items.find(task => task.selected)) {
			setIsSelection(true);
			setIsAnyTaskSelected(true);

			if (!tasks.items.find(task => !task.selected)) {
				setSelectAllButtonState(true);
			} else {
				setSelectAllButtonState(false);
			}
		} else {
			setIsAnyTaskSelected(false);
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key !== 'Escape') {
				return;
			}

			closeSidebar();
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [tasks.items]);

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

	const upsertTask = (
		e: React.MouseEvent | React.KeyboardEvent,
		taskId?: number
	) => {
		if (isSelection && taskId) {
			dispatch(tasksActions.toggleSelect(taskId));
			return;
		}

		const newTaskId = new Date().getTime();
		focusFromUpsertTaskRef.current = e.currentTarget as HTMLElement;
		navigate(`/tasks/task-${taskId ?? newTaskId}/edit`);
	};

	const removeTask = () => {
		const selectedTasks = tasks.items.filter(task => task.selected);

		selectedTasks.forEach(task => {
			dispatch(tasksActions.remove(task.id));
		});

		setSelectAllButtonState(false);
		setIsSelection(false);
	};

	const closeSidebar = () => {
		tasks.items
			.filter(task => task.selected)
			.forEach(task => {
				dispatch(tasksActions.toggleSelect(task.id));
			});

		setSelectAllButtonState(false);
		setIsSelection(false);
	};

	const toggleTasksSelectState = () => {
		tasks.items
			.filter(task => task.selected === selectAllButtonState)
			.forEach(task => {
				dispatch(tasksActions.toggleSelect(task.id));
			});

		setSelectAllButtonState(state => !state);
	};

	const toggleTasksPinState = () => {
		tasks.items.forEach(task => {
			if (task.selected) {
				dispatch(tasksActions.togglePin(task.id));
			}
		});
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
		<div className={styles['tasks']}>
			<div className={styles['tasks__content']}>
				{isSelection && (
					<Sidebar
						className={styles['tasks__sidebar']}
						closeSidebar={{
							exist: true,
							action: closeSidebar,
							ref: firstSidebarButtonRef
						}}
						toggleSelectState={{
							exist: true,
							action: toggleTasksSelectState,
							selectAllButtonState: selectAllButtonState
						}}
						togglePinState={{
							exist: true,
							action: toggleTasksPinState,
							disabled: !isAnyTaskSelected
						}}
						changeFolder={{
							exist: false
						}}
					/>
				)}
				<div className={styles['tasks__list-wrapper']}>
					{uncompletedTasks.length !== 0 && (
						<InteractiveList
							ref={uncompletedTasksListRef}
							className={styles['tasks__list']}
							isNotFocusable={uncompletedTasks.length === 0}
						>
							{uncompletedTasks
								.filter(task =>
									task.content.toLowerCase().includes(searchValue)
								)
								.map(task => (
									<Task
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
							<h2 className={styles['tasks__list-title']}>Выполненные:</h2>
							<InteractiveList
								ref={completedTasksListRef}
								className={styles['tasks__list']}
								isNotFocusable={completedTasks.length === 0}
							>
								{completedTasks
									.filter(task =>
										task.content.toLowerCase().includes(searchValue)
									)
									.map(task => (
										<Task
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
				</div>
			</div>
			<div className={styles['tasks__buttons']}>
				{!isSelection ? (
					<IconButton
						appearance='circle'
						colorScheme='primary'
						className={styles['tasks__add-button']}
						onClick={upsertTask}
					>
						<AddButtonIcon />
					</IconButton>
				) : (
					<IconButton
						appearance='circle'
						colorScheme='primary'
						className={styles['tasks__remove-button']}
						onClick={removeTask}
						disabled={!isAnyTaskSelected}
					>
						<RemoveButtonIcon />
					</IconButton>
				)}
			</div>
			<Outlet
				context={
					{
						isSelection,
						setIsSelection,
						focusFromUpsertTaskRef
					} satisfies Omit<RootContextType, 'searchValue'> & TasksContextType
				}
			/>
		</div>
	);
}

export default Tasks;
