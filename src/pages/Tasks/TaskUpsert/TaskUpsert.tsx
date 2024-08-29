import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CancelButtonIcon from '../../../assets/icons/CancelButtonIcon';
import ConfirmButtonIcon from '../../../assets/icons/ConfirmButtonIcon';
import IconButton from '../../../components/IconButton/IconButton';
import TextField from '../../../components/TextField/TextField';
import { useAppDispatch } from '../../../hooks/useAppDispatch.hook';
import { useAppSelector } from '../../../hooks/useAppSelector.hook';
import { tasksActions } from '../../../store/tasks.slice';
import { useTasksContext } from '../Tasks';
import styles from './TaskUpsert.module.scss';

function TaskUpsert() {
	const dispatch = useAppDispatch();
	const tasks = useAppSelector(state => state.tasks);
	const settings = useAppSelector(state => state.settings);

	const { confirmAction, focusFromUpsertTaskRef } = useTasksContext();

	const navigate = useNavigate();
	const { task } = useParams();
	const taskId = parseInt(task?.split('-')[1]!);
	const taskExist = tasks.items.find(item => item.id === taskId);

	const [inputValue, setInputValue] = useState(taskExist?.content ?? '');

	const taskUpsertParentRef = useRef<HTMLDivElement>(null);
	const cancelButtonRef = useRef<HTMLButtonElement>(null);
	const confirmButtonRef = useRef<HTMLButtonElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		inputRef.current?.focus();

		const handleDocumentEscape = (e: KeyboardEvent) => {
			if (e.key !== 'Escape') {
				return;
			}

			handleExit();
		};

		document.addEventListener('keydown', handleDocumentEscape);

		return () => {
			document.removeEventListener('keydown', handleDocumentEscape);
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [taskExist]);

	const handleFieldKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && inputValue !== '') {
			handleConfirm();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key !== 'Tab') {
			return;
		}

		let lastElement = null;

		if (inputValue === '') {
			lastElement = cancelButtonRef;
		} else {
			lastElement = confirmButtonRef;
		}

		if (e.shiftKey && document.activeElement === inputRef.current) {
			e.preventDefault();
			lastElement.current?.focus();
		} else if (!e.shiftKey && document.activeElement === lastElement.current) {
			e.preventDefault();
			inputRef.current?.focus();
		}
	};

	const createTask = () => {
		if (settings.actionConfirmations === 'all') {
			confirmAction({ message: 'Подтвердить создание', onConfirm: create });
		} else {
			create();
		}

		function create() {
			dispatch(
				tasksActions.add({
					id: taskId,
					content: inputValue
				})
			);

			handleExit();
		}
	};

	const updateTask = () => {
		if (settings.actionConfirmations === 'all') {
			confirmAction({ message: 'Подтвердить изменения', onConfirm: update });
		} else {
			update();
		}

		function update() {
			dispatch(
				tasksActions.update({
					id: taskId,
					content: inputValue
				})
			);

			handleExit();
		}
	};

	const handleExit = () => {
		navigate('/tasks');
		setTimeout(() => {
			focusFromUpsertTaskRef.current?.focus();
		}, 0.5);
	};

	const handleConfirm = () => {
		if (taskExist) {
			if (taskExist.content !== inputValue) {
				updateTask();
			} else {
				handleExit();
			}
		} else if (!taskExist) {
			createTask();
		}
	};

	return (
		<div
			ref={taskUpsertParentRef}
			className={styles['task-upsert']}
			onKeyDown={handleKeyDown}
			onClick={e => e.currentTarget === e.target && handleExit()}
		>
			<div className={styles['task-upsert__content']}>
				<TextField
					as='input'
					ref={inputRef}
					name='task-content'
					value={inputValue}
					onChange={e =>
						setInputValue((e.target as EventTarget & HTMLInputElement).value)
					}
					onKeyDown={handleFieldKeyDown}
					autoComplete='off'
					placeholder='Описание задачи'
				/>
				<IconButton
					aria-label='Отменить'
					ref={cancelButtonRef}
					colorScheme='primary'
					appearance='circle'
					className={styles['task-upsert__button']}
					onClick={handleExit}
				>
					<CancelButtonIcon />
				</IconButton>
				<IconButton
					aria-label='Сохранить'
					ref={confirmButtonRef}
					colorScheme='primary'
					appearance='circle'
					disabled={inputValue === ''}
					className={styles['task-upsert__button']}
					onClick={handleConfirm}
				>
					<ConfirmButtonIcon />
				</IconButton>
			</div>
		</div>
	);
}

export default TaskUpsert;
