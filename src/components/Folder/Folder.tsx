import cn from 'classnames';
import { MouseEvent } from 'react';
import styles from './Folder.module.scss';
import { FolderProps } from './Folder.props';

function Folder({ children, className, ...props }: FolderProps) {
	const selectFolder = (e: MouseEvent) => {
		console.log(e.target);
	};

	return (
		<button
			{...props}
			className={cn(styles['folder'], className)}
			onClick={selectFolder}
		>
			{children}
		</button>
	);
}

export default Folder;
