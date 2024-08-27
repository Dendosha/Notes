import { ActionConfirmationProps } from '../../../pages/Folders/Folders';

export interface RenameFolderModalProps {
	id: number;
	name: string;
	modalState: boolean;
	setModalState: (state: React.SetStateAction<boolean>) => void;
	confirmAction: ({ message, onConfirm }: ActionConfirmationProps) => void;
}
