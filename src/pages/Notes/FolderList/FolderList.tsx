import Folder from '../../../components/Folder/Folder';
import { useAppSelector } from '../../../hooks/useAppSelector.hook';
import { useRootContext } from '../../../layout/RootLayout/RootLayout';
import { FolderListProps } from './FolderList.props';

function FolderList({ className }: FolderListProps) {
	const { isSelection } = useRootContext();

	const folders = useAppSelector(state => state.folders);

	return (
		<div className={className}>
			{folders.items.map(folder => (
				<Folder
					to={folder.id === 1 ? '/notes/all' : `/notes/folder-${folder.id}`}
					disabled={isSelection}
					key={folder.id}
				>
					{folder.name}
				</Folder>
			))}
		</div>
	);
}

export default FolderList;
