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

export const actionConfirmationsItems: CustomSelectItem<
	'all' | 'deleteOnly' | 'none'
>[] = [
	{
		label: 'Спрашивать всегда',
		value: 'all'
	},
	{
		label: 'Только удаление',
		value: 'deleteOnly'
	},
	{
		label: 'Не спрашивать',
		value: 'none'
	}
];
