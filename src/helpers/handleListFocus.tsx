export const handleListFocus = (
	e: React.FocusEvent,
	elementToFocus: HTMLElement | null = null
) => {
	if (
		e.currentTarget.contains(e.relatedTarget) ||
		(e.currentTarget.contains(e.target) && e.currentTarget !== e.target)
	) {
		return;
	}

	elementToFocus
		? elementToFocus.focus()
		: (e.currentTarget.firstElementChild as HTMLElement | null)?.focus();
};
