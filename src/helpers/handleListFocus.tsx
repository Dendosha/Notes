export const handleListFocus = (e: React.FocusEvent) => {
	if (e.currentTarget.contains(e.relatedTarget)) {
		return;
	}

	(e.currentTarget.firstElementChild as HTMLElement | null)?.focus();
};
