import cn from 'classnames';
import CancelButtonIcon from '../../assets/icons/CancelButtonIcon';
import ChangeFolderButtonIcon from '../../assets/icons/ChangeFolderButtonIcon';
import PinButtonIcon from '../../assets/icons/PinButtonIcon';
import SelectAllButtonIcon from '../../assets/icons/SelectAllButtonIcon';
import UnpinButtonIcon from '../../assets/icons/UnpinButtonIcon';
import UnselectAllButtonIcon from '../../assets/icons/UnselectAllButtonIcon';
import IconButton from '../IconButton/IconButton';
import styles from './Sidebar.module.scss';
import { SidebarProps } from './Sidebar.props';

function Sidebar({
	closeSidebar,
	toggleSelectState,
	togglePinState,
	changeFolder,
	className,
	children,
	...props
}: SidebarProps) {
	return (
		<div className={cn(styles['sidebar'], className)} {...props}>
			{closeSidebar.exist && (
				<IconButton
					aria-label='Закрыть сайдбар'
					iconType='fill'
					className={styles['sidebar__button']}
					ref={closeSidebar.ref}
					disabled={closeSidebar.disabled}
					onClick={closeSidebar.action}
				>
					<CancelButtonIcon />
				</IconButton>
			)}
			{toggleSelectState.exist && (
				<IconButton
					aria-label={
						!toggleSelectState.selectAllButtonState
							? 'Выделить все элементы'
							: 'Снять выделение со всех элементов'
					}
					iconType='both'
					className={styles['sidebar__button']}
					ref={toggleSelectState.ref}
					disabled={toggleSelectState.disabled}
					onClick={toggleSelectState.action}
				>
					{!toggleSelectState.selectAllButtonState ? (
						<SelectAllButtonIcon />
					) : (
						<UnselectAllButtonIcon />
					)}
				</IconButton>
			)}
			{togglePinState.exist && (
				<IconButton
					aria-label={
						togglePinState.pinAllButtonState
							? 'Закрепить выделенные элементы'
							: 'Открепить выделенные элементы'
					}
					iconType='stroke'
					className={styles['sidebar__button']}
					ref={togglePinState.ref}
					disabled={togglePinState.disabled}
					onClick={togglePinState.action}
				>
					{togglePinState.pinAllButtonState ? (
						<PinButtonIcon />
					) : (
						<UnpinButtonIcon />
					)}
				</IconButton>
			)}
			{changeFolder.exist && (
				<IconButton
					aria-label='Поменять папку для выделенных заметок'
					iconType='stroke'
					className={styles['sidebar__button']}
					ref={changeFolder.ref}
					disabled={changeFolder.disabled}
					onClick={changeFolder.action}
				>
					<ChangeFolderButtonIcon />
				</IconButton>
			)}
			{children}
		</div>
	);
}

export default Sidebar;
