import { Link, useRouteError } from 'react-router-dom';
import styles from './Error.module.scss';

function Error() {
	const error = useRouteError() as Error;
	console.error(error);

	return (
		<div className={styles['error-page']}>
			<Link to={'/'} className={styles['error-page__link']}>
				На главную
			</Link>
			<p className={styles['error-page__message']}>Ошибка: {error.message}</p>
		</div>
	);
}

export default Error;
