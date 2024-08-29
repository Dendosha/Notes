import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Folder from '../../../components/Folder/Folder';
import { handleListFocus } from '../../../helpers/handleListFocus';
import { sortItems } from '../../../helpers/sortItems';
import { useAppSelector } from '../../../hooks/useAppSelector.hook';
import { useRootContext } from '../../../layout/RootLayout/RootLayout';
import { FolderListProps } from './FolderList.props';

function FolderList<T extends HTMLElement, K extends HTMLElement>({
	className
}: FolderListProps<T, K>) {
	const location = useLocation();

	const [tabIndex, setTabIndex] = useState<0 | -1>(0);

	const firstFolderRef = useRef<HTMLAnchorElement>(null);
	const lastFolderRef = useRef<HTMLAnchorElement>(null);
	const activeFolderRef = useRef<HTMLAnchorElement | null>(null);

	const { isSelection } = useRootContext();
	const folders = useAppSelector(state => state.folders);
	const settings = useAppSelector(state => state.settings);

	const folderAll = folders.items.find(folder => folder.id === 1)!;
	const folderList = sortItems(folders.items, settings.sort, true).filter(
		folder => folder.id !== 1
	);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!e.currentTarget.contains(e.target as Node | null)) {
			return;
		}

		const currentListItem = e.target as HTMLAnchorElement;
		let itemToFocus: HTMLAnchorElement;

		switch (e.key) {
			case 'ArrowUp':
			case 'ArrowLeft':
				e.preventDefault();

				if (currentListItem === e.currentTarget.firstElementChild) {
					itemToFocus = e.currentTarget.lastElementChild as HTMLAnchorElement;
				} else {
					itemToFocus =
						currentListItem.previousElementSibling as HTMLAnchorElement;
				}
				itemToFocus?.focus({ preventScroll: true });
				itemToFocus?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
				break;
			case 'ArrowDown':
			case 'ArrowRight':
				e.preventDefault();

				if (currentListItem === e.currentTarget.lastElementChild) {
					itemToFocus = e.currentTarget.firstElementChild as HTMLAnchorElement;
				} else {
					itemToFocus = currentListItem.nextElementSibling as HTMLAnchorElement;
				}
				itemToFocus?.focus({ preventScroll: true });
				itemToFocus?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
				break;
			case 'Home':
				e.preventDefault();
				itemToFocus = currentListItem.parentElement
					?.firstElementChild as HTMLAnchorElement;

				itemToFocus?.focus({ preventScroll: true });
				itemToFocus?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
				break;
			case 'End':
				e.preventDefault();
				itemToFocus = currentListItem.parentElement
					?.lastElementChild as HTMLAnchorElement;

				itemToFocus?.focus({ preventScroll: true });
				itemToFocus?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
				break;
		}
	};

	const handleFolderListFocus = (e: React.FocusEvent) => {
		if (!activeFolderRef.current) {
			for (const listItem of e.currentTarget.childNodes) {
				const anchorItem = listItem as HTMLAnchorElement;

				if (anchorItem.href.includes(location.pathname)) {
					activeFolderRef.current = anchorItem;
					break;
				}
			}
		}

		handleListFocus(e, activeFolderRef.current);
	};

	const handleFolderClick = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		if (activeFolderRef.current) {
			activeFolderRef.current.ariaSelected = 'false';
		}
		e.currentTarget.ariaSelected = 'true';
		activeFolderRef.current = e.currentTarget;
	};

	return (
		<div
			role='tablist'
			aria-label='Список папок'
			tabIndex={isSelection ? -1 : tabIndex}
			className={className}
			onFocus={e => {
				setTabIndex(-1);
				handleFolderListFocus(e);
			}}
			onBlur={() => setTabIndex(0)}
			onKeyDown={handleKeyDown}
		>
			<Folder
				role='tab'
				aria-selected={true}
				aria-controls={'note-folder-1'}
				ref={firstFolderRef}
				to={'/notes/all'}
				disabled={isSelection}
				tabIndex={-1}
				onClick={handleFolderClick}
			>
				{folderAll.name}
			</Folder>
			{folderList.map((folder, index, array) => {
				let ref = null;
				const href = `/notes/folder-${folder.id}`;

				if (index === array.length - 1) {
					ref = lastFolderRef;
				}

				return (
					<Folder
						role='tab'
						aria-selected={false}
						aria-controls={`note-folder-${folder.id}`}
						ref={ref}
						to={href}
						disabled={isSelection}
						pinned={folder.pinned.state}
						tabIndex={-1}
						onClick={handleFolderClick}
						key={folder.id}
					>
						{folder.name}
					</Folder>
				);
			})}
		</div>
	);
}

export default FolderList;
