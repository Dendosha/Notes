import { useNavigate } from 'react-router-dom';
import BackButtonIcon from '../../assets/icons/BackButtonIcon';
import IconButton from '../../components/IconButton/IconButton';
import styles from './Settings.module.scss';
import SettingsList from './SettingsList/SettingsList';

function Settings() {
	const navigate = useNavigate();

	return (
		<div className={styles['settings']}>
			<div className={styles['settings__header']}>
				<IconButton
					aria-label='Закрыть настройки'
					iconType='stroke'
					onClick={() => navigate(-1)}
				>
					<BackButtonIcon />
				</IconButton>
				<h2 className={styles['settings__title']}>Настройки</h2>
			</div>
			<div className={styles['settings__content']}>
				<SettingsList />
			</div>
			<div className={styles['settings__buttons']}></div>
		</div>
	);
}

export default Settings;
