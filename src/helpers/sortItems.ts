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
		let result: number = 0;
		const firstDate = ISOStringToDate(firstItem[sortType]);
		const secondDate = ISOStringToDate(secondItem[sortType]);

		if (increasing) {
			result = firstDate.getTime() - secondDate.getTime();
		} else {
			result = secondDate.getTime() - firstDate.getTime();
		}

		if (firstItem.pinned.state && secondItem.pinned.state) {
			result = secondItem.pinned.priority - firstItem.pinned.priority;
		} else if (firstItem.pinned.state) {
			result = -1;
		} else if (secondItem.pinned.state) {
			result = 1;
		}

		return result;
	}

	return [...state].sort(compareItemsDates);
};
