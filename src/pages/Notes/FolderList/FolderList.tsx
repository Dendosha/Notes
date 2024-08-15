import { useRef } from 'react';
import Folder from '../../../components/Folder/Folder';
import { handleListFocus } from '../../../helpers/handleListFocus';
import { useAppSelector } from '../../../hooks/useAppSelector.hook';
import { useRootContext } from '../../../layout/RootLayout/RootLayout';
import { FolderListProps } from './FolderList.props';

function FolderList<T extends HTMLElement, K extends HTMLElement>({
	parentElementRef,
	prevElementRef,
	className
}: FolderListProps<T, K>) {
	const firstFolderRef = useRef<HTMLAnchorElement>(null);
	const lastFolderRef = useRef<HTMLAnchorElement>(null);

	const { isSelection } = useRootContext();
	const folders = useAppSelector(state => state.folders);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		switch (e.key) {
			case 'Tab':
				e.preventDefault();
				if (e.shiftKey) {
					prevElementRef.current?.focus();
				} else {
					const nextElement = parentElementRef.current?.nextElementSibling
						?.firstElementChild as HTMLElement | null;

					nextElement?.focus();
				}
				break;
			case 'ArrowLeft':
				e.preventDefault();
				e.stopPropagation();
				const previousElementSibling = e.currentTarget
					.previousElementSibling as HTMLAnchorElement | null;

				previousElementSibling
					? previousElementSibling.focus()
					: lastFolderRef.current?.focus();
				break;
			case 'ArrowRight':
				e.preventDefault();
				e.stopPropagation();
				const nextElementSibling = e.currentTarget
					.nextElementSibling as HTMLAnchorElement | null;

				nextElementSibling
					? nextElementSibling.focus()
					: firstFolderRef.current?.focus();
				break;
		}
	};

	return (
		<div className={className} onFocus={handleListFocus}>
			{folders.items.map((folder, index, array) => {
				let ref = null;

				if (index === 0) {
					ref = firstFolderRef;
				} else if (index === array.length - 1) {
					ref = lastFolderRef;
				}

				return (
					<Folder
						ref={ref}
						to={folder.id === 1 ? '/notes/all' : `/notes/folder-${folder.id}`}
						disabled={isSelection}
						key={folder.id}
						onKeyDown={handleKeyDown}
					>
						{folder.name}
					</Folder>
				);
			})}
		</div>
	);
}

export default FolderList;
