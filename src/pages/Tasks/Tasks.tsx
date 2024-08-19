import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import AddButtonIcon from '../../assets/icons/AddButtonIcon';
import RemoveButtonIcon from '../../assets/icons/RemoveButtonIcon';
import IconButton from '../../components/IconButton/IconButton';
import InteractiveList from '../../components/InteractiveList/InteractiveList';
import Sidebar from '../../components/Sidebar/Sidebar';
import Task from '../../components/Task/Task';
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
	const [isAnyTaskSelected, setIsAnyTaskSelected] = useState(false);
	const [selectAllButtonState, setSelectAllButtonState] = useState(false);

	const { searchValue, isSelection, setIsSelection } = useRootContext();

	const firstSidebarButtonRef = useRef<HTMLButtonElement>(null);
	const focusFromUpsertTaskRef = useRef<HTMLElement | null>(null);
	const newlyUpdatedTask = useRef<HTMLLIElement | null>(null);

	const dispatch = useAppDispatch();
	const tasks = useAppSelector(state => state.tasks);
	const uncompletedTasks = tasks.items.filter(task => !task.completed);
	const completedTasks = tasks.items.filter(task => task.completed);

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
		if (newlyUpdatedTask.current) {
			const taskToFocus = document.querySelector(
				`[data-key="${newlyUpdatedTask.current.dataset.key}"]`
			) as HTMLLIElement | null;
			taskToFocus?.focus();
		}
	}, [newlyUpdatedTask.current]);

	const upsertTask = (
		e: React.MouseEvent | React.KeyboardEvent,
		taskId?: number
	) => {
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
		if (isSelection) {
			return;
		}

		if (e.key === 'Enter') {
			upsertTask(e, task.id);
		}

		if (e.key === 'c' && !e.ctrlKey && !e.altKey && !e.metaKey) {
			newlyUpdatedTask.current = e.currentTarget as HTMLLIElement;
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
					<InteractiveList
						className={styles['tasks__list']}
						isNotFocusable={uncompletedTasks.length === 0}
					>
						{uncompletedTasks
							.filter(task => task.content.toLowerCase().includes(searchValue))
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
					{completedTasks.length !== 0 && (
						<>
							<h2 className={styles['tasks__list-title']}>Выполненные:</h2>
							<InteractiveList
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
