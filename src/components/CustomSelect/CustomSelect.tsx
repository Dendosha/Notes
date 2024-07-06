import { Select, SelectProps } from 'antd';
import ArrowIcon from '../../assets/icons/ArrowIcon';
import './antd-select.scss';

function CustomSelect({ defaultValue, options }: SelectProps) {
	return (
		<Select
			defaultValue={defaultValue}
			options={options}
			suffixIcon={<ArrowIcon />}
			listHeight={270}
			listItemHeight={123}
		></Select>
	);
}

export default CustomSelect;
