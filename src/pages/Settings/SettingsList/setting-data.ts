import { CustomSelectItem } from '../../../components/CustomSelect/CustomSelect.props';

export const notesSortItems: CustomSelectItem<'createDate' | 'updateDate'>[] = [
	{
		label: 'Дата создания',
		value: 'createDate'
	},
	{
		label: 'Дата изменения',
		value: 'updateDate'
	}
];

export const notesLayoutItems: CustomSelectItem<'list' | 'tiles'>[] = [
	{
		label: 'Список',
		value: 'list'
	},
	{
		label: 'Плитка',
		value: 'tiles'
	}
];

export const actionConfirmationsItems: CustomSelectItem<number>[] = [
	{
		label: 'Не подтверждать',
		value: 0
	},
	{
		label: 'Подтверждать',
		value: 1
	}
];
