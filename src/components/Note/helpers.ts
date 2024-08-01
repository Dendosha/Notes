const SAME_DAY_INTL_OPTIONS: Intl.DateTimeFormatOptions = {
	hour: '2-digit',
	minute: '2-digit'
};

const SAME_YEAR_INTL_OPTIONS: Intl.DateTimeFormatOptions = {
	day: '2-digit',
	month: 'long'
};

const DIFFERENT_YEARS_INTL_OPTIONS: Intl.DateTimeFormatOptions = {
	day: '2-digit',
	month: 'long',
	year: 'numeric'
};

function getIntlOptions(
	firstDate: Date,
	secondDate: Date
): Intl.DateTimeFormatOptions {
	if (firstDate.getDate() === secondDate.getDate()) {
		return SAME_DAY_INTL_OPTIONS;
	}

	if (firstDate.getFullYear() === secondDate.getFullYear()) {
		return SAME_YEAR_INTL_OPTIONS;
	} else {
		return DIFFERENT_YEARS_INTL_OPTIONS;
	}
}

export function formatDate(ISODate: string): string {
	const parsedDate = new Date(Date.parse(ISODate));
	const currentDate = new Date();

	return new Intl.DateTimeFormat(
		'ru-RU',
		getIntlOptions(parsedDate, currentDate)
	)
		.format(Date.parse(ISODate))
		.split('г')[0];
}
