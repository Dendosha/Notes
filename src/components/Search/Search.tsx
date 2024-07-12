import cn from 'classnames';
import { forwardRef } from 'react';
import styles from './Search.module.scss';
import { SearchProps } from './Search.props';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
	{ className, ...props },
	ref
) {
	return (
		<input
			{...props}
			ref={ref}
			placeholder='Поиск'
			className={cn(styles['search'], className)}
		></input>
	);
});

export default Search;
