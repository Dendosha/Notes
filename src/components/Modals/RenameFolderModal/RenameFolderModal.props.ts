export interface RenameFolderModalProps {
	id: string;
	name: string;
	modalState: boolean;
	setModalState: (state: React.SetStateAction<boolean>) => void;
}
