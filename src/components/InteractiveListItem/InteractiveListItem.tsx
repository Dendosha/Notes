import { useRef, useState } from 'react';
import ContextMenu from '../ContextMenu/ContextMenu';
import { InteractiveListItemProps } from './InteractiveListItem.props';

function InteractiveListItem({
	contextMenuItems,
	isSelection,
	className,
	children,
	...props
}: InteractiveListItemProps) {
	const interactiveListItemRef = useRef<HTMLLIElement>(null);
	const [contextMenuVisible, setContextMenuVisible] = useState(false);
	const pointerCoordinates = useRef<{ x: number; y: number }>({
		x: 0,
		y: 0
	});

	const handleContextMenu = (e: React.MouseEvent) => {
		e.preventDefault();

		pointerCoordinates.current = {
			x: e.clientX + 20,
			y: e.clientY + 10
		};

		if (isSelection) {
			return;
		}

		showContextMenu();
	};

	const showContextMenu = () => {
		if (contextMenuVisible) {
			return;
		}

		setContextMenuVisible(true);
	};

	const onContextMenuClose = () => {
		setContextMenuVisible(false);
		interactiveListItemRef.current?.focus();
	};

	return (
		<li
			ref={interactiveListItemRef}
			onContextMenu={handleContextMenu}
			tabIndex={-1}
			className={className}
			{...props}
		>
			{children}
			{contextMenuVisible && contextMenuItems && (
				<ContextMenu
					onMenuClose={onContextMenuClose}
					items={contextMenuItems}
					coordinates={pointerCoordinates.current}
				/>
			)}
		</li>
	);
}

export default InteractiveListItem;
