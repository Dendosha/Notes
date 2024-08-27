import { ActionConfirmationProps } from '../../../pages/Notes/Notes';
import { NotesItem } from '../../../store/notes.slice';

export interface ChangeFolderModalProps {
	notes: NotesItem[];
	modalState: boolean;
	setModalState: (state: React.SetStateAction<boolean>) => void;
	confirmAction: ({ message, onConfirm }: ActionConfirmationProps) => void;
}
