import cn from 'classnames';
import CancelButtonIcon from '../../assets/icons/CancelButtonIcon';
import ChangeFolderButtonIcon from '../../assets/icons/ChangeFolderButtonIcon';
import PinButtonIcon from '../../assets/icons/PinButtonIcon';
import SelectAllButtonIcon from '../../assets/icons/SelectAllButtonIcon';
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
					iconType='fill'
					className={styles['sidebar__button']}
					onClick={closeSidebar.action}
				>
					<CancelButtonIcon />
				</IconButton>
			)}
			{toggleSelectState.exist && (
				<IconButton
					iconType='both'
					className={styles['sidebar__button']}
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
					iconType='stroke'
					className={styles['sidebar__button']}
					onClick={togglePinState.action}
				>
					<PinButtonIcon />
				</IconButton>
			)}
			{changeFolder.exist && (
				<IconButton
					iconType='stroke'
					className={styles['sidebar__button']}
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
