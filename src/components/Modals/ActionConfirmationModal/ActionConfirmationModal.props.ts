export interface ActionConfirmationModalProps {
	message: string;
	onConfirm: () => void;
	modalState: boolean;
	setModalState: (state: React.SetStateAction<boolean>) => void;
}
