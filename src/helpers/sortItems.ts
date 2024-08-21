import { FoldersItem } from '../store/folders.slice';
import { NotesItem } from '../store/notes.slice';
import { SettingsState } from '../store/settings.slice';
import { TasksItem } from '../store/tasks.slice';
import { ISOStringToDate } from './dateTime';

type ItemType = NotesItem | TasksItem | FoldersItem;

export const sortItems = <T extends ItemType>(
	state: T[],
	sort: SettingsState['sort'],
	increasing: boolean = false
) => {
	const sortType = sort === 'createDate' ? 'createdAt' : 'updatedAt';

	function compareItemsDates<I extends (typeof state)[0]>(
		firstItem: I,
		secondItem: I
	) {
		const firstDate = ISOStringToDate(firstItem[sortType]);
		const secondDate = ISOStringToDate(secondItem[sortType]);

		return increasing
			? firstDate.getTime() - secondDate.getTime()
			: secondDate.getTime() - firstDate.getTime();
	}

	return [...state].sort(compareItemsDates);
};
