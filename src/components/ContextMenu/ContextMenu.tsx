import cn from 'classnames';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import TextButton from '../TextButton/TextButton';
import styles from './ContextMenu.module.scss';
import { ContextMenuProps, MenuItem } from './ContextMenu.props';

const X_OFFSET = 5;
const Y_OFFSET = 5;

function ContextMenu({
	items,
	coordinates,
	setMenuState,
	className,
	...props
}: ContextMenuProps) {
	const contextMenuRef = useRef<HTMLUListElement>(null);
	const currentElementRef = useRef<HTMLButtonElement | null>(null);
	const firstElementRef = useRef<HTMLButtonElement>(null);
	const lastElementRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (contextMenuRef.current) {
			contextMenuRef.current.focus();
			setPosition(contextMenuRef.current.getBoundingClientRect());
			document.addEventListener('wheel', handleWheelEvent, { passive: false });
		}

		function setPosition(contextMenuRect: DOMRect) {
			if (!contextMenuRef.current) {
				return;
			}

			const x = coordinates.x + contextMenuRect.width + X_OFFSET;
			const y = coordinates.y + contextMenuRect.height + Y_OFFSET;

			let calculatedX;
			let calculatedY;

			if (x < document.documentElement.clientWidth) {
				calculatedX = coordinates.x + X_OFFSET;
			} else {
				calculatedX = coordinates.x - contextMenuRect.width - 35;
			}

			if (y < document.documentElement.clientHeight) {
				calculatedY = coordinates.y + Y_OFFSET;
			} else {
				calculatedY = coordinates.y - contextMenuRect.height - 20;
			}

			contextMenuRef.current.style.left = `${calculatedX}px`;
			contextMenuRef.current.style.top = `${calculatedY}px`;
		}

		function handleWheelEvent(e: WheelEvent) {
			if (contextMenuRef.current?.contains(e.target as Node | null)) {
				contextMenuRef.current.scrollHeight ===
					contextMenuRef.current.clientHeight && e.preventDefault();
				e.stopPropagation();
				return false;
			}

			setMenuState(false);
		}

		return () => {
			document.removeEventListener('wheel', handleWheelEvent);
		};
	}, [contextMenuRef, coordinates.x, coordinates.y, setMenuState]);

	const handleMenuItemClick = (item: MenuItem) => {
		item.action();
		setMenuState(false);
	};

	const handleBackdropMouseDown = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (e.target === e.currentTarget) {
			setMenuState(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		e.preventDefault();
		switch (e.key) {
			case 'ArrowDown':
				focusNextMenuButton();
				break;
			case 'ArrowUp':
				focusPreviousMenuButton();
				break;
			case 'Escape': {
				setMenuState(false);
				break;
			}
		}
	};

	const focusNextMenuButton = () => {
		if (
			!currentElementRef.current ||
			currentElementRef.current === lastElementRef.current
		) {
			currentElementRef.current = firstElementRef.current;
			currentElementRef.current?.focus();
		} else {
			currentElementRef.current = currentElementRef.current.parentElement
				?.nextElementSibling?.firstElementChild as HTMLButtonElement;
			currentElementRef.current.focus();
		}
	};

	const focusPreviousMenuButton = () => {
		if (
			!currentElementRef.current ||
			currentElementRef.current === firstElementRef.current
		) {
			currentElementRef.current = lastElementRef.current;
			currentElementRef.current?.focus();
		} else if (currentElementRef.current) {
			currentElementRef.current = currentElementRef.current.parentElement
				?.previousElementSibling?.firstElementChild as HTMLButtonElement;

			currentElementRef.current.focus();
		}
	};

	const contextMenu = (
		<div
			className={styles['context-menu-backdrop']}
			onMouseDown={handleBackdropMouseDown}
		>
			<ul
				ref={contextMenuRef}
				{...props}
				tabIndex={-1}
				className={cn(styles['context-menu'], className)}
				onKeyDown={handleKeyDown}
			>
				{items.map((item, index, array) => (
					<li className={styles['context-menu__item']} key={item.name}>
						<TextButton
							ref={
								(index === 0 && firstElementRef) ||
								(index === array.length - 1 && lastElementRef) ||
								null
							}
							onClick={() => handleMenuItemClick(item)}
							className={styles['context-menu__item-button']}
						>
							{item.name}
						</TextButton>
					</li>
				))}
			</ul>
		</div>
	);

	return createPortal(contextMenu, document.getElementById('root')!);
}

export default ContextMenu;
