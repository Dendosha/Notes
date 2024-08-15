export const handleListFocus = (e: React.FocusEvent) => {
	if (e.currentTarget.contains(e.relatedTarget) || e.relatedTarget === null) {
		return;
	}

	(e.currentTarget.firstElementChild as HTMLElement | null)?.focus();
};
