import cn from 'classnames';
import { useState } from 'react';
import { handleListFocus } from '../../helpers/handleListFocus';
import styles from './InteractiveList.module.scss';
import { InteractiveListProps } from './InteractiveList.props';

function InteractiveList({
	className,
	isNotFocusable = false,
	onFocus,
	onKeyDown,
	children
}: InteractiveListProps) {
	const [tabIndex, setTabIndex] = useState<0 | -1>(0);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!e.currentTarget.contains(e.target as Node | null)) {
			return;
		}

		const currentListItem = e.target as HTMLLIElement;
		let itemToFocus: HTMLLIElement;

		switch (e.key) {
			case 'ArrowUp':
			case 'ArrowLeft':
				e.preventDefault();

				if (currentListItem === e.currentTarget.firstElementChild) {
					itemToFocus = e.currentTarget.lastElementChild as HTMLLIElement;
				} else {
					itemToFocus = currentListItem.previousElementSibling as HTMLLIElement;
				}
				itemToFocus?.focus({ preventScroll: true });
				itemToFocus?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
				break;
			case 'ArrowDown':
			case 'ArrowRight':
				e.preventDefault();

				if (currentListItem === e.currentTarget.lastElementChild) {
					itemToFocus = e.currentTarget.firstElementChild as HTMLLIElement;
				} else {
					itemToFocus = currentListItem.nextElementSibling as HTMLLIElement;
				}
				itemToFocus?.focus({ preventScroll: true });
				itemToFocus?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
				break;
		}
	};

	return (
		<ul
			className={cn(styles['interactive-list'], className)}
			tabIndex={isNotFocusable ? -1 : tabIndex}
			onFocus={e => {
				setTabIndex(-1);
				onFocus ? onFocus(e) : handleListFocus(e);
			}}
			onBlur={() => setTabIndex(0)}
			onKeyDown={onKeyDown ?? handleKeyDown}
		>
			{children}
		</ul>
	);
}

export default InteractiveList;
