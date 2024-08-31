import cn from 'classnames';
import { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import BackButtonIcon from '../../assets/icons/BackButtonIcon';
import NotesButtonIcon from '../../assets/icons/NotesButtonIcon';
import SearchIcon from '../../assets/icons/SearchIcon';
import SettingsButtonIcon from '../../assets/icons/SettingsButtonIcon';
import TasksButtonIcon from '../../assets/icons/TasksButtonIcon';
import IconButton from '../../components/IconButton/IconButton';
import IconNavLink from '../../components/IconNavLink/IconNavLink';
import TextField from '../../components/TextField/TextField';
import styles from './RootLayout.module.scss';

export interface RootContextType {
	searchValue: string;
	isSelection: boolean;
	setIsSelection: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useRootContext() {
	return useOutletContext<RootContextType>();
}

function RootLayout() {
	const [isSelection, setIsSelection] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	return (
		<div className={styles['root-layout']}>
			<div className={styles['root-layout__header']}>
				<IconButton
					iconType='stroke'
					className={styles['root-layout__search-hide-button']}
				>
					<BackButtonIcon />
				</IconButton>
				<ul
					className={cn(
						styles['root-layout__navigation'],
						styles['navigation']
					)}
				>
					<li className={styles['navigation__item']}>
						<IconNavLink
							aria-label='Заметки'
							appearance='polygon'
							to={'/notes'}
							disabled={isSelection}
						>
							<NotesButtonIcon />
						</IconNavLink>
					</li>
					<li className={styles['navigation__item']}>
						<IconNavLink
							aria-label='Задачи'
							appearance='polygon'
							to={'/tasks'}
							disabled={isSelection}
						>
							<TasksButtonIcon />
						</IconNavLink>
					</li>
				</ul>
				<label className={styles['root-layout__search-field']}>
					<SearchIcon className={styles['root-layout__search-field-icon']} />
					<TextField
						placeholder='Поиск'
						name='search'
						value={searchValue}
						onKeyDown={e => e.code === 'Escape' && e.currentTarget.blur()}
						onChange={handleSearch}
						autoComplete='off'
						disabled={isSelection}
					/>
				</label>
				<IconNavLink
					aria-label='Настройки'
					className={styles['root-layout__settings-link']}
					appearance='polygon'
					iconType='stroke'
					to={'/settings'}
					disabled={isSelection}
				>
					<SettingsButtonIcon />
				</IconNavLink>
			</div>
			<Outlet
				context={
					{
						searchValue,
						isSelection,
						setIsSelection
					} satisfies RootContextType
				}
			/>
		</div>
	);
}

export default RootLayout;
