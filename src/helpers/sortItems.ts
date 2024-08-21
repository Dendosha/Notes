import { FoldersItem } from '../store/folders.slice';
import { NotesItem } from '../store/notes.slice';
import { SettingsState } from '../store/settings.slice';
import { TasksItem } from '../store/tasks.slice';
import { ISOStringToDate } from './dateTime';

type ItemType = NotesItem | TasksItem | FoldersItem;

export const sortItems = <T extends ItemType>(
	state: T[],
	sort: SettingsState['sort']
) => {
	const sortType = sort === 'createDate' ? 'createdAt' : 'updatedAt';

	function compareItemsDates<I extends (typeof state)[0]>(
		firstItem: I,
		secondItem: I
	) {
		const firstDate = ISOStringToDate(firstItem[sortType]);
		const secondDate = ISOStringToDate(secondItem[sortType]);

		return secondDate.getTime() - firstDate.getTime();
	}

	return [...state].sort(compareItemsDates);
};
