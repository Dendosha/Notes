import { Select, SelectProps } from 'antd';
import ArrowIcon from '../../assets/icons/ArrowIcon';

function CustomSelect({ defaultValue, options }: SelectProps) {
	return (
		<Select
			defaultValue={defaultValue}
			options={options}
			suffixIcon={<ArrowIcon />}
			listHeight={9999}
		></Select>
	);
}

export default CustomSelect;
