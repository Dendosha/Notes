import cn from 'classnames';
import styles from './ContextMenu.module.scss';
import { ContextMenuProps } from './ContextMenu.props';

function ContextMenu({ items, className, ...props }: ContextMenuProps) {
	return (
		<ul {...props} className={cn(styles['context-menu'], className)}>
			{items.map(item => (
				<li className={styles['context-menu__item']} key={item.name}>
					<button
						className={styles['context-menu__item-button']}
						onClick={item.action}
					>
						{item.name}
					</button>
				</li>
			))}
		</ul>
	);
}

export default ContextMenu;
