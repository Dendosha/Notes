import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Folder from '../../../components/Folder/Folder';
import InteractiveList from '../../../components/InteractiveList/InteractiveList';
import { handleListFocus } from '../../../helpers/handleListFocus';
import { useAppSelector } from '../../../hooks/useAppSelector.hook';
import { useRootContext } from '../../../layout/RootLayout/RootLayout';
import { FolderListProps } from './FolderList.props';

function FolderList<T extends HTMLElement, K extends HTMLElement>({
	className
}: FolderListProps<T, K>) {
	const location = useLocation();

	const firstFolderRef = useRef<HTMLAnchorElement>(null);
	const lastFolderRef = useRef<HTMLAnchorElement>(null);
	const activeFolderRef = useRef<HTMLAnchorElement | null>(null);

	const { isSelection } = useRootContext();
	const folders = useAppSelector(state => state.folders);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!e.currentTarget.contains(e.target as Node | null)) {
			return;
		}

		const currentLink = e.target as HTMLAnchorElement;
		const currentListItem = currentLink.parentElement as HTMLLIElement;

		switch (e.key) {
			case 'ArrowUp':
			case 'ArrowLeft':
				if (currentListItem === e.currentTarget.firstElementChild) {
					lastFolderRef.current?.focus();
				} else {
					(
						currentListItem.previousElementSibling
							?.firstElementChild as HTMLAnchorElement
					).focus();
				}
				break;
			case 'ArrowDown':
			case 'ArrowRight':
				if (currentListItem === e.currentTarget.lastElementChild) {
					firstFolderRef.current?.focus();
				} else {
					(currentListItem.nextElementSibling as HTMLLIElement).focus();
				}
				break;
		}
	};

	const handleFocus = (e: React.FocusEvent) => {
		if (!activeFolderRef.current) {
			for (const listItem of e.currentTarget.childNodes) {
				const anchorItem = listItem.firstChild as HTMLAnchorElement;

				if (anchorItem.href.includes(location.pathname)) {
					activeFolderRef.current = anchorItem;
					break;
				}
			}
		}

		handleListFocus(e, activeFolderRef.current);
	};

	return (
		<InteractiveList
			isNotFocusable={isSelection}
			className={className}
			onKeyDown={handleKeyDown}
			onFocus={handleFocus}
		>
			{folders.items.map((folder, index, array) => {
				let ref = null;
				const href =
					folder.id === 1 ? '/notes/all' : `/notes/folder-${folder.id}`;

				if (index === 0) {
					ref = firstFolderRef;
				} else if (index === array.length - 1) {
					ref = lastFolderRef;
				}

				return (
					<li
						key={folder.id}
						tabIndex={-1}
						onFocus={e =>
							(e.currentTarget.firstElementChild as HTMLAnchorElement).focus()
						}
					>
						<Folder
							ref={ref}
							to={href}
							disabled={isSelection}
							pinned={folder.pinned}
							tabIndex={-1}
							onClick={e => (activeFolderRef.current = e.currentTarget)}
						>
							{folder.name}
						</Folder>
					</li>
				);
			})}
		</InteractiveList>
	);
}

export default FolderList;
