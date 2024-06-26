import cn from 'classnames';
import TextButton from '../TextButton/TextButton';
import styles from './ContextMenu.module.scss';
import { ContextMenuProps } from './ContextMenu.props';

function ContextMenu({ items, className, ...props }: ContextMenuProps) {
	return (
		<ul {...props} className={cn(styles['context-menu'], className)}>
			{items.map(item => (
				<li className={styles['context-menu__item']} key={item.name}>
					<TextButton
						action={item.action}
						className={styles['context-menu__item-button']}
					>
						{item.name}
					</TextButton>
				</li>
			))}
		</ul>
	);
}

export default ContextMenu;
