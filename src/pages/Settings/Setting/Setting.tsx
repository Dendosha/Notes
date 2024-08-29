import CustomSelect from '../../../components/CustomSelect/CustomSelect';
import styles from './Setting.module.scss';
import { SettingProps } from './Setting.props';

function Setting<T>({
	children,
	inputName,
	items,
	defaultSelectValue,
	setSelectValue,
	onSelectChange
}: SettingProps<T>) {
	return (
		<div className={styles['settings-list-item']}>
			<p className={styles['settings-list-item__title']}>{children}</p>
			<CustomSelect
				name={inputName}
				items={items}
				defaultValue={defaultSelectValue}
				setValue={setSelectValue}
				onChange={onSelectChange}
				placeholder={'Выберите настройку'}
				className={styles['settings-list-item__select']}
			/>
		</div>
	);
}

export default Setting;
