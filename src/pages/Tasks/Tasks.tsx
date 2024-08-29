import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import AddButtonIcon from '../../assets/icons/AddButtonIcon';
import RemoveButtonIcon from '../../assets/icons/RemoveButtonIcon';
import IconButton from '../../components/IconButton/IconButton';
import ActionConfirmationModal from '../../components/Modals/ActionConfirmationModal/ActionConfirmationModal';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useAppDispatch } from '../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../hooks/useAppSelector.hook';
import {
	RootContextType,
	useRootContext
} from '../../layout/RootLayout/RootLayout';
import { tasksActions } from '../../store/tasks.slice';
import styles from './Tasks.module.scss';
import TasksList from './TasksList/TasksList';

export interface ActionConfirmationProps {
	message: string;
	onConfirm: () => void;
}

export interface TasksContextType {
	focusFromUpsertTaskRef: React.MutableRefObject<HTMLElement | null>;
	confirmAction: ({ message, onConfirm }: ActionConfirmationProps) => void;
}

export function useTasksContext() {
	return useOutletContext<RootContextType & TasksContextType>();
}

function Tasks() {
	const dispatch = useAppDispatch();
	const tasks = useAppSelector(state => state.tasks);
	const settings = useAppSelector(state => state.settings);

	const [actionConfirmationModalState, setActionConfirmationModalState] =
		useState(false);
	const [actionConfirmationProps, setActionConfirmationProps] =
		useState<ActionConfirmationProps>({
			message: '',
			onConfirm: () => {}
		});

	const [isAnyTaskSelected, setIsAnyTaskSelected] = useState(false);
	const [selectAllButtonState, setSelectAllButtonState] = useState(false);
	const [pinAllButtonState, setPinAllButtonState] = useState(false);

	const { isSelection, setIsSelection } = useRootContext();

	const firstSidebarButtonRef = useRef<HTMLButtonElement>(null);
	const focusFromUpsertTaskRef = useRef<HTMLElement | null>(null);

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

			const selectedTasks = tasks.items.filter(task => task.selected);

			const isPinnedAndUnpinnedTasks =
				selectedTasks.find(task => task.pinned.state) &&
				selectedTasks.find(task => !task.pinned.state);

			const isOnlyPinnedTasks =
				selectedTasks.filter(task => task.pinned.state).length ===
				selectedTasks.length;

			const isOnlyUnpinnedTasks =
				selectedTasks.filter(task => !task.pinned.state).length ===
				selectedTasks.length;

			if (!tasks.items.find(task => !task.selected)) {
				setSelectAllButtonState(true);
			} else {
				setSelectAllButtonState(false);
			}

			if (isOnlyUnpinnedTasks || isPinnedAndUnpinnedTasks) {
				setPinAllButtonState(true);
			} else if (isOnlyPinnedTasks) {
				setPinAllButtonState(false);
			}
		} else {
			setIsAnyTaskSelected(false);
			setPinAllButtonState(true);
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

	const confirmAction = ({ message, onConfirm }: ActionConfirmationProps) => {
		setActionConfirmationProps({
			message,
			onConfirm
		});
		setActionConfirmationModalState(true);
	};

	const removeTasks = () => {
		if (
			settings.actionConfirmations === 'all' ||
			settings.actionConfirmations === 'deleteOnly'
		) {
			confirmAction({ message: 'Подтвердить удаление', onConfirm: remove });
		} else {
			remove();
		}

		function remove() {
			const selectedTasks = tasks.items.filter(task => task.selected);

			selectedTasks.forEach(task => {
				dispatch(tasksActions.remove(task.id));
			});

			setSelectAllButtonState(false);
			setIsSelection(false);
		}
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
			if (!task.selected) {
				return;
			}

			if ((pinAllButtonState && !task.pinned.state) || !pinAllButtonState) {
				dispatch(tasksActions.togglePin(task.id));
			}
		});
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
							disabled: !isAnyTaskSelected,
							pinAllButtonState: pinAllButtonState
						}}
						changeFolder={{
							exist: false
						}}
					/>
				)}
				<div className={styles['tasks__list-wrapper']}>
					<TasksList confirmAction={confirmAction} upsertTask={upsertTask} />
				</div>
			</div>
			<div className={styles['tasks__buttons']}>
				{!isSelection ? (
					<IconButton
						aria-label='Создать задачу'
						appearance='circle'
						colorScheme='primary'
						className={styles['tasks__add-button']}
						onClick={upsertTask}
					>
						<AddButtonIcon />
					</IconButton>
				) : (
					<IconButton
						aria-label='Удалить выделенные задачи'
						appearance='circle'
						colorScheme='primary'
						className={styles['tasks__remove-button']}
						onClick={removeTasks}
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
						focusFromUpsertTaskRef,
						confirmAction
					} satisfies Omit<RootContextType, 'searchValue'> & TasksContextType
				}
			/>
			{settings.actionConfirmations !== 'none' && (
				<ActionConfirmationModal
					message={actionConfirmationProps.message}
					modalState={actionConfirmationModalState}
					onConfirm={actionConfirmationProps.onConfirm}
					setModalState={setActionConfirmationModalState}
				/>
			)}
		</div>
	);
}

export default Tasks;
