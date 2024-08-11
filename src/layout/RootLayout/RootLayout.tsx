import cn from 'classnames';
import { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import NotesButtonIcon from '../../assets/icons/NotesButtonIcon';
import SettingsButtonIcon from '../../assets/icons/SettingsButtonIcon';
import TasksButtonIcon from '../../assets/icons/TasksButtonIcon';
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
				<ul
					className={cn(
						styles['root-layout__navigation'],
						styles['navigation']
					)}
				>
					<li className={styles['navigation__item']}>
						<IconNavLink
							appearance='polygon'
							to={'/notes'}
							disabled={isSelection}
						>
							<NotesButtonIcon />
						</IconNavLink>
					</li>
					<li className={styles['navigation__item']}>
						<IconNavLink
							appearance='polygon'
							to={'/tasks'}
							disabled={isSelection}
						>
							<TasksButtonIcon />
						</IconNavLink>
					</li>
				</ul>
				<TextField
					placeholder='Поиск'
					name='search'
					value={searchValue}
					onChange={handleSearch}
					autoComplete='off'
					disabled={isSelection}
				/>
				<IconNavLink
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
